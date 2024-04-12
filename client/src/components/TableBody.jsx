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
                tData = data[accessor] ? data[accessor].substring(0, 10) : '——';
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
