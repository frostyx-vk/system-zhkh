import React from 'react'
import s from './Payments.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'

function Payments() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <div className={s.title}>
              Платежи за выбранный период
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Payments
