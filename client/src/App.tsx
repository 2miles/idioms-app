import { Routes, Route } from 'react-router-dom';

import DetailPage from '@/routes/DetailPage';
import HomePage from '@/routes/HomePage';
import NavBar from '@/components/NavBar/NavBar';
import TestBanner from './components/TestBanner';

const App = () => (
  <>
    <NavBar />
    <TestBanner />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/idioms/:id' element={<DetailPage />} />
    </Routes>
  </>
);

export default App;
