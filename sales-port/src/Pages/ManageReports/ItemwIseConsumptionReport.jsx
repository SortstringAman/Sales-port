



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
import { consumptionReportData, inventoryData, reorderReportData } from './data';
import Select from 'react-select';
import { reactSelectStyles } from '../../Utils/selectboxStyle';
import FilterBar from '../../Utils/FilterReport';


const ItemWiseConsumptionReport= () => {
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
      Header: 'Product Name',
      accessor: 'productname',
      disableSortBy: true,
      Cell: ({ value, row }) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => handleRowClick(row.original.id, row)}
        >
          <p style={{ margin: 0, fontWeight: 500, fontSize: '14px', color: '#7F56DA', textAlign: 'start' }}>
            {value} <br />
            <span style={{ fontSize: '10px', color: '#222F3E', fontWeight: 700 }}>
              ({row.original.sku_code})
            </span>
          </p>
        </div>
      ), 

    },
    {
      Header: 'Total Issued',
      accessor: 'total_issued',
      disableSortBy: true,
      Cell: ({ value }) => (
        <p style={{ textAlign: 'start', margin: 0, color: '#222F3E', fontSize: '14px' }}>
          {value?.toLocaleString() || '-'}
        </p>
      ),
    },
    {
      Header: 'Avg. Monthly',
      accessor: 'avg_monthly',
      disableSortBy: true,
      Cell: ({ value }) => (
        <p style={{ textAlign: 'start', margin: 0, color: '#222F3E', fontSize: '14px' }}>
          {value?.toLocaleString() || '-'}
        </p>
      ),
    },
    {
      Header: 'Last Issued',
      accessor: 'last_issued',
      disableSortBy: true,
      Cell: ({ value }) => (
        <p style={{ textAlign: 'start', margin: 0, color: '#222F3E', fontSize: '14px' }}>
          {value || '-'}
        </p>
      ),
    },
    {
  Header: 'Trend',
  accessor: 'trend',
  disableSortBy: true,
  Cell: ({ value }) => {
    const isPositive = value === 'Positive';

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {isPositive ? (
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_175_18453)">
              <path d="M13.4997 5.625C12.8774 5.625 12.3747 5.12227 12.3747 4.5C12.3747 3.87773 12.8774 3.375 13.4997 3.375H19.1247C19.747 3.375 20.2497 3.87773 20.2497 4.5V10.125C20.2497 10.7473 19.747 11.25 19.1247 11.25C18.5024 11.25 17.9997 10.7473 17.9997 10.125V7.21758L12.0442 13.1695C11.6048 13.609 10.8911 13.609 10.4517 13.1695L6.74971 9.46758L1.91924 14.2945C1.47979 14.734 0.766113 14.734 0.32666 14.2945C-0.112793 13.8551 -0.112793 13.1414 0.32666 12.702L5.95166 7.07695C6.39111 6.6375 7.10479 6.6375 7.54424 7.07695L11.2497 10.7824L16.4071 5.625H13.4997Z" fill="#39886F"/>
            </g>
            <defs>
              <clipPath id="clip0_175_18453">
                <path d="M0 0H20.25V18H0V0Z" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        ) : (
          <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_175_18501)">
              <path d="M13.4997 12.6251C12.8774 12.6251 12.3747 13.1278 12.3747 13.7501C12.3747 14.3724 12.8774 14.8751 13.4997 14.8751H19.1247C19.747 14.8751 20.2497 14.3724 20.2497 13.7501V8.1251C20.2497 7.50283 19.747 7.0001 19.1247 7.0001C18.5024 7.0001 17.9997 7.50283 17.9997 8.1251V11.0325L12.0442 5.08057C11.6048 4.64111 10.8911 4.64111 10.4517 5.08057L6.74971 8.78252L1.91924 3.95557C1.47979 3.51611 0.766113 3.51611 0.32666 3.95557C-0.112793 4.39502 -0.112793 5.10869 0.32666 5.54814L5.95166 11.1731C6.39111 11.6126 7.10479 11.6126 7.54424 11.1731L11.2497 7.46768L16.4071 12.6251H13.4997Z" fill="#EC4131"/>
            </g>
            <defs>
              <clipPath id="clip0_175_18501">
                <path d="M0 0.25H20.25V18.25H0V0.25Z" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        )}
        {/* <span style={{ fontSize: '13px', fontWeight: 600, color: isPositive ? '#10ac84' : '#ee5253' }}>
          {value}
        </span> */}
      </div>
    );
  },
}

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
            <h2 className='main-heading'>Item-wise Consumption Report</h2>
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
              <div className="col-md-6">
                {/* <h4 className='text-primary'>All Stock  </h4> */}  <div className="col-md-6">
                  <h4 className='text-primary' style={{ fontWeight: 'bold' }}>Consumption Overview</h4>
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
                  data={consumptionReportData}
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




 

export default ItemWiseConsumptionReport