import React from 'react'
import s from './About.module.jsx'
import {
    aboutPortalList,
    contactList
} from '../../api/index'

function About() {
    console.log(aboutPortalList)
    return (
        <main className='content'>
            <div className='wrapper'>{
                aboutPortalList.map((item, i) => {
                    return <div>
                        <h1>{item.title}</h1>
                        <div><p>{item.description}</p></div>
                        <div>{item.address}</div>
                        <div>
                            <p>{item.phone_organization}</p>
                            <p>{item.email_organization}</p>
                        </div>
                    </div>
                })
            } {
                contactList.map((item, i) => {
                    return <div>
                        <p>{item.name}</p>
                        <p>{item.phone}</p>
                        <p>{item.email}</p>
                    </div>
                })
            }
            </div>
        </main>
    )
}

export default About
