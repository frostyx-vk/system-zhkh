import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './News.module.css'
// import {
//   newsList
// } from '../../api/index'

function News() {

  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/web/news/')
      .then(res => setNews(res.data))
      .catch(err => {
        if (err.response) {
          console.log('отсутствует ответ')
        } else if (err.request) {
          console.log('ошибка запроса')
        } else {
          console.log('другая ошибка')
        }
      });
  }, [])

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
                {
                  item.date_created.slice(0, -8).replace(/T/, ' ')
                }
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
