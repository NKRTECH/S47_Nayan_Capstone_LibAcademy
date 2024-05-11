// FilteringPanel.js

import React from 'react';

const FilteringPanel = ({ categories, selectedCategories, handleCategoryChange }) => {
  return (
    <div className="filtering-panel">
      <button className="filter-button">Filter</button>
      <div className="filter-options">
        <h2>Filter Options</h2>
        <div className="category-filter">
          <h3>Categories</h3>
          <ul>
            {categories.map(category => (
              <li key={category._id}>
                <input
                  type="checkbox"
                  id={category._id}
                  name={category._id}
                  checked={selectedCategories.includes(category._id)}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={category._id}>{category.name}</label>
              </li>
            ))}
          </ul>
        </div>
        {/* Add more filter options here */}
      </div>
    </div>
  );
};

export default FilteringPanel;
