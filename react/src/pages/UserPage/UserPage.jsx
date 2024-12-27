import React, { useState } from 'react'
import s from './UserPage.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { userPageDetail, headers } from '../../api/index'
import { USERPAGE_API, serverBaseUrl } from '../../api/urls'
import axios from "axios";


function UserPage() {

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  function handlePhone(e) {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.substring(0, 10);
    }
    setPhone(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const contactInfo = {
      phone,
      email
    }

    let formData = new FormData()
    formData.append('contactInfo', contactInfo)
  }

  function updateUser() {
    axios.patch(`${serverBaseUrl}${USERPAGE_API}`, { 'email': email, 'phone': phone, 'is_active': true },
      { headers: { "Authorization": 'Token ' + localStorage.accessToken } })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
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
                  <div className={s.personalTabsContent1}>
                    <p>Основная информация</p>
                    <label>
                      Фамилия
                      <Input
                        value={`${userPageDetail.last_name}`}
                        readOnly
                        placeholder='Введите фамилию'
                        size='md'
                      />
                    </label>
                    <label>
                      Имя
                      <Input
                        value={`${userPageDetail.first_name}`}
                        readOnly
                        placeholder='Введите имя'
                        size='md'
                      />
                    </label>
                    <label>
                      Отчество
                      <Input
                        value={`${userPageDetail.middle_name}`}
                        readOnly
                        placeholder='Введите отчество'
                        size='md'
                      />
                    </label>
                    <p style={{ marginTop: '14px' }}>Редактируемая информация</p>
                    <form onSubmit={updateUser} action="">
                      <label>
                        Телефон
                        <InputGroup>
                          <InputLeftAddon>+7</InputLeftAddon>
                          <Input type='number'
                            placeholder={userPageDetail.phone}
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
                          placeholder={userPageDetail.email}
                          size='md'
                          type='email'
                          required
                        />
                      </label>
                      <button type='submit'>Сохранить</button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel className={s.personalTabsContent}>
                  <p>Здесь нужно будет сделать такой же смысл смены пароля как и при кнопке "Забыли пароль" ?</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}

export default UserPage
