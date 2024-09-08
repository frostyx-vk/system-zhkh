import React from 'react'
import s from './UserPage.module.css'

function UserPage() {

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className={s.userpage}>
          <div className={s.userpageNav}></div>
          <div className={s.userpageContent}></div>
        </div>
      </div>
    </main>
  )
}

export default UserPage
