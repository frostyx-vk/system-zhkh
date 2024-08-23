import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './font/stylesheet.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import Service from './pages/Service/Service';
import News from './pages/News/News';
import About from './pages/About/About';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Reserved from './pages/Reserved/Reserved';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <React.StrictMode>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/service' element={<Service />} />
        <Route path='/news' element={<News />} />
        <Route path='/about' element={<About />} />
        <Route path='/reserved' element={<Reserved />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </React.StrictMode>
  </ BrowserRouter>
);

reportWebVitals();
