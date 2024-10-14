import { useState } from 'react';
import styled from 'styled-components';

import AddIdiom from './AddIdiom';

const AddIdiomContainer = styled.div`
  margin-top: var(--margin-lg);
  margin-bottom: var(--margin-lg);
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
