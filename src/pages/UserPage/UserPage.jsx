import React from 'react'
import s from './UserPage.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function UserPage() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <Tabs variant='soft-rounded' colorScheme='green'>
              <TabList className={s.personalTabs}>
                <Tab>Личная информация</Tab>
                <Tab>Смена пароля</Tab>
              </TabList>
              <TabPanels>
                <TabPanel className={s.personalTabsContent}>
                  <p>one!</p>
                </TabPanel>
                <TabPanel className={s.personalTabsContent}>
                  <p>two!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserPage
