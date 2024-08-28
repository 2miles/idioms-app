// import React, { useState } from 'react';

// const ColumnSelector = ({ columnVisibility, handleColumnVisibilityChange }) => {
//   const [showColumnSelector, setShowColumnSelector] = useState(false);
//   return (
//     <div className="dropdown-wrapper">
//       <div
//         className={`dropdown-check-list ${showColumnSelector ? 'visible' : ''}`}
//         onClick={(e) => {
//           if (e.target.className.includes('anchor')) {
//             setShowColumnSelector(!showColumnSelector);
//           }
//         }}
//       >
//         <span className="anchor">Columns</span>
//         <ul className="items" onClick={(e) => e.stopPropagation()}>
//           {Object.keys(columnVisibility).map((column) => (
//             <li key={column}>
//               <label className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   checked={columnVisibility[column]}
//                   onChange={() => handleColumnVisibilityChange(column)}
//                 />
//                 {column.charAt(0).toUpperCase() + column.slice(1)}
//               </label>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ColumnSelector;
import React, { useState, useEffect, useRef } from 'react';

const ColumnSelector = ({ columnVisibility, handleColumnVisibilityChange }) => {
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowColumnSelector(false);
      }
    };
    if (showColumnSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColumnSelector]);

  return (
    <div
      className={`dropdown-check-list ${showColumnSelector ? 'visible' : ''}`}
      ref={dropdownRef} // Attach ref to the dropdown container
      onClick={() => setShowColumnSelector(!showColumnSelector)}
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
  );
};

export default ColumnSelector;
