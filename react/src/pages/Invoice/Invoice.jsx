import React from 'react'
import s from './Invoice.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'

function Invoice() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <div className={s.title}>
              Платежный документ
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Invoice
