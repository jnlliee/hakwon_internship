import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import ChangeEmail from './components/ChangeEmail';
import CancelSubscription from './components/CancelSubscription';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/change-email" element={<ChangeEmail />} />
        <Route path="/cancel-subscription" element={<CancelSubscription />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);
