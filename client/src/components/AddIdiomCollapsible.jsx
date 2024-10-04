import React, { useState } from 'react';
import AddIdiom from './AddIdiom';
import styled from 'styled-components';

const AddIdiomContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const AddIdiomCollapsible = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const collapseForm = () => {
    setIsCollapsed(true);
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <AddIdiomContainer>
      <button
        onClick={handleToggleCollapse}
        className={isCollapsed ? 'btn btn-success' : 'btn btn-secondary'}
      >
        {isCollapsed ? 'Add Idiom' : 'Cancel Add'}
      </button>
      {!isCollapsed && <AddIdiom collapseForm={collapseForm} />}
    </AddIdiomContainer>
  );
};

export default AddIdiomCollapsible;
