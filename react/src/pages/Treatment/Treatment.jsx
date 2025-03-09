import React, { useState, useEffect } from 'react'
import s from './Treatment.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from "axios";

import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

function Treatment() {

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
                <Tab>Подать обращение</Tab>
                <Tab>Статус обращений</Tab>
              </TabList>
              <TabPanels>
                <TabPanel className={s.personalTabsContent}>
                  <div className={s.personalTabsContent1}>
                    <form>
                      <Input type='text'
                        placeholder='Введите название проблемы'
                        size='md'
                        required
                        minLength="5"
                      // onChange={e => setTitle(e.target.value)}
                      />
                      <Textarea
                        placeholder='Введите описание проблемы'
                        size='md'
                        required
                        minLength="20"
                      // onChange={e => setContent(e.target.value)}
                      />
                      <input type="file" />
                      <Button variant="ghost" type='submit'>Отправить</Button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel className={s.personalTabsContent}>
                  <div>

                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Treatment
