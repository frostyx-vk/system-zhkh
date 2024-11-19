import axios from 'axios';
import s from '../Login/Login.module.css'
import React, { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import {
    serverBaseUrl,
    RESET_PASSWORD
} from '../../api/urls'

function ForgotPassword() {
    const [email, setUserEmail] = useState('')

    let navigator = useNavigate();

    function resetPasswordAction() {
        let formData = new FormData()
        formData.append('email', email)
        axios.post(`${serverBaseUrl}${RESET_PASSWORD}`, formData)
            .then(response => {
                console.log(response)
            })
    }

    function toLoginPage() {
        navigator('/login')
    }

    return (
        <main className='content'>
            <div className='wrapper'>
                <div className={s.wrapperForm}>
                    <h2>Восстановление пароля</h2>
                    <form className={s.loginForm} method="post" action=''>
                        <Input type='email'
                            placeholder='Введите Email привязанный к аккаунту'
                            size='md'
                            name="email"
                            onChange={e => setUserEmail(e.target.value)} />
                        <Input type='button' onClick={resetPasswordAction} value="Отправить" />
                    </form>
                    <button type="button" onClick={toLoginPage} >Вспомнили пароль? Войдите</button>
                </div>
            </div>
        </main>
    )
}

export default ForgotPassword
