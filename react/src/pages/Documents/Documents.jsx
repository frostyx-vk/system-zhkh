import React, { useState, useEffect } from 'react'
import s from './Documents.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { FaRegFilePdf } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Documents() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/web/documents/',
      { headers: { "Authorization": 'Token ' + localStorage.accessToken } })
      .then(response => {
        setDocuments(response.data);
      })
      .catch((err) => {
        console.log(err)
        toast.error("Ошибка! Информация недоступна, зайдите позже")
      });
  }, [])

  // console.log(documents)

  // useEffect(() => {
  //   const downloadFile = (documents) => {
  //     for (const doc of documents) {
  //       console.log(doc)
  //       const url = URL.createObjectURL(new Blob([doc.file]), {type: "application/pdf"});
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", doc.title);
  //       document.body.appendChild(link);
  //       link.click();
  //       console.log(link)
  //     }
  //   }

  //   downloadFile(documents)
  // }, [documents])

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
                Для информации можете ознакомиться с перечнем документов:
              </p>
              <div>
                {documents.length > 0 ? (
                  <ul>
                    {documents.map((document, i) => (
                      <li key={i}>
                        <a download target="_blank" href={document.file}>
                          <FaRegFilePdf />
                          {document.title}
                        </a>
                      </li>
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
