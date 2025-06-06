import React, { useState } from 'react';
import Select from 'react-select';
import categoryIcon from '../assets/icons/category-svgrepo-com.svg';
import '../assets/css/SearchBar.css';

const itemOptions = [
  { value: 'Item 1', label: 'Item 1' },
  { value: 'Item 2', label: 'Item 2' },
  { value: 'Item 3', label: 'Item 3' },
];

const reactSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: '45px',
    height: '40px',
    width: '100%',
    fontSize: '14px',
    textAlign: 'center',
    border: 'none',
    backgroundColor: '#F9F9F9',
 
    boxShadow: state.isFocused ? '0 0 0 1px #7F56DA' : base.boxShadow,
    '&:hover': {
      borderColor: '#7F56DA',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    height: '40px',
    padding: '0 8px',
    fontSize: '14px',
  }),
  input: (base) => ({
    ...base,
    minWidth: '2px',
    gridArea: '1/1/1/1',
        color:'#222F3E',
  }),
  placeholder: (base) => ({
    ...base,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'black',
    fontWeight:'500',
    fontSize:'15px'
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '14px',
    backgroundColor: state.isSelected
      ? '#ddd'
      : state.isFocused
      ? '#f0f0f0'
      : 'white',
    color: 'black',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
};

const FilterBar = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <div className="row align-items-center">
      <div className="col-md-2 mb-2 filterreport" style={{ position: "relative" }}>
        <Select
          classNamePrefix="react-select"
          options={itemOptions}
          placeholder="All Products"
          styles={reactSelectStyles}
        />
     
        
<svg  className="svg-icon"  width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 16H0V0H20V16Z" stroke="#E5E7EB"/>
<path d="M1.84051 1.31556C1.93426 1.12493 2.1405 1.01556 2.34988 1.04368L9.99988 1.99993L17.6499 1.04368C17.8593 1.01868 18.0655 1.12806 18.1593 1.31556L19.4624 3.92181C19.7436 4.48118 19.4436 5.15931 18.8436 5.33118L13.7374 6.79056C13.303 6.91556 12.8374 6.73118 12.6061 6.34368L9.99988 1.99993L7.39363 6.34368C7.16238 6.73118 6.69675 6.91556 6.26238 6.79056L1.15925 5.33118C0.55613 5.15931 0.259255 4.48118 0.540505 3.92181L1.84051 1.31556ZM10.0343 3.99993L11.7499 6.85618C12.2155 7.63118 13.1436 7.99993 14.0155 7.74993L17.9999 6.61243V11.8312C17.9999 12.5187 17.5311 13.1187 16.8624 13.2874L10.4843 14.8812C10.1655 14.9624 9.83113 14.9624 9.5155 14.8812L3.13738 13.2874C2.46863 13.1156 1.99988 12.5156 1.99988 11.8281V6.60931L5.98738 7.74993C6.85613 7.99993 7.78738 7.63118 8.25301 6.85618L9.9655 3.99993H10.0343Z" fill="#7F56DA"/>
</svg>

      </div>

      <div className="col-md-2 mb-2 filterreport" style={{ position: "relative" }}>
        <Select
          classNamePrefix="react-select"
          options={itemOptions}
          placeholder="All Categories"
          styles={reactSelectStyles}
        />
       <svg  className="svg-icon"  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.26562 0.162451C7.73125 -0.0531738 8.26875 -0.0531738 8.73438 0.162451L15.5656 3.3187C15.8312 3.44058 16 3.7062 16 3.99995C16 4.2937 15.8312 4.55933 15.5656 4.6812L8.73438 7.83745C8.26875 8.05308 7.73125 8.05308 7.26562 7.83745L0.434375 4.6812C0.16875 4.5562 0 4.29058 0 3.99995C0 3.70933 0.16875 3.44058 0.434375 3.3187L7.26562 0.162451ZM13.9031 6.54995L15.5656 7.3187C15.8312 7.44058 16 7.7062 16 7.99995C16 8.2937 15.8312 8.55933 15.5656 8.6812L8.73438 11.8375C8.26875 12.0531 7.73125 12.0531 7.26562 11.8375L0.434375 8.6812C0.16875 8.5562 0 8.29058 0 7.99995C0 7.70933 0.16875 7.44058 0.434375 7.3187L2.09687 6.54995L6.84688 8.7437C7.57812 9.0812 8.42188 9.0812 9.15312 8.7437L13.9031 6.54995ZM9.15312 12.7437L13.9031 10.55L15.5656 11.3187C15.8312 11.4406 16 11.7062 16 12C16 12.2937 15.8312 12.5593 15.5656 12.6812L8.73438 15.8375C8.26875 16.0531 7.73125 16.0531 7.26562 15.8375L0.434375 12.6812C0.16875 12.5562 0 12.2906 0 12C0 11.7093 0.16875 11.4406 0.434375 11.3187L2.09687 10.55L6.84688 12.7437C7.57812 13.0812 8.42188 13.0812 9.15312 12.7437Z" fill="#7F56DA"/>
</svg>

      </div>

      <div className="col-md-2 mb-2 filterreport" style={{ position: "relative" }}>
        <Select
          classNamePrefix="react-select"
          options={itemOptions}
          placeholder="Status: All"
          styles={reactSelectStyles}
        />
     
        <svg  className="svg-icon"  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.27609 1.5 4.62279 2.18482 3.40381 3.40381C2.18482 4.62279 1.5 6.27609 1.5 8C1.5 9.72391 2.18482 11.3772 3.40381 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5C9.72391 14.5 11.3772 13.8152 12.5962 12.5962C13.8152 11.3772 14.5 9.72391 14.5 8ZM0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 5C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8C11 8.79565 10.6839 9.55871 10.1213 10.1213C9.55871 10.6839 8.79565 11 8 11C7.20435 11 6.44129 10.6839 5.87868 10.1213C5.31607 9.55871 5 8.79565 5 8C5 7.20435 5.31607 6.44129 5.87868 5.87868C6.44129 5.31607 7.20435 5 8 5Z" fill="#7F56DA"/>
</svg>

      </div>

      <div className="col-md-3 mb-2 d-flex align-items-center gap-2" style={{ position: "relative" }}>
        <span className="mx-1" style={{fontSize:'14px'}}>From</span>
    
        <input
          type="date"
          className="form-control custom-date-input"
          placeholder="From"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <span className="mx-1" style={{fontSize:'14px'}}>To</span>
        <input
          type="date"
          className="form-control custom-date-input"
          placeholder="To"
          min={fromDate}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      <div className="col-md-3 mb-2">
        <button className="text-white filterbtn" style={{ padding: '14px 60px', background: '#7F56DA' }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" width="20" height="20">
            <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span> Search</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
