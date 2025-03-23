import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './News.module.css'
import { useNavigate } from 'react-router-dom';

function News() {
  const [news, setNews] = useState([]);

  let navigator = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/web/news/')
      .then(res => setNews(res.data))
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

  console.log(news)

  return (
    <main className='content'>
      <div className='wrapper'>{
        news.map((item, i) => {
          return <div key={i} className={s.newsBlock}>
            <div className={s.titleBlock}>
              <div>
                {item.title}
              </div>
              <div>
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
      </div>
    </main>
  )
}

export default News
