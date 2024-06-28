import { expect, assert } from "chai";
import { ethers, deployments } from "hardhat";
import { AnimalNft, VRFCoordinatorV2Mock } from "../typechain-types";
import { ContractTransactionReceipt } from "ethers";
import { dataIndex } from "../utils/event";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const MIN_FEE = ethers.parseEther("0.01");
const THRESHOLD = ethers.parseEther("0.1");

const tokenUris = [
  "ipfs://QmTHTcEsuiRzpxinE4fkmxcpCRN3uHrHGPV5Njk1wQh1EM",
  "ipfs://QmSb4bTzr4xvacvWxAjRuYPMoCwvqven7EGKV3F1EUPMSS",
  "ipfs://QmbvwPcKX1m68y5dh3Fwst6mtf4ruy1r34RN8vSE7G8Afr",
];

describe("AnimalNft", function () {
  // We define a fixture to reuse the same setup in every test.

  let animalNft: AnimalNft;
  let VRFCoordinatorV2Mock: VRFCoordinatorV2Mock;
  let signer: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  before(async () => {
    [signer, addr1] = await ethers.getSigners();
    await deployments.fixture(["AnimalNft"]);
    animalNft = await ethers.getContract<AnimalNft>("AnimalNft", signer);
    VRFCoordinatorV2Mock = await ethers.getContract<VRFCoordinatorV2Mock>("VRFCoordinatorV2Mock", signer);
  });

  describe("constructor", function () {
    it("paramters all match", async function () {
      assert.equal(MIN_FEE, await animalNft.i_minFee());
      assert.equal(THRESHOLD, await animalNft.i_threshold());
    });
  });
  describe("requestNft", function () {
    it("should revert if fund is insufficient", async function () {
      await expect(animalNft.requestNft({ value: ethers.parseEther("0.009") })).to.be.revertedWithCustomError(
        animalNft,
        "AnimalNft__ValueNotEnough",
      );
    });
    it("should revert if no fund", async function () {
      await expect(animalNft.requestNft()).to.be.revertedWithCustomError(animalNft, "AnimalNft__ValueNotEnough");
    });
    it("should emit nftRequested", async function () {
      const fee = await animalNft.i_minFee();
      await expect(animalNft.requestNft({ value: fee }))
        .to.emit(animalNft, "nftRequested")
        .withArgs(1n, signer.address);
    });
  });

  describe("fulfillRandomWords,not win", async function () {
    it("gives fish when fee == min_fee", async function () {
      await new Promise<void>(async (resolve, reject) => {
        animalNft.once(animalNft.getEvent("nftMinted"), async (tokenId, minter, species) => {
          try {
            const tokenUri = await animalNft.tokenURI(tokenId.toString());
            const tokenCounter = await animalNft.getTokenCounter();
            assert.equal(tokenCounter.toString(), "1");
            assert.equal(tokenUri, tokenUris[0]);
            assert.equal(minter, (await ethers.getSigners())[0].address);
            assert.equal(species, 0n);
            resolve();
          } catch (e: any) {
            console.log(e);
            reject(e);
          }
        });

        try {
          const fee = await animalNft.i_minFee();
          const requestNftResponse = await animalNft.requestNft({ value: fee });
          const requestNftReceipt = (await requestNftResponse.wait(1)) as ContractTransactionReceipt;
          const result = await VRFCoordinatorV2Mock.fulfillRandomWordsWithOverride(
            dataIndex(requestNftReceipt.logs[1].data, 0),
            await animalNft.getAddress(),
            ["1"],
          );
          await result.wait(1);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    });
    it("gives flamingo when fee==threshold", async function () {
      await new Promise<void>(async (resolve, reject) => {
        animalNft.once(animalNft.getEvent("nftMinted"), async (tokenId, minter, species) => {
          try {
            const tokenUri = await animalNft.tokenURI(tokenId.toString());
            const tokenCounter = await animalNft.getTokenCounter();
            assert.equal(tokenCounter.toString(), "2");
            assert.equal(tokenUri, tokenUris[1]);
            assert.equal(minter, (await ethers.getSigners())[0].address);
            assert.equal(species, 1n);
            resolve();
          } catch (e: any) {
            console.log(e);
            reject(e);
          }
        });

        try {
          const fee = await animalNft.i_threshold();
          const requestNftResponse = await animalNft.requestNft({ value: fee });
          const requestNftReceipt = (await requestNftResponse.wait(1)) as ContractTransactionReceipt;
          const result = await VRFCoordinatorV2Mock.fulfillRandomWordsWithOverride(
            dataIndex(requestNftReceipt.logs[1].data, 0),
            await animalNft.getAddress(),
            [ethers.MaxUint256],
          );
          await result.wait(1);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    });
  });
  describe("fulfillRandomWords,win", async function () {
    it("gives flamingo when fee==min_fee", async function () {
      await new Promise<void>(async (resolve, reject) => {
        animalNft.once(animalNft.getEvent("nftMinted"), async (tokenId, minter, species) => {
          try {
            const tokenUri = await animalNft.tokenURI(tokenId.toString());
            const tokenCounter = await animalNft.getTokenCounter();
            assert.equal(tokenCounter.toString(), "3");
            assert.equal(tokenUri, tokenUris[1]);
            assert.equal(minter, (await ethers.getSigners())[0].address);
            assert.equal(species, 1n);
            resolve();
          } catch (e: any) {
            console.log(e);
            reject(e);
          }
        });

        try {
          const fee = await animalNft.i_minFee();
          const requestNftResponse = await animalNft.requestNft({ value: fee });
          const requestNftReceipt = (await requestNftResponse.wait(1)) as ContractTransactionReceipt;
          const result = await VRFCoordinatorV2Mock.fulfillRandomWordsWithOverride(
            dataIndex(requestNftReceipt.logs[1].data, 0),
            await animalNft.getAddress(),
            [0n],
          );
          await result.wait(1);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    });
    it("gives godzilla when fee==threshold", async function () {
      const fee = await animalNft.i_threshold();
      const requestNftResponse = await animalNft.requestNft({ value: fee });
      const requestNftReceipt = (await requestNftResponse.wait(1)) as ContractTransactionReceipt;
      await expect(
        VRFCoordinatorV2Mock.fulfillRandomWordsWithOverride(
          dataIndex(requestNftReceipt.logs[1].data, 0),
          await animalNft.getAddress(),
          [0n],
        ),
      )
        .to.emit(animalNft, "nftMinted")
        .withArgs("3", (await ethers.getSigners())[0].address, 2n, dataIndex(requestNftReceipt.logs[1].data, 0));
    });
  });
  describe("withdraw", function () {
    it("can't withdraw if not owner", async function () {
      await expect(animalNft.connect(addr1).withDraw()).to.be.revertedWith("Only callable by owner");
    });
    it("withdraw with right owner", async function () {
      await expect(animalNft.withDraw()).to.changeEtherBalance(
        signer,
        3n * (await animalNft.i_minFee()) + 2n * (await animalNft.i_threshold()),
      );
    });
  });
  describe("min_fee should less than threshold", () => {
    it("", async () => {
      await expect(
        deployments.deploy("AnimalNft", {
          from: signer.address,
          args: [
            await VRFCoordinatorV2Mock.getAddress(),
            "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
            0n,
            6,
            "500000",
            [
              "ipfs://QmTHTcEsuiRzpxinE4fkmxcpCRN3uHrHGPV5Njk1wQh1EM",
              "ipfs://QmSb4bTzr4xvacvWxAjRuYPMoCwvqven7EGKV3F1EUPMSS",
              "ipfs://QmbvwPcKX1m68y5dh3Fwst6mtf4ruy1r34RN8vSE7G8Afr",
            ],
            ethers.parseEther("0.1"),
            ethers.parseEther("0.01"),
          ],
          log: true,
          autoMine: true,
        }),
      )
        .to.be.revertedWithCustomError(animalNft, "AnimalNft__ThresholdBiggerThanMinFee")
        .withArgs(ethers.parseEther("0.01"), ethers.parseEther("0.1"));
    });
  });
});
