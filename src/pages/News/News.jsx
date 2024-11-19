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
                {item.title}
                {item.description}
                {item.image}
                {item.date_created}
            </div>
        })
      }
      </div>
    </main>
  )
}

export default News
