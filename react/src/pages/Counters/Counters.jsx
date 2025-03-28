import React, { useState, useEffect } from 'react'
import s from './Counters.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Input } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';

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
    axios.get('http://localhost:8000/web/get-living-area-data/',
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(response => {
        setUserData(response.data.data);
        if (response.data.data.type !== "PARKING") {
          setIsParking(false)
        } else setIsParking(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка! Информация отсутствует.")
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

    for (const values of Object.values(counters)) {
      if (!isParking && values.length < 5 && userData.availability_counters_water) {
        return setErr(true);
      };
    }

    !err &&
      axios.post('http://localhost:8000/web/set-counters/', counters,
        { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } }
      )
        .then(response => {
          console.log(response.data);
          toast.success('Данные переданы успешно!');
          setCounters({
            ...counters,
            coldWater: '',
            hotWater: '',
            electricity: '',
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error('Ошибка передачи данных! Попробуйте позже.')
        });
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
                Имущество: {
                  userData.type === 'HABITABLE' ? "Жилое помещение" : (userData.type === 'NOT_RSIDENTIAL' ? 'Нежилое помещение' : 'Парковочное место')
                }; {userData.address}; Плоащадь S={userData.square}м²
              </p>
              {/* {
                !userData.availability_counters_water ? <div className={isParking ? s.hide : s.err}>Отсутствуют счётчики на воду. Сумма оплаты будет рассчитана исходя из среднестандартных норм!</div> : ''
              } */}
              {
                err ? <div className={s.err}>Для отправки показаний все числа должны состоять из 5 цифр.</div> : ''
              }
              {isParking
                ?
                <form onSubmit={handlerForm}>
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
                :
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
              }

            </div>
            <ToastContainer position="top-right" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Counters
