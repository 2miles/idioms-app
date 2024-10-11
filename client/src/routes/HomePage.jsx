import { useContext, useEffect, useState } from 'react';
import PageContainer from '../components/PageContainer';
import AddIdiomCollapsible from '../components/AddIdiomCollapsible';
import TableSection from '../components/TableSection';
import { IdiomsContext } from '../context/idiomsContext';

const HomePage = () => {
  const { idioms } = useContext(IdiomsContext);
  const [filteredIdioms, setFilteredIdioms] = useState([]);

  useEffect(() => {
    setFilteredIdioms(idioms);
  }, [idioms]);

  return (
    <PageContainer>
      <AddIdiomCollapsible />
      <TableSection idioms={filteredIdioms} />
    </PageContainer>
  );
};

export default HomePage;
