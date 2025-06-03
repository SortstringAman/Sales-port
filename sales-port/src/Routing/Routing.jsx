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


const Routing = () => {
    const userId = localStorage.getItem('token');
    return (
        <>
            <Routes>
                <Route path="/" element={<ProtectedRoutes element={<ProtectedRoutes element={<CommonLayout><ManageItems /></CommonLayout>} />} />} />
                <Route path="/Login" element={<Login />} />
                
                <Route path="/manageItems" element={<ProtectedRoutes element={<CommonLayout><ManageItems /></CommonLayout>} />} />
                <Route path="/manageVendors" element={<ProtectedRoutes element={<CommonLayout><ManageVendors /></CommonLayout>} />} />
                <Route path="/manageStocks" element={<ProtectedRoutes element={<CommonLayout><ManageStocks /></CommonLayout>} />} />
                  <Route path="/managePOs" element={<ProtectedRoutes element={<CommonLayout><ManagePOs /></CommonLayout>} />} />


              
            </Routes>
        </>
    )
}

export default Routing