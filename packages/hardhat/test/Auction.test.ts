import { expect, assert } from "chai";
import { ethers, deployments } from "hardhat";
import { AddressLike, BigNumberish, ContractTransactionReceipt } from "ethers";
import { Auction, AnimalNft, VRFCoordinatorV2Mock } from "../typechain-types";
import { dataIndex } from "../utils/event";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { beforeEach } from "mocha";

let PERIOD: bigint;
const FEE = ethers.parseEther("0.01");
const BIGGER_FEE = ethers.parseEther("0.1");
let MIN_FEE: BigNumberish;

describe("Auction", function () {
  let Auction: Auction;
  let AnimalNft: AnimalNft;
  let VRFCoordinatorV2Mock: VRFCoordinatorV2Mock;
  let nftAddress: AddressLike;
  let AuctionAddress: AddressLike;
  let tokenId: string;
  let signer: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;
  beforeEach(async function () {
    [signer, addr1, addr2] = await ethers.getSigners();
    await deployments.fixture(["all"]);
    Auction = await ethers.getContract<Auction>("Auction", signer);
    PERIOD = await Auction.i_auctionPeriod();
    AnimalNft = await ethers.getContract<AnimalNft>("AnimalNft", signer);
    VRFCoordinatorV2Mock = await ethers.getContract<VRFCoordinatorV2Mock>("VRFCoordinatorV2Mock", signer);
    MIN_FEE = await AnimalNft.i_minFee();
    const requestNftResponse = await AnimalNft.requestNft({ value: MIN_FEE });
    const requestNftReceipt = (await requestNftResponse.wait(1)) as ContractTransactionReceipt;
    const VRFResponse = await VRFCoordinatorV2Mock.fulfillRandomWordsWithOverride(
      dataIndex(requestNftReceipt.logs[1].data, 0),
      await AnimalNft.getAddress(),
      ["1"],
    );
    const VRFReceipt = (await VRFResponse.wait(1)) as ContractTransactionReceipt;
    nftAddress = await AnimalNft.getAddress();
    AuctionAddress = await Auction.getAddress();
    tokenId = dataIndex(VRFReceipt.logs[1].data, 0);
  });
  describe("constructor", function () {
    it("should match initialize parameter", async function () {
      PERIOD;
      assert.equal(await Auction.i_auctionPeriod(), PERIOD);
    });
  });
  describe("prepay", function () {
    //
    //error
    it("revert Auction__PayMustAboveZero", async function () {
      //if (msg.value <= 0) {
      await expect(Auction.prepay()).to.be.revertedWithCustomError(Auction, "Auction__PayMustAboveZero");
    });
    //emit
    it("emit Prepaid", async function () {
      //address payer, uint256 value
      await expect(Auction.prepay({ value: FEE }))
        .to.emit(Auction, "Prepaid")
        .withArgs(signer.address, FEE);
    });
  });
  describe("listItem", function () {
    // address nftAddress, uint256 tokenId, uint256 initialPrice
    //modifier
    it("revert Auction__NotOwner in onlyOwner", async function () {
      //if (sender != nft.ownerOf(tokenId)) {
      await expect(Auction.connect(addr1).listItem(nftAddress, tokenId, FEE)).to.be.revertedWithCustomError(
        Auction,
        "Auction__NotOwner",
      );
    });
    it("revert Auction__NotApprove in NotApproved", async function () {
      //if (nft.getApproved(tokenId) != address(this)) {
      await expect(Auction.listItem(nftAddress, tokenId, FEE)).to.be.revertedWithCustomError(
        Auction,
        "Auction__NotApprove",
      );
    });
    it("revert Auction__AlreadyListed in NotListed", async function () {
      //if (listing.price > 0) {
      await AnimalNft.approve(AuctionAddress, tokenId);
      await Auction.listItem(nftAddress, tokenId, FEE);
      await expect(Auction.listItem(nftAddress, tokenId, FEE)).to.be.revertedWithCustomError(
        Auction,
        "Auction__AlreadyListed",
      );
    });
    //error
    it("revert Auction__PriceMustAboveZero", async function () {
      //if (initialPrice <= 0) {
      await AnimalNft.approve(AuctionAddress, tokenId);
      await expect(Auction.listItem(nftAddress, tokenId, 0n)).to.be.revertedWithCustomError(
        Auction,
        "Auction__PriceMustAboveZero",
      );
    });
    //emit
    it("emit ItemListed", async function () {
      //address nftAddress, uint256 tokenId, address seller, uint256 price
      await AnimalNft.approve(AuctionAddress, tokenId);
      await expect(Auction.listItem(nftAddress, tokenId, FEE))
        .to.emit(Auction, "ItemListed")
        .withArgs(nftAddress, tokenId, await signer.getAddress(), FEE);
    });
  });
  describe("bid", function () {
    // address nftAddress, uint256 tokenId, uint256 price
    //modifier
    beforeEach(async function () {
      await AnimalNft.approve(AuctionAddress, tokenId);
      await Auction.listItem(nftAddress, tokenId, FEE);
      Auction = Auction.connect(addr1);
    });
    it("revert Auction__NotListed in isListed", async function () {
      //if (listing.price == 0) {
      await expect(Auction.bid(nftAddress, 1n, BIGGER_FEE)).to.be.revertedWithCustomError(
        Auction,
        "Auction__NotListed",
      );
    });
    //error
    it("revert Auction__PriceNotEnough", async function () {
      //if (price < listing.price) {
      await expect(Auction.bid(nftAddress, tokenId, 0n)).to.be.revertedWithCustomError(
        Auction,
        "Auction__PriceNotEnough",
      );
    });
    it("revert Auction__InsufficientBalance", async function () {
      await expect(Auction.bid(nftAddress, tokenId, BIGGER_FEE))
        .to.be.revertedWithCustomError(Auction, "Auction__InsufficientBalance")
        .withArgs(await Auction.getBalance(addr1.address), BIGGER_FEE);
    });
    // pass
    it("refund when bigger bid happen after bided", async function () {
      await Auction.bid(nftAddress, tokenId, BIGGER_FEE, { value: BIGGER_FEE });
      const beforeBalance = await Auction.getBalance(addr1.address);
      await Auction.connect(addr2).bid(nftAddress, tokenId, BIGGER_FEE + 1n, { value: BIGGER_FEE + 1n });
      assert.equal(beforeBalance + BIGGER_FEE, await Auction.getBalance(addr1));
    });
    it("pass if check==true", async function () {
      await time.increase(PERIOD);
      await expect(Auction.bid(nftAddress, tokenId, BIGGER_FEE, { value: BIGGER_FEE }))
        .to.emit(Auction, "ItemPass")
        .withArgs(nftAddress, tokenId);
    });
  });
  describe("cancelItem", function () {
    // address nftAddress, uint256 tokenId
    beforeEach(async function () {
      await AnimalNft.approve(AuctionAddress, tokenId);
      await Auction.listItem(nftAddress, tokenId, FEE);
    });
    //modifier
    it("revert Auction__NotOwner in onlyOwner", async function () {
      //if (sender != nft.ownerOf(tokenId)) {
      await expect(Auction.connect(addr1).cancelItem(nftAddress, tokenId)).to.be.revertedWithCustomError(
        Auction,
        "Auction__NotOwner",
      );
    });
    it("revert Auction__NotListed in isListed", async function () {
      //if (listing.price == 0) {
      const requestNftResponse = await AnimalNft.requestNft({ value: MIN_FEE });
      const requestNftReceipt = (await requestNftResponse.wait(1)) as ContractTransactionReceipt;
      const VRFResponse = await VRFCoordinatorV2Mock.fulfillRandomWordsWithOverride(
        dataIndex(requestNftReceipt.logs[1].data, 0),
        await AnimalNft.getAddress(),
        ["1"],
      );
      const VRFReceipt = (await VRFResponse.wait(1)) as ContractTransactionReceipt;
      const newTokenId = dataIndex(VRFReceipt.logs[1].data, 0);
      await expect(Auction.cancelItem(nftAddress, newTokenId)).to.be.revertedWithCustomError(
        Auction,
        "Auction__NotListed",
      );
    });
    //emit
    it("emit ItemCanceled", async function () {
      //address nftAddress, uint256 tokenId
      await expect(Auction.cancelItem(nftAddress, tokenId))
        .to.emit(Auction, "ItemCanceled")
        .withArgs(nftAddress, tokenId);
    });
    it("refund when bided", async function () {
      await Auction.connect(addr1).bid(nftAddress, tokenId, FEE + 1n, { value: FEE + 1n });
      await Auction.cancelItem(nftAddress, tokenId);
      assert.equal(await Auction.getBalance(addr1.address), FEE + 1n);
    });
    it("pass when check == true", async function () {
      await time.increase(PERIOD);
      await expect(Auction.cancelItem(nftAddress, tokenId)).to.emit(Auction, "ItemPass").withArgs(nftAddress, tokenId);
    });
  });
  describe("check", function () {
    // TODO 1
    // address nftAddress, uint256 tokenId
    describe("sold", function () {
      beforeEach(async function () {
        await AnimalNft.approve(AuctionAddress, tokenId);
        await Auction.listItem(nftAddress, tokenId, FEE);
        await Auction.connect(addr1).prepay({ value: BIGGER_FEE });
        await Auction.connect(addr1).bid(nftAddress, tokenId, BIGGER_FEE);
        await time.increase(PERIOD);
      });
      it("should sold if check", async function () {
        await expect(Auction.check(nftAddress, tokenId))
          .to.emit(Auction, "ItemSold")
          .withArgs(nftAddress, tokenId, addr1, BIGGER_FEE);
        assert.equal(BIGGER_FEE, await Auction.getBalance(signer.address));
        assert.equal(addr1.address, await AnimalNft.ownerOf(tokenId));
      });
      it("revert when remove operater", async function () {
        await AnimalNft.approve(ethers.ZeroAddress, tokenId);
        const beforeBalance = await Auction.connect(addr1).getBalance(addr1.address);
        await expect(Auction.check(nftAddress, tokenId))
          .to.emit(Auction, "revertWithNotApproved")
          .withArgs(nftAddress, tokenId);
        assert.equal(beforeBalance + BIGGER_FEE, await Auction.connect(addr1).getBalance(addr1.address));
      });
      it("revert when transfered but approved again before sold", async function () {
        await AnimalNft.transferFrom(signer.address, addr1.address, tokenId);
        await AnimalNft.connect(addr1).approve(await Auction.getAddress(), tokenId);
        const beforeBalance = await Auction.connect(addr1).getBalance(addr1.address);
        await expect(Auction.check(nftAddress, tokenId))
          .to.emit(Auction, "revertWithOwnershipChange")
          .withArgs(nftAddress, tokenId);
        assert.equal(beforeBalance + BIGGER_FEE, await Auction.connect(addr1).getBalance(addr1.address));
      });
    });
    describe("pass", function () {
      beforeEach(async function () {
        await AnimalNft.approve(AuctionAddress, tokenId);
        await Auction.listItem(nftAddress, tokenId, FEE);
        await time.increase(PERIOD);
      });
      it("should pass if check", async function () {
        await expect(Auction.check(nftAddress, tokenId)).to.emit(Auction, "ItemPass").withArgs(nftAddress, tokenId);
      });
    });
  });
  describe("withdraw", function () {
    //
    //modifier
    //error
    it("revert Auction__NoBalance", async function () {
      //if (userToBalance[msg.sender] == 0) {
      await expect(Auction.withdraw()).to.be.revertedWithCustomError(Auction, "Auction__NoBalance");
    });
    it("withdraw successfully", async function () {
      await Auction.prepay({ value: FEE });
      await expect(Auction.withdraw()).to.changeEtherBalance(signer, FEE);
    });
    // it("revert Auction__ETHSendFail", async function () {
    //   //if (!payable(msg.sender).send(value)) {
    //   await expect(Auction.withdraw()).to.be.revertedWithCustomError(Auction, "Auction__ETHSendFail")
    // })
  });
});
