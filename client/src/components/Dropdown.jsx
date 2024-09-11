// import React, { useState, useRef, useEffect } from 'react';
// import styled from 'styled-components';

// const DropdownContainer = styled.div`
//   position: relative;
//   display: flex;
//   user-select: none;
//   border: 1px solid #e9ecef;
//   background-color: #f8f9fa;
//   border-radius: 5px;
//   margin-right: 20px;
//   margin-bottom: 1rem;
//   padding: 0px 10px;
//   height: 35px;

//   @media (max-width: 770px) {
//     display: ${(props) => (props.hideOnSmallScreen ? 'none' : 'flex')};
//   }
// `;

// const Anchor = styled.span`
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   &::after {
//     content: '';
//     width: 0;
//     height: 0;
//     border-left: 6px solid transparent;
//     border-right: 6px solid transparent;
//     border-top: 6px solid black;
//     margin-left: 10px;
//     transition: border-top 0.3s ease, border-bottom 0.3s ease;
//   }

//   ${(props) =>
//     props.visible &&
//     `
//     &::after {
//       border-top: none;
//       border-bottom: 6px solid black;
//     }
//   `}
// `;

// const Options = styled.ul`
//   display: ${(props) => (props.visible ? 'block' : 'none')};
//   position: absolute;
//   top: calc(100% + 5px);
//   right: 0;
//   background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   z-index: 1;
//   padding: 0;
//   list-style: none;
// `;

// const Option = styled.li`
//   padding: 5px 10px;

//   &:hover {
//     background-color: #f1f1f1;
//   }
// `;

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   input[type='checkbox'] {
//     margin-right: 10px;
//   }
// `;

// const Dropdown = ({
//   options,
//   selected,
//   handleChange,
//   label,
//   hideOnSmallScreen = false,
//   isCheckbox = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);

//   const displayLabel =
//     typeof selected === 'string' || typeof selected === 'number'
//       ? selected
//       : label;

//   return (
//     <DropdownContainer
//       hideOnSmallScreen={hideOnSmallScreen}
//       ref={dropdownRef}
//       onClick={() => setIsOpen(!isOpen)}
//     >
//       <Anchor visible={isOpen}>{displayLabel}</Anchor>
//       <Options visible={isOpen}>
//         {options.map((option) => (
//           <Option key={option} onClick={(e) => e.stopPropagation()}>
//             {isCheckbox ? (
//               <CheckboxLabel>
//                 <input
//                   type="checkbox"
//                   checked={selected[option] || false} // Ensure the value is boolean
//                   onChange={() => handleChange(option)}
//                 />
//                 {option.charAt(0).toUpperCase() + option.slice(1)}
//               </CheckboxLabel>
//             ) : (
//               <span
//                 onClick={() => {
//                   handleChange(option);
//                   setIsOpen(false);
//                 }}
//               >
//                 {option}
//               </span>
//             )}
//           </Option>
//         ))}
//       </Options>
//     </DropdownContainer>
//   );
// };

// export default Dropdown;

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  user-select: none;
  border: 1px solid #e9ecef;
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-right: 20px;
  margin-bottom: 1rem;
  padding: 0px 10px;
  height: 35px;

  @media (max-width: 770px) {
    display: ${(props) => (props.hideOnSmallScreen ? 'none' : 'flex')};
  }
`;

const Anchor = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid black;
    margin-left: 10px;
    transition: border-top 0.3s ease, border-bottom 0.3s ease;
  }

  ${(props) =>
    props.visible &&
    `
    &::after {
      border-top: none;
      border-bottom: 6px solid black;
    }
  `}
`;

const Options = styled.ul`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  padding: 0;
  list-style: none;
`;

const Option = styled.li`
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

// Dropdown component
const Dropdown = ({
  label,
  hideOnSmallScreen,
  options,
  closeOnSelect,
  onOptionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (option) => {
    if (onOptionClick) {
      onOptionClick(option); // Call the onOptionClick prop
    }
    if (closeOnSelect) {
      setIsOpen(false); // Close dropdown if needed
    }
  };

  return (
    <DropdownContainer
      hideOnSmallScreen={hideOnSmallScreen}
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Anchor visible={isOpen}>{label}</Anchor>
      <Options visible={isOpen}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </Option>
        ))}
      </Options>
    </DropdownContainer>
  );
};

export default Dropdown;
