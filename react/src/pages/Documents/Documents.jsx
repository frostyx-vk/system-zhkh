import React, { useState, useEffect } from 'react'
import s from './Documents.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Documents() {
  const [documents, setDocuments] = useState([])

  // Разкомментируй как будет API, подставь адрес

  // useEffect(() => {
  //   axios.get('http://localhost:8000/auth/users/me/',
  //     { headers: { "Authorization": 'Token ' + localStorage.accessToken } })
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
              Документы от управляющей компании
            </div>
            <div className={s.documents}>
              <p>
                Для информации можете скачать и ознакомиться с перечнем документов:
              </p>
              <div>
                {documents.length > 0 ? (
                  <ul>
                    {documents.map(document => (
                      <li key={document.id}>{document.name}</li>
                    ))}
                  </ul>
                ) : <p>Документы отсутствуют</p>}
              </div>
            </div>
            <ToastContainer position="top-right" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Documents
