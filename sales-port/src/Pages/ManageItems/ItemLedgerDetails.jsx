import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dummyLedgerData } from "./data";
import ProfileStatus from "../../Component/ProfileStatus";
import profileicon from '../../assets/icons/solar_square-academic-cap-2-outline.svg'
import profileicon2 from '../../assets/icons/solar_square-academic-cap-2-outline (1).svg'
import profileicon3 from '../../assets/icons/solar_documents-minimalistic-linear.svg'
import profileicon4 from '../../assets/icons/hugeicons_manager.svg'
import profileicon5 from '../../assets/icons/hugeicons_biometric-device.svg'
import SearchBar from "../../Component/SearchBar";
import exporticon from '../../assets/icons/export-data-white.svg';
import filtericon from '../../assets/icons/mage_filter-fill.svg'
import Table from "../../Component/Table";
import debounce from "lodash.debounce";
import { ItemLedgerShortDetails } from "./ItemLedgerShortDetail";
import rightArow from '../../assets/icons/arrow-next-small-svgrepo-com.svg'
const ItemLedgerDetails = () => {
    const location = useLocation();
    console.log("location", location)
    console.log("location state", location.state)
    const rowData = location.state?.rowData;
    console.log("row datas", rowData)

    const [selectedItemLedgerDetails, setselectedItemLedgerDetails] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0); // Starts from 0
    const pageSize = 10;
    const pageCounts = Math.ceil(totalCount / pageSize);
    const [itemLedgerdata, setItemLedgerdata] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    const [toastMessage, setToastMessage] = useState('');

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const navigate = useNavigate()

    const handlePageChange = (data) => {
        setCurrentPage(data.selected); // updates useEffect trigger
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
    const handleRowClick = (itemId, row) => {
        let selectedItem = null;
        console.log("row--", row.original)

        if (row.original.id === itemId) {
            selectedItem = row.original;
        }
        if (selectedItem) {
            console.log("selected==>>>", selectedItem)
            setselectedItemLedgerDetails(selectedItem); // Set selected ledger item details
        } else {
            console.error("Fee Details not found");
        }
    };



    const debouncedSearch = useMemo(() => debounce(handleSearch, 100), []);
    const columns = useMemo(() => [
        {
            Header: 'Date of Transaction',
            accessor: 'date',
            disableSortBy: false,
            Cell: ({ row }) => (
                <div
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => handleRowClick(row.original.id, row)}
                >
                    <div>
                        <p style={{ margin: 0, color: '#222F3E', fontWeight: '500',fontSize:'14px', textAlign: 'start' }}>
                            {row.original.date}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            Header: 'Transaction No.',
            accessor: 'transactionNo',
            disableSortBy: false,
            Cell: ({ value }) => (
                <p style={{ margin: 0, fontWeight: 400, color: '#222F3E', textAlign: 'start' }}>{value}</p>
            ),
        },
        {
            Header: () => <div style={{ textAlign: 'right', width: '100%' }}>Credit</div>,
            accessor: 'credit',
            disableSortBy: true, // ✅ Disable sorting
            Cell: ({ value }) => (
                <p style={{ margin: 0, fontWeight: 400,fontSize:'14px', color: '#222F3E', textAlign: 'right' }}>
                    {value.toFixed(2)}
                </p>
            ),
        },
        {
            Header: () => <div style={{ textAlign: 'right', width: '100%' }}>Debit</div>,
            accessor: 'debit',
            disableSortBy: true, // ✅ Disable sorting
            Cell: ({ value }) => (
                <p style={{ margin: 0, fontWeight: 400,fontSize:'14px', color: '#222F3E', textAlign: 'right' }}>
                    {value.toFixed(2)}
                </p>
            ),
        },
        {
            Header: () => <div style={{ textAlign: 'right', width: '100%' }}>Balance</div>,
            accessor: 'balance',
            disableSortBy: true, // ✅ Disable sorting
            Cell: ({ value }) => (
                <p style={{ margin: 0, fontWeight: 400,fontSize:'14px', color: '#222F3E', textAlign: 'right' }}>
                    {value.toFixed(2)}
                </p>
            ),
        },
    ], []);


    return (
        <>
            <div className="dashboard">
                {/* Content for the Dashboard */}
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div >
                        <h2 className='main-heading'  > <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/manageItems')}>Manage Items</span>
                            <svg
                                class="rightarrow"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                            >
                                <path
                                    d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
                                    fill="currentColor"
                                    transform="translate(0.3, 0.3)"
                                ></path>
                            </svg>


                            <span style={{ color: 'black', fontSize: '24px' }}>{rowData?.name} ({rowData?.sku_code})</span> </h2>
                    </div>


                </div>
                <div className="dashboard-cards row mt-2" style={{ padding: "20px" }} >
                    <ProfileStatus
                        label="Current Stock"
                        icon={profileicon}
                        // percentage={percentage.all_students}
                        iconColor="#39886F"
                        bgColor="#39886F0D"
                        circleColor=" #39886F"
                        numbers="10000"
                        width="340px"
                    />
                    <ProfileStatus
                        label="Record Level"
                        icon={profileicon2}
                        // percentage={percentage.provisional_fees_percentage}
                        iconColor="#0E9DED"
                        bgColor="#0E9DED0D"
                        circleColor="#0E9DED"
                        // numbers={percentage.provisional_fees_count}
                        numbers="5000"
                        width="600px"
                    />
                    <ProfileStatus
                        label="Min Stock Level"
                        icon={profileicon3}
                        // percentage={percentage.registration_percentage}
                        iconColor=" #FF9B04"
                        bgColor="#FF9B040D"
                        circleColor=" #FF9B04"
                        // numbers={percentage.registration_count}
                        numbers="4000"
                        width="600px"
                    />


                </div>
                <div className='row mt-2'>
                    <div className="col-md-9">
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col-md-6">
                                {/* <h4 className='text-primary'>All Items totalCount</h4> */}
                            </div>
                            <div className="col-md-6">
                                <div style={{ display: "flex", justifyContent: 'end' }}>
                                    <SearchBar data={itemLedgerdata} onSearch={debouncedSearch} ref={searchInputRef} placeholder={'Serach by Item Name, S K U code..'} />
                                    <button
                                        className="filter-btn"
                                        // onClick={handleFilterClick}
                                        style={{ height: '43px' }}
                                    >
                                        <img src={filtericon}></img>
                                    </button>
                                    <button
                                        className="filter-btn"
                                        style={{ background: '#7F56DA', height: '43px', color: "white", border: "none" }}
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
                                    selectedOrgDetails={selectedItemLedgerDetails}
                                    data={dummyLedgerData}
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
                        <ItemLedgerShortDetails selectedItemLedgerDetails={selectedItemLedgerDetails} />
                    </div>
                    {/* <div className="col-md-3">
            <StudentShortDetails navigate={navigate} selectedOrgDetails={selectedOrgDetails}
              getstudentsdataId={getstudentsdataId} />
          </div> */}
                </div>
            </div >
            <div>

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


    )
}

export default ItemLedgerDetails