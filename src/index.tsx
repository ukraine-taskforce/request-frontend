import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import './index.css';
import reportWebVitals from './reportWebVitals';

import { Home } from './pages/home'
import { Captcha } from './pages/captcha'
import { Locator } from './pages/locator'
import { People } from './pages/people'
import { Review } from './pages/review'
import { Success } from './pages/success'
import { Supplies } from './pages/supplies'
import { DataContextProvider } from './others/contexts/data';

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/captcha" element={<Captcha />} />
          <Route path="/locator" element={<Locator />} />
          <Route path="/people" element={<People />} />
          <Route path="/review" element={<Review />} />
          <Route path="/success" element={<Success />} />
          <Route path="/supplies" element={<Supplies />} />
        </Routes>
      </BrowserRouter>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
