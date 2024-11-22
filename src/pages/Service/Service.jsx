import React from 'react'
import s from './Service.module.css'
import {
    serviceList
} from '../../api/index'
import {
    Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer,
} from '@chakra-ui/react'

function Service() {
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
                                serviceList.map((item, i) => {
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
