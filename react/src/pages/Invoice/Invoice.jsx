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
              <div>
                <Select placeholder='Select option'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
                <button>
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Invoice
