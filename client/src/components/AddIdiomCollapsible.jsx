import React, { useState } from 'react';
import AddIdiom from './AddIdiom'; // Import the AddIdiom component
import styled from 'styled-components';

const AddIdiomContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AddIdiomCollapsible = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AddIdiomContainer>
      <button
        onClick={handleToggle}
        className={isCollapsed ? 'btn btn-success' : 'btn btn-secondary'}
      >
        {isCollapsed ? 'Add Idiom' : 'Cancel Add'}
      </button>
      {!isCollapsed && <AddIdiom />}
    </AddIdiomContainer>
  );
};

export default AddIdiomCollapsible;
