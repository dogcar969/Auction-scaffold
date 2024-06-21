// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// 三种：1-最低fee 2-获得概率为fee-最低fee/（门槛fee-最低fee） 3-到达门槛fee有1%概率获得

// 导入
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// 合约
contract AnimalNft is
	ERC721,
	ERC721URIStorage,
	ERC721Enumerable,
	VRFConsumerBaseV2,
	ConfirmedOwner,
	ReentrancyGuard
{
	// 类型声明
	struct Request {
		address sender;
		uint256 mintFee;
	}
	enum Species {
		fish,
		flamingo,
		godzilla
	}
	// 状态变量
	// NFT
	uint256 private s_tokenCounter;
	string[3] internal s_tokenUri;
	uint256 public immutable i_minFee;
	uint256 public immutable i_threshold;
	uint256 immutable i_dividend;
	uint256 constant ONE_PERSENT = type(uint256).max / 100;
	//  requestId->requestInfo
	mapping(uint256 => Request) requests;
	// VRF
	uint32 private constant NUM_WORDS = 1;
	bytes32 private immutable i_keyHash;
	uint64 private immutable i_subId;
	uint16 private immutable i_requestConfirmations;
	uint32 private immutable i_callbackGasLimit;
	VRFCoordinatorV2Interface immutable i_coordinator;
	// 事件
	event nftRequested(uint256 requestId, address requester);
	event nftMinted(
		uint256 tokenId,
		address minter,
		Species species,
		uint256 requestId
	);
	// 错误
	error AnimalNft__ValueNotEnough();
	error AnimalNft__ThresholdBiggerThanMinFee(
		uint256 threshold,
		uint256 minFee
	);
	error AnimalNft__sendETHFailed();

	// 修饰符

	// 函数
	// 构造函数
	constructor(
		address VRFAddress,
		bytes32 keyHash,
		uint64 subId,
		uint16 requestConfirmations,
		uint32 callbackGasLimit,
		string[3] memory tokenUri,
		uint256 minFee,
		uint256 threshold
	)
		ERC721("Animal", "AN")
		VRFConsumerBaseV2(VRFAddress)
		ConfirmedOwner(msg.sender)
	{
		if (threshold < minFee) {
			revert AnimalNft__ThresholdBiggerThanMinFee(threshold, minFee);
		}
		s_tokenCounter = 0;
		i_keyHash = keyHash;
		i_subId = subId;
		i_requestConfirmations = requestConfirmations;
		i_callbackGasLimit = callbackGasLimit;
		i_coordinator = VRFCoordinatorV2Interface(VRFAddress);
		s_tokenUri = tokenUri;
		i_minFee = minFee;
		i_threshold = threshold;
		i_dividend = threshold - minFee;
	}

	receive() external payable {
		requestNft();
	}

	fallback() external {}

	// 外部函数

	// 公共函数
	function requestNft() public payable returns (uint256 requestId) {
		if (msg.value < i_minFee) {
			revert AnimalNft__ValueNotEnough();
		}
		requestId = i_coordinator.requestRandomWords(
			i_keyHash,
			i_subId,
			i_requestConfirmations,
			i_callbackGasLimit,
			NUM_WORDS
		);
		requests[requestId] = Request(msg.sender, msg.value);
		emit nftRequested(requestId, msg.sender);
	}

	function tokenURI(
		uint256 tokenId
	) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}

	function supportsInterface(
		bytes4 interfaceId
	) public view override(ERC721, ERC721Enumerable) returns (bool) {
		return super.supportsInterface(interfaceId);
	}

	function withDraw() public onlyOwner nonReentrant {
		if (!payable(owner()).send(address(this).balance)) {
			revert AnimalNft__sendETHFailed();
		}
	}

	function getTokenCounter() public view returns (uint256) {
		return s_tokenCounter;
	}

	// 内部函数

	function _exists(uint256 tokenId) internal view override returns (bool) {
		return _ownerOf(tokenId) != address(0);
	}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId,
		uint256 quantity
	) internal override(ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(from, to, tokenId, quantity);
	}

	function _burn(
		uint256 tokenId
	) internal override(ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}

	function fulfillRandomWords(
		uint256 _requestId,
		uint256[] memory _randomWords
	) internal override {
		uint256 tokenId = s_tokenCounter;
		s_tokenCounter++;
		Request memory request = requests[_requestId];
		uint8 species;
		_safeMint(request.sender, tokenId);
		if (request.mintFee < i_threshold) {
			uint256 posibility = ((request.mintFee - i_minFee) *
				type(uint256).max) / i_dividend;

			if (_randomWords[0] > posibility) {
				species = 0;
			} else {
				species = 1;
			}
		} else {
			if (_randomWords[0] < ONE_PERSENT) {
				species = 2;
			} else {
				species = 1;
			}
		}
		_setTokenURI(tokenId, s_tokenUri[species]); // fish
		emit nftMinted(tokenId, request.sender, Species(species), _requestId);
	}
	// 私有函数
}
