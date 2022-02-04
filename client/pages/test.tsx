import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import HomePage from '../components/Pages/HomePage'

const TestHome: NextPage = () => {
  return <HomePage />
}

export default observer(TestHome)
