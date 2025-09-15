import { Routes, Route } from 'react-router-dom';

import AboutPage from '@/routes/AboutPage';
import DetailPage from '@/routes/DetailPage';
import HomePage from '@/routes/HomePage';
import NavBar from '@/components/NavBar/NavBar';
import TestBanner from './components/TestBanner';
import RequestsPage from './routes/RequestsPage';

const App = () => (
  <>
    <NavBar />
    <TestBanner />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/idioms/:id' element={<DetailPage />} />
      <Route path='/requests' element={<RequestsPage />} />
    </Routes>
  </>
);

export default App;
