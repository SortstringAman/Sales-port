import React from 'react'
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login/Login'
import CommonLayout from '../Component/CommonLayout';
import ProtectedRoutes from './ProtectedRoutes';

import ManageItems from '../Pages/ManageItems/ManageItem';
import ManageVendors from '../Pages/ManageVendors/ManageVendors';
import ManageStocks from '../Pages/ManageStocks/ManageStocks';
import ManagePOs from '../Pages/ManagePOs/ManagePo';
import ManageIndents from '../Pages/ManageIndents/ManageIndent';
import ItemLedgerDetails from '../Pages/ManageItems/ItemLedgerDetails';
import ManageReport from '../Pages/ManageReports/ManageReport';
import ManageDashboard from '../Pages/ManageDashboard/ManageDashboard';


const Routing = () => {
    const userId = localStorage.getItem('token');
    return (
        <>
            <Routes>
                <Route path="/" element={<ProtectedRoutes element={<ProtectedRoutes element={<CommonLayout><ManageItems /></CommonLayout>} />} />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/manageDashboard" element={<ProtectedRoutes element={<CommonLayout><ManageDashboard/></CommonLayout>} />} />
                <Route path="/manageItems" element={<ProtectedRoutes element={<CommonLayout><ManageItems /></CommonLayout>} />} />
                <Route path="/manageItems/:id" element={<ProtectedRoutes element={<CommonLayout><ItemLedgerDetails /></CommonLayout>} />} />
                <Route path="/manageVendors" element={<ProtectedRoutes element={<CommonLayout><ManageVendors /></CommonLayout>} />} />
                <Route path="/manageStocks" element={<ProtectedRoutes element={<CommonLayout><ManageStocks /></CommonLayout>} />} />
                <Route path="/managePOs" element={<ProtectedRoutes element={<CommonLayout><ManagePOs /></CommonLayout>} />} />
                <Route path="/manageIndents" element={<ProtectedRoutes element={<CommonLayout><ManageIndents /></CommonLayout>} />} />
                <Route path="/mis-report" element={<ProtectedRoutes element={<CommonLayout><ManageReport /></CommonLayout>} />} />
            </Routes>
        </>
    )
}

export default Routing