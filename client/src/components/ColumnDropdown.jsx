// import React from 'react';
// import styled from 'styled-components';
// import Dropdown from './Dropdown'; // Import base Dropdown

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   input[type='checkbox'] {
//     margin-right: 10px;
//   }
// `;

// const DropdownCheckbox = ({ options, selected, handleChange, label }) => {
//   return (
//     <Dropdown label={label}>
//       {options.map((option) => (
//         <li key={option}>
//           <CheckboxLabel>
//             <input
//               type="checkbox"
//               checked={selected[option] || false}
//               onChange={() => handleChange(option)}
//             />
//             {option.charAt(0).toUpperCase() + option.slice(1)}
//           </CheckboxLabel>
//         </li>
//       ))}
//     </Dropdown>
//   );
// };

// export default ColumnDropdown;
import React from 'react';
import Dropdown from './Dropdown';
import styled from 'styled-components';

// Styled components for checkbox labels
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input[type='checkbox'] {
    margin-right: 10px;
  }
`;

const ColumnDropdown = ({ columnVisibility, handleColumnVisibilityChange }) => {
  const columns = Object.keys(columnVisibility);

  // Pass JSX directly into the options array
  const options = columns.map((column) => (
    <CheckboxLabel key={column}>
      <input
        type="checkbox"
        checked={columnVisibility[column]}
        onChange={() => handleColumnVisibilityChange(column)}
      />
      {column.charAt(0).toUpperCase() + column.slice(1)}
    </CheckboxLabel>
  ));

  return (
    <Dropdown
      label="Columns"
      options={options}
      closeOnSelect={false}
      hideOnSmallScreen={true}
    />
  );
};

export default ColumnDropdown;
