import React, { useState, useEffect } from 'react'
import s from './Counters.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Input } from '@chakra-ui/react'

function Counters() {
  const [isParking, setIsParking] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/accounts/get-user-data/',
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(response => {
        setUserData(response.data.data);
        if (response.data.data.type !== "PARKING") {
          setIsParking(false)
        } else setIsParking(true);
      })
      .catch((err) => {
        console.log(err)
        // toast.error("Ошибка! Информация отсутствует.")
      });
  }, []);

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <div className={s.title}>
              Передача показаний счетчиков
            </div>
            <div className={s.counters}>
              <p>
                C 20 по 25 число каждого месяца требуется отправлять показания счётчиков<br /><br />
                Имущество: {userData.type}, {userData.square}м²
              </p>
              <form>
                <label>
                  Холодная вода:
                  <Input
                    // value={}
                    placeholder='Введите число'
                    size='md'
                  />
                </label>
                <label>
                  Горячая вода:
                  <Input
                    // value={}
                    placeholder='Введите число'
                    size='md'
                  />
                </label>
                <label>
                  Электричество:
                  <Input
                    // value={}
                    placeholder='Введите число'
                    size='md'
                  />
                </label>
                <button type='submit'>Отправить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Counters
