import React, { useState, useEffect, useRef } from 'react'
import s from './Invoice.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Select } from '@chakra-ui/react'
import { FaRegFilePdf } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';

function Invoice() {
  const [options, setOptions] = useState([]);
  const [invoice, setInvoice] = useState('');
  const [invoiceName, setInvoiceName] = useState('');
  const [selectedOption, setSelectedOption] = useState();

  const ref = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8000/web/receipts/',
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(response => {
        setOptions(response.data);
      })
      .catch((err) => {
        console.log(err)
        toast.error("Ошибка! Информация недоступна, зайдите позже")
      });
  }, [])

  function getInvoce(e) {
    e.preventDefault();
    setInvoice(selectedOption);
    setInvoiceName(ref.current.getAttribute('data-name'));
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
                  onChange={(event) => setSelectedOption(event.target.value)}
                >
                  {options.map((opt) => (
                    <option key={opt.id}
                      ref={ref}
                      value={opt.file}
                      data-name={opt.date_created.slice(0, 7)}>
                      {opt.date_created.slice(0, 7)}
                    </option>
                  ))}
                </Select>
                <button type='submit'>Получить</button>
              </form>
              <div className={s.invoiceDoc}>
                {invoice.length > 0 ? (
                  <div className={s.invoiceFile}>
                    <a target="_blank" href={invoice}>
                      <FaRegFilePdf />
                      Платёжный документ за {invoiceName}
                    </a>
                  </div>
                ) : <p>Нажмите "Получить" для получения документа</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}

export default Invoice
