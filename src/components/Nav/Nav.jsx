import React from 'react'
import s from'./Nav.module.css'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div className={s.nav}>
            <ul >
                <Link to='/service'>
                    Услуги
                </Link>
                <Link to='/news'>
                    Новости
                </Link>
                <Link to='/about'>
                    О портале
                </Link>
            </ul>
        </div>
    )
}
