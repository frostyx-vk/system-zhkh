// import React, { useState, useEffect } from 'react'
import s from './Header.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
// import { ReactComponent as PhoneIcon } from '../../svg/phone.svg'
// import { ReactComponent as TelegramIcon } from '../../svg/telegram.svg'
// import logo from '../../illustration/logo.png'
import Nav from '../Nav/Nav'
import {
    serverBaseUrl,
    LOGOUT
} from '../../api/urls'
import axios from "axios";

export default function Header() {

    let navigator = useNavigate();

    function clearAuth() {
        const data = { name: 'Axios POST with Bearer Token' };
        const headers = { 'Authorization': 'Token ' + sessionStorage.accessToken };
        axios.post(`${serverBaseUrl}${LOGOUT}`, data, { headers })
            .then(response => {
                if (response.status in [200, 201, 204]) return
                sessionStorage.removeItem('accessToken');
                navigator('/login');
            })
    }

    return (
        <div className={s.header}>
            <div className={s.headerWrapper}>
                <Link className={s.headerName} to='/'>
                    Портал ЖКХ
                </Link>
                <div className={s.headerNav}>
                    <Nav />
                    {
                        sessionStorage.accessToken ?
                            <div>
                                <button>
                                    <Link to='/userpage'>
                                        Пользователь
                                    </Link>
                                </button>
                                <button onClick={() => clearAuth()}>
                                    <Link>
                                        Выйти
                                    </Link>
                                </button>
                            </div> :
                            <button>
                                <Link to='/login'>
                                    Личный кабинет
                                </Link>
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}
