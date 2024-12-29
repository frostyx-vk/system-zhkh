import React, { useEffect, useState } from 'react'
import s from './Login.module.css'
import { Input } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [username, setUserAccount] = useState('');
    const [password, setUserPassword] = useState('');

    let navigator = useNavigate();

    function handlerForm(event) {
        event.preventDefault();

        let userData = {
            username,
            password
        };

        axios.post('http://localhost:8000/auth/token/login/', userData)
            .then(response => {
                localStorage.setItem('accessToken', response.data.auth_token);
                if (localStorage.accessToken) {
                    navigator('/userpage')
                };
            })
            .catch((err) => {
                console.log(err)
                toast.error("Ошибка! Попробуйте зайти позже.")
                // здесь нужно обработать каждую ошибку
            });
    }

    return (
        <main className='content'>
            <div className='wrapper'>
                <div className={s.wrapperForm}>
                    <h2>Войдите в личный кабинет</h2>
                    <form onSubmit={handlerForm} className={s.loginForm} method="post" action="">
                        <Input type='text'
                            placeholder='Введите номер Лицевого счета'
                            required
                            size='md'
                            name="username"
                            onChange={e => setUserAccount(e.target.value)} />
                        <Input type='password'
                            placeholder='Введите пароль'
                            required
                            size='md'
                            name="password"
                            onChange={e => setUserPassword(e.target.value)} />
                        <Input type="submit" value="Войти" />
                    </form>
                    <button id="reset-password" type="button" onClick={() => (navigator('/forgotpass'))} >Забыли пароль?</button>
                </div>
                <ToastContainer position="top-right" />
            </div>
        </main>
    )
}

export default Login
