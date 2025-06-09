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
    zIndex: 9999,
  }),
};

const FilterControls = ({ fromDate, toDate, setFromDate, setToDate }) => (
  <>
    <div className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-2 mb-2 filterreport">
      <Select
        classNamePrefix="react-select"
        options={itemOptions}
        placeholder="All Products"
        styles={reactSelectStyles}
      />
    </div>

    <div className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-2 mb-2 filterreport">
      <Select
        classNamePrefix="react-select"
        options={itemOptions}
        placeholder="All Categories"
        styles={reactSelectStyles}
      />
    </div>

    <div className="col-6 col-sm-6 col-md-12 col-lg-12 col-xl-2 mb-2 filterreport">
      <Select
        classNamePrefix="react-select"
        options={itemOptions}
        placeholder="Status: All"
        styles={reactSelectStyles}
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
