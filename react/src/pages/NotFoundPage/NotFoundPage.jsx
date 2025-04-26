import React from 'react'
import s from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <main className='content'>
      <div className='wrapper'>
        <div className={s.notfound}>
          <h1>Данная страница не существует</h1>
          <a href="/">Перейти на главную страницу</a>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
