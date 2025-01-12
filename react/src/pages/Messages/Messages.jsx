import React, { useState, useEffect } from 'react'
import s from './Messages.module.css'
import axios from 'axios';

import NavPersonal from '../../components/NavPersonal/NavPersonal'

import { Textarea } from '@chakra-ui/react'
import { io } from 'socket.io-client';

// const socket = io('http://localhost:8005', { auth: { 'chat_id': '62059f9f-c314-41ef-98a2-6fb0ed4b0258' } });

function Messages() {

  const [isAdmin, setIsAdmin] = useState(null);

  const [chatId, setChatId] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/communication/get-chat/',
      { headers: { "Authorization": 'Token ' + localStorage.accessToken } })
      .then(response => {
        if (response.data.chats) {
          setIsAdmin(true);
          // console.log(JSON.parse(response.data.chats))
          // setMessageList(response.data.data.messages);
        } else {
          setIsAdmin(false);
          setChatId(response.data.data.short_id);
          setMessageList(response.data.data.messages);
        }
        // console.log(JSON.parse(response.data.chats))
        // setChatId(response.data.data.short_id);
      })
      .catch((err) => {
        console.log(err)
        // toast.error("Ошибка! Информация отсутствует.")
      });
  }, [])

  useEffect(() => {
    const socketInstance = io('http://localhost:8005', { auth: { 'chat_id': chatId } });
    setSocket(socketInstance);

    socketInstance.on('message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socketInstance.off('message');
      socketInstance.disconnect()
    };
  }, [chatId]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        chat_id: chatId,
        token: localStorage.accessToken, // ключом ранее был sender_id, на бэке нужно будет поменять
        text: currentMessage,
      };

      await socket.emit('message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav container'>
            <NavPersonal />
          </div>
          <div className='personalContent' style={{ color: 'black' }}>
            <div className={s.title}>
              {isAdmin ? 'Сообщения Администратора' : 'Сообщения пользователя'}
              {/* {socket.connected !== null ? 'Онлайн' : 'Оффлайн'} */}
            </div>
            <div className={s.container}>
              <div className={s.msgContainerWrapper}>
                {
                  isAdmin ?
                    <div className={s.messageAdminBlock}>
                      <div className={s.messageUsers}>
                        <ul>
                          <li>Users 1</li>
                          <li>Users 2</li>
                          <li>Users 3</li>
                        </ul>
                      </div>
                      <div className={s.messageContainer}>
                        {messageList.map((msg, i) => {
                          return (
                            <div key={i} className={`${s.message} ${msg.sender_id === localStorage.accessToken ? s.myMsg : s.otherMsg}`}>
                              {msg.text}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    :
                    <div className={s.messageContainer}>
                      {messageList.map((msg, i) => {
                        return (
                          <div key={i} className={`${s.message} ${msg.token === localStorage.accessToken ? s.myMsg : s.otherMsg}`}>
                            {msg.text}
                          </div>
                        );
                      })}
                    </div>
                }
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