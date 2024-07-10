import React, { useState } from 'react';
import AddIdiom from './AddIdiom'; // Import the AddIdiom component

const AddIdiomCollapsible = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="add-idiom-container">
      <button
        onClick={handleToggle}
        className={isCollapsed ? 'btn btn-success' : 'btn btn-secondary'}
      >
        {isCollapsed ? 'Add Idiom' : 'Collapse'}
      </button>

      {!isCollapsed && (
        <div className="add-idiom-form">
          <AddIdiom />
        </div>
      )}
    </div>
  );
};

export default AddIdiomCollapsible;
