import React, { useEffect, useContext, useState } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';
import { useNavigate } from 'react-router-dom';

const IdiomList = (props) => {
  const { idioms, setIdioms } = useContext(IdiomsContext);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortKey, setSortKey] = useState('day');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSort = (field) => {
    if (field === sortKey) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(field);
      setSortOrder('asc');
    }
  };

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredIdioms = idioms.filter((idiom) =>
    idiom.title_old?.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedIdioms = [...filteredIdioms].sort((a, b) => {
    // Determine whether to treat the values of a and b as numbers or strings based on sortKey
    const aValue = sortKey === 'id' ? Number(a[sortKey]) : String(a[sortKey]);
    const bValue = sortKey === 'id' ? Number(b[sortKey]) : String(b[sortKey]);

    if (sortOrder === 'asc') {
      return aValue === bValue ? 0 : aValue > bValue ? 1 : -1;
    } else {
      return aValue === bValue ? 0 : aValue < bValue ? 1 : -1;
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

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
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
