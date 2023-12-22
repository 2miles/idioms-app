import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import DetailPage from './routes/DetailPage';
import UpdatePage from './routes/UpdatePage';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/idioms/:id" element={<DetailPage />} />
          <Route path="/idioms/:id/update" element={<UpdatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
