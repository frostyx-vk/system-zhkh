import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';
import './font/stylesheet.css'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import Service from './pages/Service/Service';
import News from './pages/News/News';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Reserved from './pages/Reserved/Reserved';
import PrivateRoutes from './utils/routes/PrivateRoutes';
import UserPage from './pages/UserPage/UserPage';
import Messages from './pages/Messages/Messages';
import Counters from './pages/Counters/Counters';
import Invoice from './pages/Invoice/Invoice';
import Payments from './pages/Payments/Payments';
import Documents from './pages/Documents/Documents';
import Tariffs from './pages/Tariffs/Tariffs';
import Treatment from './pages/Treatment/Treatment';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <ChakraProvider>
      <React.StrictMode>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/service' element={<Service />} />
          <Route path='/news' element={<News />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpass' element={<ForgotPassword />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/userpage' element={<UserPage />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/counters' element={<Counters />} />
            <Route path='/counters' element={<Counters />} />
            <Route path='/invoice' element={<Invoice />} />
            <Route path='/payments' element={<Payments />} />
            <Route path='/tariffs' element={<Tariffs />} />
            <Route path='/treatment' element={<Treatment />} />
            <Route path='/documents' element={<Documents />} />
          </Route>
          <Route path='/reserved' element={<Reserved />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </React.StrictMode>
    </ChakraProvider>
  </ BrowserRouter>
);

reportWebVitals();
