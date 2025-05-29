import React, { useState,forwardRef } from 'react';
import '../assets/css/SearchBar.css'; // Add your CSS for styling
import search from '../assets/icons/delete.png'

const SearchBar = forwardRef(({ data, onSearch,placeholder},ref) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        ref={ref}
      />
      <img src={search} className="searchicon" style={{cursor:'pointer',width:'20px',height:'20px',top:"12px"}} onClick={()=>{setSearchQuery('');onSearch('');}}></img>
    </div>
  );
});

export default SearchBar;
