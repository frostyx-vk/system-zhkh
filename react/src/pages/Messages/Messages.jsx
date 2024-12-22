import React, { useState } from 'react'
import s from './Messages.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import { io } from 'socket.io-client';

function Messages() {
  const [messageInput, setMessageInput] = useState('');

  const socket = io('http://localhost:8005');

  socket.on('message', function (data) {
    const msgContainer = document.querySelector('#message_container');
    const chat_item = document.createElement('li');
    chat_item.textContent = data;
    msgContainer.appendChild(chat_item);
  });

  function sendMessage() {
    socket.emit('message', messageInput);

    const msgContainer = document.querySelector('#message_container');
    const chat_item = document.createElement('li');
    chat_item.textContent = 'Вы: ' + messageInput;
    chat_item.style.color ='black'
    msgContainer.appendChild(chat_item);
  }

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <ul id='message_container'></ul>
            <input type="text"
                   onChange={e => setMessageInput(e.target.value)}
                   id='msg_input'
                   style={{ color: 'black', background: 'white', border: '2px solid black' }}/>
            <button onClick={sendMessage} type='button' style={{ color: 'black', background: 'white', border: '2px solid black' }}>Отправить</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Messages
