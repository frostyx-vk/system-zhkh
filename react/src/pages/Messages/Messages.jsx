import React from 'react'
import s from './Messages.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'

function Messages() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'></div>
        </div>
      </div>
    </main>
  )
}

export default Messages
