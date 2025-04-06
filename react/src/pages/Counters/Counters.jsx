import React, { useState, useEffect } from 'react'
import s from './Counters.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Input } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

function Counters() {
  const [err, setErr] = useState(false);
  const [isParking, setIsParking] = useState(null);
  const [userData, setUserData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [counters, setCounters] = useState({
    coldWater: '',
    hotWater: '',
    coldWater2: '',
    hotWater2: '',
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

    // for (const values of Object.values(counters)) {
    //   if (!isParking && values.length < 5) {
    //     return setErr(true);
    //   };
    // }

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
            coldWater2: '',
            hotWater2: '',
            electricity: '',
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error('Ошибка передачи данных! Попробуйте позже.')
        });
  }

  function getHistoryCounters() {
    axios.get(`http://localhost:8000/web/indications-history/${sessionStorage.accessToken}/`,
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(res => {
        setHistoryData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка! Информация отсутствует.")
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
            <Tabs variant='soft-rounded' colorScheme='green'>
              <TabList className={s.personalTabs}>
                <Tab>Передача показаний счетчиков</Tab>
                <Tab onClick={getHistoryCounters}>История передачи показаний</Tab>
              </TabList>
              <TabPanels>
                <TabPanel className={s.personalTabsContent}>
                  <div className={s.personalTabsContent1}>
                    <div className={s.counters}>
                      <p>
                        C 20 по 25 число каждого месяца требуется отправлять показания счётчиков.<br />
                        Вводить нужно только целое число!<br /><br />
                        Имущество: {
                          userData.type === 'HABITABLE' ? "Жилое помещение" : (userData.type === 'NOT_RSIDENTIAL' ? 'Нежилое помещение' : 'Парковочное место')
                        }; {userData.address}; Площадь S={userData.square}м²
                      </p>
                      {
                        err ? <div className={s.err}>Для отправки показаний все числа должны состоять из 5 цифр.</div> : ''
                      }
                      {userData.tube === 'ONE'
                        ?
                        <form onSubmit={handlerForm}>
                          <label>
                            Холодная вода (ХВС):
                            <Input
                              type='number'
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
                            Горячая вода (ГВС):
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
                        : userData.tube === 'TWO' ?
                          <form onSubmit={handlerForm}>
                            <label>
                              Холодная вода (ХВС1):
                              <Input
                                type='number'
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
                              Горячая вода (ГВС1):
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
                              Холодная вода (ХВС2):
                              <Input
                                type='number'
                                value={counters.coldWater2}
                                name='coldWater2'
                                onChange={handleChange}
                                onKeyDown={(e) => ['e', 'E', '+', '-', '.', ','].includes(e.key) && e.preventDefault()}
                                placeholder='Введите число'
                                size='md'
                                required
                              />
                            </label>
                            <label>
                              Горячая вода (ГВС2):
                              <Input
                                type='number'
                                name='hotWater2'
                                value={counters.hotWater2}
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
                          :
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
                      }

                    </div>
                  </div>
                </TabPanel>
                <TabPanel className={s.personalTabsContent}>
                  <div className={s.personalTabsContent2}>
                    {
                      historyData.length > 0 ?
                        <TableContainer>
                          <Table variant='simple'>
                            <Thead>
                              <Tr>
                                <Th>Дата передачи показаний</Th>
                                <Th>Наименование</Th>
                                <Th isNumeric>Переданные показания</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {
                                historyData.map((item, i) => {
                                  return <Tr key={item.id}>
                                    <Td>{item.date_updated.slice(0, 10).split("-").reverse().join("-").replace(/-/g, '.')}</Td>
                                    <Td >{item.tariff_key === 'coldWater' ? 'Холодная вода' : item.tariff_key === 'hotWater' ? 'Горячая вода' : 'Электричество'}</Td>
                                    <Td isNumeric>{item.last_indication}</Td>
                                  </Tr>
                                })
                              }
                            </Tbody>
                          </Table>
                        </TableContainer> :
                        <p>История передачи показаний отсутствует</p>
                    }
                  </div>
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

export default Counters
