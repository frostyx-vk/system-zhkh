import React, { useState, useEffect } from 'react'
import s from './Messages.module.css'
import axios from 'axios';

import NavPersonal from '../../components/NavPersonal/NavPersonal'

import { Textarea } from '@chakra-ui/react'
import { io } from 'socket.io-client';

const socket = io('http://localhost:8005');

function Messages() {

  const [chatId, setChatId] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/communication/get-chat/',
      { headers: { "Authorization": 'Token ' + localStorage.accessToken } })
      .then(response => {
        console.log(response.data)
        console.log(JSON.parse(response.data.chats))
        // setChatId(response.data.data.short_id);
      })
      .catch((err) => {
        console.log(err)
        // toast.error("Ошибка! Информация отсутствует.")
      });
  }, [])

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        chat_id: chatId,
        sender_id: localStorage.accessToken,
        text: currentMessage,
      };

      await socket.emit('message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off('socket_id');
      socket.off('message');
    };
  }, [socket]);

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
                      <div key={i} className={`${s.message} ${msg.sender_id === localStorage.accessToken ? s.myMsg : s.otherMsg}`}>
                        {msg.text}
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