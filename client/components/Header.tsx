import { useStores } from 'hooks/useStores'
import { observer } from 'mobx-react'

const Header = () => {
  const { testStore } = useStores()
  console.log(testStore?.status)
  return <div>This is header</div>
}

export default observer(Header)
