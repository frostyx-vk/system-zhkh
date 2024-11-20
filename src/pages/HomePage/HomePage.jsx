import React, { useState } from 'react'
import axios from 'axios';
import flatLogo from '../../illustration/flat.png'
import s from './HomePage.module.css'
import { Button } from '@chakra-ui/react'
import { EditIcon, ChatIcon, WarningIcon, CalendarIcon, ViewIcon, LinkIcon, PlusSquareIcon, BellIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'


function HomePage() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [emailName, setEmailName] = useState('');
  const [trublName, setTrublName] = useState('');
  const [descrName, setDescrName] = useState('');

  function handlerModalForm(event) {
    event.preventDefault();

    let modalData = {
      emailName,
      trublName,
      descrName
    };

    console.log(modalData)


    // axios.post(`${serverBaseUrl}${USER_LOGIN}`, modalData)
    //     .then(response => {
    //         if (response.status !== 200) return

    //         if (localStorage.accessToken) {
    //             navigator('/userpage')
    //         }
    //     })
  }

  return (
    <main className='content wrapper'>
      <div className={s.homeFirstBlock}>
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
            <Button leftIcon={<EditIcon boxSize={6} />}>
              Внести показания счетчиков
            </Button>
            <Button leftIcon={<CalendarIcon boxSize={6} />}>
              Электронная квитанция ЖКХ
            </Button>
            <Button leftIcon={<BellIcon boxSize={6} />}>
              Оплатить услуги ЖКХ
            </Button>
          </div>
          <div className={s.leftButtonDown}>
            <Button leftIcon={<ViewIcon boxSize={6} />}>
              Видеонаблюдение онлайн
            </Button>
          </div>
        </div>
        <div className={s.homeSecondBlockRight}>
          <div className={s.rightButtonUp}>
            <Button leftIcon={<PlusSquareIcon boxSize={6} />}>
              Список домов
            </Button>
            <Button leftIcon={<LinkIcon boxSize={6} />}>
              Управляющие компании
            </Button>
          </div>
          <div className={s.rightButtonDown}>
            <Button onClick={onOpen} leftIcon={<WarningIcon boxSize={6} />}>
              Заявить о проблеме
            </Button>
            <Button leftIcon={<ChatIcon boxSize={6} />}>
              Онлайн-собрание жильцов
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <form onSubmit={handlerModalForm} action="" className={s.modalForm}>
              <ModalHeader>Заявить о проблеме</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <Input type='e-mail'
                  placeholder='Введите cвой e-mail'
                  size='md'
                  required
                  minLength="5"
                  onChange={e => setEmailName(e.target.value)}
                />
                <Input type='text'
                  placeholder='Введите название проблемы'
                  size='md'
                  required
                  minLength="5"
                  onChange={e => setTrublName(e.target.value)}
                />
                <Textarea
                  placeholder='Введите описание проблемы'
                  size='md'
                  required
                  minLength="20"
                  onChange={e => setDescrName(e.target.value)}
                />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Выйти
                </Button>
                <Button variant="ghost" type='submit'>Отправить</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </main>
  )
}

export default HomePage
