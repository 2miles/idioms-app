import React, { useState } from 'react';

const ColumnSelector = ({ columnVisibility, handleColumnVisibilityChange }) => {
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  return (
    <div className="dropdown-wrapper">
      <div
        id="list1"
        className={`dropdown-check-list ${showColumnSelector ? 'visible' : ''}`}
        onClick={(e) => {
          if (e.target.className.includes('anchor')) {
            setShowColumnSelector(!showColumnSelector);
          }
        }}
      >
        <span className="anchor">Columns</span>
        <ul className="items" onClick={(e) => e.stopPropagation()}>
          {Object.keys(columnVisibility).map((column) => (
            <li key={column}>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={columnVisibility[column]}
                  onChange={() => handleColumnVisibilityChange(column)}
                />
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ColumnSelector;
