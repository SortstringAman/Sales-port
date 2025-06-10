import React, { useEffect, useState } from 'react';
import '../assets/css/CommonLayout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/Images/logosidebar.png';
import profileimg from '../assets/Images/image.png';
import logouticon from '../assets/icons/logout.png'
import ConfirmationModal from './Modals/ConfirmationModal';
import indentImg from '../assets/icons/file-check-alt-svgrepo-com.svg'
import stockImg from '../assets/icons/box-minimalistic-svgrepo-com.svg'
import itemImg from '../assets/icons/menu-2-svgrepo-com.svg'
import poImg from '../assets/icons/credit-card-02-svgrepo-com.svg'
import vendorImg from '../assets/icons/users-svgrepo-com.svg'
import barchart from '../assets/icons/bar-chart-line-svgrepo-com.svg'


export const Sidebar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem("sidebarCollapsed") === "true"
  );

  const toggleSidebar = () => {
    setIsCollapsed(prev => {
      localStorage.setItem("sidebarCollapsed", !prev);
      return !prev;
    });
  };


  const [isLogoutConfirmationModalOpen, setLogoutConfirmationModalOpen] = useState(false);
  // Auto open submenu based on current route
  useEffect(() => {
    const misSubmenuPaths = ["/stockInReport", "/inventoryReport", "/stockOutReport", "/indentReport", "/purchaseOfferReport", "/reorderReport", '/itemConsumptionReport', '/compareReport'];


    const masterSubMenu = ['/department', '/measurement','/item-categories']

  
    // Collapse all menus if sidebar is collapsed and path is in any submenu
    if (isCollapsed && [ ...misSubmenuPaths, ...masterSubMenu].includes(location.pathname)) {
      setOpenMenu(null);
      return;
    }

    // Expand appropriate menu based on pathname
    if (misSubmenuPaths.includes(location.pathname)) {
      setOpenMenu("misReport");
    }
    else if (masterSubMenu.includes(location.pathname)) {
      setOpenMenu("manageMaster")
    }
    
  }, [location.pathname, isCollapsed]);


  // Toggle which menu is open
  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };


  const handleSubmenuClick = () => {
    if (isCollapsed) {
      setOpenMenu(null); // Close the submenu when sidebar is collapsed and any submenu is clicked
    }
  };

  const navigate = useNavigate()

  // Called when logout icon clicked — opens modal
  const handleLogoutClick = () => {
    setLogoutConfirmationModalOpen(true);
  };

  // Called when user confirms logout
  const handleLogoutConfirm = () => {
    setLogoutConfirmationModalOpen(false);
    localStorage.removeItem('token');
    navigate('/');
  };

  // Called when user cancels logout
  const handleLogoutCancel = () => {
    setLogoutConfirmationModalOpen(false);
  };



  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {/* Sidebar Logo */}
        <img src={Logo} alt="logo" className="lg-logo-sidebar" />
        {/* If you also want the "IMROS" text or any brand text, uncomment below */}
        {/* <h2 className="sidebar-title">IMROS</h2> */}
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-ul">
          <li>
            <Link
              to="/manageDashboard"
              className={location.pathname === "/manageDashboard" ? "active" : ""}>
              {/* <img src={stockImg} alt="Manage Stocks Icon" style={{ width: '20px', height: '20px' }} /> */}
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12.704C2 10.415 2 9.271 2.52 8.323C3.038 7.374 3.987 6.786 5.884 5.608L7.884 4.367C9.889 3.122 10.892 2.5 12 2.5C13.108 2.5 14.11 3.122 16.116 4.367L18.116 5.608C20.013 6.786 20.962 7.374 21.481 8.323C22 9.272 22 10.415 22 12.703V14.225C22 18.125 22 20.076 20.828 21.288C19.656 22.5 17.771 22.5 14 22.5H10C6.229 22.5 4.343 22.5 3.172 21.288C2.001 20.076 2 18.126 2 14.225V12.704Z" stroke="#222F3E" stroke-width="1.5" />
                <path d="M12 15.5V18.5" stroke="#222F3E" stroke-width="1.5" stroke-linecap="round" />
              </svg>

              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/manageStocks"
              className={location.pathname === "/manageStocks" ? "active" : ""}>
              {/* <img src={stockImg} alt="Manage Stocks Icon" style={{ width: '20px', height: '20px' }} /> */}
              <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.37451 7.25L12 2.8745L21.6255 7.25M2.37451 7.25L12 11.6255M2.37451 7.25V16.8755L12 22.1255M21.6255 7.25L12 11.6255M21.6255 7.25V16.8755L12 22.1255M12 11.6255V22.1255M15.75 20V14.75M18.75 18.5V13.25" stroke="#222F3E" stroke-width="1.5" stroke-linejoin="round" />
              </svg>

              <span>Manage Stocks</span>
            </Link>
          </li>

          <li>
            <Link
              to="/manageItems"
              className={location.pathname === "/manageItems" ? "active" : ""}>
              <img src={itemImg} alt="Manage Items Icon" style={{ width: '20px', height: '20px' }} />

              <span>Manage Items</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manageIndents"
              className={location.pathname === "/manageIndents" ? "active" : ""} >
              {/* <img src={indentImg} alt="Manage Indents Icon" style={{ width: '20px', height: '20px' }} /> */}
              <svg width="20" height="20" viewBox="0 0 23 25" xmlns="http://www.w3.org/2000/svg" fill="black">
                <path
                  d="M22.7773 17.5273L16.25 24.0664L13.0977 20.9023L14.1523 19.8477L16.25 21.9336L21.7227 16.4727L22.7773 17.5273ZM11 8H6.5V6.5H11V8ZM11 11H6.5V9.5H11V11ZM6.5 12.5H11V14H6.5V12.5ZM5 8H3.5V6.5H5V8ZM5 11H3.5V9.5H5V11ZM3.5 12.5H5V14H3.5V12.5ZM12.5 8V2H2V23H12.5V24.5H0.5V0.5H13.5664L20 6.93359V15.5L18.5 17V8H12.5ZM14 6.5H17.4336L14 3.06641V6.5Z"
                  fill="black"
                />
              </svg>
              <span>Manage Indents</span>
            </Link>
          </li>
          <li>
            <Link
              to="/managePOs"
              className={location.pathname === "/managePOs" ? "active" : ""}>
              {/* <img src={poImg} alt="Manage POs Icon" style={{ width: '20px', height: '20px' }} /> */}
              <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0H2C1.60218 0 1.22064 0.158035 0.93934 0.43934C0.658035 0.720644 0.5 1.10218 0.5 1.5V13.5C0.5 13.8978 0.658035 14.2794 0.93934 14.5607C1.22064 14.842 1.60218 15 2 15H20C20.3978 15 20.7794 14.842 21.0607 14.5607C21.342 14.2794 21.5 13.8978 21.5 13.5V1.5C21.5 1.10218 21.342 0.720644 21.0607 0.43934C20.7794 0.158035 20.3978 0 20 0ZM20 1.5V3.75H2V1.5H20ZM2 13.5V5.25H20V13.5H2Z" fill="#222F3E" />
              </svg>
              <span>Manage POS</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manageVendors"
              className={location.pathname === "/manageVendors" ? "active" : ""}>
              {/* <img src={vendorImg} alt="Manage Vendors Icon" style={{ width: '20px', height: '20px' }} /> */}
              <svg width="20" height="20" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 16.25C19 14.16 17.33 11.182 15 10.523M13 16.25C13 13.599 10.314 10.25 7 10.25C3.686 10.25 1 13.599 1 16.25M13 6.75C13.7956 6.75 14.5587 6.43393 15.1213 5.87132C15.6839 5.30871 16 4.54565 16 3.75C16 2.95435 15.6839 2.19129 15.1213 1.62868C14.5587 1.06607 13.7956 0.75 13 0.75M10 3.75C10 4.54565 9.68393 5.30871 9.12132 5.87132C8.55871 6.43393 7.79565 6.75 7 6.75C6.20435 6.75 5.44129 6.43393 4.87868 5.87132C4.31607 5.30871 4 4.54565 4 3.75C4 2.95435 4.31607 2.19129 4.87868 1.62868C5.44129 1.06607 6.20435 0.75 7 0.75C7.79565 0.75 8.55871 1.06607 9.12132 1.62868C9.68393 2.19129 10 2.95435 10 3.75Z" stroke="#222F3E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span>Manage Vendors</span>
            </Link>
          </li>

          <li className='submenu-container'>
            <div
              className={location.pathname === "/manageDashboard" || location.pathname === "/manageDashboard"
                ? "active menu-item"
                : "menu-item"}
              onClick={() => toggleMenu("misReport")}
            >
              <svg width="20" height="20" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21.5H15M9 21.5V16.5M9 21.5H3.6C3.44087 21.5 3.28826 21.4368 3.17574 21.3243C3.06321 21.2117 3 21.0591 3 20.9V17.1C3 16.9409 3.06321 16.7883 3.17574 16.6757C3.28826 16.5632 3.44087 16.5 3.6 16.5H9M15 21.5V9.5M15 21.5H20.4C20.5591 21.5 20.7117 21.4368 20.8243 21.3243C20.9368 21.2117 21 21.0591 21 20.9V4.1C21 3.94087 20.9368 3.78826 20.8243 3.67574C20.7117 3.56321 20.5591 3.5 20.4 3.5H15.6C15.4409 3.5 15.2883 3.56321 15.1757 3.67574C15.0632 3.78826 15 3.94087 15 4.1V9.5M9 16.5V10.1C9 9.94087 9.06321 9.78826 9.17574 9.67574C9.28826 9.56321 9.44087 9.5 9.6 9.5H15" stroke="#222F3E" stroke-width="1.5" />
              </svg>
              <span>MIS Report</span>
              {!isCollapsed && (
                <svg viewBox="0 0 24 24" style={{ marginLeft: '17px' }} fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)" stroke="#ffffff" height="22" width="22">
                  <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="#0F0F0F"></path>
                </svg>
              )}
            </div>
            {openMenu === "misReport" && (
              <ul className={`submenu ${isCollapsed ? 'submenu-float' : ''}`} style={{}}>
                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/inventoryReport"
                    className={location.pathname === "/inventoryReport" ? "active" : ""}
                    onClick={handleSubmenuClick}
                  >
                    Inventory Reports
                  </Link>

                </li>
                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/stockInReport"
                    className={location.pathname === "/stockInReport" ? "active" : ""}
                    onClick={handleSubmenuClick}
                  >
                    Stock In Report
                  </Link>

                </li>
                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/stockOutReport"
                    className={location.pathname === "/stockOutReport" ? "active" : ""}
                    onClick={handleSubmenuClick}
                  >
                    Stock Out Report
                  </Link>

                </li>

                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/indentReport"
                    className={location.pathname === "/indentReport" ? "active" : ""}
                    onC lick={handleSubmenuClick}
                  >
                    Indent Report
                  </Link>

                </li>
                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/purchaseOfferReport"
                    className={location.pathname === "/purchaseOfferReport" ? "active" : ""}
                    onC lick={handleSubmenuClick}
                  >
                    Purchase Order Report
                  </Link>

                </li>


                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/reorderReport"
                    className={location.pathname === "/reorderReport" ? "active" : ""}
                    onC lick={handleSubmenuClick}
                  >
                    Reorder Report
                  </Link>

                </li>

                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/itemConsumptionReport"
                    className={location.pathname === "/itemConsumptionReport" ? "active" : ""}
                    onC lick={handleSubmenuClick}
                  >
                    Item Wise Consumption Report
                  </Link>

                </li>

                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/compareReport"
                    className={location.pathname === "/compareReport" ? "active" : ""}
                    onC lick={handleSubmenuClick}
                  >
                    Indent VS POs Report Comparison
                  </Link>

                </li>

              </ul>
            )}
          </li>



          <li className='submenu-container'>
            <div
              className={location.pathname === "/manageDashboard" || location.pathname === "/manageDashboard"
                ? "active menu-item"
                : "menu-item"}
              onClick={() => toggleMenu("manageMaster")}
            >
           <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 14.5V4.5C16 2.332 12.337 0.5 8 0.5C3.663 0.5 0 2.332 0 4.5V14.5C0 16.668 3.663 18.5 8 18.5C12.337 18.5 16 16.668 16 14.5ZM8 2.5C11.691 2.5 13.931 4.007 14 4.494C13.931 4.993 11.691 6.5 8 6.5C4.309 6.5 2.069 4.993 2 4.506C2.069 4.007 4.309 2.5 8 2.5ZM2 7.107C3.479 7.954 5.637 8.5 8 8.5C10.363 8.5 12.521 7.954 14 7.107V9.494C13.931 9.993 11.691 11.5 8 11.5C4.309 11.5 2.069 9.993 2 9.5V7.107ZM2 14.5V12.107C3.479 12.954 5.637 13.5 8 13.5C10.363 13.5 12.521 12.954 14 12.107V14.494C13.931 14.993 11.691 16.5 8 16.5C4.309 16.5 2.069 14.993 2 14.5Z" fill="#222F3E"/>
