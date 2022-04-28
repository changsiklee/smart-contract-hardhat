const { task } = require("hardhat/config");
const { getContract } = require("./helpers");
const ethers = require("@nomiclabs/hardhat-ethers");

task("totalSupply", "Prints totalSupply of contract").setAction(async function (taskArguments, hre) {
	const contract = await getContract(hre);
	
	const transactionResponse = await contract.totalSupply();

	console.log(`transactionResponse: ${transactionResponse}`);
});

// task action function receives the Hardhat Runtime Environment as second argument
task("blockNumber",	"Prints the current block number",
    async (_, { ethers }) => {
        await ethers.provider.getBlockNumber().then((blockNumber) => {
        console.log("Current block number: " + blockNumber);
    });
	}
);