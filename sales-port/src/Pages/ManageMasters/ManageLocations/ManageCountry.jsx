


import { useState, useMemo, useEffect, useRef } from 'react';
import CommonLayout from '../../../Component/CommonLayout';
import profileicon3 from '../../../assets/icons/svgviewer-output.svg'
import ProfileStatus from '../../../Component/ProfileStatus';
import filtericon from '../../../assets/icons/mage_filter-fill.svg'
import '../../../assets/css/ManageItem.css'
import { SuccessfulPopup } from '../../../Component/Modals/SuccessfulPopup';
import Table from '../../../Component/Table';
import edit from '../../../assets/icons/editnew.svg';
import { useNavigate } from 'react-router-dom';
import confirmadicon from '../../../assets/icons/confirm-admission.svg';
import exporticon from '../../../assets/icons/export-data.svg';
import { Tooltip } from 'react-tooltip';
import checkgif from '../../../assets/gif/successfullgif.gif';
import close from '../../../assets/icons/close.svg';
import debounce from 'lodash.debounce';
import SearchBar from '../../../Component/SearchBar';
import { countryTableData } from './data';
import MultpleLocationModal from '../../../Component/Modals/AddMultipleLocations';





const ManageCountry = () => {
    const [submit, setsubmit] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Starts from 0
    const [totalCount, setTotalCount] = useState(0);
    const [studentdata, setStudentsdata] = useState([]);
    const [studentid, setstudentid] = useState([]);
    const [isaddMultipleLocatonsModal, setIsaddMultipleLocatonsModal] = useState(false);
    const [selectedIndentDetails, setSelectedIndentDetails] = useState([]);
    const navigate = useNavigate();
    const pageSize = 10;

    const [fieldType, setFieldType] = useState('');

    const today = new Date().toISOString().split('T')[0];
    const [validtydata, setvaliditydata] = useState({
        fromdate: today,
        Todate: ''
    })



    const [filtermodal, setfiltermodal] = useState(false);
    const [filterQueryString, setFilterQueryString] = useState('');

    const pageCounts = Math.ceil(totalCount / pageSize);



    const handleFilterClick = () => {
        // onFilter(searchQuery); 
        setfiltermodal(true);
    };
    const openModal = () => {
        setFieldType("country")
        setIsaddMultipleLocatonsModal(true);
    };

    const closeModal = () => {
        setIsaddMultipleLocatonsModal(false)
        // setIsEditMode(false);
        // setidcardmodal(false);
        // setFingerprints([null, null, null]);
        // setCapturedPhoto();
    };


    const handleRowClick = async (userId, row) => {
        try {
            console.log("handelclick==>", row?.original)
            setSelectedIndentDetails(row?.original);
        } catch (error) {
            console.error("❌ Error fetching employee data:", error);
        }
    };




    const handleSearch = async (query) => {
    };


    const debouncedSearch = useMemo(() => debounce(handleSearch, 100), []);

    useEffect(() => {
        return () => debouncedSearch.cancel(); // cleanup
    }, []);

    const handleEditClick = (userId, row) => {
         setFieldType("country")
         setIsaddMultipleLocatonsModal(true)
    };


    const searchInputRef = useRef(null);
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);
    const columns = useMemo(() => [

        {
            Header: 'Name',
            accessor: 'name',
            disableSortBy: false,
            Cell: ({ value, row }) => (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(row.original.id, row)}
                >
                    <p className="item-values" style={{ color: '#222F3E', fontWeight: 500, fontSize: '14px', }}>{value}</p>
                </div>),
        },

        {
            Header: 'Code',
            accessor: 'code',
            disableSortBy: false,
            Cell: ({ value }) => <p className="item-values">{value}</p>,
        },
        {
            Header: 'Phone Code',
            accessor: 'phoneCode',
            disableSortBy: false,
            Cell: ({ value }) => <p className="item-values">{value}</p>,
        },
        {
            Header: 'Currency',
            accessor: 'currency',
            disableSortBy: false,
            Cell: ({ value }) => <p className="item-values">{value}</p>,
        },
        {
            Header: 'Action',
            disableSortBy: true,
            Cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', }}>
                    <div className="form-check form-switch custom-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={row.original.status}
                            // onChange={() => handleStatus(row.original)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    <img src={edit} alt="Edit" onClick={() => handleEditClick(row.original)} style={{ cursor: 'pointer' }} />
                </div>
            ),
        },
    ], []);


    const handlePageChange = (data) => {
        setCurrentPage(data.selected); // updates useEffect trigger
    };

    return (
        <>
            <div className="dashboard">
                {/* Content for the Dashboard */}
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div >
                        <h2 className='main-heading'>Manage  Country</h2>
                    </div>
                    <div >
                        <button className='add-btn' onClick={openModal}>
                            <span className='me-2'>
                                <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
                                </svg>
                            </span>Create Country
                        </button>
                    </div>
                </div>
            
                <div className='row mt-2'>
                    <div className="col-md-12">
                        <div className="row align-items-center">
                            {/* Heading Column */}
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                {/* <h4 className="text-primary fw-bold">Stock Level Overview</h4> */}
                            </div>

                            {/* Search + Buttons Column */}
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                <div className="d-flex justify-content-lg-end  gap-2">
                                    <SearchBar
                                        data={studentdata}
                                        onSearch={debouncedSearch}
                                        ref={searchInputRef}
                                        placeholder={'Search by Item Name, SQU Code..'}
                                    />
                                    <button
                                        className="filter-btn"
                                        onClick={handleFilterClick}
                                        style={{ height: '43px' }}
                                    >
                                        <img src={filtericon} alt="Filter" />
                                    </button>
                                    <button
                                        className="filter-btn"
                                        style={{
                                            background: 'white',
                                            border: '1px solid #7F56DA',
                                            height: '43px',
                                        }}
                                    >
                                        <img src={exporticon} alt="Export" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {/* {data.length > 0 ? ( */}
                                <Table
                                    columns={columns}
                                    pageCounts={pageCounts}
                                    handlePageChange={handlePageChange}
                                    selectedData={selectedIndentDetails}
                                    data={countryTableData}
                                />
                                {/* ) : (
                                    <div className="no-data-message" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                        No data available
                                    </div>
                                )} */}

                            </div>

                        </div>
                    </div>

                    <div className="col-md-3">
                        {/* <IndentShortDetails navigate={navigate} selectedIndentDetails={selectedIndentDetails} /> */}
                    </div>
                    {/* <AddItemTypes isOpen={isaddItemTypesModal} onClose={closeModal} /> */}
                    <MultpleLocationModal
                        isOpen={isaddMultipleLocatonsModal}
                       fieldType={fieldType}         // 👈 Set what you're creating
                        onClose={closeModal}
                         height='40vh'
                    />
                </div>
            </div >
            <div>
            </div>
        </>
    );
};

export default ManageCountry