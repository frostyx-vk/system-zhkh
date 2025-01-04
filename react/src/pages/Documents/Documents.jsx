import React from 'react'
import s from './Documents.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'

function Documents() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <div className={s.title}>
              Документы от управляющей компании
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Documents
