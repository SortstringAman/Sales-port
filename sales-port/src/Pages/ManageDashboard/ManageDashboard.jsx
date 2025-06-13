
import { useState, useMemo, useEffect, useRef } from 'react';
import '../../assets/css/StudentDashboard.css'
import { dashboardData, lowStockAlert, stockData } from './data';
import '../../assets/css/SearchBar.css'
import { getData } from '../../API/GlobalApi';
const ManageDashboard = () => {
    console.log("🔥 Componenet rerendered");
    const getOrgData = async () => {
        console.log("🔥 Calling getOrgData");
        const url = "administration/organizations/"
        const response = await getData(url)
        console.log("testing for get data", response)
    }

    useEffect(() => {
        getOrgData()
    }, [])

    return (
        <>
            <div className="dashboard">
                {/* Content for the Dashboard */}
                <div style={{ display: "flex", marginBottom: '28px' }} >
                    <div >
                        <h2 className='main-heading'> Inventry & Purchase Control</h2>
                        <p className='dashboard-p' style={{ fontSize: "20px" }}>Centralized view for Indent,Purchase Orders,Stock,and Alerts.</p>
                    </div>
                    <div style={{ display: "flex", gap: "25px" }} >
                    </div>
                </div>
                <div className="row "  >
                    <div className='col-md-10' style={{ margin: 'auto' }}>
                        <div className='row d-flex  justify-content-center dashboard-card-container' style={{ gap: '40px' }} clas>
                            {dashboardData.map((item, index) => (
                                <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={index}>
                                    <div
                                        className="border shadow-sm dashboard-card"
                                        style={{
                                            width: "100%",
                                            padding: "15px",
                                            borderRadius: "20px",
                                            height: "150px",
                                        }}>
                                        <div className="d-flex align-items-center mb-3 div" style={{ gap: '5px' }}>
                                            <img
                                                src={item.icon}
                                                alt={item.title}
                                                style={{
                                                    // width: "10vw",
                                                    // height: "24px",
                                                    // marginRight: "10px",
                                                    // objectFit: "contain",
                                                }}
                                            />
                                            <span
                                                className="mb-0"
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "400",
                                                    color: "#000000",
                                                    wordSpacing: '7px'
                                                }}
                                            >
                                                {item.title}
                                            </span>
                                        </div>
                                        <h4 className={`text-${item.color} fw-400 mb-2 `} style={{ fontSize: '30px' }}>{item.value}</h4>
                                        <small className="" style={{ color: "#9CA3AF" }}>
                                            {item.subtitle}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className="col-md-10 product-btn-container" style={{ margin: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                        <h6 className='dashboard-product'>Product  Below Record Level</h6>
                        <button className='export-excel'>  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_175_21600)">
                                <path d="M2.17188 0C1.34453 0 0.671875 0.672656 0.671875 1.5V10.5C0.671875 11.3273 1.34453 12 2.17188 12H8.17188C8.99922 12 9.67188 11.3273 9.67188 10.5V3.75H6.67188C6.25703 3.75 5.92188 3.41484 5.92188 3V0H2.17188ZM6.67188 0V3H9.67188L6.67188 0ZM4.32109 5.86406L5.17188 7.08047L6.02266 5.86406C6.20078 5.60859 6.55234 5.54766 6.80547 5.72578C7.05859 5.90391 7.12188 6.25547 6.94375 6.50859L5.85859 8.0625L6.94609 9.61406C7.12422 9.86953 7.06328 10.2188 6.80781 10.3969C6.55234 10.575 6.20312 10.5141 6.025 10.2586L5.17188 9.04219L4.32109 10.2586C4.14297 10.5141 3.79141 10.575 3.53828 10.3969C3.28516 10.2188 3.22187 9.86719 3.4 9.61406L4.48516 8.0625L3.39766 6.51094C3.21953 6.25547 3.28047 5.90625 3.53594 5.72812C3.79141 5.55 4.14063 5.61094 4.31875 5.86641L4.32109 5.86406Z" fill="#4338CA" />
                            </g>
                            <defs>
                                <clipPath id="clip0_175_21600">
                                    <path d="M0.671875 0H9.67188V12H0.671875V0Z" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                            <span>Export Excel</span> </button>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className="col-md-10" style={{ margin: 'auto', display: 'flex', justifyContent: 'space-between', padding: '0px 25px' }}>
                        <table className="table  table-hover table-borderless stockdata-dashboard ">
                            <thead className="custom-head">
                                <tr>
                                    <th>Product Name</th>
                                    <th>Current Stock</th>
                                    <th>Reorder Level</th>
                                    <th>Last Stock In</th>
                                    <th>Last Stock Out</th>
                                    <th>Suggested Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td style={{ color: item.currentStock <= item.reorderLevel ? "red" : "black" }}>
                                            {item.currentStock}
                                        </td>
                                        <td>{item.reorderLevel}</td>
                                        <td>{item.lastStockIn}</td>
                                        <td>{item.lastStockOut}</td>
                                        <td>
                                            <span
                                                className="badge"
                                                style={
                                                    item.action === "Urgent Purchase"
                                                        ? { backgroundColor: "#F8D7DA", color: "#842029" } // optional: Bootstrap danger style
                                                        : { backgroundColor: "#FEF3C7", color: "#92400E" }
                                                }
                                            >
                                                {item.action}
                                            </span>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className="col-md-11" style={{ margin: 'auto', }}>
                        <div className='row alertContainerMain' style={{ margin: 'auto', display: 'flex', justifyContent: 'space-evenly' }}>
                            <div className='col-md-5 border  shadow-sm p-4' style={{ borderRadius: '8px', }} >
                                <div className='d-flex' style={{ gap: '13px' }}>
                                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_177_21682)">
                                            <path d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM8 4C8.41562 4 8.75 4.33437 8.75 4.75V8.25C8.75 8.66562 8.41562 9 8 9C7.58437 9 7.25 8.66562 7.25 8.25V4.75C7.25 4.33437 7.58437 4 8 4ZM7 11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11C9 11.2652 8.89464 11.5196 8.70711 11.7071C8.51957 11.8946 8.26522 12 8 12C7.73478 12 7.48043 11.8946 7.29289 11.7071C7.10536 11.5196 7 11.2652 7 11Z" fill="#EF4444" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_177_21682">
                                                <path d="M0 0H16V16H0V0Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <p className='low-stock'>Low Stock Alerts</p>
                                </div>
                                <div className='mt-3'>
                                    <table className="table  table-hover table-borderless low-stock-table">
                                        <thead  >
                                            <tr className='mb-2'>
                                                <th>Product Name</th>
                                                <th>Current</th>
                                                <th>Reorder</th>
                                                <th>Last Stock In</th>
                                                <th>Suggested Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lowStockAlert.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.productName}</td>
                                                    <td style={{ color: "red" }}>
                                                        {item.current} </td>
                                                    <td>{item.reorder}</td>
                                                    <td>{item.lastStockIn}</td>
                                                    <td>
                                                        <button className='stock-action-btn'>
                                                            {item.action}
                                                        </button> </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='export-btn-container'>
                                    <button className='export-btn'><svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 19H0V0H10.5V19Z" stroke="#E5E7EB" />
                                        <g clip-path="url(#clip0_177_21738)">
                                            <path d="M1.75 2.75C0.784766 2.75 0 3.53477 0 4.5V15C0 15.9652 0.784766 16.75 1.75 16.75H8.75C9.71523 16.75 10.5 15.9652 10.5 15V7.125H7C6.51602 7.125 6.125 6.73398 6.125 6.25V2.75H1.75ZM7 2.75V6.25H10.5L7 2.75ZM4.25742 9.59141L5.25 11.0105L6.24258 9.59141C6.45039 9.29336 6.86055 9.22227 7.15586 9.43008C7.45117 9.63789 7.525 10.048 7.31719 10.3434L6.05117 12.1562L7.31992 13.9664C7.52773 14.2645 7.45664 14.6719 7.15859 14.8797C6.86055 15.0875 6.45312 15.0164 6.24531 14.7184L5.25 13.2992L4.25742 14.7184C4.04961 15.0164 3.63945 15.0875 3.34414 14.8797C3.04883 14.6719 2.975 14.2617 3.18281 13.9664L4.44883 12.1562L3.18008 10.3461C2.97227 10.048 3.04336 9.64062 3.34141 9.43281C3.63945 9.225 4.04688 9.29609 4.25469 9.59414L4.25742 9.59141Z" fill="#16A34A" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_177_21738">
                                                <path d="M0 2.75H10.5V16.75H0V2.75Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                        <span>Export Excel</span>
                                    </button>
                                    <button className='export-btn'><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_177_21745)">
                                            <path d="M0.328125 2.5C0.328125 1.53477 1.11289 0.75 2.07812 0.75H6.45312V4.25C6.45312 4.73398 6.84414 5.125 7.32812 5.125H10.8281V9.0625H5.14062C4.17539 9.0625 3.39062 9.84727 3.39062 10.8125V14.75H2.07812C1.11289 14.75 0.328125 13.9652 0.328125 13V2.5ZM10.8281 4.25H7.32812V0.75L10.8281 4.25ZM5.14062 10.375H6.01562C6.86055 10.375 7.54688 11.0613 7.54688 11.9062C7.54688 12.7512 6.86055 13.4375 6.01562 13.4375H5.57812V14.3125C5.57812 14.5531 5.38125 14.75 5.14062 14.75C4.9 14.75 4.70312 14.5531 4.70312 14.3125V13V10.8125C4.70312 10.5719 4.9 10.375 5.14062 10.375ZM6.01562 12.5625C6.3793 12.5625 6.67188 12.2699 6.67188 11.9062C6.67188 11.5426 6.3793 11.25 6.01562 11.25H5.57812V12.5625H6.01562ZM8.64062 10.375H9.51562C10.2402 10.375 10.8281 10.9629 10.8281 11.6875V13.4375C10.8281 14.1621 10.2402 14.75 9.51562 14.75H8.64062C8.4 14.75 8.20312 14.5531 8.20312 14.3125V10.8125C8.20312 10.5719 8.4 10.375 8.64062 10.375ZM9.51562 13.875C9.75625 13.875 9.95312 13.6781 9.95312 13.4375V11.6875C9.95312 11.4469 9.75625 11.25 9.51562 11.25H9.07812V13.875H9.51562ZM11.7031 10.8125C11.7031 10.5719 11.9 10.375 12.1406 10.375H13.4531C13.6938 10.375 13.8906 10.5719 13.8906 10.8125C13.8906 11.0531 13.6938 11.25 13.4531 11.25H12.5781V12.125H13.4531C13.6938 12.125 13.8906 12.3219 13.8906 12.5625C13.8906 12.8031 13.6938 13 13.4531 13H12.5781V14.3125C12.5781 14.5531 12.3813 14.75 12.1406 14.75C11.9 14.75 11.7031 14.5531 11.7031 14.3125V12.5625V10.8125Z" fill="#DC2626" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_177_21745">
                                                <path d="M0.328125 0.75H14.3281V14.75H0.328125V0.75Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                        <span>Export PDF</span>

                                    </button>
                                </div>
                            </div>
                            <div className='col-md-5 alertContainer'>
                                <div className='d-flex' style={{ gap: '13px' }}>
                                    <svg width="20" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_177_21752)">
                                            <path d="M8.74925 0C8.05785 0 7.49925 0.558594 7.49925 1.25V2C4.64769 2.57812 2.49925 5.10156 2.49925 8.125V8.85938C2.49925 10.6953 1.82347 12.4688 0.604721 13.8438L0.315659 14.168C-0.0124665 14.5352 -0.0905915 15.0625 0.108627 15.5117C0.307846 15.9609 0.757065 16.25 1.24925 16.25H16.2493C16.7414 16.25 17.1868 15.9609 17.3899 15.5117C17.593 15.0625 17.511 14.5352 17.1828 14.168L16.8938 13.8438C15.675 12.4688 14.9993 10.6992 14.9993 8.85938V8.125C14.9993 5.10156 12.8508 2.57812 9.99925 2V1.25C9.99925 0.558594 9.44066 0 8.74925 0ZM10.5188 19.2695C10.9875 18.8008 11.2493 18.1641 11.2493 17.5H8.74925H6.24925C6.24925 18.1641 6.51097 18.8008 6.97972 19.2695C7.44847 19.7383 8.08519 20 8.74925 20C9.41331 20 10.05 19.7383 10.5188 19.2695Z" fill="#F43F5E" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_177_21752">
                                                <path d="M0 0H17.5V20H0V0Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <p className='alert-suggestion'>Allert & Suggested Actions</p>
                                </div>
                                <div className='alert-suggestion-container mt-4'>
                                    <p><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_177_21758)">
                                            <path d="M7.00094 0.875C7.38923 0.875 7.74743 1.08008 7.9443 1.41641L13.8506 11.4789C14.0502 11.818 14.0502 12.2363 13.856 12.5754C13.6619 12.9145 13.2982 13.125 12.9072 13.125H1.09469C0.703678 13.125 0.340006 12.9145 0.145866 12.5754C-0.0482749 12.2363 -0.0455405 11.8152 0.151334 11.4789L6.05758 1.41641C6.25446 1.08008 6.61266 0.875 7.00094 0.875ZM7.00094 4.375C6.63727 4.375 6.34469 4.66758 6.34469 5.03125V8.09375C6.34469 8.45742 6.63727 8.75 7.00094 8.75C7.36462 8.75 7.65719 8.45742 7.65719 8.09375V5.03125C7.65719 4.66758 7.36462 4.375 7.00094 4.375ZM7.87594 10.5C7.87594 10.2679 7.78376 10.0454 7.61966 9.88128C7.45557 9.71719 7.23301 9.625 7.00094 9.625C6.76888 9.625 6.54632 9.71719 6.38223 9.88128C6.21813 10.0454 6.12594 10.2679 6.12594 10.5C6.12594 10.7321 6.21813 10.9546 6.38223 11.1187C6.54632 11.2828 6.76888 11.375 7.00094 11.375C7.23301 11.375 7.45557 11.2828 7.61966 11.1187C7.78376 10.9546 7.87594 10.7321 7.87594 10.5Z" fill="#FB7185" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_177_21758">
                                                <path d="M0 0H14V14H0V0Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                        <span>8 Product are below minimum stock</span>  <p className='alert-action'>Take Action</p></p>

                                    <p><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.75 0C0.784766 0 0 0.784766 0 1.75V12.25C0 13.2152 0.784766 14 1.75 14H8.75C9.71523 14 10.5 13.2152 10.5 12.25V11.7223C10.4262 11.7523 10.3523 11.777 10.2758 11.7961L8.63242 12.2063C8.55039 12.2254 8.46836 12.2391 8.38633 12.2445C8.36172 12.2473 8.33711 12.25 8.3125 12.25H6.5625C6.3957 12.25 6.24531 12.157 6.17148 12.0094L5.93086 11.5254C5.88437 11.4324 5.79141 11.375 5.69023 11.375C5.58906 11.375 5.49336 11.4324 5.44961 11.5254L5.20898 12.0094C5.12969 12.1707 4.95742 12.2664 4.77969 12.25C4.60195 12.2336 4.44883 12.1105 4.39961 11.941L3.9375 10.418L3.66953 11.3148C3.50273 11.8699 2.99141 12.25 2.41172 12.25H2.1875C1.94687 12.25 1.75 12.0531 1.75 11.8125C1.75 11.5719 1.94687 11.375 2.1875 11.375H2.41172C2.60586 11.375 2.77539 11.2492 2.83008 11.0633L3.2375 9.70977C3.33047 9.40078 3.61484 9.1875 3.9375 9.1875C4.26016 9.1875 4.54453 9.40078 4.6375 9.70977L4.95469 10.7652C5.15703 10.5957 5.41406 10.5 5.6875 10.5C6.12227 10.5 6.51875 10.7461 6.71289 11.1344L6.8332 11.375H7.07656C6.9918 11.1344 6.97539 10.8719 7.03828 10.6148L7.44844 8.97148C7.525 8.6625 7.68359 8.38359 7.90781 8.15938L10.5 5.56719V4.375H7C6.51602 4.375 6.125 3.98398 6.125 3.5V0H1.75ZM7 0V3.5H10.5L7 0ZM15.0336 3.81992C14.607 3.39336 13.9152 3.39336 13.4859 3.81992L12.682 4.62383L14.6234 6.56523L15.4273 5.76133C15.8539 5.33477 15.8539 4.64297 15.4273 4.21367L15.0336 3.81992ZM8.52852 8.77734C8.41641 8.88945 8.33711 9.02891 8.29883 9.18477L7.88867 10.8281C7.85039 10.9785 7.89414 11.1344 8.00352 11.2438C8.11289 11.3531 8.26875 11.3969 8.41914 11.3586L10.0625 10.9484C10.2156 10.9102 10.3578 10.8309 10.4699 10.7188L14.0027 7.1832L12.0613 5.2418L8.52852 8.77734Z" fill="#FBBF24" />
                                    </svg>
                                        <span>5 Indent pending approval</span> <p className='alert-action'>Review</p></p>
                                    <p><svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_177_21771)">
                                            <g clip-path="url(#clip1_177_21771)">
                                                <path d="M1.75 0C0.784766 0 0 0.784766 0 1.75V12.25C0 13.2152 0.784766 14 1.75 14H8.75C9.71523 14 10.5 13.2152 10.5 12.25V4.375H7C6.51602 4.375 6.125 3.98398 6.125 3.5V0H1.75ZM7 0V3.5H10.5L7 0ZM1.75 2.1875C1.75 1.94687 1.94687 1.75 2.1875 1.75H3.9375C4.17812 1.75 4.375 1.94687 4.375 2.1875C4.375 2.42812 4.17812 2.625 3.9375 2.625H2.1875C1.94687 2.625 1.75 2.42812 1.75 2.1875ZM1.75 3.9375C1.75 3.69688 1.94687 3.5 2.1875 3.5H3.9375C4.17812 3.5 4.375 3.69688 4.375 3.9375C4.375 4.17812 4.17812 4.375 3.9375 4.375H2.1875C1.94687 4.375 1.75 4.17812 1.75 3.9375ZM5.25 5.90625C5.49062 5.90625 5.6875 6.10313 5.6875 6.34375V6.8168C5.91992 6.84961 6.14414 6.90156 6.34648 6.95625C6.57891 7.01914 6.71836 7.25703 6.65547 7.49219C6.59258 7.72734 6.35469 7.86406 6.11953 7.80117C5.81602 7.71914 5.51797 7.65898 5.2418 7.65625C5.01211 7.65352 4.76602 7.70547 4.59648 7.80664C4.44063 7.89961 4.375 8.00625 4.375 8.15664C4.375 8.25781 4.41055 8.33437 4.57461 8.43281C4.76328 8.54492 5.02852 8.62695 5.37305 8.73086L5.38672 8.73359C5.6957 8.82656 6.07852 8.94141 6.3793 9.13281C6.71016 9.34062 6.9918 9.67148 7 10.1773C7.0082 10.7051 6.7375 11.0879 6.37383 11.3148C6.16328 11.4461 5.92539 11.5227 5.6875 11.5637V12.0312C5.6875 12.2719 5.49062 12.4688 5.25 12.4688C5.00938 12.4688 4.8125 12.2719 4.8125 12.0312V11.5445C4.50625 11.4871 4.21914 11.3887 3.96758 11.3012C3.91016 11.282 3.85273 11.2629 3.79805 11.2438C3.56836 11.1672 3.44531 10.9184 3.52188 10.6914C3.59844 10.4645 3.84727 10.3387 4.07422 10.4152C4.14258 10.4371 4.20547 10.459 4.26836 10.4809C4.64023 10.6066 4.94102 10.7105 5.26094 10.7188C5.50977 10.727 5.75039 10.6723 5.90898 10.5738C6.04844 10.4863 6.125 10.3742 6.12227 10.191C6.11953 10.0652 6.07305 9.97773 5.91172 9.87383C5.72578 9.75625 5.46055 9.67148 5.11875 9.56758L5.075 9.55391C4.77422 9.46367 4.41055 9.3543 4.12344 9.1793C3.79531 8.98242 3.50547 8.6625 3.50273 8.15938C3.5 7.62891 3.79805 7.2625 4.15352 7.05195C4.35859 6.93164 4.58555 6.85508 4.8125 6.81406V6.34375C4.8125 6.10313 5.00938 5.90625 5.25 5.90625Z" fill="#60A5FA" />
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_177_21771">
                                                <rect width="10.5" height="14" fill="white" />
                                            </clipPath>
                                            <clipPath id="clip1_177_21771">
                                                <path d="M0 0H10.5V14H0V0Z" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                        <span>9 POs pending delivery</span><p className='alert-action'>Track</p> </p>
                                </div>
                                <div className='mt-5 mailcontainer'>
                                    <button className='send-mail-btn'>
                                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_177_21780)">
                                                <path d="M1.3125 2.5C0.587891 2.5 0 3.08789 0 3.8125C0 4.22539 0.194141 4.61367 0.525 4.8625L6.475 9.325C6.78672 9.55742 7.21328 9.55742 7.525 9.325L9.09453 8.14922C9.74805 6.51406 11.2738 5.32461 13.0949 5.14688L13.475 4.8625C13.8059 4.61367 14 4.22539 14 3.8125C14 3.08789 13.4121 2.5 12.6875 2.5H1.3125ZM8.05 10.025C7.42656 10.4926 6.57344 10.4926 5.95 10.025L0 5.5625V11.25C0 12.2152 0.784766 13 1.75 13H9.84922C9.16289 12.1687 8.75 11.0996 8.75 9.9375C8.75 9.78438 8.7582 9.63398 8.77187 9.48359L8.05 10.025ZM17.5 9.9375C17.5 8.89321 17.0852 7.89169 16.3467 7.15327C15.6083 6.41484 14.6068 6 13.5625 6C12.5182 6 11.5167 6.41484 10.7783 7.15327C10.0398 7.89169 9.625 8.89321 9.625 9.9375C9.625 10.9818 10.0398 11.9833 10.7783 12.7217C11.5167 13.4602 12.5182 13.875 13.5625 13.875C14.6068 13.875 15.6083 13.4602 16.3467 12.7217C17.0852 11.9833 17.5 10.9818 17.5 9.9375ZM15.4027 8.75352C15.5723 8.92305 15.5723 9.20195 15.4027 9.37148L13.434 11.3402C13.2645 11.5098 12.9855 11.5098 12.816 11.3402L11.7223 10.2465C11.5527 10.077 11.5527 9.79805 11.7223 9.62852C11.8918 9.45898 12.1707 9.45898 12.3402 9.62852L13.125 10.4133L14.7848 8.75352C14.9543 8.58398 15.2332 8.58398 15.4027 8.75352Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_177_21780">
                                                    <path d="M0 0.75H17.5V14.75H0V0.75Z" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span> Send  Status Email</span> </button>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div >




        </>
    );
};






export default ManageDashboard