import React, { useState, useEffect, useRef } from 'react'
import s from './Invoice.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Select } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { FaRegFilePdf } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';

function Invoice() {
  const [options, setOptions] = useState([]);
  const [invoice, setInvoice] = useState('');
  const [invoiceName, setInvoiceName] = useState('');
  const [selectedOption, setSelectedOption] = useState();
  const [loading, setLoading] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/web/receipts/',
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(response => {
        setLoading(false);
        setOptions(response.data);
      })
      .catch((err) => {
        setLoading(true);
        console.log(err);
        toast.error("Ошибка! Информация недоступна, зайдите позже");
      });
  }, [])

  function getInvoce(e) {
    e.preventDefault();
    if (ref.current !== null) {
      setInvoice(selectedOption);
      setInvoiceName(ref.current.getAttribute('data-name'));
    }
  };

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
            {
              loading ?
                <div className={s.spinner}>
                  <Spinner size='lg' color='green.500' />
                </div>
                :
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
                          data-name={opt.date_created.slice(0, 10).split("-").reverse().join("-").replace(/-/g, '.')}>
                          {opt.date_created.slice(0, 10).split("-").reverse().join("-").replace(/-/g, '.')}
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
            }
            <ToastContainer position="top-right" />
          </div>
        </div>
      </div>
    </main >
  )
}

export default Invoice
