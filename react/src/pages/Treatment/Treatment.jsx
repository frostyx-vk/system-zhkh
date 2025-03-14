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
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [load, setLoad] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
  };

  let treatmentData = {
    title,
    description,
    selectedFile
  };

  function handleForm(e) {
    e.preventDefault();
    console.log(treatmentData);
    setSelectedName('');
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    toast.success('Обращение отправлено, следите за его статусом.');
  };

  function handlerTab() {
    setLoad(false)
    setTimeout(() => {
      console.log('Получил данные');
      setLoad(true)
    }, 100);
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
                  <div className={s.personalTabsContent1}>
                    <form onSubmit={handleForm} >
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
                </TabPanel>
                <TabPanel className={s.personalTabsContent}>
                  {
                    load ?
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
                              <Tr>
                                <Td>Прорвало трубу</Td>
                                <Td>01.02.2025 13:50</Td>
                                <Td>В работе</Td>
                              </Tr>
                              <Tr>
                                <Td>Затопило</Td>
                                <Td>14.03.2025 17:42</Td>
                                <Td>На рассмотрении</Td>
                              </Tr>
                              <Tr>
                                <Td>Навалили на общем балконе</Td>
                                <Td>19.03.2025 23:58</Td>
                                <Td>Выполнено</Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </div>
                      :
                      <div className={s.spinner}>
                        <Spinner color='green.500' size='lg' />
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
