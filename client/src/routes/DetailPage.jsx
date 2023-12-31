import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IdiomsContext } from '../context/idiomsContext';
import idiomFinder from '../apis/idiomFinder';

const DetailPage = () => {
  const { id } = useParams();
  const { selectedIdiom, setSelectedIdiom } = useContext(IdiomsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await idiomFinder.get(`/${id}`);
        //console.log(response.data.data.idiom);
        setSelectedIdiom(response.data.data.idiom);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>{selectedIdiom && selectedIdiom.title_old}</h1>
      <h2>{selectedIdiom && selectedIdiom.title_new}</h2>
      <p>{selectedIdiom && selectedIdiom.definition}</p>
    </div>
  );
};

export default DetailPage;
