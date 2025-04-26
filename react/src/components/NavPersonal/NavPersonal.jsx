import React, { useState, useEffect } from 'react'
import s from './NavPersonal.module.css'
import { NavLink } from 'react-router-dom'
import { BiMessageDetail } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { PiNotePencilThin } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";
import { CiWallet } from "react-icons/ci";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlineCalculate } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlineAddComment } from "react-icons/md";

export default function NavPersonal() {
    const [isUser, isSetUser] = useState()

    const setActive = ({ isActive }) => (isActive ? s.navActive : "");

    useEffect(() => {
        isSetUser(sessionStorage.user)
    }, [sessionStorage.user])

    return (
        <>
            {
                isUser === 'admin' ?
                    <ul className={s.navPers}>
                        <NavLink to='/userpage' className={setActive}>
                            <IoPersonOutline style={{ color: '#57a7dc' }} />
                            <span className={s.hide}>Профиль</span>
                        </NavLink>
                        <NavLink to='/messages' className={setActive}>
                            <BiMessageDetail style={{ color: '#57a7dc' }} />
                            <span className={s.hide}>Сообщения</span>
                        </NavLink>
                        <NavLink to='/tariffs' className={setActive}>
                            <MdOutlineCalculate style={{ color: '#57a7dc' }} />
                            <span className={s.hide}>Тарифы</span>
                        </NavLink>
                        <NavLink to='/counters' className={setActive}>
                            <PiNotePencilThin style={{ color: 'green' }} />
                            <span className={s.hide}>Показания счетчиков</span>
                        </NavLink>
                        <NavLink to='/addservice' className={setActive}>
                            <MdOutlineAddComment style={{ color: 'rgb(130 66 139)' }} />
                            <span className={s.hide}>Добавить услуги</span>
                        </NavLink>
                        <NavLink to='/addnews' className={setActive}>
                            <MdOutlineAddComment style={{ color: 'rgb(130 66 139)' }} />
                            <span className={s.hide}>Добавить новости</span>
                        </NavLink>
                        <NavLink to='/documents' className={setActive}>
                            <IoDocumentsOutline style={{ color: '#d07575' }} />
                            <span className={s.hide}>Документы от УК</span>
                        </NavLink>
                    </ul>
                    :
                    <ul className={s.navPers}>
                        <NavLink to='/userpage' className={setActive}>
                            <IoPersonOutline style={{ color: '#57a7dc' }} />
                            <span className={s.hide}>Профиль</span>
                        </NavLink>
                        <NavLink to='/messages' className={setActive}>
                            <BiMessageDetail style={{ color: '#57a7dc' }} />
                            <span className={s.hide}>Сообщения</span>
                        </NavLink>
                        <NavLink to='/tariffs' className={setActive}>
                            <MdOutlineCalculate style={{ color: '#57a7dc' }} />
                            <span className={s.hide}>Тарифы</span>
                        </NavLink>
                        <NavLink to='/counters' className={setActive}>
                            <PiNotePencilThin style={{ color: 'green' }} />
                            <span className={s.hide}>Показания счетчиков</span>
                        </NavLink>
                        <NavLink to='/invoice' className={setActive}>
                            <CiViewList style={{ color: 'green' }} />
                            <span className={s.hide}>Платёжный документ</span>
                        </NavLink>
                        <NavLink to='/payments' className={setActive}>
                            <CiWallet style={{ color: 'green' }} />
                            <span className={s.hide}>Платежи</span>
                        </NavLink>
                        <NavLink to='/treatment' className={setActive}>
                            <AiOutlineQuestionCircle style={{ color: '#d07575' }} />
                            <span className={s.hide}>Обращения</span>
                        </NavLink>
                        <NavLink to='/documents' className={setActive}>
                            <IoDocumentsOutline style={{ color: '#d07575' }} />
                            <span className={s.hide}>Документы от УК</span>
                        </NavLink>
                    </ul>
            }
        </>
    )
}
