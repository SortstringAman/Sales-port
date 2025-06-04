



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
import AddNewStudentModal from '../../Component/Modals/AddNewStudentModal';
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
import { getBlob, getData, patchData } from '../../API/GlobalApi';
import { GenerateIDModal } from '../../Component/Modals/GenerateIDModal';
import { PhotoEditor } from '../../Component/PhotoEditor';
import { IDValidityModal } from '../../Component/Modals/IDValidityModal';
import { IDPreviewModal } from '../../Component/Modals/IDPreviewModal';
import confirmadicon from '../../assets/icons/confirm-admission.svg';
import exporticon from '../../assets/icons/export-data.svg';
import { Tooltip } from 'react-tooltip';
import checkgif from '../../assets/gif/successfullgif.gif';
import close from '../../assets/icons/close.svg';
import { Filter } from '../../Component/Filter/Filter';
import debounce from 'lodash.debounce';

import { ReceiveStock } from '../../Component/Modals/ReceiveStock';
import { IssueStock } from '../../Component/Modals/IssueStock';
import POsShortDetails from './POsShortdetails';
import { purchaseOrdersData } from './data';
import { AddPurchaseOrder } from '../../Component/Modals/AddPurchaseOrder';


const ManagePOs = () => {
    const [isPurchaseOrderOpen, setIsPurchaseOrderOpen] = useState(false);
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

    const today = new Date().toISOString().split('T')[0];
    const [validtydata, setvaliditydata] = useState({
        fromdate: today,
        Todate: ''
    })
    const pageCounts = Math.ceil(totalCount / pageSize);
    console.log("pageCounts--newSt", pageCounts)
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




    const openModal = () => {
        setIsPurchaseOrderOpen(true)
    };

    const closeModal = () => {
        setIsPurchaseOrderOpen(false);
        setIsEditMode(false);
    }

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
        setSearchQuery(query);

        const queryParams = new URLSearchParams();

        // Add existing filter query params if any
        if (filterQueryString) {
            const existingParams = new URLSearchParams(filterQueryString);
            existingParams.forEach((value, key) => {
                queryParams.append(key, value);
            });
        }

        // Add search and reset to page 1
        queryParams.set("search", query);
        queryParams.set("page", "1");

        const finalUrl = `students/get-students/?${queryParams.toString()}`;

        try {
            const response = await getData(finalUrl);
            setStudentsdata(response?.results || []);
            setTotalCount(response?.count || 0);
            setgetstudentsdataId(response?.results[0]?.user_id || null);
            setFilterQueryString(queryParams.toString()); // Save updated string
        } catch (err) {
            console.error("Search failed:", err);
        }
    };


    const debouncedSearch = useMemo(() => debounce(handleSearch, 100), []);
    useEffect(() => {
        return () => debouncedSearch.cancel(); // cleanup
    }, []);

    const handleEditClick = (userId, row) => {
        setIsPurchaseOrderOpen(true)
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
                Header: 'Date of PO',
                accessor: 'date',
                Cell: ({ value, row }) => (
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRowClick(row.original.id, row)}
                    >
                        <p style={{ margin: 0, color: '#222F3E', fontWeight: 'bold', textAlign: 'start' }}>{value || '-'}</p>
                    </div>
                ),
            },
            {
                Header: 'PO No',
                accessor: 'po_no',
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'left', fontSize: '14px', fontWeight: 500, margin: 0 }}>{value || '-'}</p>
                ),
            },
            {
                Header: 'Vendor Name',
                accessor: 'vendor_name',
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'left', margin: 0 }}>{value || '-'}</p>
                ),
            },
            {
                Header: 'Vendor Contact',
                accessor: 'vendor_contact',
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'left', margin: 0 }}>{value || '-'}</p>
                ),
            },
            {
                Header: 'PO Value',
                accessor: 'po_value',
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'left', margin: 0 }}>{value || '-'}</p>
                ),
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => (
                    <span
                        style={{
                            fontWeight: 'bold',
                            color:
                                value === 'OPEN'
                                    ? '#FFA000'
                                    : value === 'CLOSED'
                                        ? 'green'
                                        : 'red',
                            textTransform: 'uppercase',
                        }}
                    >
                        {value || '-'}
                    </span>
                ),
            },
            {
                Header: 'Created By',
                accessor: 'created_by',
                Cell: ({ row }) => (
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{row.original.created_by}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{row.original.created_on}</p>
                    </div>
                ),
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <img
                            src={edit}
                            style={{ cursor: 'pointer' }}
                            alt="Edit"
                            onClick={() => handleEditClick(row.original.id, row)}
                            data-tooltip-id="vendor-tip"
                            data-tooltip-content="Edit POs"
                        />
                        {/* <button onClick={() => handleDownload(row.original.id)}>
                        <img src={downloadIcon} alt="Download" />
                    </button> */}
                    </div>
                ),
            },
        ],
        []
    );


    const handlePageChange = (data) => {
        setCurrentPage(data.selected); // updates useEffect trigger
    };



    const searchInputRef = useRef(null);
       useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    return (
        <>
            <div className="dashboard">
                {/* Content for the Dashboard */}
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div >
                        <h2 className='main-heading'>Manage Purchase Order</h2>
                    </div>
                    <div style={{ display: "flex", gap: "25px" }} >


                        <button className='add-btn' onClick={openModal}>
                            <span className='me-2'>
                                <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
                                </svg>
                            </span>Create Purchase Order
                        </button>

                    </div>


                </div>
                <div className="dashboard-cards row mt-2" style={{ padding: "20px" }} >
                    <ProfileStatus
                        label="CLOSED"
                        icon={profileicon}
                        // percentage={percentage.all_students}
                        percentage="150"
                        iconColor="#39886F"
                        bgColor="#39886F0D"
                        circleColor=" #39886F"
                        // numbers={percentage.all_students}
                        numbers="150"
                    />
                    <ProfileStatus
                        label="OPEN"
                        icon={profileicon2}
                        // percentage={percentage.provisional_fees_percentage}
                        percentage="220"
                        iconColor="#0E9DED"
                        bgColor="#0E9DED0D"
                        circleColor="#0E9DED"
                        // numbers={percentage.provisional_fees_count}
                        numbers="220"
                    />
                    <ProfileStatus
                        label="CANCELLED"
                        icon={profileicon3}
                        //    / /percentage={percentage.registration_percentage}
                        percentage="30"
                        iconColor=" #FF9B04"
                        bgColor="#FF9B040D"
                        circleColor=" #FF9B04"
                        // numbers={percentage.registration_count}
                        numbers="30"
                    />


                </div>
                <div className='row mt-2'>
                    <div className="col-md-9">
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col-md-6">
                                {/* <h4 className='text-primary'>All Stock  </h4> */}
                            </div>
                            <div className="col-md-6">
                                <div style={{ display: "flex", justifyContent: 'end' }}>
                                    <SearchBar data={studentdata} onSearch={debouncedSearch} ref={searchInputRef} placeholder={'Serach by Name, Reg. No, Phone No, Email..'} />
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
                                    selectedStockDetails={selectedStockDetails}
                                    data={purchaseOrdersData}
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
                        <POsShortDetails navigate={navigate} selectedStockDetails={selectedStockDetails}
                        // getstudentsdataId={getstudentsdataId}
                        />
                    </div>
                    <AddPurchaseOrder isOpen={isPurchaseOrderOpen} onClose={closeModal} />
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





export default ManagePOs