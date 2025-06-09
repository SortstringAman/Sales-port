

import { useState, useMemo, useEffect, useRef } from 'react';
import CommonLayout from '../../Component/CommonLayout';
import profileicon from '../../assets/icons/solar_square-academic-cap-2-outline.svg'
import profileicon2 from '../../assets/icons/solar_square-academic-cap-2-outline (1).svg'
import profileicon3 from '../../assets/icons/solar_documents-minimalistic-linear.svg'
import profileicon4 from '../../assets/icons/hugeicons_manager.svg'
import profileicon5 from '../../assets/icons/hugeicons_biometric-device.svg'
import ProfileStatus from '../../Component/ProfileStatus';
import filtericon from '../../assets/icons/mage_filter-fill.svg'
import '../../assets/css/StudentDashboard.css'
import SearchBar from '../../Component/SearchBar';
import { SuccessfulPopup } from '../../Component/Modals/SuccessfulPopup';
import Table from '../../Component/Table';
import image from '../../assets/Images/image.png';
import setting from '../../assets/icons/settings.svg';
import phone from '../../assets/icons/ic_round-phone.svg';
import whatsapp from '../../assets/icons/logos_whatsapp-icon.svg';
import adstatus from '../../assets/icons/statuspur.svg'
import adstatusred from '../../assets/icons/status-red.svg';
import tablelast from '../../assets/icons/tablelast.svg';
import edit from '../../assets/icons/editnew.svg';
import { useNavigate } from 'react-router-dom';
import confirmadicon from '../../assets/icons/confirm-admission.svg';
import exporticon from '../../assets/icons/export-data.svg';
import { Tooltip } from 'react-tooltip';
import checkgif from '../../assets/gif/successfullgif.gif';
import close from '../../assets/icons/close.svg';
import { Filter } from '../../Component/Filter/Filter';
import debounce from 'lodash.debounce';
import { inventoryData, stockInReportData } from './data';
import Select from 'react-select';
import { reactSelectStyles } from '../../Utils/selectboxStyle';
import FilterBar from '../../Utils/FilterReport';


