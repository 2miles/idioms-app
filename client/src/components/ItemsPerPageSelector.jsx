import React from 'react';

const ItemsPerPageSelector = ({ itemsPerPage, handleItemsPerPageChange }) => (
  <select
    id="itemsPerPage"
    value={itemsPerPage}
    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={50}>50</option>
  </select>
);

export default ItemsPerPageSelector;
