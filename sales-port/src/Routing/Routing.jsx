import React from 'react'
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login/Login'
import StudentDashboardPage from '../Pages/StudentDashboard/StudentDashboardPage'
import CommonLayout from '../Component/CommonLayout';
import { StudentFullProfile } from '../Pages/StudentDashboard/StudentFullProfile';
import OrganisationDashboardPage from '../Pages/Organization/OrganisationDashboardPage';
import ProtectedRoutes from './ProtectedRoutes';
import RolesAndPermissions from '../Pages/Roles&Permissions/RolesAndPermissions';
import { AdmissionForm } from '../Pages/AdmissionForm/AdmissionForm';
import { CourseDashboard } from '../Pages/CourseDashboard/CourseDashboard';
import SupportDekLogin from '../Pages/SupportDeskLogin/SupportDeskLogin';
import EnquiryDashboard from '../Pages/Enquiry/EnquiryDashboard';
import UserDashboard from '../Pages/UserDashboard/UserDashboard';
import { UserFullProfile } from '../Pages/UserDashboard/UserFullProfile';
import { FinanceDashboard } from '../Pages/FinanceDashboard/FinanceDashboard';
import { ClassDashboard } from '../Pages/ClassDashboard/ClassDashboard';
import { PaymentSuccessPage } from '../Pages/PaymentPage/PaymentSuccessPage';
import { PaymentFailedPage } from '../Pages/PaymentPage/PaymentFailedPage';
import { ManageFeeDashboard } from '../Pages/ManageFeeDashboard/FeeDashboard';
import { EnquiryDashboardDetails } from '../Pages/EnquiryDashboard/EnquiryDashboard';
import ManageItems from '../Pages/ManageItems/ManageItem';
import ManageVendors from '../Pages/ManageVendors/ManageVendors';
import ManageStocks from '../Pages/ManageStocks/ManageStocks';
 

const Routing = () => {
    const userId = localStorage.getItem('token');
    return (
        <>
            <Routes>
                <Route path="/" element={<ProtectedRoutes element={<ProtectedRoutes element= {<CommonLayout><EnquiryDashboardDetails /></CommonLayout>} />}/> }/>
                <Route path="/Login" element={<Login />} />
                {/* Student Dashboard routes 
                <Route path="/studentDashboard/" element={<CommonLayout><StudentDashboardPage /></CommonLayout>} />
                <Route path="/studentDashboard/StudentFullProfile/" element={<CommonLayout><StudentFullProfile /></CommonLayout>} />

                Finance Routes
                <Route path="/finance/" element={<CommonLayout><Finance /></CommonLayout>} />

                Organisation Routes
                <Route path="/OrganisationDashboard/" element={<CommonLayout><OrganisationDashboardPage /></CommonLayout>} /> */}


                {/* Protected routes */}

                {/* Student Dashboard routes  */}
                <Route path="/studentDashboard" element={<ProtectedRoutes element={<CommonLayout><StudentDashboardPage /></CommonLayout>} />} />
                <Route path="/studentDashboard/StudentFullProfile" element={<ProtectedRoutes element={<CommonLayout><StudentFullProfile /></CommonLayout>} />} />

                {/* Finance Routes */}
                <Route path="/finance/payment-report" element={<ProtectedRoutes element={<CommonLayout><FinanceDashboard /></CommonLayout>} />} />
                <Route path="/finance/manage-fee" element={<ProtectedRoutes element={<CommonLayout><ManageFeeDashboard /></CommonLayout>} />} />

                {/* Organisation Routes */}
                {/* <Route path="/OrganisationDashboard" element={<ProtectedRoutes element={<CommonLayout><OrganisationDashboardPage /></CommonLayout>} />} /> */}
                <Route path="/OrganisationDashboard" element={<ProtectedRoutes element= {<CommonLayout><OrganisationDashboardPage /></CommonLayout>}/>} />

                {/* Roles and Permissions */}

                <Route path="/DesignationDashboard" element={<ProtectedRoutes element={<CommonLayout><RolesAndPermissions /></CommonLayout>} />} />

                {/*Admission Form  */}
                <Route path="/AdmissionForm" element={<AdmissionForm />} />
                <Route path="/AdmissionForm/" element={<AdmissionForm />} />

                {/* Course */}
                <Route path="/courseDashboard" element={<ProtectedRoutes element={<CommonLayout><CourseDashboard /></CommonLayout>} />} />

                {/* Support Desk Login */}
                <Route path="/supportdesklogin" element={<SupportDekLogin />} />

                {/*Enquiry Dashboard  */}
                <Route path="/enquiry" element={<ProtectedRoutes element= {<CommonLayout><EnquiryDashboard /></CommonLayout>}/>} />
                <Route path="/enquiry-dashbord" element={<ProtectedRoutes element= {<CommonLayout><EnquiryDashboardDetails /></CommonLayout>}/>} />

                {/* Employeedashboard */}
                <Route path="/employeedashboard" element={<ProtectedRoutes element={<CommonLayout><UserDashboard /></CommonLayout>} />} />
                <Route path="/employeedashboard/employeefullprofile" element={<ProtectedRoutes element={<CommonLayout><UserFullProfile /></CommonLayout>} />} />

                {/* Class Dashboard */}
                <Route path="/classDashboard" element={<ProtectedRoutes element={<CommonLayout><ClassDashboard /></CommonLayout>} />} />


                 <Route path="/manageItems" element={<ProtectedRoutes element={<CommonLayout><ManageItems    /></CommonLayout>} />} />
                  <Route path="/manageVendors" element={<ProtectedRoutes element={<CommonLayout><ManageVendors   /></CommonLayout>} />} />
    <Route path="/manageStocks" element={<ProtectedRoutes element={<CommonLayout><ManageStocks  /></CommonLayout>} />} />


                {/* Payment Pages */}
                <Route path="/paymentsucess" element={<PaymentSuccessPage />}/>
                <Route path="/paymentrejected" element= {<PaymentFailedPage />} />
            </Routes>
        </>
    )
}

export default Routing