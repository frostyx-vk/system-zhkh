import React, { useEffect, useState } from 'react'
import s from './Login.module.css'
import { Input } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState('');
    const [userAccount, setUserAccount] = useState('');
    const [userPassword, setUserPassword] = useState('');

    let navigator = useNavigate();

    function handlerForm(event) {
        event.preventDefault();

        let userData = {
            userAccount,
            userPassword
        };

        axios.post('/api/login', userData)
            .then(res => {
                console.log(res.data.message)
                if (res.data.message === 'Запрос прошел успешно! ') {
                    setUser('Access');
                }
            })
    };

    useEffect(() => {
        if (user.length !== 0) {
            localStorage.setItem(userAccount, userPassword);
            navigator('/userpage')
        }
    }, [user])

    return (
        <main className='content'>
            <div className='wrapper'>
                <div className={s.wrapperForm}>
                    <h2>Войдите в личный кабинет</h2>
                    <form onSubmit={handlerForm} className={s.loginForm} method="post" action="">
                        <Input type='text'
                            placeholder='Введите номер Лицевого счета'
                            size='md'
                            name="userAccount"
                            onChange={e => setUserAccount(e.target.value)} />
                        <Input type='password'
                            placeholder='Введите пароль'
                            size='md'
                            name="userPassword"
                            onChange={e => setUserPassword(e.target.value)} />
                        <Input type="submit" value="Войти" />
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Login
