import React from 'react'
import s from './About.module.css'
import {
    aboutPortalList,
    contactList
} from '../../api/index'

function About() {

    return (
        <main className='content'>
            <div className='wrapper'>{
                aboutPortalList.map((item, i) => {
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
                {/* {
                    contactList.map((item, i) => {
                        return <div>
                            <p>{item.name}</p>
                            <p>{item.phone}</p>
                            <p>{item.email}</p>
                        </div>
                    })
                } */}
            </div>
        </main>
    )
}

export default About
