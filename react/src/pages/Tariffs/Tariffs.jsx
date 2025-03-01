import React, { useState, useEffect } from 'react'
import s from './Tariffs.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

function Tariffs() {
  const [tarifData, setTarifData] = useState([])

  // useEffect(() => {
  //   axios.get('http://localhost:8000/web/documents/',
  //     { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
  //     .then(response => {
  //       setTarifData(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       toast.error("Ошибка! Информация недоступна, зайдите позже")
  //     });
  // }, [])

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <div className={s.title}>
              Тарифы
            </div>
            <div className={s.tariffs}>
              <p>
                Для информации можете ознакомиться с перечнем тарифов:
              </p>
              <div>
                {tarifData ? (
                  <TableContainer>
                    <Table variant='simple'>
                      <Thead>
                        <Tr>
                          <Th>Наименование</Th>
                          <Th>Единица измерения</Th>
                          <Th isNumeric>Цена</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Холодная вода</Td>
                          <Td>м3</Td>
                          <Td isNumeric>3,43</Td>
                        </Tr>
                        <Tr>
                          <Td>Горячая вода</Td>
                          <Td>м3</Td>
                          <Td isNumeric>4, 25</Td>
                        </Tr>
                        <Tr>
                          <Td>Электричество</Td>
                          <Td>кВт·ч</Td>
                          <Td isNumeric>50</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                )
                  :
                  <p>Данные будут доступны позже.</p>}
              </div>
            </div>
            <ToastContainer position="top-right" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Tariffs
