import React, { useEffect, useContext } from 'react';
import IdiomFinder from '../apis/idiomFinder';
import { IdiomsContext } from '../context/idiomsContext';

const IdiomList = (props) => {
  const { idioms, setIdioms } = useContext(IdiomsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await IdiomFinder.get('/');
        console.log(response);
        setIdioms(response.data.data.idioms);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr className="big-primary">
            <th>Title</th>
            <th>Definition</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test Name</td>
            <td>
              When one tests ones name. Usually out of the blue but not always.
            </td>
            <td>
              <button classname="btn btn-warning">Update</button>
            </td>
            <td>
              <button classname="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Another test Name</td>
            <td>
              When another tests ones name. Usually out of the blue but not
              always.
            </td>
            <td>
              <button classname="btn btn-warning">Update</button>
            </td>
            <td>
              <button classname="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      IdiomList
    </div>
  );
};

export default IdiomList;
