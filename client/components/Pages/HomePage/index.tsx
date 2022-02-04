import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap'
import { useStores } from '../../../hooks/useStores'
import Icon from '../../Icon'
import styles from './homePage.module.scss'

const tabs = [
  { name: 'On sale', component: <h4>On sale</h4> },
  { name: 'My bid', component: <h4>My bid</h4> },
  { name: 'Owned', component: <h4>Owned</h4> }
]

const numberOfPages = 5

const HomePage: NextPage = () => {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Icon iconName="logo.svg" width={178} height={56} />
        </div>
        <div>
          <Nav tabs>
            {tabs.map((tab, index) => (
              <NavItem key={index}>
                <NavLink
                  className={index === activeTab ? 'active' : ''}
                  onClick={() => {
                    setActiveTab(index)
                  }}
                >
                  {tab.name}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContent activeTab={activeTab}>
            {tabs.map((tab, index) => (
              <TabPane tabId={index} key={index}>
                <Row>
                  <Col sm="12">{tab.component}</Col>
                </Row>
              </TabPane>
            ))}
          </TabContent>
        </div>
      </div>
      <div className={styles.title}>Diamond auction</div>
      <div className={styles.pagination}>
        <Pagination>
          <PaginationItem>
            <PaginationLink href="#" previous />
          </PaginationItem>
          {[...Array(numberOfPages)].map((_, i) => (
            <PaginationItem>
              <PaginationLink href="#">{i + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink href="#" next />
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  )
}

export default observer(HomePage)
