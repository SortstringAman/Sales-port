import React from 'react';
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import close from '../../assets/icons/close.svg';
import useAutoFocus from '../../Utils/autoFocus';
import '../../assets/css/Modal.css'; // Make sure to import the CSS
import { reactSelectStyles } from '../../Utils/selectboxStyle';
import { VendorSchema } from '../../Pages/ManageVendors/schema';

const departmentOptions = [
    { value: 'finance', label: 'Finance' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'HR' },
    // Add more department options here
];

const issuingToOptions = [
    { value: 'warehouse1', label: 'Warehouse 1' },
    { value: 'store1', label: 'Store 1' },
    // Add more issuing to options here
];

const itemOptions = [
    { value: 'item1', label: 'Item 1' },
    { value: 'item2', label: 'Item 2' },
    // Add more item options here
];

export const IssueStock = ({ isOpen, onClose }) => {
    const nameInputRef = useAutoFocus(isOpen);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div
                className="modal-content stock"
                style={{ position: 'relative', height: '80vh', overflowY: 'auto', padding: '30px' }}
            >
                <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">Receive Stock</h2>
                    <button className="close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </button>
                </div>

                <div className="fw-bold text-secondary mb-3">
                    Reference Number /Transaction ID <span className="text-purple">VEN/2025/671</span>
                </div>

                <Formik
                    initialValues={{
                        department_name: '',
                        issuingto: '',
                        date_of_issuing: '',
                        stockDetails: [{ item: null, quantity: '', batch: '', expiry: '', remark: '' }],
                        purpose: '',
                        remark: '',
                    }}
                    validationSchema={VendorSchema}
                    onSubmit={(values) => {
                        console.log('Form Submitted:', values);
                    }}
                >
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form>
                            {/* Stock Issuing Details */}
                            <p
                                className="fm-pr-hd mt-2 text-start"
                                style={{ textTransform: 'uppercase' }}
                            >
                                Stock Issuing Details
                            </p>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="form-labell">
                                        Department Name<span className="astrisk">*</span>
                                    </label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={departmentOptions}
                                        name="department_name"
                                        onChange={(option) =>
                                            setFieldValue('department_name', option ? option.value : '')
                                        }
                                        onBlur={() => {
                                            if (!touched.department_name) {
                                                // mark as touched to show errors if needed
                                                setFieldValue('department_name', values.department_name);
                                            }
                                        }}
                                        value={
                                            departmentOptions.find(
                                                (opt) => opt.value === values.department_name
                                            ) || null
                                        }
                                        menuPortalTarget={document.body}
                                        menuPosition="fixed"
                                        styles={reactSelectStyles}
                                    />
                                    <ErrorMessage
                                        name="department_name"
                                        component="div"
                                        className="text-danger mt-1"
                                        style={{ fontSize: '0.875em' }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-labell">
                                        Stock issuing to<span className="astrisk">*</span>
                                    </label>
                                    <Select
                                        classNamePrefix="react-select"
                                        options={issuingToOptions}
                                        name="issuingto"
                                        onChange={(option) =>
                                            setFieldValue('issuingto', option ? option.value : '')
                                        }
                                        onBlur={() => {
                                            if (!touched.issuingto) {
                                                setFieldValue('issuingto', values.issuingto);
                                            }
                                        }}
                                        value={
                                            issuingToOptions.find((opt) => opt.value === values.issuingto) ||
                                            null
                                        }
                                        menuPortalTarget={document.body}
                                        menuPosition="fixed"
                                        styles={reactSelectStyles}
                                    />
                                    <ErrorMessage
                                        name="issuingto"
                                        component="div"
                                        className="text-danger mt-1"
                                        style={{ fontSize: '0.875em' }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-labell">
                                        Date of Issuing<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="date"
                                        className={`form-control input-height ${touched.date_of_issuing && errors.date_of_issuing
                                            ? 'is-invalid'
                                            : ''
                                            }`}
                                        name="date_of_issuing"
                                        placeholder="DD-MM-YYYY"
                                        innerRef={nameInputRef}
                                    />
                                    <ErrorMessage
                                        name="date_of_issuing"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </div>

                            {/* Stock Details */}
                            <p
                                className="fm-pr-hd mt-3 text-start fw-900"
                                style={{ textTransform: 'uppercase' }}
                            >
                                Stock Details
                            </p>

                            {values.stockDetails.map((row, index) => (
                                <div className="row mb-3 align-items-end" key={index}>
                                    <div className="col-md-2">
                                        <Select
                                            classNamePrefix="react-select"
                                            styles={reactSelectStyles}
                                            options={itemOptions}
                                            value={itemOptions.find((opt) => opt.value === row.item) || null}
                                            onChange={(option) =>
                                                setFieldValue(`stockDetails[${index}].item`, option ? option.value : '')
                                            }
                                            menuPortalTarget={document.body}
                                            menuPosition="fixed"
                                            placeholder="Select item"
                                        />
                                        <ErrorMessage
                                            name={`stockDetails[${index}].item`}
                                            component="div"
                                            className="text-danger mt-1"
                                            style={{ fontSize: '0.875em' }}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <Field
                                            type="number"
                                            className="form-control input-height"
                                            name={`stockDetails[${index}].quantity`}
                                            placeholder="Available Quantity"
                                        />
                                        <ErrorMessage
                                            name={`stockDetails[${index}].quantity`}
                                            component="div"
                                            className="text-danger mt-1"
                                            style={{ fontSize: '0.875em' }}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <Field
                                            type="text"
                                            className="form-control input-height"
                                            name={`stockDetails[${index}].batch`}
                                            placeholder="Enter Require Quantity"
                                        />
                                        <ErrorMessage
                                            name={`stockDetails[${index}].batch`}
                                            component="div"
                                            className="text-danger mt-1"
                                            style={{ fontSize: '0.875em' }}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Field
                                            type="text"
                                            className="form-control input-height"
                                            name={`stockDetails[${index}].remark`}
                                            placeholder="Remark"
                                        />
                                        <ErrorMessage
                                            name={`stockDetails[${index}].remark`}
                                            component="div"
                                            className="text-danger mt-1"
                                            style={{ fontSize: '0.875em' }}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        {values.stockDetails.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newStockDetails = [...values.stockDetails];
                                                    newStockDetails.splice(index, 1);
                                                    setFieldValue('stockDetails', newStockDetails);
                                                }}
                                                style={{ padding: '6px 10px', color: 'rgb(227 37 37)', backgroundColor: 'transparent', border: 'none' }}
                                            >
                                                <svg
                                                    width="17"
                                                    height="17"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M3 6H5H21"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M8 6V4C8 3.44772 8.44771 3 9 3H15C15.5523 3 16 3.44772 16 4V6M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6H19Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M10 11V17"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M14 11V17"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="btn mt-2"
                                onClick={() =>
                                    setFieldValue('stockDetails', [
                                        ...values.stockDetails,
                                        { item: null, quantity: '', batch: '', expiry: '', remark: '' },
                                    ])
                                }
                                style={{ border: 'none', color: '#7F56DA' }}
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 22 23"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z"
                                        fill="#7F56DA"
                                    />
                                </svg>
                                <span style={{ paddingLeft: '8px', fontSize: '14px' }}>Add Stock</span>
                            </button>

                            {/* Purpose and Remark */}
                            <p
                                className="fm-pr-hd mt-3 text-start fw-900"
                                style={{ textTransform: 'uppercase' }}
                            >
                                Purpose and Remark
                            </p>

                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="form-labell">Purpose</label>
                                    <Field
                                        as="textarea"
                                        className="form-control input-height"
                                        name="purpose"
                                        placeholder="Purpose"
                                        rows={5}  // optional, you can set rows for height
                                    />
                                    <ErrorMessage
                                        name="purpose"
                                        component="div"
                                        className="text-danger mt-1"
                                        style={{ fontSize: '0.875em' }}
                                    />

                                </div>
                                <div className="col-md-6">
                                    <label className="form-labell">Remark</label>
                                    <Field
                                        as="textarea"
                                        className="form-control input-height"
                                        name="remark"
                                        placeholder="Remark"
                                        row={5}
                                    />
                                    <ErrorMessage
                                        name="remark"
                                        component="div"
                                        className="text-danger mt-1"
                                        style={{ fontSize: '0.875em' }}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="d-flex justify-content-end mt-4">
                                <button type="submit" className="add-btn">
                                    Issue Stock
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
