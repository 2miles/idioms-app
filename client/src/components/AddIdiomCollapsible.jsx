import React, { useState } from 'react';
import AddIdiom from './AddIdiom'; // Import the AddIdiom component

const AddIdiomCollapsible = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className={isCollapsed ? 'btn btn-success' : 'btn btn-secondary'}
      >
        {isCollapsed ? 'Add Idiom' : 'Cancel Add'}
      </button>
      {!isCollapsed && <AddIdiom />}
    </>
  );
};

export default AddIdiomCollapsible;
