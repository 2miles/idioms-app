import PageContainer from '@/components/PageContainer';
import AddIdiomCollapsible from '@/components/AddIdiomCollapsible';
import TableSection from '@/components/TableSection';

const HomePage = () => {
  return (
    <PageContainer>
      <AddIdiomCollapsible />
      <TableSection />
    </PageContainer>
  );
};

export default HomePage;
