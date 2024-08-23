import s from './Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {

  return (
    <div className={s.footer}>
      <div className={s.footerContent}>
        <div className={s.footerContentLeft}>
          <p>© 2025 Портал ЖКХ |</p>
          <Link to='!#'>
            Все права защищены
          </Link>
        </div>
        <div className={s.footerContentRight}>
          <p>Разработка сайта</p>
          <b>Viktor K</b>
        </div>
      </div>
    </div>
  )
}
