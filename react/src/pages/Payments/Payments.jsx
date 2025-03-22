import React, { useState, useEffect } from 'react'
import s from './Payments.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'


function Payments() {
  const [payments, setPayments] = useState([])

  const [finishPrice, setFinishPrice] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8000/web/get-sum-payment/${sessionStorage.accessToken}/`)
      .then(res => setFinishPrice(res.data))
      .catch(err => {
        if (err.response) {
          console.log('Отсутствует ответ')
        } else if (err.request) {
          console.log('Ошибка запроса')
        } else {
          console.log('Другая ошибка')
        }
      });
  }, [])

  function payServices() {
    console.log('Функция перехода на страницу оплаты')
    axios.get(`http://localhost:8000/web/pay/payment-history/${sessionStorage.accessToken}/`,
          { headers: { "Authorization": 'Token ' + sessionStorage.accessToken }})
      .then(res => setPayments(res.data))
        .catch(err => {
          if (err.response) {
            console.log('Отсутствует ответ')
          } else if (err.request) {
            console.log('Ошибка запроса')
          } else {
            console.log('Другая ошибка')
          }
        });
  }
    console.log(payments)

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
                <Tab onClick={payServices}>История платежей</Tab>
              </TabList>
              <TabPanels>
                <TabPanel className={s.personalTabsContent}>
                  <div className={s.personalTabsContent1}>
                    <p>Общая задолженность на {new Date().toISOString().slice(0, 10)} составляет: {parseInt(finishPrice.message)}₽</p>
                    <button className={s.paymentsBtn} onClick={payServices}>
                      <a href={`http://0.0.0.0:8000/web/pay/yk/${parseInt(finishPrice.message)}/?token=${sessionStorage.accessToken}`}>Оплатить</a>
                    </button>

                  </div>
                </TabPanel>
                <TabPanel className={s.personalTabsContent}>
                  <div className={s.personalTabsContent2}>
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
