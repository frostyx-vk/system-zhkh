import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './font/stylesheet.css'
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <React.StrictMode>
      <Header />
      {/* <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/service' element={<Service />} />
        <Route path='/news' element={<News />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer /> */}
    </React.StrictMode>
  </ BrowserRouter>
);

reportWebVitals();
