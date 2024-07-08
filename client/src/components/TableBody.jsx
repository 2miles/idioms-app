import React from 'react';
import { useNavigate } from 'react-router-dom';

// Renders the rows of a table based on the provided data and column definitions.
// It uses the useNavigate hook to navigate to a detailed view of a selected idiom when a row is clicked.
// Dynamically creates rows and cells based on the provided data and column definitions.
const TableBody = ({ tableData, columns }) => {
  const navigate = useNavigate();

  const handleIdiomSelect = (id) => {
    navigate(`/idioms/${id}`);
  };

  return (
    <tbody>
      {tableData && tableData.length > 0 ? (
        // Iterates over each item in tableData. Each data item represents a row in the table.
        tableData.map((data) => {
          return (
            <tr key={data.id} onClick={() => handleIdiomSelect(data.id)}>
              {columns.map(({ accessor }) => {
                let tData;
                if (accessor === 'timestamps') {
                  // Format the date
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
        })
      ) : (
        <tr>
          <td colSpan={columns.length}>No data available</td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
