import React from 'react'
import { useNavigate } from 'react-router-dom';

function UserPage() {

  let navigator = useNavigate();
  
  function clearAuth() {
    localStorage.clear();
    navigator('/login');
  }

  return (
    <main className='content'>
      <div className='wrapper'>
        Страница авторизованного пользователя
        <button onClick={() => clearAuth()} style={{marginLeft:'50px'}}>Exit</button>
      </div>
    </main>
  )
}

export default UserPage
