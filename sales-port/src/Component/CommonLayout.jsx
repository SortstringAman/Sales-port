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

  useEffect(() => {
    const masterSubmenuPaths = [
      "/OrganisationDashboard",
      "/courseDashboard",
      "/classDashboard",
    ];

    const financeSubmenuPaths = [
      "/finance/manage-fee",
      "/finance/payment-report"
    ];

    const closePaths = [
      "/enquiry",
      "/employeedashboard",
      "/",
      "/DesignationDashboard"
    ];

    const dashboardSubmenuPaths = [
      "/enquiry-dashbord",
      "/employeedashboard"
    ];

    if (isCollapsed && [...masterSubmenuPaths, ...financeSubmenuPaths, ...dashboardSubmenuPaths].includes(location.pathname)) {
      setOpenMenu(null);
    }

    if (closePaths.includes(location.pathname)) {
      setOpenMenu(null);
    } else if (masterSubmenuPaths.includes(location.pathname)) {
      if (!isCollapsed) setOpenMenu("master");
    } else if (financeSubmenuPaths.includes(location.pathname)) {
      if (!isCollapsed) setOpenMenu("finance");
    } else if (dashboardSubmenuPaths.includes(location.pathname)) {
      if (!isCollapsed) setOpenMenu("dashboard");
    }
    else {
      setOpenMenu(null);
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
              to="/manageStocks"
              className={location.pathname === "/manageStocks" ? "active" : ""}>
              <img src={stockImg} alt="Manage Stocks Icon" style={{ width: '20px', height: '20px' }} />
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
              <img src={indentImg} alt="Manage Indents Icon" style={{ width: '20px', height: '20px' }} />
              <span>Manage Indents</span>
            </Link>
          </li>
          <li>
            <Link
              to="/managePOs"
              className={location.pathname === "/managePOs" ? "active" : ""}>
              <img src={poImg} alt="Manage POs Icon" style={{ width: '20px', height: '20px' }} />
              <span>Manage POS</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manageVendors"
              className={location.pathname === "/manageVendors" ? "active" : ""}>
              <img src={vendorImg} alt="Manage Vendors Icon" style={{ width: '20px', height: '20px' }} />
              <span>Manage Vendors</span>
            </Link>
          </li>
            <li>
            <Link
              to="/manageReports"
              className={location.pathname === "/manageReports" ? "active" : ""}>
              <img src={barchart} alt="Manage Report Icon" style={{ width: '20px', height: '20px',borderRadius:"0px" }} />
              <span>MIS Reports</span>
            </Link>
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