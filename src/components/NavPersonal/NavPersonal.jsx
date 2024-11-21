import React from 'react'
import s from './NavPersonal.module.css'
import { Link } from 'react-router-dom'

export default function NavPersonal() {
    return (
        <div >
            <ul className={s.navPers}>
                <Link to='/userpage'>
                    Профиль
                </Link>
                <Link to='/messages'>
                    Сообщения
                </Link>
                <Link to='/counters'>
                    Показания счетчиков
                </Link>
                <Link to='/salesinvoice'>
                    Счет-фактура
                </Link>
                <Link to='/payments'>
                    Платежи
                </Link>
            </ul>
        </div>
    )
}
