import React, { useState } from 'react'
import s from './UserPage.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'

function UserPage() {

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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

    console.log(contactInfo)
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
                        value={'Расторгуев'}
                        readOnly
                        placeholder='Введите фамилию'
                        size='md'
                      />
                    </label>
                    <label>
                      Имя
                      <Input
                        value={'Олег'}
                        readOnly
                        placeholder='Введите имя'
                        size='md'
                      />
                    </label>
                    <label>
                      Отчество
                      <Input
                        value={'Газманович'}
                        readOnly
                        placeholder='Введите отчество'
                        size='md'
                      />
                    </label>
                    <p style={{ marginTop: '14px' }}>Редактируемая информация</p>
                    <form onSubmit={handleSubmit} action="">
                      <label>
                        Телефон
                        <InputGroup>
                          <InputLeftAddon>+7</InputLeftAddon>
                          <Input type='number'
                            placeholder='Номер телефона'
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
                          placeholder='Введите фамилию'
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