import React from 'react'
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

export default function NavPersonal() {

    const setActive = ({ isActive }) => (isActive ? s.navActive : "");

    return (
        <div >
            <ul className={s.navPers}>
                <NavLink to='/userpage' className={setActive}>
                    <IoPersonOutline style={{ color: '#57a7dc' }} />Профиль
                </NavLink>
                <NavLink to='/messages' className={setActive}>
                    <BiMessageDetail style={{ color: '#57a7dc' }} />Сообщения
                </NavLink>
                <NavLink to='/tariffs' className={setActive}>
                    <MdOutlineCalculate style={{ color: '#57a7dc' }} /> Тарифы
                </NavLink>
                <NavLink to='/counters' className={setActive}>
                    <PiNotePencilThin style={{ color: 'green' }} /> Показания счетчиков
                </NavLink>
                <NavLink to='/invoice' className={setActive}>
                    <CiViewList style={{ color: 'green' }} />Платёжный документ
                </NavLink>
                <NavLink to='/payments' className={setActive}>
                    <CiWallet style={{ color: 'green' }} />Платежи
                </NavLink>
                <NavLink to='/treatment' className={setActive}>
                    <AiOutlineQuestionCircle style={{ color: '#d07575' }} />Обращения
                </NavLink>
                <NavLink to='/documents' className={setActive}>
                    <IoDocumentsOutline style={{ color: '#d07575' }} />Документы от УК
                </NavLink>
            </ul>
        </div>
    )
}
