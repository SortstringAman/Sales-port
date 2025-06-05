import React from 'react';
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import { BsUpload } from 'react-icons/bs';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import useAutoFocus from '../../Utils/autoFocus';
import { VendorSchema } from '../../Pages/ManageVendors/schema';
import { reactSelectStyles } from '../../Utils/selectboxStyle';
import { UploadBox } from '../../Utils/uploadFile';
import { itemValidationSchema } from '../../Pages/ManageItems/schema';
import '../../assets/css/Modal.css'; // Make sure to import the CSS
export const AddNewVendor = ({
    isOpen,
    onClose,
    // vendorTypeOptions,
    // stateOptions,
    // countryOptions,
}) => {
    const nameInputRef = useAutoFocus(isOpen);

    const initialValues = {
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
    };

    const vendorTypeOptions = [
        { value: 'manufacturer', label: 'Manufacturer' },
        { value: 'distributor', label: 'Distributor' },
    ];
    const countryOptions = [
        { value: 'india', label: 'India' },
        { value: 'usa', label: 'USA' },
    ];
    const stateOptions = [
        { value: 'up', label: 'Uttar Pradesh' },
        { value: 'mh', label: 'Maharashtra' },
    ];
    const handleSubmit = (values) => {
        // send to API here
        console.log('Form values:', values);

    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content vendor" style={{ position: 'relative', height: '90vh', overflowY: 'auto', padding: '30px' }}>
                <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
                    <h2 className='text-primary'>Create Vendor</h2>
                    <button className="close-btn" onClick={onClose}><img src={close} alt="close" /></button>
                </div>

                <div className='fw-bold text-secondary mb-3'>
                    Vendor Code <span className='text-purple'>VEN/2025/671</span>
                </div>

                <Formik initialValues={initialValues} validationSchema={VendorSchema} onSubmit={handleSubmit}>
                    {({ setFieldValue, values }) => (
                        <Form>
                            <p className="fm-pr-hd mt-2 text-start">Basic Information</p>
                            <div className="row">
                                <div className="col-md-3">
                                    <label>Vendor Name<span className='astrisk'>*</span></label>
                                    <Field name="vendorName" className="form-control input-height" placeholder="Enter Vendor Name" autoFocus />
                                    <ErrorMessage name="vendorName" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-3">
                                    <label>Vendor Type<span className='astrisk'>*</span></label>
                                    <Select
                                        name="vendorType"
                                        options={vendorTypeOptions}
                                        onChange={(opt) => setFieldValue('vendorType', opt?.value)}
                                        value={vendorTypeOptions.find(opt => opt.value === values.vendorType)}
                                    />
                                    <ErrorMessage name="vendorType" component="div" className="text-danger error" />
                                </div>
                            </div>

                            
                            <p className="fm-pr-hd mt-3 text-start">Contact Information</p>
                            <div className="row g-3">
                                <div className="col-md-2 d-flex flex-column">
                                    <label>Contact Person Name<span className='astrisk'>*</span></label>
                                    <Field name="contactPerson" className="form-control input-height" placeholder="Enter Contact Person" />
                                    <ErrorMessage name="contactPerson" component="div" className="text-danger error" style={{ minHeight: '20px' }} />
                                </div>
                                <div className="col-md-2 d-flex flex-column">
                                    <label>Contact Number<span className='astrisk'>*</span></label>
                                    <Field name="contactNumber" className="form-control input-height" placeholder="e.g. +91-9876543210" />
                                    <ErrorMessage name="contactNumber" component="div" className="text-danger error" style={{ minHeight: '20px' }} />
                                </div>
                                <div className="col-md-2 d-flex flex-column">
                                    <label>Alternate Number</label>
                                    <Field name="alternateNumber" className="form-control input-height" placeholder="Optional" />
                                    <div style={{ minHeight: '20px' }}></div>
                                </div>
                                <div className="col-md-2 d-flex flex-column">
                                    <label>Email ID<span className='astrisk'>*</span></label>
                                    <Field name="email" type="email" className="form-control input-height" placeholder="Enter Email" />
                                    <ErrorMessage name="email" component="div" className="text-danger error" style={{ minHeight: '20px' }} />
                                </div>
                                <div className="col-md-2 d-flex flex-column">
                                    <label>Website</label>
                                    <Field name="website" className="form-control input-height" placeholder="Optional" />
                                    <div style={{ minHeight: '20px' }}></div>
                                </div>
                            </div>

                            <p className="fm-pr-hd mt-3 text-start">Address Details</p>
                            <div className="row">
                                <div className="col-md-2">
                                    <label>Billing Address<span className='astrisk'>*</span></label>
                                    <Field name="billingAddress" className="form-control input-height" placeholder="Enter Billing Address" />
                                    <ErrorMessage name="billingAddress" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-2">
                                    <label>Shipping Address<span className='astrisk'>*</span></label>
                                    <Field name="shippingAddress" className="form-control input-height" placeholder="Enter Shipping Address" />
                                    <ErrorMessage name="shippingAddress" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-2">
                                    <label>Country<span className='astrisk'>*</span></label>
                                    <Select
                                        name="country"
                                        options={countryOptions}
                                        onChange={(opt) => setFieldValue('country', opt?.value)}
                                        value={countryOptions.find(opt => opt.value === values.country)}
                                    />
                                    <ErrorMessage name="country" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-2">
                                    <label>State<span className='astrisk'>*</span></label>
                                    <Select
                                        name="state"
                                        options={stateOptions}
                                        onChange={(opt) => setFieldValue('state', opt?.value)}
                                        value={stateOptions.find(opt => opt.value === values.state)}
                                    />
                                    <ErrorMessage name="state" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-2">
                                    <label>City<span className='astrisk'>*</span></label>
                                    <Field name="city" className="form-control input-height" placeholder="Enter City" />
                                    <ErrorMessage name="city" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-2">
                                    <label>Pincode<span className='astrisk'>*</span></label>
                                    <Field name="pincode" className="form-control input-height" placeholder="ZIP" />
                                    <ErrorMessage name="pincode" component="div" className="text-danger error" />
                                </div>
                            </div>

                            <p className="fm-pr-hd mt-3 text-start">Bank & Payment Information</p>
                            <div className="row">
                                <div className="col-md-3">
                                    <label>Bank Name<span className='astrisk'>*</span></label>
                                    <Field name="bankName" className="form-control input-height" placeholder="Enter Bank name" />
                                    <ErrorMessage name="bankName" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-2">
                                    <label>Account Number<span className='astrisk'>*</span></label>
                                    <Field name="accountNumber" className="form-control input-height" placeholder="Enter Account number" />
                                    <ErrorMessage name="accountNumber" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-2">
                                    <label>IFSC Code<span className='astrisk'>*</span></label>
                                    <Field name="ifscCode" className="form-control input-height" placeholder="Enter IFSC code" />
                                    <ErrorMessage name="ifscCode" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-2">
                                    <label>UPI ID (if any)</label>
                                    <Field name="upiId" className="form-control input-height" placeholder="Optional error" />
                                </div>
                                <div className="col-md-3">
                                    <label>Payment Terms<span className='astrisk'>*</span></label>
                                    <Field name="paymentTerms" className="form-control input-height" placeholder="Enter Payment Terms" />
                                    <ErrorMessage name="paymentTerms" component="div" className="text-danger error" />
                                </div>
                            </div>

                            <p className="fm-pr-hd mt-3 text-start">Tax & Compliance</p>
                            <div className="row">
                                <div className="col-md-2">
                                    <label>GST number<span className='astrisk'>*</span></label>
                                    <Field name="gst" className="form-control input-height" placeholder="Enter GST number" />
                                    <ErrorMessage name="gst" component="div" className="text-danger error error" />
                                </div>
                                <div className="col-md-2">
                                    <label>PAN Number<span className='astrisk'>*</span></label>
                                    <Field name="pan" className="form-control input-height" placeholder="Enter PAN Number" />
                                    <ErrorMessage name="pan" component="div" className="text-danger error" />
                                </div>
                                <div className="col-md-2 mt-4">
                                    <label className="form-check-label me-2">TDS Applicable</label>
                                    <Field type="checkbox" name="tdsApplicable" className="form-check-input " />
                                </div>
                                <div className="col-md-2">
                                    <label>MSME Registration No</label>
                                    <Field name="msme" className="form-control input-height" placeholder="Optional" />
                                </div>
                            </div>

                            <p className="fm-pr-hd mt-3 text-start">Attachments & Documents</p>
                            <div className="row g-4">
                                <UploadBox label="Upload GST Certificate" name="gstCert" onFileSelect={(name, file) => setFieldValue(name, file)} />
                                <UploadBox label="PAN Card Copy" name="panCard" onFileSelect={(name, file) => setFieldValue(name, file)} />
                                <UploadBox label="Bank Cancelled Cheque" name="cheque" onFileSelect={(name, file) => setFieldValue(name, file)} />
                                <UploadBox label="Other Licenses" name="otherLicenses" onFileSelect={(name, file) => setFieldValue(name, file)} />

                            </div>

                            <div className="d-flex justify-content-end mt-4">
                                <button type="submit" className="add-btn">
                                    Create Vendor
                                    <img className="ms-2" src={next} alt="next" />
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
