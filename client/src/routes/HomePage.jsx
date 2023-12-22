import React from 'react';
import Header from '../components/Header';
import AddIdiom from '../components/AddIdiom';
import IdiomList from '../components/IdiomList';

const HomePage = () => {
  return (
    <div>
      <Header />
      <AddIdiom />
      <IdiomList />
    </div>
  );
};

export default HomePage;
