import React, { useState, useEffect } from 'react'
import s from './Invoice.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Select } from '@chakra-ui/react'
import { FaRegFilePdf } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';

function Invoice() {
  const [options, setOptions] = useState('');
  const [invoice, setInvoice] = useState([]);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/web/documents/',
  //     { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
  //     .then(response => {
  //       setOptions(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       toast.error("Ошибка! Информация недоступна, зайдите позже")
  //     });
  // }, [])

  function getInvoce(e) {
    e.preventDefault();
    // axios.patch('http://localhost:8000/auth/users/me/', { 'email': email, 'phone': phone, 'is_active': true },
    //   { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
    //   .then(response => {
    //     setInvoice(response.data);
    //     toast.success('Информация успешно получена!');
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     toast.error("Ошибка! Попробуйте получить информацию позже.")
    //   });

    console.log('Вызов функции')
  };

  console.log(options)

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
              <form onSubmit={getInvoce} className={s.getBlock}>
                <Select
                  placeholder='Нажмите для выбора'
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                >
                  <option value='option1'>Декабрь 2024</option>
                  <option value='option2'>Январь 2025</option>
                  <option value='option3'>Февраль 2025</option>
                </Select>
                <button type='submit'>Получить</button>
              </form>
              <div className={s.invoiceDoc}>
              {invoice.length > 0 ? (
                <ul>
                  {invoice.map((invoice, i) => (
                    <li key={i}>
                      {/* <a target="_blank" href={invoice.file}>
                        <FaRegFilePdf />
                        {invoice.title}
                      </a> */}
                    </li>
                  ))}
                </ul>
              ) : <p>Нажмите "Получить" для получения документа</p>}
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Invoice
