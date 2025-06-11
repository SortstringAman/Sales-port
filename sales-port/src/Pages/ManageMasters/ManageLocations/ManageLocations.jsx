
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
import Select from 'react-select';
import { reactSelectStyles } from '../../../Utils/selectboxStyle';
import ManageCountry from './ManageCountry';
import ManageStates from './ManageState';
import ManageDistricts from './ManageDistrict';




const ManageLocations = () => {
    const [submit, setsubmit] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Starts from 0
    const [totalCount, setTotalCount] = useState(0);

    const navigate = useNavigate();
    const pageSize = 10;

    const today = new Date().toISOString().split('T')[0];
    const [validtydata, setvaliditydata] = useState({
        fromdate: today,
        Todate: ''
    })
    const [selectedType, setSelectedType] = useState('country');


    const [filtermodal, setfiltermodal] = useState(false);
    const [filterQueryString, setFilterQueryString] = useState('');

    const pageCounts = Math.ceil(totalCount / pageSize);


    const handleRowClick = async (userId, row) => {


        try {
            console.log("handelclick==>", row?.original)
          

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
        setIsaddItemTypesModal(true)
      
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
            Header: 'Description',
            accessor: 'description',
            disableSortBy: false,
            Cell: ({ value }) => <p className="item-values">{value}</p>,
        },
        {
            Header: 'Action',
            disableSortBy: true,
            Cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', }}>
                    {/* <div className="form-check form-switch custom-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked={row.original.isActive}
                        // onChange={() => handleStatus(row.original)}
                        style={{ cursor: 'pointer' }}
                    />
                </div> */}
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
                <div className='row' style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div className='col-md-8'>
                        <h2 className='main-heading'>Choose Locations</h2>
                    </div>
                    <div className='col-md-3' >
                        <Select
                            options={[
                                { value: 'country', label: 'Country' },
                                { value: 'state', label: 'State' },
                                { value: 'district', label: 'District' }
                            ]}
                            styles={reactSelectStyles}
                            onChange={(e) => setSelectedType(e.value)}
                            placeholder="Select Location Type"
                        />

                    </div>
                </div>
             

                <div className='row mt-2'>
                    
                    <div className="col-md-12">
                        <div className="row align-items-center">
                          
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                {/* <h4 className="text-primary fw-bold">Stock Level Overview</h4> */}
                            </div>

                            {/* Search + Buttons Column */}
                            {/* <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
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
                            </div> */}
                        </div>
                        {/* <div className="row">
                            <div className="col-md-12">
                                {/* {data.length > 0 ? ( */}
                                {/* <Table
                                    columns={columns}
                                    pageCounts={pageCounts}
                                    handlePageChange={handlePageChange}
                                    selectedData={selectedIndentDetails}
                                    data={itemTypes}
                                /> */}
                                {/* ) : (
                                    <div className="no-data-message" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                        No data available
                                    </div>
                                )} */}

                            {/* </div>

                        </div>  */}
                    </div>



                    <div className="col-md-3">
                        {/* <IndentShortDetails navigate={navigate} selectedIndentDetails={selectedIndentDetails} /> */}
                    </div>
                    {/* <AddItemTypes isOpen={isaddItemTypesModal} onClose={closeModal} /> */}
                    {selectedType === 'country' && <ManageCountry />}
                    {selectedType === 'state' && <ManageStates />}
                    {selectedType === 'district' && <ManageDistricts />}

                </div>
            </div >
            <div>
            </div>
        </>
    );
};


export default ManageLocations