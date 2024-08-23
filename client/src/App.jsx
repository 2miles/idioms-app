import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import DetailPage from './routes/DetailPage';
import { IdiomsContextProvider } from './context/idiomsContext';

const App = () => {
  return (
    <IdiomsContextProvider>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/idioms/:id" element={<DetailPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </IdiomsContextProvider>
  );
};

export default App;
