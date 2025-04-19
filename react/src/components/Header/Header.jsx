import s from './Header.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function Header() {
    let navigator = useNavigate();

    function clearAuth() {
        const data = { name: 'Axios POST with Bearer Token' };
        const headers = { 'Authorization': 'Token ' + sessionStorage.accessToken };
        axios.post('http://localhost:8000/auth/token/logout/', data, { headers })
            .then(response => {
                if (response.status in [200, 201, 204]) return
                sessionStorage.removeItem('accessToken');
                sessionStorage.removeItem('user');
                navigator('/login');
            })
            .catch((err) => {
                console.log(err);
                toast.error("Ошибка! Информация недоступна, зайдите позже");
            });
    }

    return (
        <div className={s.header}>
            <div className={s.headerWrapper}>
                <Link className={s.headerName} to='/'>
                    <span className={s.arrow1}>
                    </span>
                    <span className={s.arrow2}>
                    </span>
                    Портал УК
                </Link>
                <div className={s.headerNav}>
                    <Nav />
                    {
                        sessionStorage.accessToken ?
                            <div>
                                <button>
                                    <Link to='/userpage'>
                                        Пользователь
                                    </Link>
                                </button>
                                <button onClick={() => clearAuth()}>
                                    <Link>
                                        Выйти
                                    </Link>
                                </button>
                            </div> :
                            <button>
                                <Link to='/login'>
                                    Личный кабинет
                                </Link>
                            </button>
                    }
                </div>
            </div>
            <ToastContainer position="top-right" />
        </div>
    )
}
