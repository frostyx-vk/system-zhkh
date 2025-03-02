import React, { useState, useEffect } from 'react'
import s from './Payments.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'


function Payments() {
  const [payments, setPayments] = useState([])

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
                <Tab>Оплата</Tab>
                <Tab>История платежей</Tab>
              </TabList>
              <TabPanels>
                <TabPanel className={s.personalTabsContent}>
                  <div className={s.personalTabsContent1}>
                    <p>Здесь будет оплата</p>
                  </div>
                </TabPanel>
                <TabPanel className={s.personalTabsContent}>
                  <div className={s.personalTabsContent1}>
                    <p>История платежей:</p>
                    <TableContainer>
                      <Table variant='simple'>
                        <Thead>
                          <Tr>
                            <Th>Дата платежа</Th>
                            <Th isNumeric>Сумма платежа, ₽</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td>07.01.2025</Td>
                            <Td isNumeric>4205,75</Td>
                          </Tr>
                          <Tr>
                            <Td>10.02.2025</Td>
                            <Td isNumeric>3842,22</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
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

export default Payments
