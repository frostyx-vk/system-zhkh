import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    // const user = false;

    return localStorage.getItem('accessToken') ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes