// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// 卖方可以给一个低价，买方只可以出超过这个价格（或现在最高价）的价格，每出一次价格可以将listing的持续时间刷新
// 预收款的方式是发送到合约中，如果出价的话会暂时扣在listing上

// 导入
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// 接口

// 库

// 合约
contract Auction is ReentrancyGuard {
	// 类型声明
	struct Listing {
		uint256 expiredTime;
		uint256 price;
		address seller;
		address buyer;
	}

	// 状态变量
	uint256 public immutable i_auctionPeriod;
	// nftAddress -> tokenId -> listings
	mapping(address => mapping(uint256 => Listing)) s_listings;
	// index => tokens
	// user -> balance
	mapping(address => uint256) userToBalance;

	// 事件
	event ItemListed(
		address nftAddress,
		uint256 tokenId,
		address seller,
		uint256 price
	);
	event ItemSold(
		address nftAddress,
		uint256 tokenId,
		address buyer,
		uint256 price
	);
	event ItemCanceled(address nftAddress, uint256 tokenId);
	event Bid(
		address nftAddress,
		uint256 tokenId,
		address bider,
		uint256 price
	);
	event ItemPass(address nftAddress, uint256 tokenId);
	event Prepaid(address payer, uint256 value);
	event revertWithNotApproved(address nftAddress, uint256 tokenId);
	event revertWithOwnershipChange(address nftAddress, uint256 tokenId);

	// 错误
	error Auction__NoBalance();
	error Auction__PriceMustAboveZero();
	error Auction__PayMustAboveZero();
	error Auction__PriceNotEnough();
	error Auction__NotOwner();
	error Auction__AlreadyListed(address nftAddress, uint256 tokenId);
	error Auction__NotListed(address nftAddress, uint256 tokenId);
	error Auction__NotApprove(address nftAddress, uint256 tokenId);
	error Auction__ETHSendFail();
	error Auction__InsufficientBalance(uint256 balance, uint256 price);
	// 修饰符
	modifier onlyOwner(
		address nftAddress,
		uint256 tokenId,
		address sender
	) {
		IERC721 nft = IERC721(nftAddress);
		if (sender != nft.ownerOf(tokenId)) {
			revert Auction__NotOwner();
		}
		_;
	}

	modifier NotListed(address nftAddress, uint256 tokenId) {
		Listing memory listing = s_listings[nftAddress][tokenId];
		if (listing.price > 0) {
			revert Auction__AlreadyListed(nftAddress, tokenId);
		}
		_;
	}

	modifier isListed(address nftAddress, uint256 tokenId) {
		Listing memory listing = s_listings[nftAddress][tokenId];
		if (listing.price == 0) {
			revert Auction__NotListed(nftAddress, tokenId);
		}
		_;
	}

	modifier NotApproved(address nftAddress, uint256 tokenId) {
		IERC721 nft = IERC721(nftAddress);
		if (nft.getApproved(tokenId) != address(this)) {
			revert Auction__NotApprove(nftAddress, tokenId);
		}
		_;
	}

	// 函数
	// 构造函数
	constructor(uint256 period) {
		i_auctionPeriod = period;
	}

	receive() external payable {
		prepay();
	}

	fallback() external {}

	// 外部函数
	function prepay() public payable {
		if (msg.value <= 0) {
			revert Auction__PayMustAboveZero();
		}
		userToBalance[msg.sender] += msg.value;
		emit Prepaid(msg.sender, msg.value);
	}

	function listItem(
		address nftAddress,
		uint256 tokenId,
		uint256 initialPrice
	)
		external
		onlyOwner(nftAddress, tokenId, msg.sender)
		NotApproved(nftAddress, tokenId)
		NotListed(nftAddress, tokenId)
	{
		if (initialPrice <= 0) {
			revert Auction__PriceMustAboveZero();
		}
		s_listings[nftAddress][tokenId] = Listing(
			block.timestamp + i_auctionPeriod,
			initialPrice,
			msg.sender,
			address(0)
		);
		emit ItemListed(nftAddress, tokenId, msg.sender, initialPrice);
	}

	function bid(
		address nftAddress,
		uint256 tokenId,
		uint256 price
	) external payable isListed(nftAddress, tokenId) {
		if (msg.value > 0) {
			prepay();
		}

		if (check(nftAddress, tokenId)) {
			return;
		}
		if (userToBalance[msg.sender] < price) {
			revert Auction__InsufficientBalance(
				userToBalance[msg.sender],
				price
			);
		}
		Listing memory listing = s_listings[nftAddress][tokenId];
		if (price < listing.price) {
			revert Auction__PriceNotEnough();
		}
		if (listing.buyer != address(0)) {
			userToBalance[listing.buyer] += listing.price;
		}
		userToBalance[msg.sender] -= price;
		s_listings[nftAddress][tokenId].buyer = msg.sender;
		s_listings[nftAddress][tokenId].price = price;
		s_listings[nftAddress][tokenId].expiredTime =
			block.timestamp +
			i_auctionPeriod;
	}

	function cancelItem(
		address nftAddress,
		uint256 tokenId
	)
		external
		onlyOwner(nftAddress, tokenId, msg.sender)
		isListed(nftAddress, tokenId)
	{
		if (check(nftAddress, tokenId)) {
			return;
		}
		Listing memory listing = s_listings[nftAddress][tokenId];
		if (listing.buyer != address(0)) {
			// refund
			userToBalance[listing.buyer] += listing.price;
		}
		delete s_listings[nftAddress][tokenId];
		emit ItemCanceled(nftAddress, tokenId);
	}

	function check(address nftAddress, uint256 tokenId) public returns (bool) {
		Listing memory listing = s_listings[nftAddress][tokenId];
		if (block.timestamp >= listing.expiredTime) {
			if (listing.buyer == address(0)) {
				pass(nftAddress, tokenId);
			} else {
				sold(nftAddress, tokenId);
			}
			return true;
		}
		return false;
	}

	function withdraw() public nonReentrant {
		if (userToBalance[msg.sender] == 0) {
			revert Auction__NoBalance();
		} else {
			uint256 value = userToBalance[msg.sender];
			userToBalance[msg.sender] = 0;
			if (!payable(msg.sender).send(value)) {
				revert Auction__ETHSendFail();
			}
		}
	}

	function getListing(
		address nftAddress,
		uint256 tokenId
	) public view returns (Listing memory) {
		return s_listings[nftAddress][tokenId];
	}

	function getBalance(address balanceAddress) public view returns (uint256) {
		return userToBalance[balanceAddress];
	}

	// 内部函数
	function sold(address nftAddress, uint256 tokenId) internal {
		Listing memory listing = s_listings[nftAddress][tokenId];
		IERC721 nft = IERC721(nftAddress);
		// 如果卖方在结算前取消授权，则放弃交易，退还买家的抵押金,由于有退还押金,删除listing的步骤，不能直接写revert
		if (nft.getApproved(tokenId) != address(this)) {
			userToBalance[listing.buyer] += listing.price;
			emit revertWithNotApproved(nftAddress, tokenId);
		} else {
			if (nft.ownerOf(tokenId) != listing.seller) {
				// 如果卖方在结算前将nft转手，safeTransferFrom会出现owner不对的情况，如果不改变seller，就出现没有拿到nft但是钱转到了卖方手上的情况
				// 这种情况一般来说会因为转手导致所有approve清零，但是假如现在的nft所有者在一无所知的情况下重新approve，就会出现未被告知就拍卖出去的情况
				// 所以要直接回退
				userToBalance[listing.buyer] += listing.price;
				emit revertWithOwnershipChange(nftAddress, tokenId);
			} else {
				nft.safeTransferFrom(listing.seller, listing.buyer, tokenId);
				userToBalance[listing.seller] += listing.price;
				emit ItemSold(
					nftAddress,
					tokenId,
					listing.buyer,
					listing.price
				);
			}
		}
		delete s_listings[nftAddress][tokenId];
	}

	function pass(address nftAddress, uint256 tokenId) internal {
		delete s_listings[nftAddress][tokenId];
		emit ItemPass(nftAddress, tokenId);
	}
}
