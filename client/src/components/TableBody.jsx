import React from 'react';
import { useNavigate } from 'react-router-dom';

const TableBody = ({ tableData, columns }) => {
  const navigate = useNavigate();

  const handleIdiomSelect = (id) => {
    navigate(`/idioms/${id}`);
  };

  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id} onClick={() => handleIdiomSelect(data.id)}>
            {columns.map(({ accessor }) => {
              let tData;
              if (accessor === 'timestamps') {
                // Format the timestamps data
                const options = {
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit',
                };
                tData = new Date(data[accessor]).toLocaleDateString(
                  undefined, // LOCALE, I think this can be changed to my timezone to simplify things a bit?
                  options,
                );

                // Split the date by '/'
                const parts = tData.split('/');
                // Rearrange the parts and join them with '-'
                tData = `${parts[0]}-${parts[1]}-${parts[2]}`;
              } else {
                tData = data[accessor] ? data[accessor] : '——';
              }
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
