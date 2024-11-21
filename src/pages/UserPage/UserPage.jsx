import React from 'react'
import s from './UserPage.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'

function UserPage() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className={s.userpage}>
          <div className={s.userpageNav}>
            <NavPersonal />
          </div>
          <div className={s.userpageContent}></div>
        </div>
      </div>
    </main>
  )
}

export default UserPage
