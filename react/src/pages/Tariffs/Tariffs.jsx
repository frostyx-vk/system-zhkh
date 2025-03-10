import React from 'react'
import s from './Tariffs.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'

function Tariffs() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <div className={s.title}>
              Тарифы
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Tariffs
