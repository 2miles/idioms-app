import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from 'routes/HomePage';
import DetailPage from 'routes/DetailPage';
import NavBar from 'components/NavBar';
import { IdiomsContextProvider } from 'context/idiomsContext';

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

// Vite App.tsx
// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a href='https://vite.dev' target='_blank'>
//           <img src={viteLogo} className='logo' alt='Vite logo' />
//         </a>
//         <a href='https://react.dev' target='_blank'>
//           <img src={reactLogo} className='logo react' alt='React logo' />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className='card'>
//         <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
//     </>
//   );
// }

// export default App;
