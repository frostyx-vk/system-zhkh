import React from 'react'
import s from './Login.module.css'
import { Input } from '@chakra-ui/react'

function Login() {
    return (
        <main className='content'>
            <div className='wrapper'>
                <div className={s.wrapperForm}>
                    <form className={s.loginForm} method="post" action="">
                        <Input type='text' placeholder='Введите номер Лицевого счета' size='md' name="userAccount" />
                        <Input type='password' placeholder='Введите пароль' size='md' name="userPassword" />
                        <Input type="submit" value="Отправить" />
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Login
