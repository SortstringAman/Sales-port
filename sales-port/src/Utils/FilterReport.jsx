import React, { useState } from 'react';
import Select from 'react-select';
import '../assets/css/SearchBar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
    color: '#222F3E',
  }),
  placeholder: (base) => ({
    ...base,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#222F3E',
    fontWeight: '400',
    fontSize: '16px'
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
    zIndex: 999999,
  }),
};

const FilterControls = ({ fromDate, toDate, setFromDate, setToDate }) => (
  <>
    <div className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-2 mb-2 filterreport">
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='filter-svg'>
        <path d="M20 16H0V0H20V16Z"  />
        <path d="M20 16H0V0H20V16Z"  />
        <path d="M1.84063 1.31556C1.93438 1.12493 2.14063 1.01556 2.35 1.04368L10 1.99993L17.65 1.04368C17.8594 1.01868 18.0656 1.12806 18.1594 1.31556L19.4625 3.92181C19.7438 4.48118 19.4438 5.15931 18.8438 5.33118L13.7375 6.79056C13.3031 6.91556 12.8375 6.73118 12.6063 6.34368L10 1.99993L7.39375 6.34368C7.1625 6.73118 6.69688 6.91556 6.2625 6.79056L1.15938 5.33118C0.556252 5.15931 0.259377 4.48118 0.540627 3.92181L1.84063 1.31556ZM10.0344 3.99993L11.75 6.85618C12.2156 7.63118 13.1438 7.99993 14.0156 7.74993L18 6.61243V11.8312C18 12.5187 17.5313 13.1187 16.8625 13.2874L10.4844 14.8812C10.1656 14.9624 9.83125 14.9624 9.51563 14.8812L3.1375 13.2874C2.46875 13.1156 2 12.5156 2 11.8281V6.60931L5.9875 7.74993C6.85625 7.99993 7.7875 7.63118 8.25313 6.85618L9.96563 3.99993H10.0344Z" fill="#7F56DA" />
      </svg>

      <Select
        classNamePrefix="react-select"
        options={itemOptions}
        placeholder="All Products"
        styles={reactSelectStyles}
        menuPortalTarget={document.body}
      />
    </div>

    <div className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-2 mb-2 filterreport">
      <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='filter-svg'>
        <path d="M18 16H0V0H18V16Z"   />
        <path d="M8.26562 0.162451C8.73125 -0.0531738 9.26875 -0.0531738 9.73438 0.162451L16.5656 3.3187C16.8312 3.44058 17 3.7062 17 3.99995C17 4.2937 16.8312 4.55933 16.5656 4.6812L9.73438 7.83745C9.26875 8.05308 8.73125 8.05308 8.26562 7.83745L1.43438 4.6812C1.16875 4.5562 1 4.29058 1 3.99995C1 3.70933 1.16875 3.44058 1.43438 3.3187L8.26562 0.162451ZM14.9031 6.54995L16.5656 7.3187C16.8312 7.44058 17 7.7062 17 7.99995C17 8.2937 16.8312 8.55933 16.5656 8.6812L9.73438 11.8375C9.26875 12.0531 8.73125 12.0531 8.26562 11.8375L1.43438 8.6812C1.16875 8.5562 1 8.29058 1 7.99995C1 7.70933 1.16875 7.44058 1.43438 7.3187L3.09687 6.54995L7.84688 8.7437C8.57812 9.0812 9.42188 9.0812 10.1531 8.7437L14.9031 6.54995ZM10.1531 12.7437L14.9031 10.55L16.5656 11.3187C16.8312 11.4406 17 11.7062 17 12C17 12.2937 16.8312 12.5593 16.5656 12.6812L9.73438 15.8375C9.26875 16.0531 8.73125 16.0531 8.26562 15.8375L1.43438 12.6812C1.16875 12.5562 1 12.2906 1 12C1 11.7093 1.16875 11.4406 1.43438 11.3187L3.09687 10.55L7.84688 12.7437C8.57812 13.0812 9.42188 13.0812 10.1531 12.7437Z" fill="#7F56DA" />
      </svg>

      <Select
        classNamePrefix="react-select"
        options={itemOptions}
        placeholder="All Categories"
        styles={reactSelectStyles}
         menuPortalTarget={document.body}
      />
    </div>

    <div className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-2 mb-2 filterreport">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='filter-svg'>
        <g clip-path="url(#clip0_168_11664)">
          <path d="M14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.27609 1.5 4.62279 2.18482 3.40381 3.40381C2.18482 4.62279 1.5 6.27609 1.5 8C1.5 9.72391 2.18482 11.3772 3.40381 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5C9.72391 14.5 11.3772 13.8152 12.5962 12.5962C13.8152 11.3772 14.5 9.72391 14.5 8ZM0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM8 5C8.79565 5 9.55871 5.31607 10.1213 5.87868C10.6839 6.44129 11 7.20435 11 8C11 8.79565 10.6839 9.55871 10.1213 10.1213C9.55871 10.6839 8.79565 11 8 11C7.20435 11 6.44129 10.6839 5.87868 10.1213C5.31607 9.55871 5 8.79565 5 8C5 7.20435 5.31607 6.44129 5.87868 5.87868C6.44129 5.31607 7.20435 5 8 5Z" fill="#7F56DA" />
        </g>
        <defs>
          <clipPath id="clip0_168_11664">
            <path d="M0 0H16V16H0V0Z" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <Select
        classNamePrefix="react-select"
        options={itemOptions}
        placeholder="Status: All"
        styles={reactSelectStyles}
         menuPortalTarget={document.body}
      />
    </div>

    {/* From Date - now its own column */}
    <div className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-2 mb-2 filterreport  d-flex align-items-center">
      <label className="form-label" style={{ fontSize: '14px' }}>From</label>
      <input
        type="date"
        className="form-control custom-date-input"
        placeholder="From"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
    </div>

    {/* To Date - now its own column */}
    <div className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-2 mb-2 filterreport d-flex align-items-center">
      <label className="form-label" style={{ fontSize: '14px' }}>To</label>
      <input
        type="date"
        className="form-control custom-date-input"
        placeholder="To"
        min={fromDate}
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
    </div>

    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-2 mb-2 filterbtnContainer">
      <button className="text-white filterbtn w-100" style={{ padding: '14px', background: '#7F56DA' }}>
        <i className="bi bi-search" style={{ marginRight: '5px' }}></i>
        Search
      </button>
    </div>
  </>
);

const FilterBar = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  return (
    <>
      {/* Toggle Button for small devices */}
      <div className="d-xl-none text-end mb-2">
        <button
          className="btn btn-filter"
          data-bs-toggle="offcanvas"
          data-bs-target="#filterOffcanvas"
          aria-controls="filterOffcanvas"
        >
          <i className="bi bi-funnel-fill"></i> Filters
        </button>
      </div>

      {/* Inline Filters - visible on xl and above */}
      <div className="row d-none d-xl-flex align-items-center">
        <FilterControls
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </div>

      {/* Offcanvas for smaller devices */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="filterOffcanvas"
        aria-labelledby="filterOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="filterOffcanvasLabel">Filters</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row row g-3">
            <FilterControls
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;
