import { ethers } from "ethers"
import { makeObservable, observable } from 'mobx'
import { contractABI, contractAddress } from '../constants/TransactionContract'
import { RootStore } from '.'
import { get } from "lodash"
import { api } from "../API"
import { publicAddressStoreMaster } from "../constants/common"

class TransactionStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, {
      transactions: observable,
      isLoading: observable,
      nfts: observable
    })
  }

  transactions: any[] = []
  isLoading = false
  nfts: any[] = []

  private createEthereumContract () {
    const { ethereum } = window as any
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer)

    return transactionsContract
  }

  public async getAllTransactions () {
    const { ethereum } = window as any
    try {
      if (ethereum) {
        const transactionsContract = this.createEthereumContract()

        const availableTransactions = await transactionsContract.getAllTransactions()

        const structuredTransactions = availableTransactions.map((transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }))

        this.transactions = structuredTransactions
      } else {
        console.log("Ethereum is not present")
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async sendTransaction ({ addressTo, amount, keyword, message }: any) {
    const { ethereum } = window as any
    try {
      if (ethereum) {
        const transactionsContract = this.createEthereumContract()
        const parsedAmount = ethers.utils.parseEther(amount)

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: this.rootStore.accountStore.currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        })

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword)

        this.isLoading = true
        console.log(`Loading - ${transactionHash.hash}`)
        await transactionHash.wait()
        console.log(`Success - ${transactionHash.hash}`)
        this.isLoading = false

        // const transactionsCount = await transactionsContract.getTransactionCount()

        // setTransactionCount(transactionsCount.toNumber())
      } else {
        console.log("No ethereum object")
      }
    } catch (error) {
      console.log(error)

      throw new Error("No ethereum object")
    }
  }

  public async fetchAllNFTsListed () {
    const data = await api.get(`https://testnets-api.opensea.io/api/v1/assets?owner=${publicAddressStoreMaster}&order_direction=desc&offset=0&limit=20`)
    this.nfts = get(data, 'data.assets', [])
  }
}

export default TransactionStore
