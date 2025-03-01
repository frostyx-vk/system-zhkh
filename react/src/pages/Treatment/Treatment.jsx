import React from 'react'
import s from './Treatment.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'

function Treatment() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <div className={s.title}>
              Обращения
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Treatment
