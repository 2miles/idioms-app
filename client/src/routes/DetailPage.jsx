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
    <div className="text-white">
      {selectedIdiom ? (
        <>
          <h1>{selectedIdiom.title_old}</h1>
          <h2>{selectedIdiom.title_new}</h2>
          <p>{selectedIdiom.definition}</p>
          <p>{selectedIdiom.day}</p>
          <p>{selectedIdiom.owner}</p>
          <p>{selectedIdiom.id}</p>
        </>
      ) : (
        // or handle the case when selectedIdiom is not available
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPage;
