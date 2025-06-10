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
import { mockData } from './data';
import AddItem from '../../Component/Modals/AddItem';

const ManageItems = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submit, setsubmit] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Starts from 0
    const [totalCount, setTotalCount] = useState(0);
    const [studentdata, setStudentsdata] = useState([]);
    const [studentid, setstudentid] = useState([]);
    const [selectedOrgDetails, setSelectedOrgDetails] = useState([]);
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
    const openModal = () => {
        setIsModalOpen(true);
    };


    const [addItemModal, setAddItemModal] = useState(false)


    const openaddItemModal = () => {
        setAddItemModal(true);
    };

    const closeaddItemModal = () => {
        setAddItemModal(false);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setidcardmodal(false);
        setFingerprints([null, null, null]);
        setCapturedPhoto();
    };
    const submitclose = () => {
        setsubmit(false);
    };

    const pageCounts = Math.ceil(totalCount / pageSize);



    const handleRowClick = async (itemId, row) => {
        // const token = window.localStorage.getItem("token");
        console.log('Row clicked:for redirection', itemId, row.original);
        navigate(`/manageItems/${itemId}`, {
            state: { rowData: row.original },
        });
        try {
            // const response = await fetch(`https://bgi.sortstring.com/api/v1/students/get-students/${userId}/`, {
            //   method: 'GET',
            //   headers: {
            //     Authorization: `Token ${token}`
            //   }
            // });
            // const response = await getData(`students/get-students/${userId}/`)

            // if (!employeeData || employeeData.error) {
            //   throw new Error("Failed to fetch employee details");
            // }

            // const employeeData = await response.json();
            // setSelectedOrgDetails(response);
            // Save data in state or localStorage (depending on your use case)
            // localStorage.setItem("selectedEmployeeData", JSON.stringify(response));
            // console.log("✅ Employee Data:", response);

            // Optionally, update state to use in a modal
            // setSelectedEmployeeData(employeeData); // if you're using it in a modal later

        } catch (error) {
            console.error("❌ Error fetching employee data:", error);
        }
    };







    const handleEdit = (row) => {
        const orgData = row.original;
        console.log("orgDataedit----", orgData);
        // setorgform({
        //   id: orgData.id,
        //   name: orgData.name,
        //   level: orgData.level,
        //   mode: orgData.mode,
        //   mode_count: orgData.mode_count,
        //   duration: orgData.duration,
        //   organization_id: orgData.organization_id,
        //   alias: orgData.alias,
        //   // status:false
        // });
        // setparentorgidsub(orgData.id);
        openaddItemModal();
        setUpdatebtn(true);

    }

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




    const columns = useMemo(() => [
        {
            Header: <input type="checkbox" />,
            accessor: 'checkbox',
            disableSortBy: true,
            Cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.isSelected}
                    onChange={() => row.toggleRowSelected()}
                />
            ),
        },
        {
            Header: () => <span style={{ color: '#222F3E', fontWeight: 500, fontSize: '14px', margin: 0, textAlign: 'start', }} className='itemName'>Item Name  <span style={{ fontSize: '10px', fontWeight: 500 }}> (SKU CODE)</span> </span>,
            accessor: 'name',
            Cell: ({ row }) => (
                <div
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                    onClick={() => handleRowClick(row.original.id, row)}
                >
                    <div>
                        <p style={{ margin: 0, color: '#222F3E', fontWeight: 500, fontSize: '14px', textAlign: 'start' }}>
                            {row.original.name}
                        </p>
                        <p style={{ margin: 0, textAlign: 'start', color: '#222F3E', fontWeight: 700, fontSize: '10px' }}>
                            ({row.original.sku_code})
                        </p>
                    </div>
                </div>
            ),
        },

        {
            Header: "Item Group",
            accessor: 'item_group',
            Cell: ({ value }) => (
                <p style={{ color: '#222F3E', fontWeight: 400, margin: 0, fontSize: '14px', textAlign: 'start' }}>{value}</p>
            ),
        },
        {
            Header: 'Available Stock',
            accessor: 'available_stock',
            Cell: ({ value }) => (
                <p style={{ color: '#222F3E', fontWeight: 400, fontSize: '14px', margin: 0, textAlign: 'start' }}>{value}</p>
            ),
        },
        {
            Header: 'Min Stock Level',
            accessor: 'min_stock_level',
            Cell: ({ value }) => (
                <p style={{ color: '#222F3E', fontWeight: 400, fontSize: '14px', margin: 0, textAlign: 'start' }}>{value}</p>
            ),
        },
        {
            Header: 'Reorder Level',
            accessor: 'reorder_level',
            Cell: ({ value }) => (
                <p style={{ color: '#222F3E', fontWeight: 400, fontSize: '14px', margin: 0, textAlign: 'start' }}>{value}</p>
            ),
        },
        {
            Header: 'Last Purchased',
            accessor: 'combined_info', // virtual accessor, since you'll use `Cell` to render manually
            Cell: ({ row }) => {
                const lastPurchased = row.original.last_purchased;
                const supplier = row.original.supplier;

                return (
                    <div style={{ textAlign: 'start' }}>
                        <p style={{ color: '#222F3E', fontWeight: 400, fontSize: '14px', margin: 0, textAlign: 'start' }}>{lastPurchased}</p>
                        <p style={{ color: '#222F3E', fontWeight: 400, margin: 0, fontSize: '14px', textAlign: 'start' }}>({supplier})</p>
                    </div>
                );
            },
            disableSortBy: true // optional
        },

        {
            Header: 'Stock Status',
            accessor: 'stock_status',
            disableSortBy: true,
            Cell: ({ value }) => {
                let color = '#39886F'; // Default for AVAILABLE

                if (value === 'REORDER ITEM') color = '#FF9B04';
                else if (value === 'SOS') color = '#EC4232';

                return (
                    <h6 style={{
                        color,
                        fontWeight: 700,
                        fontSize: '16px',
                        margin: 0,
                        textAlign: 'start',
                        textTransform: 'uppercase'
                    }}>
                        {value}
                    </h6>
                );
            }
        },
        {
            Header: 'Action',

            disableSortBy: true,
            Cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                    <img
                        src={edit}
                        alt="Edit"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleEdit(row.original);

                        }}
                    />

                </div>
            ),
        },
    ], []);

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
                        <h2 className='main-heading'>Manage Items</h2>
                    </div>
                    <div >

                        <button className='add-btn' onClick={openaddItemModal}>
                            <span className='me-2'>
                                <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
                                </svg>
                            </span>Create Item
                        </button>

                    </div>

                </div>
                <div className="dashboard-cards item row mt-2" style={{
                    // display: 'flex',
                    //  flexWrap: 'wrap',
                    // gap: '1rem',
                    padding: '20px',
                    //  justifyContent:'center'
                    gap: '10px'
                }}>
                    <ProfileStatus
                        label="No Of Products"
                        icon={profileicon}
                        percentage={percentage.all_students}
                        iconColor="#39886F"
                        bgColor="#39886F0D"
                        circleColor=" #39886F"
                        numbers="1560"
                        colClass="col-12 col-sm-12 col-md-5 col-lg-4  col-xl-3 mb-3"

                    />
                    <ProfileStatus
                        label="Item Groups"
                        icon={profileicon2}
                        percentage={percentage.provisional_fees_percentage}
                        iconColor="#0E9DED"
                        bgColor="#0E9DED0D"
                        circleColor="#0E9DED"
                        numbers="50"
                        colClass="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-3 mb-3"

                    />
                    <ProfileStatus
                        label="Record Level"
                        icon={profileicon3}
                        percentage={percentage.registration_percentage}
                        iconColor=" #FF9B04"
                        bgColor="#FF9B040D"
                        circleColor=" #FF9B04"
                        numbers="15"
                        colClass="col-12 col-sm-12 col-md-5 col-lg-3 col-xl-3 mb-3"

                    />
                    <ProfileStatus
                        label="Min Stock Level"
                        icon={profileicon4}
                        percentage={percentage.fees_payment_percentage}
                        iconColor=" #2A62C8"
                        bgColor=" #2A62C80D"
                        circleColor=" #2A62C8"
                        numbers= "06"
                        colClass="col-12 col-sm-12 col-md-5 col-lg-4  col-xl-3 mb-3"

                    />

                </div>
                <div className='row mt-2'>
                    <div className="col-md-12">
                       
                       <div className="row align-items-center">
                            {/* Heading Column */}
                            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-2">
                                <h4 className="text-primary fw-bold">All Items</h4>
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
                                    selectedData={selectedOrgDetails}
                                    data={mockData}
                                />
                                {/* ) : (
                                    <div className="no-data-message" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                        No data available
                                    </div>
                                )} */}

                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-3">
            <StudentShortDetails navigate={navigate} selectedOrgDetails={selectedOrgDetails}
              getstudentsdataId={getstudentsdataId} />
          </div> */}
                </div>
            </div >
            <div>
                <AddItem isOpen={addItemModal} onClose={closeaddItemModal} />
            </div>
           

        </>
    );
};

export default ManageItems;
