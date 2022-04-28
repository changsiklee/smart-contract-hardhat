// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTHupayx is ERC721 {
  using Counters for Counters.Counter;

  Counters.Counter private currentTokenId;

  /// @dev Base token URI used as a prefix by tokenURI().
  string public baseTokenURI;

  constructor() ERC721("NFTHupayx", "NFTH") {
    baseTokenURI = "https://bafybeiad6a7czc52et4cohb47p6drgm4ypdizcnurlg43hzawbvhgsjtcm.ipfs.nftstorage.link/metadata/";
  }
  
  function mintTo(address to) public returns (uint256) {
    currentTokenId.increment();
    uint256 newItemId = currentTokenId.current();
    _safeMint(to, newItemId);
    return newItemId;
  }

  function transfer(address from, address to, uint256 tokenId) public virtual {
    super.safeTransferFrom(from, to, tokenId);
  }

  /// @dev Returns an URI for a given token ID
  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  /// @dev Sets the base token URI prefix.
  function setBaseTokenURI(string memory _baseTokenURI) public {
    baseTokenURI = _baseTokenURI;
  }
}