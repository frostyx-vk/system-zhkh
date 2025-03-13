import React, { useState, useEffect } from 'react'
import s from './Treatment.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import uploadImg from "../../illustration/upload.png";
import axios from "axios";

import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

function Treatment() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
                <Tab>Статус обращений</Tab>
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
                            required
                            type="file"
                            onChange={handleFileChange} />
                        </div>
                      </div>
                      <Button variant="ghost" type='submit'>Отправить</Button>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel className={s.personalTabsContent}>
                  <div>

                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Treatment
