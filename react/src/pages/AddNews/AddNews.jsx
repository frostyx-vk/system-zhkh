import React, { useState } from 'react'
import s from './AddNews.module.css'
import NavPersonal from '../../components/NavPersonal/NavPersonal'
import axios from "axios";

import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';

function AddNews() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [load, setLoad] = useState(false);

  let newsData = new FormData();
  newsData.append('name', title);
  newsData.append('text', description)
  newsData.append('token', sessionStorage.accessToken)

  function handleForm(e) {
    e.preventDefault();
    setLoad(true);

    axios.post('http://localhost:8000/web/appeal-create/aaaaaa', newsData) //надо поменять урл для отправки
      .then(res => {
        toast.success(res.data.message);
        setLoad(false);
        setTitle('');
        setDescription('');
      })
      .catch(err => {
        console.log(err);
        setLoad(true);
        toast.error("Ошибка! Попробуйте отправить позже");
      });
  };

  return (
    <main className={s.content}>
      <div className='wrapper'>
        <div className='personalPage'>
          <div className='personalNav'>
            <NavPersonal />
          </div>
          <div className='personalContent'>
            <div className={s.title}>
              Добавление Новостей
            </div>
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
                      placeholder='Введите название новости'
                      value={title}
                      size='md'
                      required
                      minLength="5"
                      maxLength='25'
                      onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder='Введите описание новости'
                      value={description}
                      size='md'
                      required
                      minLength="20"
                      onChange={e => setDescription(e.target.value)}
                    />
                    <Button variant="ghost" type='submit'>Разместить</Button>
                  </form>
                </div>
            }
            <ToastContainer position="top-right" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default AddNews
