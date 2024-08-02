import { useState, useEffect } from 'react';

const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState('position');
  const [sortOrder, setSortOrder] = useState('asc');

  // Call handleSorting initially to apply the default sorting
  useEffect(() => {
    handleSorting(sortField, sortOrder);
  }, []);

  const handleSortingChange = (accessor) => {
    const newSortOrder =
      accessor === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setSortOrder(newSortOrder);
    handleSorting(accessor, newSortOrder);
  };
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const dynamicClassName = sortable
            ? sortField === accessor && sortOrder === 'asc'
              ? 'up'
              : sortField === accessor && sortOrder == 'desc'
              ? 'down'
              : 'default'
            : '';
          const columnClass = `column-${accessor}`; // Use dynamic class name
          return (
            // <th
            //   key={accessor}
            //   onClick={sortable ? () => handleSortingChange(accessor) : null}
            //   className={`${dynamicClassName} ${columnClass}`}
            // >
            //   {label}
            // </th>
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className={`${dynamicClassName} ${columnClass} ${
                accessor === 'definition'
                  ? 'definition-column'
                  : accessor === 'title'
                  ? 'title-cell'
                  : accessor === 'timestamps'
                  ? 'timestamp-column'
                  : accessor === 'contributor'
                  ? 'contributor-column'
                  : ''
              }
              }`}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
