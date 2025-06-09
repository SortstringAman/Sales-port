import { useState, useMemo, useEffect, useRef } from 'react';
import CommonLayout from '../../Component/CommonLayout';
import profileicon from '../../assets/icons/solar_square-academic-cap-2-outline.svg'
import profileicon2 from '../../assets/icons/solar_square-academic-cap-2-outline (1).svg'
import profileicon3 from '../../assets/icons/solar_documents-minimalistic-linear.svg'
import profileicon4 from '../../assets/icons/hugeicons_manager.svg'
import profileicon5 from '../../assets/icons/hugeicons_biometric-device.svg'
import ProfileStatus from '../../Component/ProfileStatus';
import filtericon from '../../assets/icons/mage_filter-fill.svg'
import '../../assets/css/ManageItem.css'
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
import exporticon from '../../assets/icons/export-data-white.svg';
import { Tooltip } from 'react-tooltip';
import checkgif from '../../assets/gif/successfullgif.gif';
import close from '../../assets/icons/close.svg';
import { Filter } from '../../Component/Filter/Filter';
import debounce from 'lodash.debounce';
import { indentData } from './data';
import { IndentShortDetails } from './IndentShortDetails';
import { AddIndent } from '../../Component/Modals/AddIndent';

const ManageIndents = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submit, setsubmit] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Starts from 0
    const [totalCount, setTotalCount] = useState(0);
    const [studentdata, setStudentsdata] = useState([]);
    const [studentid, setstudentid] = useState([]);

    const [getstudentsdataId, setgetstudentsdataId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndentDetails, setSelectedIndentDetails] = useState([]);
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
    const [imgurl, setimgurl] = useState('')

    const [filtermodal, setfiltermodal] = useState(false);
    const [filterQueryString, setFilterQueryString] = useState('');

    const pageCounts = Math.ceil(totalCount / pageSize);
    const [isaddIndentModalOpen, setIsAddIndentModalOpen] = useState(false);


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
        setIsAddIndentModalOpen(true);
    };




    // const closeModal = () => {
    //     setIsAddItemModalOpen(false);
    //     setUpdatebtn(false);
    //     handleClear();
    // };
    const closeModal = () => {
        setIsAddIndentModalOpen(false)
        // setIsEditMode(false);
        // setidcardmodal(false);
        // setFingerprints([null, null, null]);
        // setCapturedPhoto();
    };
    const submitclose = () => {
        setsubmit(false);
    };


    const handleRowClick = async (userId, row) => {


        try {
            console.log("handelclick==>", row?.original)
            // const response = await fetch(`https://bgi.sortstring.com/api/v1/students/get-students/${userId}/`, {
            // //   method: 'GET',
            // //   headers: {
            // //     Authorization: `Token ${token}`
            // //   }
            // // });
            // const response = await getData(`students/get-students/${userId}/`)

            // // if (!employeeData || employeeData.error) {
            // //   throw new Error("Failed to fetch employee details");
            // // }

            // // const employeeData = await response.json();
            setSelectedIndentDetails(row?.original);
            // Save data in state or localStorage (depending on your use case)
            // localStorage.setItem("selectedEmployeeData", JSON.stringify(response));
            // console.log("✅ Employee Data:", response);

            // Optionally, update state to use in a modal
            // setSelectedEmployeeData(employeeData); // if you're using it in a modal later

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
        setIsAddIndentModalOpen(true)
        // setSelectedUserId(userId);
        // setregistrationnumforhead(row?.original.permanent_registration_number);
        // setmainnamehead(row.original.name);
        // setstudentid(userId);
        // setIsEditMode(true);
        // setregMode(false);
        // setIsModalOpen(true); // open the modal
    };


    const searchInputRef = useRef(null);
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);
    const columns = useMemo(() => [

        {
            Header: 'Date of Indent',
            accessor: 'date',
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
            Header: 'Indent No',
            accessor: 'indent_no',
            disableSortBy: false,
            Cell: ({ value }) => <p className="item-values">{value}</p>,
        },
        {
            Header: 'Department',
            accessor: 'department',
            disableSortBy: true,
            Cell: ({ value }) => <p className="item-values">{value}</p>,
        },
        {
            Header: 'Indent Priority',
            accessor: 'priority',
            disableSortBy: true,
            Cell: ({ value }) => <p className="item-values">{value}</p>,
        },
        {
            Header: 'Store Location',
            disableSortBy: true,
            accessor: 'store_location',
            Cell: ({ value }) => <p className="item-values">{value}</p>,
        },
        {
            Header: 'Status',
            accessor: 'status',
            disableSortBy: true,
            Cell: ({ value }) => {
                let color = '#39886F'; // default green for APPROVED

                if (value === 'OPEN') color = '#FF9B04';
                else if (value === 'REJECTED') color = '#FF5C5C';

                return (
                    <p style={{
                        textAlign: 'start',
                        color,
                        fontWeight: 'bold',
                        fontSize: '14px',
                        margin: 0,
                        textTransform: 'uppercase',
                    }}>
                        {value}
                    </p>
                );
            },
        },
        {
            Header: 'Raised By',
            accessor: 'raised_by',
            disableSortBy: true,
            Cell: ({ row }) => (
                <div style={{ lineHeight: 1.2 }}>
                    <p className="item-values">{row.original.raised_by}</p>
                    <p className="item-values raiseOn">({row.original.raised_on})</p>
                </div>
            ),
        },
        {
            Header: 'Action',
            disableSortBy: true,
            Cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', }}>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.27783 9.78083C8.1369 9.98497 9.54822 11.5615 9.54822 13.4347C9.54822 13.6626 9.52748 13.8855 9.48776 14.1018H12.9421C13.6056 12.5956 15.0963 11.6176 16.7505 11.6176C18.4049 11.6176 19.8954 12.5956 20.5592 14.1018H21.4509V3.60534H6.27783V9.78083ZM14.6638 15.9649C14.2977 15.3833 15.1831 14.826 15.5492 15.4076L16.0624 16.2207L18.0116 14.1241C18.4806 13.6199 19.2468 14.333 18.7778 14.8372L16.3665 17.4311C16.133 17.6783 15.7252 17.6464 15.5408 17.3532L14.6638 15.9649ZM13.6397 15.7777C13.6397 17.4956 15.0326 18.8885 16.7505 18.8885C18.4687 18.8885 19.8613 17.4956 19.8613 15.7777C19.8613 14.0864 18.4947 12.6667 16.7505 12.6667C15.0326 12.6667 13.6397 14.0596 13.6397 15.7777ZM12.6375 15.1509H9.12374C8.96563 15.4501 8.7673 15.7246 8.53634 15.9677C9.60843 16.7962 10.2439 18.0691 10.2439 19.4281V21.9193C10.2439 22.209 10.0091 22.4437 9.71948 22.4437H2.02441C1.73476 22.4437 1.5 22.209 1.5 21.9193V19.4281C1.5 18.0689 2.13546 16.7964 3.2078 15.9677C2.58069 15.3085 2.19567 14.4165 2.19567 13.4347C2.19567 11.6518 3.47746 10.1236 5.22877 9.81447V3.08093C5.22877 2.79103 5.46352 2.55627 5.75317 2.55627H21.9756C22.2652 2.55627 22.5 2.79103 22.5 3.08093V14.6265C22.5 14.9161 22.2652 15.1509 21.9756 15.1509H20.8635C20.8944 15.3553 20.9106 15.5647 20.9106 15.7777C20.9106 18.0749 19.048 19.9375 16.7505 19.9375C14.453 19.9375 12.5907 18.0752 12.5907 15.7777C12.5907 15.5645 12.6066 15.3553 12.6375 15.1509ZM15.4174 6.61972C14.7273 6.61972 14.7273 5.57066 15.4174 5.57066H18.669C19.3589 5.57066 19.3589 6.61972 18.669 6.61972H15.4174ZM15.4174 8.81195C14.7273 8.81195 14.7273 7.76289 15.4174 7.76289H18.669C19.3589 7.76289 19.3589 8.81195 18.669 8.81195H15.4174ZM9.05974 5.00451H13.426C13.7156 5.00451 13.9506 5.23927 13.9506 5.52892V8.85344C13.9506 9.14334 13.7156 9.3781 13.426 9.3781H9.05974C8.77009 9.3781 8.53533 9.14334 8.53533 8.85344V5.52892C8.53533 5.23927 8.77009 5.00451 9.05974 5.00451ZM12.9013 6.05358H9.5844V8.32904H12.9013V6.05358ZM3.24473 13.4347C3.24473 14.8911 4.42635 16.0618 5.87207 16.0618C7.31298 16.0618 8.49916 14.8951 8.49916 13.4347C8.49916 11.9839 7.32285 10.8076 5.87207 10.8076C4.4218 10.8076 3.24473 11.9837 3.24473 13.4347ZM7.67346 16.6401C7.14096 16.9399 6.5265 17.1111 5.87207 17.1111C5.21739 17.1111 4.60292 16.9399 4.07042 16.6401C3.12533 17.2546 2.54906 18.2978 2.54906 19.4281V21.3946H9.19482V19.4281C9.19482 18.2978 8.61856 17.2546 7.67346 16.6401Z" fill="#7F56DA" />
                    </svg>

                    <img src={edit} alt="Edit" onClick={() => handleEditClick(row.original)} style={{ cursor: 'pointer' }} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ cursor: 'pointer', color: '#7A4FF5' }}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>



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
                        <h2 className='main-heading'>Manage Indents</h2>
                    </div>
                    <div >

                        <button className='add-btn' onClick={openModal}>
                            <span className='me-2'>
                                <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
                                </svg>
                            </span>Create Indent
                        </button>

                    </div>


                </div>
                <div className="dashboard-cards indent row mt-2" style={{ padding: "20px", gap: '10px', }} >

                    <ProfileStatus
                        label="APPROVED"
                        icon={profileicon}
                        // percentage={percentage.all_students}
                        iconColor="#39886F"
                        bgColor="#39886F0D"
                        circleColor=" #39886F"
                        numbers="100"
                        colClass="col-12 col-sm-12 col-md-5 col-lg-3 mb-3"

                    />
                    <ProfileStatus
                        label="OPEN"
                        icon={profileicon2}
                        // percentage={percentage.provisional_fees_percentage}
                        iconColor="#0E9DED"
                        bgColor="#0E9DED0D"
                        circleColor="#0E9DED"
                        numbers="10"
                        colClass="col-12 col-sm-12 col-md-5 col-lg-3 mb-3"

                    />
                    <ProfileStatus
                        label="REJECTED"
                        icon={profileicon3}
                        // percentage={percentage.registration_percentage}
                        iconColor=" #FF9B04"
                        bgColor="#FF9B040D"
                        circleColor=" #FF9B04"
                        numbers="2"
                        colClass="col-12 col-sm-12 col-md-5 col-lg-3 mb-3"

                    />


                </div>
                <div className='row mt-2'>
                    <div className="col-md-9">
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
                                            // background: 'white',
                                            // border: '1px solid black',
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
                                    data={indentData}
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
                        <IndentShortDetails navigate={navigate} selectedIndentDetails={selectedIndentDetails} />
                    </div>

                </div>
            </div >
            <div>
                <AddIndent isOpen={isaddIndentModalOpen} onClose={closeModal} />
            </div>


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

export default ManageIndents;
