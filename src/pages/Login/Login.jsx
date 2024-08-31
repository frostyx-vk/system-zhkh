import React, { useState } from 'react'
import s from './Login.module.css'
import { Input } from '@chakra-ui/react'

function Login() {
    const [userAccount, setUserAccount] = useState('');
    const [userPassword, setUserPassword] = useState('');
    
    function handlerForm(event) {
        event.preventDefault();

        console.log('Hi')
    }

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
