import axios from 'axios';
import s from '../Login/Login.module.css'
import React, { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    serverBaseUrl,
    RESET_PASSWORD
} from '../../api/urls'

function ForgotPassword() {
    const [email, setUserEmail] = useState('')

    let navigator = useNavigate();

    function resetPasswordAction(e) {
        e.preventDefault();
        let formData = new FormData()
        formData.append('email', email)
        axios.post(`${serverBaseUrl}${RESET_PASSWORD}`, formData)
            .then(response => {
                console.log(response)
            })
        toast.success("Запрос на восстановление пароля успешно отправлен!");
        setUserEmail('')
    }

    return (
        <main className='content'>
            <div className='wrapper'>
                <div className={s.wrapperForm}>
                    <h2>Восстановление пароля</h2>
                    <form onSubmit={resetPasswordAction} className={s.loginForm} method="post" action=''>
                        <Input type='email'
                            placeholder='Введите Email привязанный к аккаунту'
                            required
                            size='md'
                            name="email"
                            value={email}
                            onChange={e => setUserEmail(e.target.value)} />
                        <Input type='submit' value="Отправить" />
                    </form>
                    <button type="button" onClick={() => (navigator('/login'))} >Вспомнили пароль? Войдите</button>
                </div>
                <ToastContainer position="top-right" />
            </div>
        </main>
    )
}

export default ForgotPassword
