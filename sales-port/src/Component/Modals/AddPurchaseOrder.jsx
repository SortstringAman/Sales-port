

import React, { useState } from 'react';
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BsUpload } from 'react-icons/bs';
import close from '../../assets/icons/close.svg';
import { VendorSchema } from '../../Pages/ManageVendors/schema';
import { reactSelectStyles } from '../../Utils/selectboxStyle';
import { UploadBox } from '../../Utils/uploadFile';
import '../../assets/css/Modal.css'; // Make sure to import the CSS
import { PurchaseOrderSchema } from '../../Pages/ManagePOs/schema';

export const AddPurchaseOrder = ({ isOpen, onClose }) => {
    // Internal options
    const indentNumberOptions = [
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
    const currencyOptions = [
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
];

    const paymentTermsOptions = [
  { value: 'advance', label: 'Advance' },
  { value: 'net_15', label: 'Net 15 Days' },
  { value: 'net_30', label: 'Net 30 Days' },
  { value: 'net_60', label: 'Net 60 Days' },
  { value: 'upon_delivery', label: 'Upon Delivery' },
];

    // Dynamic rows state
    // State for dynamic rows
    const [rows, setRows] = useState([
        {
            itemName: '',
            indentNumber: '',
            reqQuantity: '',
            approvedQuantity: '',
            uom: '',
            unitRate: '',
            totalAmount: '',
            gst: '',
            itemRemarks: ''
        },
    ]);

    // Add new empty row
    const handleAdd = (e) => {
        e.preventDefault();
        setRows([
            ...rows,
            {
                itemName: '',
                indentNumber: '',
                reqQuantity: '',
                approvedQuantity: '',
                uom: '',
                unitRate: '',
                totalAmount: '',
                gst: '',
                itemRemarks: ''
            }
        ]);
    };

    // Remove row by index
    const handleRemove = (index, e) => {
        e.preventDefault();
        const updated = [...rows];
        updated.splice(index, 1);
        setRows(updated);
    };

    // Update a specific field in a row
    const handleChangeRow = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };
    
    
    const handleSubmit = (values) => {
  // Transform data if needed
  const transformed = {
    ...values,
    items: values.items.map((row) => ({
      itemName: row.itemName,
      indentNumber: row.indentNumber,
      reqQuantity: parseFloat(row.reqQuantity),
      approvedQuantity: parseFloat(row.approvedQuantity),
      uom: row.uom,
      unitRate: parseFloat(row.unitRate),
      totalAmount: parseFloat(row.totalAmount),
      gst: row.gst,
      itemRemarks: row.itemRemarks,
    })),
  };

  console.log("Final Data to Submit for POs::==>", transformed);

  // Submit to API (you can use axios/fetch here)
  // axios.post('/api/purchase-orders', transformed)
  //   .then(response => ...)
  //   .catch(error => ...);
};





    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div
                className="modal-content pos"
                style={{ position: 'relative', height: '90vh', overflowY: 'auto', padding: '30px' }}
            >
                <div className="modal-header-content d-flex justify-content-between align-items-center mb-3 poorder">
                    <h2 className="text-primary">Create Purchase Order</h2>
                    <button className="close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </button>
                </div>

                <div className="text-secondary mb-3">
                    PO Number <span className="fm-pr-hd">PO/2025-26/004</span>
                </div>

                <Formik
                    initialValues={{
                        indentNumber: '',
                        indentDate: '',
                        requestedBy: '',
                        poDate: '',
                        createdBy: '',
                        vendorName: '',
                        vendorContact: '',
                        deliveryAddress: '',
                        billingAddress: '',
                        deliveryDate: '',
                        paymentTerms: '',
                        currency: '',
                        subTotal: '',
                        totalTax: '',
                        grandTotal: '',
                        gstCert: null,
                        panCard: null,
                        term: '',
                        items: [
                            {
                                itemname: '',
                                indentnumber: '',
                                reqquantity: '',
                                approvedquantity: '',
                                uom: '',
                                unitrate: '',
                                totalamount: '',
                                gst: '',
                                itemremarks: ''
                            }
                        ]
                    }}
                    validationSchema={PurchaseOrderSchema}
                    onSubmit={handleSubmit}  // ✅ using the separate functions
                >
                    {({ setFieldValue, values, errors, touched }) => (
                        <Form>
                            {/* Stock Receiving Details */}
                            <p className="fm-pr-hd mt-3 text-start fw-900" style={{ textTransform: 'uppercase' }}>
                                Link To Indent </p>
                            <div className="row">
                                <div className="col-md-4">
                                    <label className="form-labell">
                                        Link Indent Number<span className="astrisk">*</span>
                                    </label>
                                    <Select
                                        autoFocus
                                        classNamePrefix="react-select"
                                        options={indentNumberOptions}
                                        name="indentNumber"
                                        styles={reactSelectStyles}
                                        value={indentNumberOptions.find((opt) => opt.value === values.indentNumber) || null}
                                        onChange={(option) => setFieldValue('indentNumber', option ? option.value : '')}
                                    />
                                    <ErrorMessage name="indentNumber" component="div" className="text-danger error" />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-labell">
                                        Indent Date<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="date"
                                        name="indentDate"
                                        className={`form-control input-height ${touched.indentDate && errors.indentDate ? 'is-invalid' : ''
                                            }`} />
                                    <ErrorMessage name="indentDate" component="div" className="invalid-feedback error" />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-labell">
                                        Requested By<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="requestedBy"
                                        placeholder="Auto Filled (store manager)"
                                        className={`form-control input-height ${touched.requestedBy && errors.requestedBy ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="requestedBy" component="div" className="invalid-feedback error" />
                                </div>
                            </div>


                            <p className="fm-pr-hd mt-3 text-start fw-900" style={{ textTransform: 'uppercase' }}>
                                PO Header Information
                            </p>

                            <div className="row d-flex justify-content-between mt-3">
                                <div className="col-md-3">
                                    <label className="form-labell">
                                        PO  Date<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="date"
                                        name="poDate"
                                        className={`form-control input-height ${touched.poDate && errors.poDate ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="poDate" component="div" className="invalid-feedback error" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-labell">
                                        Created By(Purchase Manager)<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="createdBy"
                                        placeholder="Auto Filled (store manager)"
                                        className={`form-control input-height ${touched.createdBy && errors.createdBy ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="createdBy" component="div" className="invalid-feedback error" />
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
                                        Vendor Contact Details<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="vendorContact"
                                        placeholder="Auto Filled"
                                        className={`form-control input-height ${touched.vendorContact && errors.vendorContact ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="vendorContact" component="div" className="invalid-feedback error" />
                                </div>

                            </div>


                            <div className="row d-flex justify-content-between mt-3">
                                <div className="col-md-3">
                                    <label className="form-labell">
                                        Delivery Address<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="deliveryAddress"
                                        placeholder="Auto Filled"
                                        className={`form-control input-height ${touched.deliveryAddress && errors.deliveryAddress ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="deliveryAddress" component="div" className="invalid-feedback error" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-labell">
                                        Billing Address<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="billingAddress"
                                        placeholder="Auto Filled"
                                        className={`form-control input-height ${touched.billingAddress && errors.billingAddress ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="billingAddress" component="div" className="invalid-feedback error" />
                                </div>

                                <div className="col-md-3">
                                    <label className="form-labell">
                                        Delivery Date<span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="date"
                                        name="deliveryDate"
                                        className={`form-control input-height ${touched.deliveryDate && errors.deliveryDate ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="deliveryDate" component="div" className="invalid-feedback error" />
                                </div>


                                <div className="col-md-3">
                                    <label className="form-labell">
                                        Payment Terms<span className="astrisk">*</span>
                                    </label>
                                    <Select

                                        classNamePrefix="react-select"
                                        options={paymentTermsOptions}
                                        name="paymentTerms"
                                        styles={reactSelectStyles}
                                        value={paymentTermsOptions.find((opt) => opt.value === values.paymentTerms) || null}
                                        onChange={(option) => setFieldValue('paymentTerms', option ? option.value : '')}
                                    />
                                    <ErrorMessage name="paymentTerms" component="div" className="text-danger error" />
                                </div>

                            </div>

                            {/* Stock Details */}
                            <p className="fm-pr-hd mt-3 text-start fw-900" style={{ textTransform: 'uppercase' }}>
                                Item Details
                            </p>
                            {rows.map((row, index) => (

                                <div className="row g-4 item-details">
                                    <div className="col-md-2">
                                        <label className="form-labell">Item Name</label>
                                        <input
                                            type="text"
                                            className="form-control input-height"
                                            placeholder="Item Name"
                                            value={row.itemName}
                                            onChange={(e) => handleChangeRow(index, 'itemName', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <label className="form-labell" style={{ fontSize: '13px' }}>Indent Number</label>
                                        <input
                                            type="text"
                                            className="form-control input-height"
                                            placeholder="Indent Number"
                                            value={row.indentNumber}
                                            onChange={(e) => handleChangeRow(index, 'indentNumber', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <label className="form-labell">Req Qty</label>
                                        <input
                                            type="number"
                                            className="form-control input-height"
                                            placeholder="Req Qty"
                                            value={row.reqQuantity}
                                            onChange={(e) => handleChangeRow(index, 'reqQuantity', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <label className="form-labell">Approved Qty</label>
                                        <input
                                            type="number"
                                            className="form-control input-height"
                                            placeholder="Approved Qty"
                                            value={row.approvedQuantity}
                                            onChange={(e) => handleChangeRow(index, 'approvedQuantity', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <label className="form-labell">UOM</label>
                                        <input
                                            type="text"
                                            className="form-control input-height"
                                            placeholder="UOM"
                                            value={row.uom}
                                            onChange={(e) => handleChangeRow(index, 'uom', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <label className="form-labell">Unit Rate</label>
                                        <input
                                            type="number"
                                            className="form-control input-height"
                                            placeholder="Unit Rate"
                                            value={row.unitRate}
                                            onChange={(e) => handleChangeRow(index, 'unitRate', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <label className="form-labell">Total Amount</label>
                                        <input
                                            type="number"
                                            className="form-control input-height"
                                            placeholder="Total Amount"
                                            value={row.totalAmount}
                                            onChange={(e) => handleChangeRow(index, 'totalAmount', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <label className="form-labell">GST</label>
                                        <input
                                            type="text"
                                            className="form-control input-height"
                                            placeholder="GST"
                                            value={row.gst}
                                            onChange={(e) => handleChangeRow(index, 'gst', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className="form-labell">Item Remarks</label>
                                        <input
                                            type="text"
                                            className="form-control input-height"
                                            placeholder="Item Remarks"
                                            value={row.itemRemarks}
                                            onChange={(e) => handleChangeRow(index, 'itemRemarks', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        {rows.length > 1 && (
                                            <button
                                                onClick={(e) => handleRemove(index, e)}
                                                style={{
                                                    padding: '6px 10px',
                                                    color: 'rgb(227 37 37)',
                                                    backgroundColor: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    marginTop: '40px'
                                                }}
                                                type="button"
                                                aria-label="Remove row"
                                            >
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
                            <p className="fm-pr-hd mt-3 text-start fw-900" style={{ textTransform: 'uppercase' }}>
                                PO Summary
                            </p>

                            <div className="row d-flex justify-content-between mt-3">
                                <div className="col-md-7 porupees" >
                                    <div className="row d-flex g-5">
                                        <div className="col-md-2">
                                            <label className="form-labell">
                                                Sub Total<span className="astrisk">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="subTotal"
                                                className={`form-control input-height ${touched.subTotal && errors.subTotal ? 'is-invalid' : ''
                                                    }`}
                                                placeholder="₹ 1800"

                                            />
                                            <ErrorMessage name="subTotal" component="div" className="invalid-feedback error" />
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-labell">
                                                Total TAX<span className="astrisk">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="totalTax"
                                                className={`form-control input-height ${touched.totalTax && errors.totalTax ? 'is-invalid' : ''
                                                    }`}
                                                placeholder="₹ 800"
                                            />
                                            <ErrorMessage name="totalTax" component="div" className="invalid-feedback error" />
                                        </div>

                                        <div className="col-md-2">
                                            <label className="form-labell">
                                                TGrand Total<span className="astrisk">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                name="grandTotal"
                                                className={`form-control input-height ${touched.grandTotal && errors.grandTotal ? 'is-invalid' : ''
                                                    }`}
                                                placeholder="₹ 1100"
                                            />
                                            <ErrorMessage name="grandTotal" component="div" className="invalid-feedback error" />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-labell">
                                                Currency <span className="astrisk">*</span>
                                            </label>
                                            <Select
                                                classNamePrefix="react-select"
                                                options={currencyOptions}
                                                name="currency"
                                                styles={reactSelectStyles}
                                                value={currencyOptions.find((opt) => opt.value === values.currency) || null}
                                                onChange={(option) => setFieldValue('currency', option ? option.value : '')}
                                            />
                                            <ErrorMessage name="currency" component="div" className="text-danger error" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="row g-4">
                                        <UploadBox label="Upload Indent Copy  (pdf/Excel)" name="gstCert" onFileSelect={(name, file) => setFieldValue(name, file)} col="col-md-6" />
                                        <UploadBox label="Scope /Annexure (if any)" name="panCard" onFileSelect={(name, file) => setFieldValue(name, file)} col="col-md-5" />
                                    </div>
                                </div>

                            </div>

                            <div className="row d-flex ">
                                <div className="col-md-6">
                                    <label className="form-labell">
                                        Terms & Conditions
                                    </label>
                                    <Field
                                        type="text"
                                        name="term"
                                        placeholder="Terms & condition"
                                        className={`form-control input-height ${touched.term && errors.term ? 'is-invalid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="term" component="div" className="invalid-feedback error" />
                                </div>
                            </div>

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
