import React from 'react';
import s from './News.module.css'
import {
  newsList
} from '../../api/index'

function News() {

  return (
    <main className='content'>
      <div className='wrapper'>{
        newsList.map((item, i) => {
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
