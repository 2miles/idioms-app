import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/routes/HomePage';
import DetailPage from '@/routes/DetailPage';
import NavBar from '@/components/NavBar';
import { IdiomsContextProvider } from '@/context/idiomsContext';
import { UserProvider } from '@/context/userContext';
import TestBanner from './components/TestBanner';

const App = () => {
  return (
    <UserProvider>
      <IdiomsContextProvider>
        <BrowserRouter>
          <NavBar />
          <TestBanner />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/idioms/:id' element={<DetailPage />} />
          </Routes>
        </BrowserRouter>
      </IdiomsContextProvider>
    </UserProvider>
  );
};

export default App;
