/* eslint-disable consistent-return */
import { makeObservable, observable } from 'mobx'
import { RootStore } from '.'

class AccountStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, { currentAccount: observable })
  }

  currentAccount: string = ''

  public async checkIfWalletIsConnect () {
    const { ethereum } = window as any
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        this.currentAccount = accounts[0]

        this.rootStore.transactionStore.getAllTransactions()
      } else {
        console.log("No accounts found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async connectWallet() {
    const { ethereum } = window as any
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", })

      this.currentAccount = accounts[0]
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object")
    }
  }
}

export default AccountStore
