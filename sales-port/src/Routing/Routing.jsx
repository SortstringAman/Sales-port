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

import ManageDashboard from '../Pages/ManageDashboard/ManageDashboard';
import InventryReport from '../Pages/ManageReports/InventoryReport';
import StockInReport from '../Pages/ManageReports/StockInReport';
import StockOutReport from '../Pages/ManageReports/StockOutReport';
import IndentReport from '../Pages/ManageReports/IndentReport';
import PurchseOfferReport from '../Pages/ManageReports/PurchaseOrderReport';
import ReorderReport from '../Pages/ManageReports/ReorderReport';
import ItemWiseConsumptionReport from '../Pages/ManageReports/ItemwIseConsumptionReport';
import IndentVsPOsCompareReport from '../Pages/ManageReports/Indent_vs_Pos_report';


const Routing = () => {
    const userId = localStorage.getItem('token');
    return (
        <>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/" element={<ProtectedRoutes element={<ProtectedRoutes element={<CommonLayout><ManageDashboard /></CommonLayout>} />} />} />
                <Route path="/manageDashboard" element={<ProtectedRoutes element={<CommonLayout><ManageDashboard /></CommonLayout>} />} />
                <Route path="/manageItems" element={<ProtectedRoutes element={<CommonLayout><ManageItems /></CommonLayout>} />} />
                <Route path="/manageItems/:id" element={<ProtectedRoutes element={<CommonLayout><ItemLedgerDetails /></CommonLayout>} />} />
                <Route path="/manageVendors" element={<ProtectedRoutes element={<CommonLayout><ManageVendors /></CommonLayout>} />} />
                <Route path="/manageStocks" element={<ProtectedRoutes element={<CommonLayout><ManageStocks /></CommonLayout>} />} />
                <Route path="/managePOs" element={<ProtectedRoutes element={<CommonLayout><ManagePOs /></CommonLayout>} />} />
                <Route path="/manageIndents" element={<ProtectedRoutes element={<CommonLayout><ManageIndents /></CommonLayout>} />} />
                <Route path="/inventoryReport" element={<ProtectedRoutes element={<CommonLayout><InventryReport /></CommonLayout>} />} />
                <Route path="/stockInReport" element={<ProtectedRoutes element={<CommonLayout><StockInReport /></CommonLayout>} />} />
                <Route path="/stockOutReport" element={<ProtectedRoutes element={<CommonLayout><StockOutReport/></CommonLayout>} />} />
                <Route path="/indentReport" element={<ProtectedRoutes element={<CommonLayout><IndentReport/></CommonLayout>} />} />
                 <Route path="/purchaseOfferReport" element={<ProtectedRoutes element={<CommonLayout><PurchseOfferReport/></CommonLayout>} />} />
                <Route path="/reorderReport" element={<ProtectedRoutes element={<CommonLayout><ReorderReport/></CommonLayout>} />} />
                 <Route path="/itemConsumptionReport" element={<ProtectedRoutes element={<CommonLayout><ItemWiseConsumptionReport/></CommonLayout>} />} />
                 <Route path="/compareReport" element={<ProtectedRoutes element={<CommonLayout><IndentVsPOsCompareReport/></CommonLayout>} />} />
                 
            </Routes>
        </>
    )
}

export default Routing