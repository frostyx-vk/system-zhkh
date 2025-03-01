import React, { useState, useEffect } from 'react'
import s from './Invoice.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Select } from '@chakra-ui/react'

function Invoice() {
  const [invoice, setInvoice] = useState([])

  // useEffect(() => {
  //   axios.get('http://localhost:8000/web/documents/',
  //     { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
  //     .then(response => {
  //       setDocuments(response.data);
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
              Платежные документы
            </div>
            <div className={s.invoice}>
              <p>
                Выберете месяц, за который хотите получить платежный документ:
              </p>
              <form className={s.getBlock}>
                <Select placeholder='Нажмите для выбора'>
                  <option value='option1'>Декабрь 2024</option>
                  <option value='option2'>Январь 2025</option>
                  <option value='option3'>Февраль 2025</option>
                </Select>
                <button type='submit'>Получить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Invoice
