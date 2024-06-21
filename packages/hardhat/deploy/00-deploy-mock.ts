import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network } from "hardhat";
const { developmentChains } = require("../helper-hardhat-config");

const _BASEFEE = ethers.parseEther("0.1");
const _GASPERLINK = 1000000000;

const deployMock: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  if (developmentChains.includes(network.name)) {
    console.log("In local network,deploy mocks");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      // Contract constructor arguments
      args: [_BASEFEE, _GASPERLINK],
      log: true,
      // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
      // automatically mining the contract deployment transaction. There is no effect on live networks.
      autoMine: true,
    });
  }
};
export default deployMock;

deployMock.tags = ["Mock", "all", "AnimalNft"];
