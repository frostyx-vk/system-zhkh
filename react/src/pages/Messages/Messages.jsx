import React, { useState, useEffect } from 'react'
import s from './Messages.module.css'

import NavPersonal from '../../components/NavPersonal/NavPersonal'

import { Textarea } from '@chakra-ui/react'
import { io } from 'socket.io-client';

function Messages() {
  const socket = io('http://localhost:8005');

  const [socketID, setSocketID] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        sender: socketID,
        message: currentMessage,
      };

      await socket.emit('message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('socket_id', (id) => {
      setSocketID(id);
      console.log(id)
    });

    socket.on('message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off('socket_id');
      socket.off('message');
    };
  }, [socket]);

  // useEffect(() => {
  //   socket.on('message', function (data) {
  //     const msgContainer = document.querySelector('#message_container');
  //     const chatItem = document.createElement('li');
  //     chatItem.innerText = data;
  //     msgContainer.appendChild(chatItem);
  //   });
  // }, [])

  // function sendMessage() {
  //   socket.emit('message', message);
  //   const msgContainer = document.querySelector('#message_container');
  //   const chatItem = document.createElement('li');
  //   chatItem.innerText = 'Вы: ' + message;
  //   chatItem.style.color = 'black'
  //   msgContainer.appendChild(chatItem);
  //   setMessage('');
  // }

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav container'>
            <NavPersonal />
          </div>
          <div className='personalContent' style={{ color: 'black' }}>
            <div className={s.container}>
              <div className={s.msgContainerWrapper}>
                <div className={s.messageContainer}>
                  {messageList.map((msg, i) => {
                    return (
                      <div key={i} className={`${s.message} ${msg.sender === socketID ? s.myMsg : s.otherMsg}`}>
                        {msg.message}
                      </div>
                    );
                  })}
                </div>

                <div className={s.inputContainer}>
                  <Textarea
                    value={currentMessage}
                    id='msg_input'
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder='Введите сообщение'
                    size='md'
                    type='text'
                    style={{ color: 'black' }}
                    required
                  />
                  <button className={s.sendBtn} onClick={() => sendMessage(currentMessage)} type='button'>Отправить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Messages
