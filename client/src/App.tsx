import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import DetailPage from 'routes/DetailPage';
import NavBar from './components/NavBar';
import { IdiomsContextProvider } from './context/idiomsContext';

const App = () => {
  return (
    <IdiomsContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/idioms/:id' element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </IdiomsContextProvider>
  );
};

export default App;
