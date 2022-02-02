import AccountStore from './accountStore'
import TestStore from './testStore'
import TransactionStore from './transactionStore'

export class RootStore {
  testStore: TestStore
  transactionStore: TransactionStore
  accountStore: AccountStore

  constructor() {
    this.testStore = new TestStore(this)
    this.transactionStore = new TransactionStore(this)
    this.accountStore = new AccountStore(this)
  }
}

export const rootStore = new RootStore()
