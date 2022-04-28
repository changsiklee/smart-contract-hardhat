const { expect } = require("chai");
const { getContract, csvToJSON, getAccount } = require("../scripts/helpers");
// const ethers = require("@nomiclabs/hardhat-ethers");

describe("Token converter contract", function () {
	it("Deployment should convert tokens to coins", async function () {
		const [owner] = await ethers.getSigners();
		const convert_ = await ethers.getContractFactory("ConvertTokenToCoin");
		const token_ = await ethers.getContractFactory("ConvertTokenHold");
		const coin_ = await ethers.getContractFactory("ConvertCoinHold");
	
		const deploytedToken = await token_.deploy();

		const from = getAccount().address;
		console.info(`from: ${from}`);
		



	// 	async (_, { ethers }) => {
	// 		await ethers.provider.getBlockNumber().then((blockNumber) => {
	// 		  console.log("Current block number: " + blockNumber);
	// 		});
	// 	  }

	// 	  const contract = await getContract(hre);
	// 	const transactionResponse = await contract.totalSupply();

	// console.log(`transactionResponse: ${transactionResponse}`);

	// 	console.info(`from: ${from}`);
	// //	const deploytedCoin = await coin_.deploy();

		
		
		// console.info(`owner.address: ${owner.address}`);
		// console.log(`Contract deployed to address: ${deploytedCoin.address}`);
		// const ownerBalance = await deploytedToken.balanceOf(owner.address);
	
		// console.info(`deployted token owner balance: ${ownerBalance}`);
		// console.info(`deployted token name: ${await deploytedToken.name()}`);
		// expect(Number(await deploytedToken.totalSupply())).to.be.equal(Number(ownerBalance));
	});
});