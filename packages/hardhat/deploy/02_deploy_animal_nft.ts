import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import { network, ethers } from "hardhat";

const { storeImages, storeTokenUriMetadata } = require("../utils/upload");
const { networkConfig, developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config");

const MIN_FEE = ethers.parseEther("0.01");
const THRESHOLD = ethers.parseEther("0.1");
const AMOUNT = 10000000000000000000n;

let tokenUris = [
  "ipfs://QmTHTcEsuiRzpxinE4fkmxcpCRN3uHrHGPV5Njk1wQh1EM",
  "ipfs://QmSb4bTzr4xvacvWxAjRuYPMoCwvqven7EGKV3F1EUPMSS",
  "ipfs://QmbvwPcKX1m68y5dh3Fwst6mtf4ruy1r34RN8vSE7G8Afr",
];

const imagePath = "./assets/nftImage/";
const metadataTemplate = {
  name: "",
  description: "",
  image: "",
  attributes: [
    {
      trait_type: "Color",
      value: "",
    },
  ],
};

const deployAnimalNft: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */

  if (process.env.PIN_TO_PINATA == "true") {
    tokenUris = await handleTokenUris();
  }

  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const chainId = network.config.chainId as number;
  let cooridinatorAddress;
  let subId;
  if (developmentChains.includes(network.name)) {
    const VRFCoordinatorV2Mock = await hre.ethers.getContract<Contract>("VRFCoordinatorV2Mock", deployer);
    cooridinatorAddress = await VRFCoordinatorV2Mock.getAddress();
    const tx = await VRFCoordinatorV2Mock.createSubscription();
    const txReceipt = await tx.wait(1);
    subId = txReceipt.logs[0].args.subId;
    await VRFCoordinatorV2Mock.fundSubscription(subId, AMOUNT);
  } else {
    cooridinatorAddress = networkConfig[chainId].vrfCoordinatorV2;
    subId = networkConfig[chainId].subscriptionId;
  }
  console.log(chainId);
  const args: any[] = [
    cooridinatorAddress,
    networkConfig[chainId].gasLane,
    subId,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig[chainId].callbackGasLimit,
    tokenUris,
    MIN_FEE,
    THRESHOLD,
  ];

  await deploy("AnimalNft", {
    from: deployer,
    // Contract constructor arguments
    args,
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const animalNft = await hre.ethers.getContract<Contract>("AnimalNft", deployer);
  if (developmentChains.includes(network.name)) {
    const VRFCoordinatorV2Mock = await hre.ethers.getContract<Contract>("VRFCoordinatorV2Mock", deployer);
    await VRFCoordinatorV2Mock.addConsumer(subId, await animalNft.getAddress());
  }
};

const animalToValue: { [key: string]: string } = {
  fish: "red",
  flamingo: "pink",
  godzilla: "green",
};

async function handleTokenUris() {
  const tokenUris = [];
  const { responses: imageUploadResponses, files } = await storeImages(imagePath);
  for (const imageUploadResponseIndex in imageUploadResponses) {
    let tokenUriMetadata = { ...metadataTemplate };
    tokenUriMetadata.name = files[imageUploadResponseIndex].replace(/\b.png|\b.jpg|\b.jpeg/, "");
    tokenUriMetadata.description = `such a ${tokenUriMetadata.name}`;
    tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`;
    tokenUriMetadata.attributes[0].value = animalToValue[tokenUriMetadata.name];
    console.log(`Uploading ${tokenUriMetadata.name}...`);
    const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata);
    tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`);
  }
  return tokenUris;
}

export default deployAnimalNft;

deployAnimalNft.tags = ["AnimalNft", "all"];
