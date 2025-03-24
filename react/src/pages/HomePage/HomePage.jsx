import React, { useState } from 'react';
import axios from 'axios';
import flatLogo from '../../illustration/flat.png'
import s from './HomePage.module.css'
import { Button } from '@chakra-ui/react'
import { EditIcon, ChatIcon, WarningIcon, CalendarIcon, ViewIcon, LinkIcon, PlusSquareIcon, BellIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const navigate = useNavigate();

  const navigateToUserPage = () => {
    navigate('/userpage');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
  };

  function clearFields() {
    setEmail('');
    setTitle('');
    setContent('');
    setSelectedFile('');
    setSelectedName('');
    onClose();
  };

  function handlerModalForm(event) {
    event.preventDefault();

    let problemData = new FormData();
    problemData.append('e-mail', email);
    problemData.append('name', title);
    problemData.append('text', content)
    problemData.append('file', selectedFile);

    for (var pair of problemData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    axios.post('http://localhost:8000/communication/create-message-problem/', problemData)
      .then(res => {
        toast.success(res.data.status + '!');
        clearFields();
      })
      .catch(err => {
        console.log(err);
        toast.error("Ошибка! Попробуйте отправить позже");
      });
  };

  return (
    <main className='content wrapper'>
      <div className={s.homeFirstBlock}>
        <span className={s.round1}></span>
        <span className={s.round2}></span>
        <span className={s.round3}></span>
        <img src={flatLogo} alt="image" width={200} />
        <div className={s.titleBlock}>
          <div className={s.title}>
            Удобно<br /> и комфортно
          </div>
          <p>Коммуникация между жителями и<br /> управляющими компаниями еще<br /> не была настолько удобной!</p>
        </div>
      </div>
      <div className={s.homeSecondBlock}>
        <div className={s.homeSecondBlockLeft}>
          <div className={s.leftButtonUp}>
            <Button onClick={navigateToUserPage} leftIcon={<EditIcon boxSize={6} />}>
              Внести показания счетчиков
            </Button>
            <Button onClick={navigateToUserPage} leftIcon={<CalendarIcon boxSize={6} />}>
              Электронная квитанция ЖКХ
            </Button>
            <Button onClick={navigateToUserPage} leftIcon={<BellIcon boxSize={6} />}>
              Оплатить услуги ЖКХ
            </Button>
          </div>
          <div className={s.leftButtonDown}>
            <Button onClick={navigateToUserPage} leftIcon={<ViewIcon boxSize={6} />}>
              Узнать статус обращений
            </Button>
          </div>
        </div>
        <div className={s.homeSecondBlockRight}>
          <div className={s.rightButtonUp}>
            <Button onClick={navigateToUserPage} leftIcon={<ChatIcon boxSize={6} />}>
              Чат с УК
            </Button>
            <Button onClick={navigateToUserPage} leftIcon={<LinkIcon boxSize={6} />}>
              Узнать тарифы
            </Button>
          </div>
          <div className={s.rightButtonDown}>
            <Button onClick={onOpen} leftIcon={<WarningIcon boxSize={6} />}>
              Заявить о проблеме
            </Button>
            <Button onClick={navigateToUserPage} leftIcon={<PlusSquareIcon boxSize={6} />}>
              Получить документы УК
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <form onSubmit={handlerModalForm} className={s.modalForm}>
              <ModalHeader>Заявить о проблеме</ModalHeader>
              <ModalCloseButton onClick={clearFields}/>

              <ModalBody>
                <Input type='email'
                  placeholder='Введите cвой e-mail'
                  size='md'
                  required
                  onChange={e => setEmail(e.target.value)}
                />
                <Input type='text'
                  placeholder='Введите название проблемы'
                  size='md'
                  required
                  minLength="5"
                  onChange={e => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder='Введите описание проблемы'
                  size='md'
                  required
                  minLength="20"
                  onChange={e => setContent(e.target.value)}
                />
                <div className={s.parent}>
                  <div className={s.fileUpload}>
                    <h3> {selectedName || 'Нажмите для загрузки файла'}</h3>
                    <p>Максимальный размер файла 10mb</p>
                    <input
                      type="file"
                      onChange={handleFileChange} />
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={clearFields}>
                  Выйти
                </Button>
                <Button variant="ghost" type='submit'>Отправить</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <ToastContainer position="top-right" />
    </main>
  )
}

export default HomePage
