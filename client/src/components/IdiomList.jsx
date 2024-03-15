import React, { useEffect, useContext, useState } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';
import { useNavigate } from 'react-router-dom';

const IdiomList = (props) => {
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [sortField, setSortField] = useState('day'); // 'asc' or 'desc'
  const navigate = useNavigate();

  const handleSort = (field) => {
    console.log('handle sort was called');
    if (field === sortField) {
      // Clicking the same field toggles the sorting order
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      // Clicking a different field sets the new field (ascending)
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // const sortedIdioms = [...idioms].sort((a, b) => {
  //   if (sortOrder === 'asc') {
  //     return a[sortField].localeCompare(b[sortField]);
  //   } else {
  //     return b[sortField].localeCompare(a[sortField]);
  //   }
  // });

  // const sortedIdioms = [...idioms].sort((a, b) => {
  //   const aValue = String(a[sortField]);
  //   const bValue = String(b[sortField]);

  //   if (sortOrder === 'asc') {
  //     return aValue.localeCompare(bValue);
  //   } else {
  //     return bValue.localeCompare(aValue);
  //   }
  // });

  const sortedIdioms = [...idioms].sort((a, b) => {
    const aValue =
      sortField === 'id' ? Number(a[sortField]) : String(a[sortField]);
    const bValue =
      sortField === 'id' ? Number(b[sortField]) : String(b[sortField]);

    if (sortOrder === 'asc') {
      if (aValue === bValue) return 0; // Values are equal
      if (aValue === '' || (sortField === 'id' && isNaN(aValue))) return 1; // Null, empty, or non-numeric strings go to the end
      if (bValue === '' || (sortField === 'id' && isNaN(bValue))) return -1; // Null, empty, or non-numeric strings go to the end

      return aValue < bValue ? -1 : 1; // Numerical or string comparison
    } else {
      if (aValue === bValue) return 0; // Values are equal
      if (aValue === '' || (sortField === 'id' && isNaN(aValue))) return -1; // Null, empty, or non-numeric strings go to the end
      if (bValue === '' || (sortField === 'id' && isNaN(bValue))) return 1; // Null, empty, or non-numeric strings go to the end

      return bValue < aValue ? -1 : 1; // Numerical or string comparison
    }
  });

  // Will execute this code block only once, right after the component is initially rendered.
  // If the dependency array is empty, it won't run again on subsequent renders.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IdiomFinder.get('/');
        setIdioms(response.data.data.idioms);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await IdiomFinder.delete(`/${id}`);
      setIdioms(
        idioms.filter((idiom) => {
          return idiom.id !== id;
        }),
      );
    } catch (err) {}
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/idioms/${id}/update`);
  };

  const handleIdiomSelect = (id) => {
    navigate(`/idioms/${id}`);
  };

  return (
    <div>
      <table className="table table-bordered table-hover table-dark">
        <thead>
          <tr key={idioms.id} className="big-primary">
            <th onClick={() => handleSort('id')}>Id</th>
            <th onClick={() => handleSort('title_old')}>Title</th>
            <th onClick={() => handleSort('definition')}>Definition</th>
            <th onClick={() => handleSort('day')}>Day</th>
            <th onClick={() => handleSort('owner')}>Owner</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedIdioms &&
            sortedIdioms.map((idiom) => {
              const truncatedDay = idiom.day ? idiom.day.substring(0, 10) : ''; // Get the first 10 characters
              return (
                <tr onClick={() => handleIdiomSelect(idiom.id)} key={idiom.id}>
                  <td> {idiom.id}</td>
                  <td>
                    <b>{idiom.title_old}</b>
                  </td>
                  <td> {idiom.definition}</td>
                  <td> {truncatedDay}</td>
                  <td> {idiom.owner}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => handleUpdate(e, idiom.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, idiom.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default IdiomList;
