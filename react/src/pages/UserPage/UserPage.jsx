import React, { useState, useEffect } from 'react'
import s from './UserPage.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css';


function UserPage() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [updateUserData, setUpdateUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passEmail, setPassEmail] = useState('');

  function handlePhone(e) {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substring(0, 10);
    };
    setPhone(e.target.value);
  }

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/auth/users/me/',
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(response => {
        setUpdateUserData(response.data);
        if (response.data.is_superuser) {
          sessionStorage.setItem('user', 'admin');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        toast.error("Ошибка! Информация отсутствует.");
      });
  }, [])

  function handleUpdateUser(e) {
    e.preventDefault();
    axios.patch('http://localhost:8000/auth/users/me/', { 'email': email, 'phone': phone, 'is_active': true },
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(response => {
        setUpdateUserData(response.data);
        setPhone('');
        setEmail('');
        toast.success('Информация успешно обновлена!');
      })
      .catch((err) => {
        console.log(err)
        toast.error("Ошибка! Попробуйте сохранить информацию позже.")
      });

    e.currentTarget.blur();
  }

  function changePassword(e) {
    e.preventDefault();
    let formData = new FormData()
    formData.append('email', passEmail)
    setLoading(true);

    if (updateUserData.email === passEmail) {
      axios.post('http://localhost:8000/auth/users/reset_password/', formData)
        .then(res => {
          setLoading(false);
          toast.success("Запрос на восстановление пароля успешно отправлен на электронный адрес!");
          setPassEmail('');
        })
        .catch((err) => {
          setLoading(true);
          console.log(err);
          toast.error("Ошибка! Попробуйте позже.");
        });
    } else {
      toast.error("Введите e-mail от своей учётной записи!");
      setLoading(false);
    };
  };

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <Tabs variant='soft-rounded' colorScheme='green'>
              <TabList className={s.personalTabs}>
                <Tab>Личная информация</Tab>
                <Tab>Смена пароля</Tab>
              </TabList>
              <TabPanels>
                <TabPanel className={s.personalTabsContent}>
                  {
                    loading ?
                      <div className={s.spinner}>
                        <Spinner size='lg' color='green.500' />
                      </div>
                      :
                      <div className={s.personalTabsContent1}>
                        <p>Основная информация</p>
                        <label>
                          Фамилия
                          <Input
                            value={`${updateUserData.last_name}`}
                            readOnly
                            placeholder='Введите фамилию'
                            size='md'
                          />
                        </label>
                        <label>
                          Имя
                          <Input
                            value={`${updateUserData.first_name}`}
                            readOnly
                            placeholder='Введите имя'
                            size='md'
                          />
                        </label>
                        <label>
                          Отчество
                          <Input
                            value={`${updateUserData.middle_name}`}
                            readOnly
                            placeholder='Введите отчество'
                            size='md'
                          />
                        </label>
                        <p style={{ marginTop: '14px' }}>Редактируемая информация</p>
                        <form onSubmit={handleUpdateUser} action="">
                          <label>
                            Телефон
                            <InputGroup>
                              <InputLeftAddon>+7</InputLeftAddon>
                              <Input type='number'
                                placeholder={updateUserData.phone}
                                required
                                pattern="[1-9]{1}[0-9]{9}"
                                maxLength={10}
                                value={phone}
                                onChange={handlePhone}
                              />
                            </InputGroup>
                          </label>
                          <label>
                            E-mail
                            <Input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={updateUserData.email}
                              size='md'
                              type='email'
                              required
                            />
                          </label>
                          <button type='submit'>Сохранить</button>
                        </form>
                      </div>
                  }
                </TabPanel>
                <TabPanel className={s.personalTabsContent2}>
                  <p>Для смены пароля введите свой е-mail.<br />
                    Далее измените пароль исходя из инструкции в письме.</p>
                  {
                    loading ?
                      <div className={s.spinner}>
                        <Spinner size='lg' color='green.500' />
                      </div>
                      :
                      <form onSubmit={changePassword} className='' method="post" action=''>
                        <Input type='email'
                          placeholder='Введите Email привязанный к аккаунту'
                          required
                          size='md'
                          name="email"
                          value={passEmail}
                          onChange={e => setPassEmail(e.target.value)} />
                        <button type='submit'>Отправить</button>
                      </form>
                  }
                </TabPanel>
              </TabPanels>
            </Tabs>
            <ToastContainer position="top-right" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserPage
