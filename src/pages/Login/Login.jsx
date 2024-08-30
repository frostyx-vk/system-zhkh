import React from 'react'

function Login() {
    return (
        <main className='content'>
            <div className='wrapper'>
                <form method="post">
                    <label>Имя</label><br />
                    <input type="text" name="userName" /><br /><br />
                    <label>Возраст</label><br />
                    <input type="number" name="userAge" /><br /><br />
                    <input type="submit" value="Отправить" />
                </form>
            </div>
        </main>
    )
}

export default Login
