const { ethers } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

// Helper method for fetching environment variables from .env
function getEnvVariable(key, defaultValue) {
	if (process.env[key]) {
		return process.env[key];
	}
	if (!defaultValue) {
		throw `${key} is not defined and no default value was provided`;
	}
	return defaultValue;
}

// Helper method for fetching a connection provider to the Ethereum network
function getProvider(contractName) {
	const network = getContractInfo(contractName).network;
	let provider;

    if (network == "JsonRpc") {
		provider = new ethers.providers.JsonRpcProvider({
			url: getEnvVariable("ETH_JSON_RPC_URL")
		});
	} else if (network == "rinkeby") {
		provider = ethers.getDefaultProvider("rinkeby", {
			alchemy: getEnvVariable("ALCHEMY_KEY"),
		});
	} else if (network == "ropsten") {
		provider = ethers.getDefaultProvider("ropsten", {
			alchemy: getEnvVariable("ROPSTEN_ALCHEMY_KEY"),
		});
	}

	return provider;
}

// Helper method for fetching a wallet account using an environment variable for the PK
function getAccount(contractName, type) {
	let account = new ethers.Wallet(getEnvVariable("ACCOUNT_PRIVATE_KEY"), getProvider(contractName));
	if (getContractName(contractName) == "ConvertTokenToCoin") {
		if (!!type && type == "coin") account = new ethers.Wallet(getEnvVariable("CONVERT_COIN_HOLD_ACCOUNT_PK"), getProvider(contractName));
		else account = new ethers.Wallet(getEnvVariable("CONVERT_TOKEN_OWNER_ACCOUNT_PK"), getProvider(contractName));
	}

	return account;
}

// Helper method for fetching a contract instance at a given address
function getContract(hre, contractName) {
	const contractInfo = getContractInfo(contractName);

	return getContractAt(hre, contractInfo.name, contractInfo.address, getAccount());
}

function getContractInfo(contractName) {
	const cName = getContractName(contractName);
	const contractInfo = {name: cName};

	if (cName == "ConvertTokenToCoin") {
		contractInfo.address = getEnvVariable("CONVERT_CONTRACT_ADDRESS");
		contractInfo.network = "JsonRpc";
	} else if (cName == "NFTHupayx") {
		contractInfo.address = getEnvVariable("CONTRACT_ADDRESS_NFT");
		contractInfo.network = "JsonRpc";
	} else if (cName == "HupayxToken") {
		contractInfo.address = getEnvVariable("CONTRACT_ADDRESS_TOKEN");
		contractInfo.network = "JsonRpc";
	}

	return contractInfo;
}

// Helper method for fetching a current contract name
function getContractName(contractName) {
	return contractName || getEnvVariable("CURR_CONTRACT_NAME");
}

function csvToJSON(csv_string){
    const rows = csv_string.split("\r\n");
    const jsonArray = [];
    const header = rows[0].split(",");
    
    for(let i = 1; i < rows.length; i++) {
        let obj = {};
        let row = rows[i].split(",");

        for(let j=0; j < header.length; j++){
            obj[header[j]] = row[j];
        }

        jsonArray.push(obj);
    }

    return jsonArray;
    // 문자열 형태의 JSON으로 반환할 경우, 아래 코드 사용
    // return JSON.stringify(jsonArray);
}

module.exports = {
	getAccount,
	getContract,
	getContractInfo,
	getContractName,
	getEnvVariable,
	csvToJSON
}