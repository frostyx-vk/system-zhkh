import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './News.module.css'
import { Spinner } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/web/news/')
      .then(res => {
        setLoading(false);
        setNews(res.data);
      })
      .catch(err => {
        setLoading(true);
        console.log(err);
        toast.error("Ошибка! Информация недоступна, зайдите позже");
      });
  }, [])

  return (
    <main className='content'>
      <div className='wrapper'>
        {
          loading ?
            <div className={s.spinner}>
              <Spinner size='lg' color='green.500' />
            </div>
            :
            <>
              {
                news.map((item, i) => {
                  return <div key={i} className={s.newsBlock}>
                    <div className={s.titleBlock}>
                      <div>
                        {item.title}
                      </div>
                      <div className={s.dateBlock}>
                        <span className={s.dateNews}>
                          {item.date_created.slice(0, 10).split('-').reverse().join('-').replace(/-/g, '.')}
                        </span>
                        <span>
                          {item.date_created.slice(11, 19)}
                        </span>
                      </div>
                    </div>
                    <div className={s.newsDescriptions}>
                      {item.description}
                    </div>
                  </div>
                })
              }
            </>
        }
        <ToastContainer position="top-right" />
      </div>
    </main>
  )
}

export default News
