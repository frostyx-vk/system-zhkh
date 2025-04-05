import React, { useState, useEffect } from 'react'
import s from './UserPage.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftAddon, InputRightElement } from '@chakra-ui/react'
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

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [inputPass, setInputPass] = useState('');
  const [inputPassRepeat, setInputPassRepeat] = useState('');
  const handleClickInput1 = () => setShow1(!show1);
  const handleClickInput2 = () => setShow2(!show2);

  console.log(inputPass, inputPassRepeat)

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

  function changePassword() {
    if (inputPass === inputPassRepeat) {
      console.log('Всё четко!')
    } else {
      console.log('Чёт не работает')
    }
  }

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
                  <p>Сменить пароль:</p>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={show1 ? 'text' : 'password'}
                      placeholder='Введите новый пароль'
                      className={s.inputPass1}
                      value={inputPass}
                      onChange={(e) => setInputPass(e.target.value)}
                    />
                    <InputRightElement width='5.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClickInput1} className={s.inputBtn1}>
                        {show1 ? 'Скрыть' : 'Увидеть'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <InputGroup size='md'>
                    <Input
                      pr='4.5rem'
                      type={show2 ? 'text' : 'password'}
                      placeholder='Повторите новый пароль'
                      className={s.inputPass2}
                      value={inputPassRepeat}
                      onChange={(e) => setInputPassRepeat(e.target.value)}
                    />
                    <InputRightElement width='5.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClickInput2} className={s.inputBtn2}>
                        {show2 ? 'Скрыть' : 'Увидеть'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <button onClick={changePassword} type='button' className={s.savePassBtn}>Сохранить</button>
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
