// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HupayxToken is ERC20 {
    uint256 totalSupply_ = 2000000;

    constructor() ERC20("HupayxToken", "HPXT") {
        _mint(msg.sender, totalSupply_ * 10**uint(decimals()));
    }

}