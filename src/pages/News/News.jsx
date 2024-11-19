import React from 'react';
import {
    newsList
} from '../../api/index'

function  News() {
  return (
    <main className='content'>
      <div className='wrapper'>{
        newsList.map((item, i) => {
            return <div>
                <div>{item.title}</div>
                <div>{item.description}</div>
                <div>{item.image}
                    <img src={item.image} alt="Новость"/>
                </div>
                <div>{item.date_created}</div>
            </div>
        })
      }
      </div>
    </main>
  )
}

export default News
