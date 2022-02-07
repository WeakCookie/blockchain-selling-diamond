async function main() {
    const Transactions = await ethers.getContractFactory("Transactions");
    const MyNFT = await ethers.getContractFactory("MyNFT")

    const transactionsContract = await Transactions.deploy();
    console.log("Transactions Contract deployed to address:", transactionsContract.address);

    const myNFT = await MyNFT.deploy();
    console.log("MyNFT Contract deployed to address:", myNFT.address);
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
