import React, { useState } from 'react';
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BsUpload } from 'react-icons/bs';
import close from '../../assets/icons/close.svg';
import { VendorSchema } from '../../Pages/ManageVendors/schema';
import { reactSelectStyles } from '../../Utils/selectboxStyle';
import '../../assets/css/Modal.css'; // Make sure to import the CSS
import { ReceiveStockSchema } from '../../Pages/ManageStocks/schema';
export const ReceiveStock = ({ isOpen, onClose }) => {
    // Internal options
    const poNumberOptions = [
        { value: 'PO-1001', label: 'PO-1001' },
        { value: 'PO-1002', label: 'PO-1002' },
        { value: 'PO-1003', label: 'PO-1003' },
    ];
    const vendorNameOptions = [
        { value: 'Vendor A', label: 'Vendor A' },
        { value: 'Vendor B', label: 'Vendor B' },
        { value: 'Vendor C', label: 'Vendor C' },
    ];
    const storeInOptions = [
        { value: 'Main Warehouse', label: 'Main Warehouse' },
        { value: 'Secondary Warehouse', label: 'Secondary Warehouse' },
    ];
    const itemOptions = [
        { value: 'Item 1', label: 'Item 1' },
        { value: 'Item 2', label: 'Item 2' },
        { value: 'Item 3', label: 'Item 3' },
    ];

    // Dynamic rows state
    const [rows, setRows] = useState([
        { item: null, quantity: '', batch: '', expiry: '', remark: '' },
    ]);

    // Add new empty row
    const handleAdd = (e) => {
        e.preventDefault();
        setRows([...rows, { item: null, quantity: '', batch: '', expiry: '', remark: '' }]);
    };

    // Remove row by index
    const handleRemove = (index, e) => {
        e.preventDefault();
        const updated = [...rows];
        updated.splice(index, 1);
        setRows(updated);
    };

    // Update field of row at index
    const handleChangeRow = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div
                className="modal-content stock"
                style={{ position: 'relative' , overflowY: 'auto', padding: '30px' }}
            >
                <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">Receive Stock</h2>
                    <button className="close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </button>
                </div>

                <div className="text-secondary mb-3">
                    Reference Number /Transaction ID <span className="fm-pr-hd">VEN/2025/671</span>
                </div>

                <Formik
                    initialValues={{
                        poNumber: '',
                        vendorName: '',
                        dateOfReceiving: '',
                        billNo: '',
                        storeIn: '',
                        file: null,
                    }}
                    validationSchema={ReceiveStockSchema}
                    onSubmit={(values) => {
                        const dataToSubmit = {
                            ...values,
                            stockItems: rows.map((row) => ({
                                item: row.item ? row.item.value : null,
                                quantity: row.quantity,
                                batch: row.batch,
                                expiry: row.expiry,
                                remark: row.remark,
                            })),
                        };
                        console.log('Submit Data:', dataToSubmit);
                        // Submit your form data here
                    }}
                >
                    {({ setFieldValue, values, errors, touched }) => (
                        <Form>
                            {/* Stock Receiving Details */}
                            <p className="fm-pr-hd mt-3 text-start fw-900" style={{ textTransform: 'uppercase' }}>
                                Stock Receiving Details
                            </p>
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="form-labell">
                                        Select PO Number(if available)<span className="astrisk">*</span>
                                    </label>
                                    <Select
                                    autoFocus
                                        classNamePrefix="react-select"
                                        options={poNumberOptions}
                                        name="poNumber"
                                        styles={reactSelectStyles}
                                        value={poNumberOptions.find((opt) => opt.value === values.poNumber) || null}
                                        onChange={(option) => setFieldValue('poNumber', option ? option.value : '')}
                                    />
                                    <ErrorMessage name="poNumber" component="div" className="text-danger error" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-labell">
                                        Vendor Name<span className="astrisk">*</span>
                                    </label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={vendorNameOptions}
                                        name="vendorName"
                                        styles={reactSelectStyles}
                                        value={vendorNameOptions.find((opt) => opt.value === values.vendorName) || null}
                                        onChange={(option) => setFieldValue('vendorName', option ? option.value : '')}
                                    />
                                    <ErrorMessage name="vendorName" component="div" className="text-danger error" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-labell">
                                        Date of Receiving<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="date"
                                        name="dateOfReceiving"
                                        className={`form-control input-height ${touched.dateOfReceiving && errors.dateOfReceiving ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="dateOfReceiving" component="div" className="invalid-feedback error" />
                                </div>

                                <div className="col-md-2">
                                    <label className="form-labell">
                                        Bill No<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="billNo"
                                        placeholder="Enter Bill Number"
                                        className={`form-control input-height ${touched.billNo && errors.billNo ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="billNo" component="div" className="invalid-feedback error" />
                                </div>
                            </div>

                            <div className="row d-flex justify-content-between mt-3">
                                <div className="col-md-4">
                                    <label className="form-labell">
                                        Store IN<span className="astrisk">*</span>
                                    </label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={storeInOptions}
                                        name="storeIn"
                                        styles={reactSelectStyles}
                                        value={storeInOptions.find((opt) => opt.value === values.storeIn) || null}
                                        onChange={(option) => setFieldValue('storeIn', option ? option.value : '')}
                                    />
                                    <ErrorMessage name="storeIn" component="div" className="text-danger error" />
                                </div>




                                <div className="col-md-4">
                                    <label className="form-label">
                                        Upload File <span className="astrisk">*</span>
                                    </label>
                                    <div
                                        className="border rounded d-flex justify-content-between align-items-center p-3"
                                        style={{ cursor: 'pointer', color: '#7F56DA' }}
                                        onClick={() => document.getElementById('fileInput').click()}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <BsUpload />
                                            <span className="fw-semibold">Upload</span>
                                        </div>
                                        <span className="text-muted small">PDF/JPG</span>
                                    </div>

                                    <input
                                        type="file"
                                        id="fileInput"
                                        name="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            setFieldValue('file', e.currentTarget.files[0]);
                                        }}
                                    />
                                    <ErrorMessage name="file" component="div" className="text-danger error" />
                                </div>

                            </div>

                            {/* Stock Details */}
                            <p className="fm-pr-hd mt-3 text-start fw-900" style={{ textTransform: 'uppercase' }}>
                                Stock Details
                            </p>
                            {rows.map((row, index) => (
                                <div className="row mb-3 align-items-end" key={index}>
                                    <div className="col-md-2">
                                        <Select
                                            options={itemOptions}
                                            classNamePrefix="react-select"
                                            value={row.item}
                                            styles={reactSelectStyles}
                                            onChange={(opt) => handleChangeRow(index, 'item', opt)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            type="number"
                                            className="form-control input-height"
                                            placeholder="Enter Quantity"
                                            value={row.quantity}
                                            onChange={(e) => handleChangeRow(index, 'quantity', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            type="text"
                                            className="form-control input-height"
                                            placeholder="Batch No/Lot No"
                                            value={row.batch}
                                            onChange={(e) => handleChangeRow(index, 'batch', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            type="date"
                                            className="form-control input-height"
                                            value={row.expiry}
                                            onChange={(e) => handleChangeRow(index, 'expiry', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <input
                                            type="text"
                                            className="form-control input-height"
                                            placeholder="Remark"
                                            value={row.remark}
                                            onChange={(e) => handleChangeRow(index, 'remark', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        {rows.length > 1 && (
                                            <button
                                                onClick={(e) => handleRemove(index, e)}
                                                style={{ padding: '6px 10px', color: 'rgb(227 37 37)', backgroundColor: 'transparent' }}
                                                type="button"
                                                aria-label="Remove row"
                                            >
                                                {/* SVG trash icon */}
                                                <svg
                                                    width="17"
                                                    height="17"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8 6V4C8 3.44772 8.44771 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}


                            <button className="btn mt-2" onClick={handleAdd} style={{ border: "none", color: '#7F56DA' }}>
                                <svg width="16" height="16" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="currentColor" />
                                </svg>
                                <span className="ms-2">Add More</span>
                            </button>


                            <div className="d-flex justify-content-end mt-4">
                                <button type="submit" className="add-btn">
                                    Receive Stock
                                    {/* <img className="ms-2" src={next} alt="next" /> */}
                                </button>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
