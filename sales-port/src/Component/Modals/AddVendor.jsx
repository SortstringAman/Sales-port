import React from 'react';
import Select from 'react-select';
import { useFormik } from 'formik';

import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import useAutoFocus from '../../Utils/autoFocus';
import { VendorSchema } from '../../Pages/ManageVendors/schema';

export const AddNewVendor = ({
    isOpen,
    onClose,
    // vendorTypeOptions,
    // stateOptions,
    // countryOptions,
}) => {
    const nameInputRef = useAutoFocus(isOpen);

 

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
            <div className="modal-content" style={{ position: 'relative', height: '75vh', overflowY: 'auto', padding: '30px' }}>
                <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
                    <h2 className='text-primary'>Create Vendor</h2>
                    <button className="close-btn" onClick={onClose}><img src={close} alt="close" /></button>
                </div>

                <div className='fw-bold text-secondary mb-3'>
                    Vendor Code <span className='text-purple'>VEN/2025/671</span>
                </div>

                <form onSubmit={formik.handleSubmit}>

                    {/* Basic Information */}
                    <p className="fm-pr-hd mt-3 text-start">Basic Information</p>
                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-labell">Vendor Name<span className='astrisk'>*</span></label>
                            <input
                                ref={nameInputRef}
                                type="text"
                                className={`form-control ${formik.touched.vendorName && formik.errors.vendorName ? 'is-invalid' : ''}`}
                                name="vendorName"
                                placeholder="Enter Vendor Name"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.vendorName}
                            />
                            {/* {formik.touched.vendorName && formik.errors.vendorName && (
                                <div className="invalid-feedback">{formik.errors.vendorName}</div>
                            )} */}
                        </div>
                        <div className="col-md-3">
                            <label className="form-labell">Vendor Type<span className='astrisk'>*</span></label>
                            <Select
                                classNamePrefix="react-select"
                                // options={vendorTypeOptions}
                                name="vendorType"
                                // onChange={(opt) => handleSelectChange(opt, 'vendorType')}
                                // onBlur={() => formik.setFieldTouched('vendorType', true)}
                                // value={vendorTypeOptions.find(opt => opt.value === formik.values.vendorType) || null}
                            />
                            {/* {formik.touched.vendorType && formik.errors.vendorType && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{formik.errors.vendorType}</div>
                            )} */}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <p className="fm-pr-hd mt-3 text-start">Contact Information</p>
                    <div className="row">
                        <div className="col-md-2">
                            <label className="form-labell">Contact Person Name<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.contactPerson && formik.errors.contactPerson ? 'is-invalid' : ''}`}
                                name="contactPerson"
                                placeholder="Enter Contact Person"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.contactPerson}
                            />
                            {/* {formik.touched.contactPerson && formik.errors.contactPerson && (
                                <div className="invalid-feedback">{formik.errors.contactPerson}</div>
                            )} */}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">Contact Number<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.contactNumber && formik.errors.contactNumber ? 'is-invalid' : ''}`}
                                name="contactNumber"
                                placeholder="e.g. +91-9876543210"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.contactNumber}
                            />
                            {/* {formik.touched.contactNumber && formik.errors.contactNumber && (
                                <div className="invalid-feedback">{formik.errors.contactNumber}</div>
                            )} */}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">Alternate Number</label>
                            <input
                                type="text"
                                className="form-control"
                                name="alternateNumber"
                                placeholder="Optional"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.alternateNumber}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-labell">Email ID<span className='astrisk'>*</span></label>
                            <input
                                type="email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                name="email"
                                placeholder="Enter Email"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>

                        <div className="col-md-2">
                            <label className="form-labell">Website</label>
                            <input
                                type="text"
                                className="form-control"
                                name="website"
                                placeholder="Optional"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.website}
                            />
                        </div>
                    </div>

                    {/* Address Details */}
                    <p className="fm-pr-hd mt-3 text-start">Address Details</p>
                    <div className="row">
                        <div className="col-md-2">
                            <label className="form-labell">Billing Address<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.billingAddress && formik.errors.billingAddress ? 'is-invalid' : ''}`}
                                name="billingAddress"
                                placeholder="Enter Billing Address"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.billingAddress}
                            />
                            {formik.touched.billingAddress && formik.errors.billingAddress && (
                                <div className="invalid-feedback">{formik.errors.billingAddress}</div>
                            )}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">Shipping Address<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.shippingAddress && formik.errors.shippingAddress ? 'is-invalid' : ''}`}
                                name="shippingAddress"
                                placeholder="Enter Shipping Address"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.shippingAddress}
                            />
                            {formik.touched.shippingAddress && formik.errors.shippingAddress && (
                                <div className="invalid-feedback">{formik.errors.shippingAddress}</div>
                            )}
                        </div>

                        <div className="col-md-2">
                            <label className="form-labell">Country<span className='astrisk'>*</span></label>
                            <Select
                                classNamePrefix="react-select"
                                // options={countryOptions}
                                name="country"
                                // onChange={(opt) => handleSelectChange(opt, 'country')}
                                // onBlur={() => formik.setFieldTouched('country', true)}
                                // value={countryOptions.find(opt => opt.value === formik.values.country) || null}
                            />
                            {formik.touched.country && formik.errors.country && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{formik.errors.country}</div>
                            )}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">State<span className='astrisk'>*</span></label>
                            <Select
                                classNamePrefix="react-select"
                                // options={stateOptions}
                                name="state"
                                // onChange={(opt) => handleSelectChange(opt, 'state')}
                                // onBlur={() => formik.setFieldTouched('state', true)}
                                // value={stateOptions.find(opt => opt.value === formik.values.state) || null}
                            />
                            {formik.touched.state && formik.errors.state && (
                                <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{formik.errors.state}</div>
                            )}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">City<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                                name="city"
                                placeholder="Enter City"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.city}
                            />
                            {formik.touched.city && formik.errors.city && (
                                <div className="invalid-feedback">{formik.errors.city}</div>
                            )}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">Pincode<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.pincode && formik.errors.pincode ? 'is-invalid' : ''}`}
                                name="pincode"
                                placeholder="ZIP"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.pincode}
                            />
                            {formik.touched.pincode && formik.errors.pincode && (
                                <div className="invalid-feedback">{formik.errors.pincode}</div>
                            )}
                        </div>
                    </div>

                    {/* Bank & Payment Information */}
                    <p className="fm-pr-hd mt-3 text-start">Bank & Payment Information</p>
                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-labell">Bank Name<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.bankName && formik.errors.bankName ? 'is-invalid' : ''}`}
                                name="bankName"
                                placeholder="Enter Bank name"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.bankName}
                            />
                            {formik.touched.bankName && formik.errors.bankName && (
                                <div className="invalid-feedback">{formik.errors.bankName}</div>
                            )}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">Account Number<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.accountNumber && formik.errors.accountNumber ? 'is-invalid' : ''}`}
                                name="accountNumber"
                                placeholder="Enter Account number"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.accountNumber}
                            />
                            {formik.touched.accountNumber && formik.errors.accountNumber && (
                                <div className="invalid-feedback">{formik.errors.accountNumber}</div>
                            )}
                        </div>

                        <div className="col-md-2">
                            <label className="form-labell">IFSC Code<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.ifscCode && formik.errors.ifscCode ? 'is-invalid' : ''}`}
                                name="ifscCode"
                                placeholder="Enter IFSC code"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.ifscCode}
                            />
                            {formik.touched.ifscCode && formik.errors.ifscCode && (
                                <div className="invalid-feedback">{formik.errors.ifscCode}</div>
                            )}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">UPI ID (if any)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="upiId"
                                placeholder="Enter UPI id (Optional)"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.upiId}
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-labell">Payment Terms<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.paymentTerms && formik.errors.paymentTerms ? 'is-invalid' : ''}`}
                                name="paymentTerms"
                                placeholder="Enter Payment Terms"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.paymentTerms}
                            />
                            {formik.touched.paymentTerms && formik.errors.paymentTerms && (
                                <div className="invalid-feedback">{formik.errors.paymentTerms}</div>
                            )}
                        </div>
                    </div>

                    {/* Tax & Compliance */}
                    <p className="fm-pr-hd mt-3 text-start">Tax & Compliance</p>
                    <div className="row">
                        <div className="col-md-3">
                            <label className="form-labell">GST number<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.gst && formik.errors.gst ? 'is-invalid' : ''}`}
                                name="gst"
                                placeholder="Enter GST number"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.gst}
                            />
                            {formik.touched.gst && formik.errors.gst && (
                                <div className="invalid-feedback">{formik.errors.gst}</div>
                            )}
                        </div>
                        <div className="col-md-2">
                            <label className="form-labell">PAN Number<span className='astrisk'>*</span></label>
                            <input
                                type="text"
                                className={`form-control ${formik.touched.pan && formik.errors.pan ? 'is-invalid' : ''}`}
                                name="pan"
                                placeholder="Enter PAN Number"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.pan}
                            />
                            {formik.touched.pan && formik.errors.pan && (
                                <div className="invalid-feedback">{formik.errors.pan}</div>
                            )}
                        </div>

                        <div className="col-md-2 pt-4 d-flex align-items-center">
                            <input
                                type="checkbox"
                                id="tdsApplicable"
                                name="tdsApplicable"
                                // onChange={formik.handleChange}
                                // checked={formik.values.tdsApplicable}
                            />
                            <label className="form-labell ms-2" htmlFor="tdsApplicable">TDS Applicable</label>
                        </div>
                        <div className="col-md-4">
                            <label className="form-labell">MSME Registration No</label>
                            <input
                                type="text"
                                className="form-control"
                                name="msme"
                                placeholder="Optional"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.msme}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary d-flex align-items-center">
                            Submit
                            <img className="ms-2" src={next} alt="next" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
