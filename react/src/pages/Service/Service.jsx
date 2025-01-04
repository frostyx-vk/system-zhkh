import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './Service.module.css'
import { useNavigate } from 'react-router-dom';

import {
    Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,
} from '@chakra-ui/react'

function Service() {
      const [service, setService] = useState([]);

        let navigator = useNavigate();
    
      useEffect(() => {
        axios.get('http://localhost:8000/web/services/')
          .then(res => setService(res.data))
          .catch(err => {
            if (err.response) {
              console.log('Отсутствует ответ')
              navigator('/404')
            } else if (err.request) {
              console.log('Ошибка запроса')
            } else {
              console.log('Другая ошибка')
            }
          });
      }, [])

    return (
        <main className='content'>
            <div className='wrapper'>
                <h1 className={s.title}>Предоставляемые услуги</h1>
                <TableContainer>
                    <Table variant='simple' size='md'>
                        <TableCaption>Указаны ориентировочные цены на услуги.</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Название</Th>
                                <Th>Описание услуги</Th>
                                <Th isNumeric>Цена, ₽ с НДС</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                service.map((item, i) => {
                                    return <Tr key={i}>
                                        <Td>{item.title}</Td>
                                        <Td>{item.description}</Td>
                                        <Td isNumeric>{item.price}</Td>
                                    </Tr>
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </main>
    )
}

export default Service
