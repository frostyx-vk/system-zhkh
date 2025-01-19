import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {

    return sessionStorage.getItem('accessToken') ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes