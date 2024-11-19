import React, { useEffect, useState } from 'react'
import s from './Login.module.css'
import { Input } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    serverBaseUrl,
    USER_LOGIN,
    RESET_PASSWORD
} from '../../api/urls'

function Login() {
    // const [user, setUser] = useState('');
    const [username, setUserAccount] = useState('');
    const [password, setUserPassword] = useState('');
    const [email, setUserEmail] = useState('')

    let navigator = useNavigate();

    function handlerForm(event) {
        event.preventDefault();

        let userData = {
            username,
            password
        };

        axios.post(`${serverBaseUrl}${USER_LOGIN}`, userData)
            .then(response => {
                if (response.status !== 200) return
                localStorage.setItem('accessToken', response.data.auth_token);
                if (localStorage.accessToken) {
                    navigator('/userpage')
                }
            })
    }

    function resetPasswordAction() {
        let formData = new FormData()
        formData.append('email', email)
        axios.post(`${serverBaseUrl}${RESET_PASSWORD}`, formData)
            .then(response => {
                console.log(response)
            })
    }

    function toForgotPassword () {
        navigator('/forgotpass')
    }

    // useEffect(() => {
    //     if (user.length !== 0) {
    //         // localStorage.setItem(username, password);
    //         navigator('/userpage')
    //         console.log(localStorage)
    //     }
    // }, [user])

    return (
        <main className='content'>
            <div className='wrapper'>
                <div className={s.wrapperForm}>
                    <h2>Войдите в личный кабинет</h2>
                    <form onSubmit={handlerForm} className={s.loginForm} method="post" action="">
                        <Input type='text'
                            placeholder='Введите номер Лицевого счета'
                            size='md'
                            name="username"
                            onChange={e => setUserAccount(e.target.value)} />
                        <Input type='password'
                            placeholder='Введите пароль'
                            size='md'
                            name="password"
                            onChange={e => setUserPassword(e.target.value)} />
                        <Input type="submit" value="Войти" />
                    </form>
                    <button id="reset-password" type="button" onClick={toForgotPassword} >Забыли пароль?</button>
                </div>
            </div>

            {/* <form className={s.loginForm} method="post" action=''>
                <Input type='email'
                       placeholder='Введите Email привязанный к аккаунту'
                       size='md'
                       name="email"
                       onChange={e => setUserEmail(e.target.value)}/>
                <Input type='button' onClick={resetPasswordAction} value="Отправить" />
            </form> */}
        </main>
)
}

export default Login
