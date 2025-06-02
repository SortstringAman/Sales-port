import React, { useState } from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';

import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import useAutoFocus from '../../Utils/autoFocus';
import { VendorSchema } from '../../Pages/ManageVendors/schema';
import { reactSelectStyles } from '../../Utils/selectboxStyle';

export const ReceiveStock = ({
    isOpen,
    onClose,
    // vendorTypeOptions,
    // stateOptions,
    // countryOptions,
}) => {
    const nameInputRef = useAutoFocus(isOpen);

    const [rows, setRows] = useState([
        { item: null, quantity: '', batch: '', expiry: '', remark: '' },
    ]);
    const handleChange = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    const handleAdd = () => {
        setRows([...rows, { item: null, quantity: '', batch: '', expiry: '', remark: '' }]);
    };

    const handleRemove = (index) => {
        const updated = [...rows];
        updated.splice(index, 1);
        setRows(updated);
    };

    // Formik setup
    const formik = useFormik({
        initialValues: {
            vendorName: '',
            vendorType: '',
            contactPerson: '',
            contactNumber: '',
            alternateNumber: '',
            email: '',
            website: '',
            billingAddress: '',
            shippingAddress: '',
            country: '',
            state: '',
            city: '',
            pincode: '',
            bankName: '',
            accountNumber: '',
            ifscCode: '',
            upiId: '',
            paymentTerms: '',
            gst: '',
            pan: '',
            tdsApplicable: false,
            msme: '',
        },
        VendorSchema,
        onSubmit: (values) => {
            console.log('Form Submitted:', values);
        },
    });

    // Helper to handle react-select changes
    const handleSelectChange = (selectedOption, fieldName) => {
        formik.setFieldValue(fieldName, selectedOption ? selectedOption.value : '');
    };



    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content stock" style={{ position: 'relative', height: '80vh', overflowY: 'auto', padding: '30px' }}>
                <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
                    <h2 className='text-primary'>Receive Stock</h2>
                    <button className="close-btn" onClick={onClose}><img src={close} alt="close" /></button>
                </div>

                <div className='text-secondary mb-3'>
                    Reference Number /Transaction ID <span className='fm-pr-hd'>VEN/2025/671</span>
                </div>

                <form onSubmit={formik.handleSubmit}>

                    {/* Basic Information */}
                    <p className="fm-pr-hd mt-3 text-start  fw-900" style={{ textTransform: 'uppercase' }}>Stock Receiving Details</p>
                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-labell">Select PO Number(if available)<span className='astrisk'>*</span></label>
                            <Select
                                classNamePrefix="react-select"
                                // options={vendorTypeOptions}
                                name="vendorType"
                            // onChange={(opt) => handleSelectChange(opt, 'vendorType')}
                            // onBlur={() => formik.setFieldTouched('vendorType', true)}
                            // value={vendorTypeOptions.find(opt => opt.value === formik.values.vendorType) || null}
                              styles={reactSelectStyles}
                            />
                            {/* {formik.touched.vendorType && formik.errors.vendorType && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{formik.errors.vendorType}</div>
                            )} */}
                        </div>
                        <div className="col-md-3">
                            <label className="form-labell">Vendor Name<span className='astrisk'>*</span></label>
                            <Select
                                classNamePrefix="react-select"
                                // options={vendorTypeOptions}
                                name="vendorType"
                            // onChange={(opt) => handleSelectChange(opt, 'vendorType')}
                            // onBlur={() => formik.setFieldTouched('vendorType', true)}
                            // value={vendorTypeOptions.find(opt => opt.value === formik.values.vendorType) || null}

                            styles={reactSelectStyles}
                            />
                            {/* {formik.touched.vendorType && formik.errors.vendorType && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{formik.errors.vendorType}</div>
                            )} */}
                        </div>
                        <div className="col-md-3">
                            <label className="form-labell">Date of Receiving<span className='astrisk'>*</span></label>
                            <input
                                type="date"
                                className={`form-control ${formik.touched.contactNumber && formik.errors.contactNumber ? 'is-invalid' : ''} input-height`}
                                name="contactNumber"
                                placeholder="DD-MM-YYYY"
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.contactNumber}
                            />
                            {/* {formik.touched.contactNumber && formik.errors.contactNumber && (
                                <div className="invalid-feedback">{formik.errors.contactNumber}</div>
                            )} */}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">Bill No<span className='astrisk'>*</span></label>
                            <input
                                type="date"
                                className={`form-control ${formik.touched.contactNumber && formik.errors.contactNumber ? 'is-invalid' : ''}input-height`}
                                name="contactNumber"
                                placeholder="Enter Bill Number"
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.contactNumber}
                            />
                            {/* {formik.touched.contactNumber && formik.errors.contactNumber && (
                                <div className="invalid-feedback">{formik.errors.contactNumber}</div>
                            )} */}
                        </div>
                    </div>


                    <div className="row d-flecx justify-content-between ">
                        <div className="col-md-4">
                            <label className="form-labell">Store IN<span className='astrisk'>*</span></label>
                            <Select
                                classNamePrefix="react-select"
                                // options={vendorTypeOptions}
                                name="vendorType"
                            // onChange={(opt) => handleSelectChange(opt, 'vendorType')}
                            // onBlur={() => formik.setFieldTouched('vendorType', true)}
                            // value={vendorTypeOptions.find(opt => opt.value === formik.values.vendorType) || null}

                              styles={reactSelectStyles}
                            />
                            {/* {formik.touched.vendorType && formik.errors.vendorType && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{formik.errors.vendorType}</div>
                            )} */}
                        </div>
                        <div className="col-md-4">
                            <label className="form-labell">Upload File <span className="astrisk">*</span></label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    // setFeeFile(e.target.files[0]);
                                    // setUploadErrors([]);
                                }}
                                className="form-control input-height"
                                name="fee_document"
                            />
                        </div>
                    </div>



                    {/* Basic Information */}
                    <p className="fm-pr-hd mt-3 text-start fw-900"  style={{ textTransform: 'uppercase' }}>Stock Details</p>
                    {rows.map((row, index) => (
                        <div className="row mb-3 align-items-end" key={index}>
                            <div className="col-md-2">
                                
                                <Select
                                    //   options={itemOptions}
                                    classNamePrefix="react-select"
                                    value={row.item}
                                    onChange={(opt) => handleChange(index, 'item', opt)}
                                     styles={reactSelectStyles}
                                />
                            </div>
                            <div className="col-md-2">
                             
                                <input
                                    type="number"
                                    className="form-control input-height"
                                    placeholder="Enter Quantity"
                                    value={row.quantity}
                                    onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                />
                            </div>
                            <div className="col-md-2">
                               
                                <input
                                    type="text"
                                    className="form-control input-height"
                                    placeholder="Batch No/Lot No"
                                    value={row.batch}
                                    onChange={(e) => handleChange(index, 'batch', e.target.value)}
                                />
                            </div>
                            <div className="col-md-2">
                               
                                <input
                                    type="date"
                                    className="form-control input-height"
                                    value={row.expiry}
                                    onChange={(e) => handleChange(index, 'expiry', e.target.value)}
                                />
                            </div>
                            <div className="col-md-2">
                               
                                <input
                                    type="text"
                                    className="form-control input-height"
                                    placeholder="Remark"
                                    value={row.remark}
                                    onChange={(e) => handleChange(index, 'remark', e.target.value)}
                                />
                            </div>
                            <div className="col-md-1">
                                {rows.length > 1 && (
                                    <button
                                        // className="btn btn-danger"
                                        onClick={() => handleRemove(index)}
                                        style={{ padding: '6px 10px',color:"rgb(227 37 37)",backgroundColor:"transparent" }}
                                    >
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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


                    <button className="btn mt-2" onClick={handleAdd} style={{border:"none",color:'#7F56DA'}}>
                        <svg width="16" height="16" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="currentColor" />
                        </svg>
                        <span className="ms-2">Add More</span>
                    </button>




                    {/* Submit Button */}
                    <div className="d-flex justify-content-end mt-4">
                        <button type="submit" className="add-btn">
                            Receive Stock
                            {/* <img className="ms-2" src={next} alt="next" /> */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
