import React, { useEffect, useState } from 'react';
import '../assets/css/CommonLayout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../assets/Images/logosidebar.png';
import profileimg from '../assets/Images/image.png';
import logouticon from '../assets/icons/logout.png'
import ConfirmationModal from './Modals/ConfirmationModal';
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
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0.831055C6.75889 0.831055 4.11472 3.47523 4.11472 6.71633C4.11472 8.71648 5.13204 10.4863 6.66305 11.5507C3.21175 12.8976 0.751709 16.2606 0.751709 20.1684H2.43322C2.43322 16.4708 5.11606 13.3801 8.63378 12.7328L9.15925 14.2831H10.8408L11.3662 12.7328C14.8839 13.3801 17.5668 16.4708 17.5668 20.1684H19.2483C19.2483 16.2606 16.7882 12.8976 13.337 11.5507C14.8671 10.4863 15.8853 8.71648 15.8853 6.71633C15.8853 3.47523 13.2411 0.831055 10 0.831055ZM10 2.51256C12.3314 2.51256 14.2038 4.38492 14.2038 6.71633C14.2038 9.04774 12.3314 10.9201 10 10.9201C7.66859 10.9201 5.79623 9.04774 5.79623 6.71633C5.79623 4.38492 7.66859 2.51256 10 2.51256ZM9.15925 15.1239L8.31849 20.1684H11.6815L10.8408 15.1239H9.15925Z" fill="black" />
              </svg>

              <span>Manage Stocks</span>
            </Link>
          </li>




           <li>
            <Link
              to="/manageItems"
              className={location.pathname === "/manageItems" ? "active" : ""}>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0.831055C6.75889 0.831055 4.11472 3.47523 4.11472 6.71633C4.11472 8.71648 5.13204 10.4863 6.66305 11.5507C3.21175 12.8976 0.751709 16.2606 0.751709 20.1684H2.43322C2.43322 16.4708 5.11606 13.3801 8.63378 12.7328L9.15925 14.2831H10.8408L11.3662 12.7328C14.8839 13.3801 17.5668 16.4708 17.5668 20.1684H19.2483C19.2483 16.2606 16.7882 12.8976 13.337 11.5507C14.8671 10.4863 15.8853 8.71648 15.8853 6.71633C15.8853 3.47523 13.2411 0.831055 10 0.831055ZM10 2.51256C12.3314 2.51256 14.2038 4.38492 14.2038 6.71633C14.2038 9.04774 12.3314 10.9201 10 10.9201C7.66859 10.9201 5.79623 9.04774 5.79623 6.71633C5.79623 4.38492 7.66859 2.51256 10 2.51256ZM9.15925 15.1239L8.31849 20.1684H11.6815L10.8408 15.1239H9.15925Z" fill="black" />
              </svg>

              <span>Manage Items</span>
            </Link>
          </li>

          <li>
            <Link
              to="/manageVendors"
              className={location.pathname === "/manageVendors" ? "active" : ""}>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0.831055C6.75889 0.831055 4.11472 3.47523 4.11472 6.71633C4.11472 8.71648 5.13204 10.4863 6.66305 11.5507C3.21175 12.8976 0.751709 16.2606 0.751709 20.1684H2.43322C2.43322 16.4708 5.11606 13.3801 8.63378 12.7328L9.15925 14.2831H10.8408L11.3662 12.7328C14.8839 13.3801 17.5668 16.4708 17.5668 20.1684H19.2483C19.2483 16.2606 16.7882 12.8976 13.337 11.5507C14.8671 10.4863 15.8853 8.71648 15.8853 6.71633C15.8853 3.47523 13.2411 0.831055 10 0.831055ZM10 2.51256C12.3314 2.51256 14.2038 4.38492 14.2038 6.71633C14.2038 9.04774 12.3314 10.9201 10 10.9201C7.66859 10.9201 5.79623 9.04774 5.79623 6.71633C5.79623 4.38492 7.66859 2.51256 10 2.51256ZM9.15925 15.1239L8.31849 20.1684H11.6815L10.8408 15.1239H9.15925Z" fill="black" />
              </svg>

              <span>Manage Vendors</span>
            </Link>
          </li>

            <li>
            <Link
              to="/managePOs"
              className={location.pathname === "/managePOs" ? "active" : ""}>
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0.831055C6.75889 0.831055 4.11472 3.47523 4.11472 6.71633C4.11472 8.71648 5.13204 10.4863 6.66305 11.5507C3.21175 12.8976 0.751709 16.2606 0.751709 20.1684H2.43322C2.43322 16.4708 5.11606 13.3801 8.63378 12.7328L9.15925 14.2831H10.8408L11.3662 12.7328C14.8839 13.3801 17.5668 16.4708 17.5668 20.1684H19.2483C19.2483 16.2606 16.7882 12.8976 13.337 11.5507C14.8671 10.4863 15.8853 8.71648 15.8853 6.71633C15.8853 3.47523 13.2411 0.831055 10 0.831055ZM10 2.51256C12.3314 2.51256 14.2038 4.38492 14.2038 6.71633C14.2038 9.04774 12.3314 10.9201 10 10.9201C7.66859 10.9201 5.79623 9.04774 5.79623 6.71633C5.79623 4.38492 7.66859 2.51256 10 2.51256ZM9.15925 15.1239L8.31849 20.1684H11.6815L10.8408 15.1239H9.15925Z" fill="black" />
              </svg>

              <span>Manage POS</span>
            </Link>
          </li>

 
        </ul>

        
      </nav>

      {/* Bottom icons/profile */}
      <div style={{ padding: '12px 20px' }}>
        <ul className="sidebar-ul bottom-section" style={{ gap: '10px', display: 'inline-flex' }}>
          {/* <li style={{ display: 'flex' }}>
            <svg width="20" height="21" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4999 15C9.83328 16 8.99995 16.5 7.99995 16.5C6.49995 16.5 6.16695 16 5.49995 15M13.0849 13.5H2.91495C2.62278 13.5001 2.33582 13.4227 2.0834 13.2756C1.83097 13.1285 1.62212 12.917 1.47821 12.6627C1.3343 12.4085 1.26048 12.1206 1.2643 11.8284C1.26812 11.5363 1.34944 11.2504 1.49995 11C2.48259 9.36478 3.00116 7.49275 2.99995 5.585V4.5C2.99995 3.43913 3.42137 2.42172 4.17152 1.67157C4.92166 0.921427 5.93908 0.5 6.99995 0.5H8.99995C10.0608 0.5 11.0782 0.921427 11.8284 1.67157C12.5785 2.42172 12.9999 3.43913 12.9999 4.5V5.585C12.9999 7.492 13.5179 9.365 14.4999 11C14.6505 11.2504 14.7318 11.5363 14.7356 11.8284C14.7394 12.1206 14.6656 12.4085 14.5217 12.6627C14.3778 12.917 14.1689 13.1285 13.9165 13.2756C13.6641 13.4227 13.3771 13.5001 13.0849 13.5Z" stroke="#222F3E" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </li> */}
          <li>
            <img src={profileimg} alt="Profile" style={{ position: "relative", left: "-3px" }} />
          </li>
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