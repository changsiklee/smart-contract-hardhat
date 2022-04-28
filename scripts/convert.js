const { task } = require("hardhat/config");
const { ethers } = require("ethers");
const { getAccount, getContract, getEnvVariable } = require("./helpers");

task("convert", "convert tokens to coins")
.addPositionalParam("account", "The owner address of a token to convert")
.addPositionalParam("amount", "The amount of a ether unit token to convert")
.setAction(async function (taskArgs, hre) {
	// Token burn
	console.log('account : ' + taskArgs.account);
	console.log('amount : ' + taskArgs.amount);

	const contractName = 'ConvertTokenToCoin';
	const contract = await getContract(hre, contractName);
    const transactionResponse = await contract.burnFrom(taskArgs.account, hre.ethers.utils.parseEther(taskArgs.amount));

	console.log(`Transaction Hash for burn: ${transactionResponse.hash}`);


	// Send a coin
	const accountCoinHolder = getAccount(contractName, 'coin');
	//console.log(`Account balance for ${accountCoinHolder.address}: ${await accountCoinHolder.getBalance()}`);

	const rate = getEnvVariable('CONVERT_CONTRACT_RATE');

    // Create a transaction object
    let tx = {
        to: taskArgs.account,
        // Convert currency unit from ether to wei
        value: hre.ethers.utils.parseEther(String(Number(taskArgs.amount)*Number(rate)))
    };

 	// Send a transaction
    await accountCoinHolder.sendTransaction(tx)
    .then((txObj) => {
        console.log('txHash for sending coin:', txObj.hash);
    });
});