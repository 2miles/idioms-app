import { useState, useEffect } from 'react';

const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState('timestamps');
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
          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className={dynamicClassName}
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
