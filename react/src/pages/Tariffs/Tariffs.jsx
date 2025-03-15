import React, { useState, useEffect } from 'react'
import s from './Tariffs.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

function Tariffs() {
  const [tarifData, setTarifData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/web/tariffs/',
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(response => {
        setTarifData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        toast.error("Ошибка! Информация недоступна, зайдите позже");
      });
  }, [])

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
              {
                loading ?
                  <div className={s.spinner}>
                    <Spinner size='lg' color='green.500' />
                  </div>
                  :
                  <div>
                    {tarifData.length > 0 ? (
                      <TableContainer>
                        <Table variant='simple'>
                          <Thead>
                            <Tr>
                              <Th>Наименование</Th>
                              <Th>Единица измерения</Th>
                              <Th isNumeric>Цена за единицу, ₽</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {
                              tarifData.map((tarif) => {
                                return <Tr key={tarif.id}>
                                  <Td>{tarif.name}</Td>
                                  <Td>{tarif.unit}</Td>
                                  <Td isNumeric>{tarif.ratio}</Td>
                                </Tr>
                              })
                            }
                          </Tbody>
                        </Table>
                      </TableContainer>
                    )
                      :
                      <p>Данные будут доступны позже.</p>}
                  </div>
              }
            </div>
            <ToastContainer position="top-right" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Tariffs
