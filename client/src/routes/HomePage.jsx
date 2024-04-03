import React from 'react';
import Header from '../components/Header';
import AddIdiom from '../components/AddIdiom';
import IdiomList from '../components/IdiomList';
import Table from '../components/Table';

const HomePage = () => {
  return (
    <div className="table_container">
      <Header />
      <AddIdiom />

      {/* 
      <IdiomList /> */}
      <Table />
    </div>
  );
};

export default HomePage;
