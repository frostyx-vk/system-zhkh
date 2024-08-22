// import React, { useState, useEffect } from 'react'
import s from './Header.module.css'
import { Link } from 'react-router-dom'
// import { ReactComponent as PhoneIcon } from '../../svg/phone.svg'
// import { ReactComponent as TelegramIcon } from '../../svg/telegram.svg'
// import logo from '../../illustration/logo.png'
import Nav from '../Nav/Nav'
// import Modal from '../Modal/Modal'

export default function Header() {
    return (
        <div className={s.header}>
            <div className={s.headerWrapper}>
                <div className={s.headerName}>
                    Портал ЖКХ
                </div>
                <Nav />
            </div>
        </div>
    )
}
