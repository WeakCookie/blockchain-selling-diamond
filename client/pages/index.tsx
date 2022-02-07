import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Button } from 'reactstrap'
import { useStores } from '../hooks/useStores'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { accountStore, transactionStore } = useStores()
  const { currentAccount } = accountStore
  const { nfts } = transactionStore
  console.log("🚀 ~ file: index.tsx ~ line 13 ~ nfts", nfts)
  const testSendPayload = {
    addressTo: '0x0dB36e49c8982Cb76DFC2dA7F253011472147D12',
    amount: '0.0001',
    keyword: 'test',
    message: 'test'
  }

  useEffect(() => {
    transactionStore.getAllTransactions()
    // TODO: get current logged in account using window.ethereum.selectedAccount
    transactionStore.fetchAllNFTsListed()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {!currentAccount
            ? (<Button onClick={() => accountStore.connectWallet()}>Connect wallet</Button>)
            : (<Button onClick={() => transactionStore.sendTransaction(testSendPayload)}>Send test small amount to another address</Button>)}
        </div>
      </main>

    </div>
  )
}

export default observer(Home)
