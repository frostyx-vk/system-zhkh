import React, { useState, useEffect, useRef } from 'react'
import s from './Messages.module.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavPersonal from '../../components/NavPersonal/NavPersonal'

import { Textarea } from '@chakra-ui/react'
import { io } from 'socket.io-client';

function Messages() {

  const [isAdmin, setIsAdmin] = useState(null);

  const [chatId, setChatId] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [socket, setSocket] = useState(null);

  const endMessage = useRef(null);

  function getMessages() {
    axios.get('http://localhost:8000/communication/get-chat/',
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(response => {
        if (response.data.chats) {
          setIsAdmin(true);
          setUsersList(response.data.chats)
        } else {
          setIsAdmin(false);
          setChatId(response.data.data.short_id);
          setMessageList(response.data.data.messages);
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error("Ошибка! Информация отсутствует.")
      });
  }

  useEffect(() => {
    getMessages();
  }, [])

  useEffect(() => {
    const socketInstance = io('http://localhost:8000', { auth: { 'chat_id': chatId } });
    setSocket(socketInstance);

    socketInstance.on('message', (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socketInstance.off('message');
      socketInstance.disconnect()
    };
  }, [chatId]);

  useEffect(() => {
    if (endMessage.current) {
      endMessage.current.scrollTop = endMessage.current.scrollHeight;
    };
  }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        chat_id: chatId,
        sender_token: sessionStorage.accessToken,
        text: currentMessage,
      };

      await socket.emit('message', messageData);
      setCurrentMessage('');
    }
  };

  function sendFromKeyboard(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(currentMessage)
    } else return;
  };

  function handlerUser(user, index) {
    setChatId(user.short_id);
    setMessageList(user.messages);
    setSelectedIndex(index);
    getMessages();
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
            </div>
            <div className={s.container}>
              <div className={s.msgContainerWrapper}>
                {
                  isAdmin ?
                    <div className={s.messageAdminBlock}>
                      <div className={s.messageUsers}>
                        <ul>
                          {
                            usersList.map((user, i) => {
                              return <li
                                onClick={() => handlerUser(user, i)}
                                key={i}
                                style={{ background: selectedIndex === i ? 'lightblue' : 'transparent' }}>
                                {user.owner}
                              </li>
                            })
                          }
                        </ul>
                      </div>
                      <div ref={endMessage} className={s.messageContainer}>
                        {messageList.map((msg, i) => {
                          return (
                            <div key={i} className={`${s.message} ${msg.sender_token || msg.token === sessionStorage.accessToken ? s.myMsg : s.otherMsg}`}>
                              {msg.text}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    :
                    <div ref={endMessage} className={s.messageContainer}>
                      {messageList.map((msg, i) => {
                        return (
                          <div key={i} className={`${s.message} ${msg.sender_token || msg.token === sessionStorage.accessToken ? s.myMsg : s.otherMsg}`}>
                            {msg.text}
                          </div>
                        );
                      })}
                    </div>
                }
                {
                  !chatId ?
                    <p className={s.exchangeBlock}>Выберите пользователя из списка слева</p>
                    :
                    <div className={s.inputContainer}>
                      <Textarea
                        value={currentMessage}
                        id='msg_input'
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => sendFromKeyboard(e)}
                        placeholder='Введите сообщение'
                        size='md'
                        type='text'
                        style={{ color: 'black' }}
                        required
                      />
                      <button className={s.sendBtn} onClick={() => sendMessage(currentMessage)} type='button'>Отправить</button>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" />
      </div>
    </main>
  )
}

export default Messages