const StockInReport = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submit, setsubmit] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Starts from 0
    const [totalCount, setTotalCount] = useState(0);
    const [studentdata, setStudentsdata] = useState([]);
    const [studentid, setstudentid] = useState([]);
    const [selectedStockDetails, setSelectedStockDetails] = useState([]);
    const [getstudentsdataId, setgetstudentsdataId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [basicdata, setbasicdata] = useState([]);
    const [academicdata, setacademicdata] = useState([]);
    const [docdata, setdocdata] = useState([]);
    const [officialdata, setofficialdata] = useState([]);
    const [idcardmodal, setidcardmodal] = useState(false);
    const navigate = useNavigate();
    const pageSize = 10;
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const [status, setstatus] = useState();
    const [showEditor, setShowEditor] = useState(false);
    const [showvaliditymodal, setshowvaliditymodal] = useState(false);
    const [cardpreview, setcardpreview] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [paymentmodal, setpaymentmodal] = useState(null);
    const [percentage, setpercentage] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [idcarddata, setidcarddata] = useState([]);
    const today = new Date().toISOString().split('T')[0];
    const [validtydata, setvaliditydata] = useState({
        fromdate: today,
        Todate: ''
    })

    const [imgurl, setimgurl] = useState('')
    const [fingerprints, setFingerprints] = useState([null, null, null]);
    const [mainnamehead, setmainnamehead] = useState('');
    const [registrationnumforhead, setregistrationnumforhead] = useState('');
    const [regMode, setregMode] = useState(false);
    const [generatedregno, setgeneratedregno] = useState('');
    const [filtermodal, setfiltermodal] = useState(false);
    const [filterQueryString, setFilterQueryString] = useState('');

    const displayToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setTimeout(() => setShowToast(false), 3000);
    };
    const handleFilterClick = () => {
        // onFilter(searchQuery); 
        setfiltermodal(true);
    };



    const submitclose = () => {
        setsubmit(false);
    };


    const handleRowClick = async (userId, row) => {
        try {
            setSelectedStockDetails(row.original);
        } catch (error) {
            console.error("❌ Error fetching employee data:", error);
        }
    };





    const handleSearch = async (query) => {
        // setSearchQuery(query);

        // const queryParams = new URLSearchParams();

        // // Add existing filter query params if any
        // if (filterQueryString) {
        //     const existingParams = new URLSearchParams(filterQueryString);
        //     existingParams.forEach((value, key) => {
        //         queryParams.append(key, value);
        //     });
        // }

        // // Add search and reset to page 1
        // queryParams.set("search", query);
        // queryParams.set("page", "1");

        // const finalUrl = `students/get-students/?${queryParams.toString()}`;

        // try {
        //     const response = await getData(finalUrl);
        //     setStudentsdata(response?.results || []);
        //     setTotalCount(response?.count || 0);
        //     setgetstudentsdataId(response?.results[0]?.user_id || null);
        //     setFilterQueryString(queryParams.toString()); // Save updated string
        // } catch (err) {
        //     console.error("Search failed:", err);
        // }
    };


    const debouncedSearch = useMemo(() => debounce(handleSearch, 100), []);
    useEffect(() => {
        return () => debouncedSearch.cancel(); // cleanup
    }, []);

    const handleEditClick = (userId, row) => {
        // setIsVendorModalOpen(true)
        // setSelectedUserId(userId);
        // setregistrationnumforhead(row?.original.permanent_registration_number);
        // setmainnamehead(row.original.name);
        // setstudentid(userId);
        // setIsEditMode(true);
        // setregMode(false);
        // setIsModalOpen(true); // open the modal
    };
    const columns = useMemo(
        () => [
            {
                Header: 'Transaction ID',
                accessor: 'transaction_id',
                disableSortBy: true,
                Cell: ({ value, row }) => (
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRowClick(row.original.id, row)}
                    >
                        <p style={{ margin: 0, fontWeight: 400, fontSize: '14px', color: '#222F3E', textAlign: 'start' }}>
                            {value}
                        </p>
                    </div>
                ),
            },
            {
                Header: 'Date',
                accessor: 'date', // Make sure your data includes this field
                disableSortBy: true,
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'start', margin: 0, color: '#222F3E',fontWeight: 400, fontSize: '14px' }}>{value || '-'}</p>
                ),
            },
            {
                Header: 'Product Name',
                accessor: 'product_name',
                disableSortBy: true,
                Cell: ({ value, row }) => (
                    <div className='d-flex align-items-center' style={{gap:'9px'}}>
                        <p style={{ textAlign: 'start', margin: 0, color: '#7F56DA' ,fontWeight:'600',fontSize:'14px'}}>{value || '-'}</p>
                        <span style={{ fontSize: '12px', color: '#222F3E' }}>
                            ({row.original.sku_code || '-'})
                        </span>
                    </div>
                ),
            },

            {
                Header: 'Quantity Received',
                accessor: 'quantity_received',
                disableSortBy: true,
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'start', margin: 0, color: '#222F3E', fontWeight: '600', fontSize: '14px' }}>{value || '-'}</p>
                ),
            },
            {
                Header: 'Source',
                accessor: 'source',
                disableSortBy: true,
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'start', margin: 0, color: ' #7F56DA', fontWeight: '600' }}>{value || '-'}</p>
                ),
            },
            {
                Header: 'Vendor Name',
                accessor: 'vendor_name',
                disableSortBy: true,
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'start', fontWeight: 400, fontSize: '14px', margin: 0, color: '#222F3E' }}>{value || '-'}</p>
                ),
            },
            {
                Header: 'Received By',
                accessor: 'received_by',
                disableSortBy: true,
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'start', margin: 0,fontWeight:'600', color: '#222F3E' }}>{value || '-'}</p>
                ),
            },
            {
                Header: 'Remarks',
                accessor: 'remarks',
                disableSortBy: true,
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'start', margin: 0, color: '#6B778C',fontWeight: 400, fontSize: '14px', }}>{value || '-'}</p>
                ),
            },
        ],
        []
    );



    const handlePageChange = (data) => {
        setCurrentPage(data.selected); // updates useEffect trigger
    };


    const pageCounts = Math.ceil(totalCount / pageSize);
    console.log("pageCounts--newSt", pageCounts)

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const itemOptions = [
        { value: 'Item 1', label: 'Item 1' },
        { value: 'Item 2', label: 'Item 2' },
        { value: 'Item 3', label: 'Item 3' },
    ];
    return (
        <>
            <div className="dashboard">
                {/* Content for the Dashboard */}
                <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '28px' }}>
                    <div >
                        <h2 className='main-heading'>Stock In Report</h2>
                    </div>
                    <div style={{ display: "flex", gap: "25px" }} >
                    </div>
                </div>

                <div className='row mt-2'>
                    <div className="col-md-12">
                        <FilterBar />
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className="col-md-12">
                        <div className="row" style={{ alignItems: 'center' }}>
                             <div className="row align-items-center">
              {/* Heading Column */}
              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                <h4 className="text-primary fw-bold">Stock In Report</h4>
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
                      border: '1px solid black',
                      height: '43px',
                    }}
                  >
                    <img src={exporticon} alt="Export" />
                  </button>
                </div>
              </div>
            </div>
                            <div className="col-md-6">
                                <div style={{ display: "flex", justifyContent: 'end' }}>
                                    <SearchBar data={studentdata} onSearch={debouncedSearch} ref={searchInputRef} placeholder={'Serach by Item Name, SQU Code..'} />
                                    <button
                                        className="filter-btn"
                                        onClick={handleFilterClick}
                                        style={{ height: '43px' }}
                                    >
                                        <img src={filtericon}></img>
                                    </button>
                                    <button
                                        className="filter-btn"
                                        style={{ background: 'white', border: '1px solid black', height: '43px' }}
                                    // onClick={handleFilterClick}
                                    // onClick={handleExportExcel}
                                    >
                                        <img src={exporticon} alt='Filter icon'></img>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {/* <Table columns={columns}
                  pageCounts={pageCounts} handlePageChange={handlePageChange} selectedOrgDetails={selectedOrgDetails} data={data} /> */}
                                {/* {data.length > 0 ? ( */}
                                <Table
                                    columns={columns}
                                    pageCounts={pageCounts}
                                    handlePageChange={handlePageChange}
                                    selectedData={selectedStockDetails}
                                    data={stockInReportData}
                                />
                                {/* ) : ( */}
                                {/* <div className="no-data-message" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                        No data available
                                    </div>
                                )} */}

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        {/* <StockShortDetails navigate={navigate} selectedStockDetails={selectedStockDetails} */}
                        {/* // getstudentsdataId={getstudentsdataId} */}

                    </div>
                </div>
            </div >



            {showToast && (
                <div
                    className={`custom-toast toast align-items-center text-white bg-${toastVariant} border-0 position-fixed top-0 end-0 m-3`}
                    role="alert"
                    style={{
                        display: 'block',
                        minWidth: '300px',
                        maxWidth: '400px',
                        borderRadius: '8px',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                        fontSize: '15px',
                        zIndex: 9999
                    }}
                >
                    <div className="d-flex">
                        <div className="toast-body" style={{ padding: '12px 16px' }}>
                            <strong>{toastVariant === 'success' ? '✅' : '❌'} </strong> {toastMessage}
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            onClick={() => setShowToast(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                </div>

            )}

        </>
    );
};






export default StockInReport