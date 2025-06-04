
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
import { dummydata } from './data';
import { VendorShortDetails } from './VendorsShortDetails';
import { AddNewVendor } from '../../Component/Modals/AddVendor.jsX';
 

const ManageVendors = () => {
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


    const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);

    const openVendorModal = () => {
        setIsVendorModalOpen(true)
    }


    const closeVendorModal = () => {
        setIsVendorModalOpen(false)
        setIsEditMode(false);
    }
    const openModal = () => {
        setIsModalOpen(true);
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
    // const handleExportExcel = () => {
    //   const token = window.localStorage.getItem('token');
    //   const baseUrl = 'https://bgi.sortstring.com/api/v1/students/students/export/excel/';
    //   const urlWithParams = filterQueryString ? `${baseUrl}?${filterQueryString}` : baseUrl;

    //   fetch(urlWithParams, {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Token ${token}`
    //     }
    //   })
    //     .then(response => {
    //       if (!response.ok) throw new Error("Failed to download file");
    //       return response.blob();
    //     })
    //     .then(blob => {
    //       const url = window.URL.createObjectURL(blob);
    //       const a = document.createElement('a');
    //       a.href = url;
    //       a.download = 'students_export.xlsx';
    //       document.body.appendChild(a);
    //       a.click();
    //       a.remove();
    //     })
    //     .catch(error => {
    //       displayToast('❌ Excel export failed', 'danger');
    //       console.error("Download error:", error);
    //     });
    // };
    const handleExportExcel = async () => {
        try {
            const urlWithParams = filterQueryString
                ? `students/export-student-payments-to-xls/?${filterQueryString}`
                : 'students/export-student-payments-to-xls/';

            const blob = await getBlob(urlWithParams);

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'students_export.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            displayToast('❌ Excel export failed', 'danger');
        }
    };

    const handleRowClick = async (userId, row) => {
        try {


            setSelectedOrgDetails(row.original);
        } catch (error) {
            console.error("❌ Error fetching employee data:", error);
        }
    };


    const data = useMemo(() => {
        return studentdata?.map((emp) => {
            const course = emp?.provisional_academic_group?.specialization?.course?.alias || 'N/A';
            const year = '2022–25'; // You can derive it from admission year + course duration if needed
            const semester = emp.lag?.academic_group?.name || 'N/A';
            const section = emp.lag?.name || '';
            const semesterInfo = section ? `${semester} - ${section}` : semester;
            setstatus(emp.status)
            return {
                id: emp.user_id,
                // name: `${emp.first_name || ''} ${emp.middle_name=== null || "null" ||"Null"?'':emp.middle_name} ${emp.last_name || ''}`,
                name: `${emp.first_name || ''} ${emp.middle_name && emp.middle_name.toLowerCase() !== 'null' ? emp.middle_name : ''} ${emp.last_name || ''}`,

                email: emp.email || '',
                contacts: emp.contact_numbers || [],
                img: emp.profile_picture || null,
                status: emp.status,
                course,
                year,
                semester: semesterInfo,
                lag: emp.lag,
                status: emp.status,
                permanent_registration_number: emp.permanent_registration_number,
                fees_payment_status: emp.fees_payment_status,
                registration_status: emp.registration_status,
                provisional_fees_status: emp.provisional_fees_status,
                handleRowClick: handleRowClick
            };
        });
    }, [studentdata]);



    // const handleSearch = (query) => {
    //   setSearchQuery(query);
    // };
    // const filteredData = useMemo(() => {
    //   if (!searchQuery) {
    //     return data;
    //   }
    //   return data.filter((org) =>
    //     org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     org.email.toLowerCase().includes(searchQuery.toLowerCase())
    //     // org.id.toString().includes(searchQuery)
    //   );
    // }, [searchQuery, data]);
    const handleSearchold = async (query) => {
        setSearchQuery(query);
        const url = `students/get-students/?search=${query}&page=1`; // Always reset to page 1 when searching
        const response = await getData(url);
        setStudentsdata(response.results || []);
        setTotalCount(response.count || 0);
        setgetstudentsdataId(response?.results[0]?.user_id || null);
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
        setIsVendorModalOpen(true)
        // setSelectedUserId(userId);
        // setregistrationnumforhead(row?.original.permanent_registration_number);
        // setmainnamehead(row.original.name);
        // setstudentid(userId);
        // setIsEditMode(true);
        // setregMode(false);
        // setIsModalOpen(true); // open the modal
    };
    const handleregisClick = (userId, row) => {
        setSelectedUserId(userId);
        setregistrationnumforhead(row.original.permanent_registration_number);
        setmainnamehead(row.original.name);
        setstudentid(userId);
        setIsEditMode(true);
        setregMode(true);
        setIsModalOpen(true); // open the modal
    };
    const handleStatus = async (row) => {
        const newStatus = !row.original.status;
        setstatus(newStatus) // Toggle status for that specific row
        // Update the status for that row in your table
        row.original.status = newStatus;

        // Optionally, make an API call here to update the status on the backend
        // const url = `administration/organizations/${row.original.id}/`;
        const url = `students/update-student-status/${row.original.id}/`;
        const response = await patchData(url, { status: newStatus });

        if (response && !response.error) {
            displayToast('Status Updated successfully!', 'success');
            // getorgdata()
        } else if (response && response.error) {
            const errorMsg = response.error?.[0] || 'Error Updating Status.';
            displayToast(errorMsg, 'danger');
        } else {
            displayToast('Unexpected error occurred.', 'danger');
        }
        // Log or handle response as needed
        console.log("Updated Status:", response);
    };
    const handlegenerateIdcard = async (id) => {
        let url = `students/get-student-attendance/${id}/`;
        let res = await getData(url);
        if (res) {
            setidcarddata(res);
        }
        console.log("responseidcard--", res);
    }

    const columns = useMemo(
        () => [
            {
                Header: "Vendor's Name / ID",
                accessor: 'name',
                Cell: ({ row }) => (
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRowClick(row.original.id, row)}
                    >
                        <p style={{  color: '#222F3E',  fontWeight: 'bold', textAlign: 'start', margin: 0 }}>
                            {row.original.name}
                        </p>
                        <p style={{ textAlign: 'left', margin: 0 }}>
                            {row.original.permanent_registration_number || '-'}
                        </p>
                    </div>
                ),
            },
            {
                Header: 'Vendor Type',
                accessor: 'vendor_type',
                Cell: ({ value, row }) => {
                    console.log('Vendor Type value:', value, 'row:', row.original);
                    return (
                        <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>
                            {value || '-'}
                        </p>
                    );
                },
            },

            {
                Header: 'Contacts',
                accessor: 'contacts',
                Cell: ({ row }) => {
                    const contact =
                        row.original.contacts.find(c => c.contact_type === 'Mobile') ||
                        row.original.contacts[0];
                    const number = contact?.number || 'N/A';
                    const isWhatsapp = contact?.is_available_on_whatsapp;

                    return (
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px',color: '#222F3E' }}>
                                <img src={phone} alt="Phone" />
                                <p>{number}</p>
                            </div>
                            {isWhatsapp && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <img
                                        src={whatsapp}
                                        style={{ width: '12px', height: '12px',color: '#222F3E', }}
                                        alt="WhatsApp"
                                    />
                                    <p>{number}</p>
                                </div>
                            )}
                        </div>
                    );
                },
            },
            {
                Header: 'Email',
                accessor: 'email',
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>
                        {value || '-'}
                    </p>
                ),
            },
            {
                Header: 'Location',
                accessor: 'location',
                Cell: ({ value }) => (
                    <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>
                        {value || '-'}
                    </p>
                ),
            },
            {
                Header: 'Action',
                Cell: ({ row }) => (
                    <div
                        style={{ display: 'flex', gap: '10px' }}
                        data-tooltip-id="vendor-tip"
                        data-tooltip-content="Actions"
                    >
                        <div className="form-check form-switch custom-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                style={{ cursor: 'pointer' }}
                                checked={row.original.status}
                                onChange={() => handleStatus(row)}
                            />
                        </div>
                        <img
                            src={edit}
                            style={{ cursor: 'pointer' }}
                            alt="Edit"
                            onClick={() => handleEditClick(row.original.id, row)}
                            data-tooltip-id="vendor-tip"
                            data-tooltip-content="Edit Vendor"
                        />

                    </div>
                ),
            },
        ],
        []
    );

    const handlePageChange = (data) => {
        setCurrentPage(data.selected); // updates useEffect trigger
    };

    useEffect(() => {
        const fetchStudents = async (page = 0) => {
            const url = filterQueryString
                ? `students/get-students/?${filterQueryString}&page=${page + 1}`
                : `students/get-students/?page=${page + 1}`;
            const response = await getData(url);
            setStudentsdata(response?.results || []);
            setTotalCount(response?.count || 0);
            setgetstudentsdataId(response?.results[0]?.user_id);
        };
        fetchStudents(currentPage);
    }, [currentPage, generatedregno, filterQueryString]);

    const pageCounts = Math.ceil(totalCount / pageSize);
    console.log("pageCounts--newSt", pageCounts)


    useEffect(() => {
        const fetchStudents = async (page = 0) => {
            const url = `students/get-students/?page=${page + 1}`; // API is 1-indexed
            const response = await getData(url);
            setStudentsdata(response?.results || []);
            setTotalCount(response?.count || 0);
            setgetstudentsdataId(response?.results[0]?.user_id)
        };
        fetchStudents(currentPage)
    }, [status])


    useEffect(() => {
        const handleRowClick = async () => {
            const token = window.localStorage.getItem("token");

            try {
                // const response = await fetch(`https://bgi.sortstring.com/api/v1/students/get-students/${getstudentsdataId}/`, {
                //   method: 'GET',
                //   headers: {
                //     Authorization: `Token ${token}`
                //   }
                // });
                const response = await getData(`students/get-students/${getstudentsdataId}/`)

                // if (!response.ok) {
                //   throw new Error("Failed to fetch employee details");
                // }

                // const employeeData = await response.json();
                setSelectedOrgDetails(response);
                // Save data in state or localStorage (depending on your use case)
                localStorage.setItem("selectedEmployeeData", JSON.stringify(response));
                console.log("✅ Employee Data:", response);

                // Optionally, update state to use in a modal
                // setSelectedEmployeeData(employeeData); // if you're using it in a modal later

            } catch (error) {
                console.error("❌ Error fetching employee data:", error);
            }
        };
        handleRowClick()
    }, [getstudentsdataId]);



    useEffect(() => {
        const fetchAllData = async () => {
            if (isEditMode && selectedUserId) {
                try {
                    const [
                        basicData,
                        academicData,
                        officialData,
                        uploadData
                    ] = await Promise.all([
                        getData(`students/student-onboarding-basic-details/${selectedUserId}/`),
                        getData(`students/get-student-onboarding-qualification-details/${selectedUserId}/`),
                        getData(`students/get-student-onboarding-official-details/${selectedUserId}/`),
                        getData(`students/student-onboarding-documents-details/get-student-documents/?student_id=${selectedUserId}`),
                    ]);

                    if (basicData) setbasicdata(basicData);
                    if (academicData) setacademicdata(academicData);
                    if (officialData) setofficialdata(officialData);
                    if (uploadData) setdocdata(uploadData);

                } catch (err) {
                    console.error("❌ Failed to fetch student onboarding data:", err);
                }
            }
        };

        fetchAllData();
    }, [isEditMode, selectedUserId, currentStep]);

    const getallpercentages = async () => {
        let url = 'students/student-dashboard-percentages/';
        let res = await getData(url);
        if (res) {
            setpercentage(res)
        }
    }
    useEffect(() => {
        getallpercentages();
    }, [generatedregno])
    useEffect(() => {
        getallpercentages();
    }, [])
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
                        <h2 className='main-heading'>Manage Vendors</h2>
                    </div>
                    <div >

                        <button className='add-btn' onClick={openVendorModal}>
                            <span className='me-2'>
                                <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
                                </svg>
                            </span>Create Vendor
                        </button>

                    </div>


                </div>
                <div className="dashboard-cards row mt-2" style={{ padding: "20px" }} >
                    <ProfileStatus
                        label="No of Vendors"
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
                        label="Active"
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
                        label="DEACTIVE"
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
                                <h4 className='text-primary'>All Vendors ({totalCount})</h4>
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
                                        onClick={handleExportExcel}
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
                                {data.length > 0 ? (
                                    <Table
                                        columns={columns}
                                        pageCounts={pageCounts}
                                        handlePageChange={handlePageChange}
                                        selectedOrgDetails={selectedOrgDetails}
                                        data={dummydata}
                                    />
                                ) : (
                                    <div className="no-data-message" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                                        No data available
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <VendorShortDetails navigate={navigate} selectedOrgDetails={selectedOrgDetails}
                        // getstudentsdataId={getstudentsdataId}
                        />
                    </div>
                </div>
            </div >



            <AddNewVendor isOpen={isVendorModalOpen} onClose={closeVendorModal} />

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
            {paymentmodal && <IDValidityModal setshowvaliditymodal={setshowvaliditymodal} setcardpreview={setcardpreview} setpaymentmodal={setpaymentmodal} setvaliditydata={setvaliditydata} validtydata
                ={validtydata} setFingerprints={setFingerprints} setCapturedPhoto={setCapturedPhoto} selectedOrgDetails={selectedOrgDetails} setidcarddata={setidcarddata} idcarddata={idcarddata} />}

            {cardpreview && <IDPreviewModal setcardpreview={setcardpreview} selectedOrgDetails={selectedOrgDetails} fingerprints={fingerprints} imgurl={imgurl} setFingerprints={setFingerprints} setCapturedPhoto={setCapturedPhoto} capturedPhoto={capturedPhoto} setidcarddata={setidcarddata} idcarddata={idcarddata} />}
            {filtermodal && <Filter setfiltermodal={setfiltermodal} setStudentsdata={setStudentsdata}
                filterQueryString={filterQueryString} setFilterQueryString={setFilterQueryString} setTotalCount={setTotalCount} setCurrentPage={setCurrentPage} />}
        </>
    );
};



export default ManageVendors