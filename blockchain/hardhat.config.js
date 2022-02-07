import("@nomiclabs/hardhat-ethers");
import("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const { API_URL, PRIVATE_KEY } = process.env;

// task section

const ethers = require('ethers')

function env(key) {
  const value = process.env[key];
  if (value === undefined) {
    throw `${key} is undefined`;
  }
  return value;
}

function getProvider() {
  return ethers.getDefaultProvider("rinkeby", {
    alchemy: process.env.ALCHEMY_API_KEY,
  });
}

function getWallet() {
  return new ethers.Wallet(env("PRIVATE_KEY"), getProvider());
}

function getContract(
  name,
  hre
) {
  const WALLET = new ethers.Wallet(env("PRIVATE_KEY"), getProvider());
  return getContractAt(hre, name, env("NFT_CONTRACT_ADDRESS"), WALLET);
}

task("deploy-contract", "Deploy NFT contract").setAction(async (_, hre) => {
  return hre.ethers
    .getContractFactory("MyNFT", getWallet())
    .then((contractFactory) => contractFactory.deploy())
    .then((result) => {
      process.stdout.write(`Contract address: ${result.address}`);
    })
    .catch((error) => { throw error })
});

task("mint-nft", "Mint an NFT")
  .addParam("tokenUri", "Your ERC721 Token URI", undefined, types.string)
  .setAction(async (tokenUri, hre) => {
    return getContract("MyNFT", hre)
      .then((contract) => {
        return contract.mintNFT(env("PUBLIC_KEY"), tokenUri, {
          gasLimit: 500_000,
        });
      })
      .then((tr) => {
        process.stdout.write(`TX hash: ${tr.hash}`);
      })
      .catch((error) => { throw error })
  });

//

module.exports = {
  solidity: "0.8.6",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
