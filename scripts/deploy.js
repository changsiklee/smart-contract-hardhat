const { task } = require("hardhat/config");
const { getAccount, getContract, getContractName } = require("./helpers");

task("accounts", "Prints the list of accounts").setAction(async function (taskArguments, hre) {
	const accounts = await hre.ethers.getSigners();
  
	for (const account of accounts) {
	    console.log(account.address);
	}
});

task("check-balance", "Prints out the balance of your account")
.addOptionalParam("name", "The contract name to fetch")
.setAction(async function (taskArguments, hre) {
	const account = getAccount(taskArguments.name);
	console.log(`Account balance for ${account.address}: ${await account.getBalance()}`);
});

task("deploy", "Deploys the " + getContractName() + ".sol contract")
.addOptionalParam("name", "The contract name to create")
.setAction(async function (taskArguments, hre) {
	console.log(`Task deploy start. The contract name is ` + getContractName(taskArguments.name));

	let account = getAccount(taskArguments.name);
	console.log(`account.address is ` + account.address);
	let deployed;
	const contractFactory = await hre.ethers.getContractFactory(getContractName(taskArguments.name), account);
	
	if (getContractName(taskArguments.name) == 'ConvertTokenToCoin') {
		deployed = await contractFactory.deploy(account.address);
	} else {
		deployed = await contractFactory.deploy();
	}
	
	console.log(`Contract deployed to address: ${deployed.address}`);
});