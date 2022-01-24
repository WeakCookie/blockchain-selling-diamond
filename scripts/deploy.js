async function main() {
    const Test = await ethers.getContractFactory("Test");

    const testContract = await Test.deploy("Hello World!");
    console.log("Contract deployed to address:", testContract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });