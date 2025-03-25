import React, { useState, useEffect } from 'react'
import s from './Treatment.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import uploadImg from "../../illustration/upload.png";
import axios from "axios";

import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';

function Treatment() {
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [statusData, setStatusData] = useState([]);
  const [load, setLoad] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
  };

  let treatmentData = new FormData();
  treatmentData.append('name', title);
  treatmentData.append('text', description)
  treatmentData.append('file', selectedFile);
  treatmentData.append('token', sessionStorage.accessToken)

  function handleForm(e) {
    e.preventDefault();
    setLoad(true);

    axios.post('http://localhost:8000/web/appeal-create/', treatmentData)
      .then(res => {
        toast.success(res.data.message);
        setLoad(false);
        setSelectedName('');
        setTitle('');
        setDescription('');
        setSelectedFile('');
      })
      .catch(err => {
        console.log(err);
        setLoad(true);
        toast.error("Ошибка! Попробуйте отправить позже");
      });
  };

  function handlerTab() {
    setLoad(true);
    axios.get(`http://localhost:8000/web/appeals/${sessionStorage.accessToken}/`,
      { headers: { "Authorization": 'Token ' + sessionStorage.accessToken } })
      .then(res => {
        setLoad(false);
        setStatusData(res.data);
      })
      .catch(err => {
        console.log(err);
        setLoad(true);
        toast.error("Ошибка! Попробуйте зайти позже");
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
                <Tab>Подать обращение</Tab>
                <Tab onClick={handlerTab}>Статус обращений</Tab>
              </TabList>
              <TabPanels>
                <TabPanel className={s.personalTabsContent}>
                  {
                    load ?
                      <div className={s.spinner}>
                        <Spinner color='green.500' size='lg' />
                      </div>
                      :
                      <div className={s.personalTabsContent1}>
                        <form onSubmit={handleForm} encType={'multipart/form-data'}>
                          <Input
                            type='text'
                            placeholder='Введите название проблемы'
                            value={title}
                            size='md'
                            required
                            minLength="5"
                            maxLength='30'
                            onChange={e => setTitle(e.target.value)}
                          />
                          <Textarea
                            placeholder='Введите описание проблемы'
                            value={description}
                            size='md'
                            required
                            minLength="20"
                            onChange={e => setDescription(e.target.value)}
                          />
                          <div className={s.parent}>
                            <div className={s.fileUpload}>
                              <img src={uploadImg} alt="upload" />
                              <h3> {selectedName || 'Нажмите для загрузки файла'}</h3>
                              <p>Максимальный размер файла 10mb</p>
                              <input
                                type="file"
                                onChange={handleFileChange} />
                            </div>
                          </div>
                          <Button variant="ghost" type='submit'>Отправить</Button>
                        </form>
                      </div>
                  }
                </TabPanel>
                <TabPanel className={s.personalTabsContent}>
                  {
                    load ?
                      <div className={s.spinner}>
                        <Spinner color='green.500' size='lg' />
                      </div>
                      :
                      <div className={s.statusList}>
                        <TableContainer>
                          <Table variant='simple'>
                            <Thead>
                              <Tr>
                                <Th>Название обращения</Th>
                                <Th>Дата обращения</Th>
                                <Th>Статус</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {
                                statusData.map((item, i) => {
                                  return (
                                    <Tr key={i}>
                                      <Td>{item.name}</Td>
                                      <Td className={s.tableData}>
                                        <span>{item.date_created.slice(0, 10).split('-').reverse().join('-').replace(/-/g, '.')}</span>
                                        <span>{item.date_created.slice(11, 19)}</span>
                                      </Td>
                                      <Td style={{ fontWeight: '600' }} className={item.status === 'IN_WORK' ? s.work : item.status === 'COMPLETED' ? s.completed : ''}>
                                        {item.status === 'IN_WORK' ? 'В работе' : item.status === 'COMPLETED' ? 'Выполнено' : 'На рассмотрении'}
                                      </Td>
                                    </Tr>
                                  )
                                })
                              }
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </div>
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

export default Treatment