</svg>

              <span>Manage Masters</span>
              {!isCollapsed && (
                <svg viewBox="0 0 24 24" style={{ marginLeft: '17px' }} fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)" stroke="#ffffff" height="22" width="22">
                  <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill="#0F0F0F"></path>
                </svg>
              )}
            </div>
            {openMenu === "manageMaster" && (
              <ul className={`submenu ${isCollapsed ? 'submenu-float' : ''}`} style={{}}>
                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/department"
                    className={location.pathname === "/department" ? "active" : ""}
                    onClick={handleSubmenuClick}
                  >
                   Department
                  </Link>

                </li>
                <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/measurement"
                    className={location.pathname === "/measurement" ? "active" : ""}
                    onClick={handleSubmenuClick}
                  >
                    Measurement
                  </Link>

                </li>

                  <li style={!isCollapsed ? { marginLeft: '15px' } : {}}>
                  <Link
                    to="/item-categories"
                    className={location.pathname === "/item-categories" ? "active" : ""}
                    onClick={handleSubmenuClick}
                  >
                    Item Category
                  </Link>

                </li>

 








              </ul>
            )}
          </li>



        </ul>
      </nav>

      {/* Bottom icons/profile */}
      <div style={{ padding: '12px 20px' }}>
        <ul className="sidebar-ul bottom-section" style={{ gap: '10px', display: 'inline-flex' }}>
          {/* 
          <li>
            <img src={profileimg} alt="Profile" style={{ position: "relative", left: "-3px" }} />
          </li> */}
          <li style={{ display: 'flex' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={toggleSidebar}>
              <g clipPath="url(#clip0_62_1750)">
                <path d="M21.3333 19.3333H2.66667C2.48986 19.3333 2.32029 19.2631 2.19526 19.1381C2.07024 19.013 2 18.8435 2 18.6667C2 18.4899 2.07024 18.3203 2.19526 18.1953C2.32029 18.0702 2.48986 18 2.66667 18H21.3333C21.5101 18 21.6797 18.0702 21.8047 18.1953C21.9298 18.3203 22 18.4899 22 18.6667C22 18.8435 21.9298 19.013 21.8047 19.1381C21.6797 19.2631 21.5101 19.3333 21.3333 19.3333Z" fill="#222F3E" />
                <path d="M21.3333 12.6663H2.66667C2.48986 12.6663 2.32029 12.5961 2.19526 12.4711C2.07024 12.3461 2 12.1765 2 11.9997C2 11.8229 2.07024 11.6533 2.19526 11.5283C2.32029 11.4032 2.48986 11.333 2.66667 11.333H21.3333C21.5101 11.333 21.6797 11.4032 21.8047 11.5283C21.9298 11.6533 22 11.8229 22 11.9997C22 12.1765 21.9298 12.3461 21.8047 12.4711C21.6797 12.5961 21.5101 12.6663 21.3333 12.6663Z" fill="#222F3E" />
                <path d="M21.3333 6.00033H2.66667C2.48986 6.00033 2.32029 5.93009 2.19526 5.80506C2.07024 5.68004 2 5.51047 2 5.33366C2 5.15685 2.07024 4.98728 2.19526 4.86225C2.32029 4.73723 2.48986 4.66699 2.66667 4.66699H21.3333C21.5101 4.66699 21.6797 4.73723 21.8047 4.86225C21.9298 4.98728 22 5.15685 22 5.33366C22 5.51047 21.9298 5.68004 21.8047 5.80506C21.6797 5.93009 21.5101 6.00033 21.3333 6.00033Z" fill="#222F3E" />
              </g>
              <defs>
                <clipPath id="clip0_62_1750">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </li>
          <li style={{ display: 'flex' }} onClick={handleLogoutClick}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Click For Logout">
            <img src={logouticon} style={{ borderRadius: '0', height: '25px', width: '25px', cursor: 'pointer', marginLeft: "2px" }}></img>

          </li>


          <ConfirmationModal
            isOpen={isLogoutConfirmationModalOpen}
            title="Confirm Logout"
            message="Do you really want to log out?"
            onConfirm={handleLogoutConfirm}
            onCancel={handleLogoutCancel}
            setWidth={"25%"}
          />
        </ul>
      </div>
    </div>
  );
};

const MainContent = ({ children }) => {
  return (
    <div className="main-content">


      <div className="content-body">
        {children}
      </div>
    </div>
  );
};

const CommonLayout = ({ children }) => {
  return (
    <div className="layout-container">

      <Sidebar />


      <MainContent>{children}</MainContent>
    </div>
  );
};
export default CommonLayout;