import React, { useState, useEffect } from 'react';
import axios from 'axios';
import s from './About.module.css'
import { useNavigate } from 'react-router-dom';

function About() {
    const [about, setAbout] = useState([]);

    let navigator = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/web/about-portal/')
            .then(res => setAbout(res.data))
            .catch(err => {
                if (err.response) {
                    console.log('Отсутствует ответ')
                    navigator('/404')
                } else if (err.request) {
                    console.log('Ошибка запроса')
                } else {
                    console.log('Другая ошибка')
                }
            });
    }, [])

    return (
        <main className='content'>
            <div className='wrapper'>{
                about.map((item, i) => {
                    return <div key={i}>
                        <h1 className={s.title}>{item.title}</h1>
                        <p className={s.description}>{item.description}</p>
                        <div className={s.addres}>
                            Мы находимся по адресу: {item.address}
                            <p>Номер телефона компании: {item.phone_organization}</p>
                            <p>E-mail адрес компании: {item.email_organization}</p>
                        </div>
                    </div>
                })
            }
            </div>
        </main>
    )
}

export default About
