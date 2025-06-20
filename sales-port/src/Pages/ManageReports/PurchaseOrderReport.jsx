

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
import { indentReportData, inventoryData, purchaseOrderReportData, stockInReportData, stockOutReportData } from './data';
import Select from 'react-select';
import { reactSelectStyles } from '../../Utils/selectboxStyle';
import FilterBar from '../../Utils/FilterReport';


const PurchseOfferReport = () => {
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
        //     const response = await GetData(finalUrl);
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
    const columns = [
        {
            Header: 'PO Number',
            accessor: 'po_number',
            disableSortBy: true,
            Cell: ({ value, row }) => (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRowClick(row.original.id, row)}
                >
                    <p style={{
                        margin: 0,
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#222F3E',
                        textAlign: 'start',
                    }}>
                        {value || '-'}
                    </p>
                </div>
            ),
        },
        {
            Header: 'PO Date',
            accessor: 'po_date',
            disableSortBy: true,
            Cell: ({ value }) => (
                <p style={{
                    textAlign: 'start',
                    margin: 0,
                    color: '#222F3E',
                    fontWeight: 400,
                    fontSize: '14px',
                }}>
                    {value || '-'}
                </p>
            ),
        },
        {
            Header: 'Vendor Name',
            accessor: 'vendor_name',
            disableSortBy: true,
            Cell: ({ value }) => (
                <p style={{
                    textAlign: 'start',
                    margin: 0,
                    color: '#222F3E',
                    fontWeight: 400,
                    fontSize: '14px',
                }}>
                    {value || '-'}
                </p>
            ),
        },
        {
            Header: 'Linked Indent (S) ',
            accessor: 'linked_indents',
            disableSortBy: true,
            Cell: ({ value }) => (
                <p style={{
                    textAlign: 'start',
                    margin: 0,
                    color: '#222F3E',
                    fontWeight: 400,
                    fontSize: '14px',

                }}>
                    {value || '-'}
                </p>
            ),
        },
        {
            Header: 'Delivery Status',
            accessor: 'delivery_status',
            disableSortBy: true,
            Cell: ({ value }) => {
                let bgColor = '';
                let textColor = '#fff';

                if (value === 'Pending') {
                    bgColor = '#E7F9F3';
                    textColor = '#39886F';

                } else if (value === 'Partially Received') {
                    textColor = '#FF9A04'
                    bgColor = ' #FFF8EC';

                } else {
                    textColor = '#222F3E';
                }

                return (
                    <span
                        style={{
                            padding: '4px 12px',
                            backgroundColor: bgColor,
                            color: textColor,
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: 600,
                            display: 'inline-block',
                            minWidth: '75px',
                            textAlign: 'center',
                        }}
                    >
                        {value || '-'}
                    </span>
                );
            },
        },

        {
            Header: () => <div style={{ textAlign: '' }}>PO Status</div>,
            accessor: 'po_status',
            disableSortBy: true,
            Cell: ({ value }) => {
                let bgColor = '#dff9fb';
                let textColor = '#10ac84';

                if (value === 'Pending') {
                    bgColor = '#feca5733';
                    textColor = '#f79f1f';
                } else if (value === 'Cancelled') {
                    bgColor = '#ff6b6b33';
                    textColor = '#ee5253';
                } else if (value === 'Approved') {
                    bgColor = '#dff9fb';
                    textColor = '#10ac84';
                }

                return (
                    <span style={{
                        padding: '4px 8px',
                        backgroundColor: bgColor,
                        color: textColor,
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        display: 'inline-block',
                        minWidth: '75px',
                        textAlign: 'center',
                    }}>
                        {value || '-'}
                    </span>
                );
            },
        },
        {

            Header: () => <div style={{ textAlign: 'end' }}>Total Amount</div>,
            accessor: 'total_amount',
            disableSortBy: true,
            Cell: ({ value }) => (
                <p style={{
                    textAlign: 'end',
                    margin: 0,
                    color: '#222F3E',
                    fontWeight: 600,
                    fontSize: '14px',
                }}>
                    ₹{value?.toLocaleString() || '0'}
                </p>
            ),
        },
        {
        
             Header: () => <div style={{ textAlign: 'center' }}>Download PO</div>,
            accessor: 'download_link',
            disableSortBy: true,
            Cell: ({ value }) => (
                <div style={{ textAlign: 'center' }}>     <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor:'pointer'}}>
                    <g clip-path="url(#clip0_174_16056)">
                        <path d="M10.125 1.34375C10.125 0.721484 9.62227 0.21875 9 0.21875C8.37773 0.21875 7.875 0.721484 7.875 1.34375V9.87617L5.29453 7.2957C4.85508 6.85625 4.14141 6.85625 3.70195 7.2957C3.2625 7.73516 3.2625 8.44883 3.70195 8.88828L8.20195 13.3883C8.64141 13.8277 9.35508 13.8277 9.79453 13.3883L14.2945 8.88828C14.734 8.44883 14.734 7.73516 14.2945 7.2957C13.8551 6.85625 13.1414 6.85625 12.702 7.2957L10.125 9.87617V1.34375ZM2.25 12.5938C1.00898 12.5938 0 13.6027 0 14.8438V15.9688C0 17.2098 1.00898 18.2188 2.25 18.2188H15.75C16.991 18.2188 18 17.2098 18 15.9688V14.8438C18 13.6027 16.991 12.5938 15.75 12.5938H12.1816L10.5891 14.1863C9.71016 15.0652 8.28633 15.0652 7.40742 14.1863L5.81836 12.5938H2.25ZM15.1875 14.5625C15.4113 14.5625 15.6259 14.6514 15.7841 14.8096C15.9424 14.9679 16.0312 15.1825 16.0312 15.4062C16.0312 15.63 15.9424 15.8446 15.7841 16.0029C15.6259 16.1611 15.4113 16.25 15.1875 16.25C14.9637 16.25 14.7491 16.1611 14.5909 16.0029C14.4326 15.8446 14.3438 15.63 14.3438 15.4062C14.3438 15.1825 14.4326 14.9679 14.5909 14.8096C14.7491 14.6514 14.9637 14.5625 15.1875 14.5625Z" fill="#7F56DA" />
                    </g>
                    <defs>
                        <clipPath id="clip0_174_16056">
                            <path d="M0 0.21875H18V18.2188H0V0.21875Z" fill="white" />
                        </clipPath>
                    </defs>
                </svg></div>


                // <p
                //     style={{
                //         textAlign: 'start',
                //         margin: 0,
                //         color: '#7F56DA',
                //         textDecoration: value ? 'underline' : 'none',
                //         fontWeight: 600,
                //         fontSize: '14px',
                //         cursor: value ? 'pointer' : 'default',
                //     }}
                //     onClick={() => value && window.open(value, '_blank')}
                // >
                //     {value ? 'Download' : '-'}
                // </p>
            ),
        },
    ];







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
                        <h2 className='main-heading'>Purchase Order Report</h2>
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
                        <div className="row align-items-center">
              {/* Heading Column */}
              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                <h4 className="text-primary fw-bold">Purchase Order Report</h4>
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
                                {/* <Table columns={columns}
                  pageCounts={pageCounts} handlePageChange={handlePageChange} selectedOrgDetails={selectedOrgDetails} data={data} /> */}
                                {/* {data.length > 0 ? ( */}
                                <Table
                                    columns={columns}
                                    pageCounts={pageCounts}
                                    handlePageChange={handlePageChange}
                                    selectedData={selectedStockDetails}
                                    data={purchaseOrderReportData}
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



      

        </>
    );
};







export default PurchseOfferReport