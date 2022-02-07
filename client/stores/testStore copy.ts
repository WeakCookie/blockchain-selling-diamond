/* eslint-disable camelcase */
import { makeObservable, observable } from 'mobx'
import { RootStore } from '.'

class NFTStore {
  rootStore: RootStore
  ntfs: any
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeObservable(this, {
      ntfs: observable
    })
  }

  nfts: any[] = []

}

export default NFTStore
