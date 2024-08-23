import React from 'react'
import flatLogo from '../../illustration/flat.png'
import s from './HomePage.module.css'

function HomePage() {
  return (
    <main className='content wrapper'>
      <div className={s.homeFirstBlock}>
        <img src={flatLogo} alt="image" width={200} />
        <div className={s.titleBlock}>
          <div className={s.title}>
            Удобно<br /> и комфортно
          </div>
          <p>Коммуникация между жителями и<br /> управляющими компаниями еще<br /> не была настолько удобной!</p>
        </div>
      </div>
      <div className={s.homeSecondBlock}>

      </div>
    </main>
  )
}

export default HomePage
