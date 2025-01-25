import React, { useState, useEffect } from 'react'
import s from './Counters.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Input } from '@chakra-ui/react'

function Counters() {
  const [err, setErr] = useState(false);
  const [isParking, setIsParking] = useState(null);
  const [userData, setUserData] = useState([]);
  const [counters, setCounters] = useState({
    coldWater: '',
    hotWater: '',
    electricity: '',
  });

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

  function handleChange(e) {
    if (e.target.value.length > 5) {
      e.target.value = e.target.value.substring(0, 5);
    };
    e.target.value.length < 5 && setErr(true);
    e.target.value.length === 5 && setErr(false);

    setCounters({
      ...counters,
      [e.target.name]: e.target.value
    });
  };

  function handlerForm(e) {
    e.preventDefault();

    if (counters.coldWater.length === 5 && counters.hotWater.length === 5 && counters.electricity.length === 5) {
      console.log(1111)
      // axios.post('http://localhost:8000/auth/token/login/', counters)
      //   .then(response => {
      //     console.log(response.data)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   });
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
            <div className={s.title}>
              Передача показаний счетчиков
            </div>
            <div className={s.counters}>
              <p>
                C 20 по 25 число каждого месяца требуется отправлять показания счётчиков.<br />
                Вводить нужно только целое число!<br /><br />
                Имущество: {userData.type}, {userData.square}м²
              </p>
              {
                err ? <div>Для отправки показаний все числа должно состоять из 5 цифр.</div> : ''
              }
              <form onSubmit={handlerForm}>
                <label>
                  Холодная вода:
                  <Input
                    type='number'
                    min={5}
                    value={counters.coldWater}
                    name='coldWater'
                    onChange={handleChange}
                    onKeyDown={(e) => ['e', 'E', '+', '-', '.', ','].includes(e.key) && e.preventDefault()}
                    placeholder='Введите число'
                    size='md'
                    required
                  />
                </label>
                <label>
                  Горячая вода:
                  <Input
                    type='number'
                    name='hotWater'
                    value={counters.hotWater}
                    onChange={handleChange}
                    onKeyDown={(e) => ['e', 'E', '+', '-', '.', ','].includes(e.key) && e.preventDefault()}
                    placeholder='Введите число'
                    size='md'
                    required
                  />
                </label>
                <label>
                  Электричество:
                  <Input
                    type='number'
                    name='electricity'
                    value={counters.electricity}
                    onChange={handleChange}
                    onKeyDown={(e) => ['e', 'E', '+', '-', '.', ','].includes(e.key) && e.preventDefault()}
                    placeholder='Введите число'
                    size='md'
                    required
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
