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
      {/* <img src={search} className="searchicon" style={{cursor:'pointer',width:'20px',height:'20px',top:"12px"}} onClick={()=>{setSearchQuery('');onSearch('');}}></img> */}

<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="23" height="23" className='searchicon'><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    </div>
  );
});

export default SearchBar;
