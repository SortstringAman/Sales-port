import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import '../../assets/css/ManageItem.css';
import { reactSelectStyles } from '../../Utils/selectboxStyle';
import { itemValidationSchema } from '../../Pages/ManageItems/schema';
import useAutoFocus from '../../Utils/autoFocus';


const AddItem = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const initialValues = {
        itemName: '',
        itemCategory: null,
        uom: null,
        itemType: null,
        minStock: '',
        reorderLevel: '',
        sku: '',
        defaultVendor: null,
        storageCondition: null,
        brand: '',
        shelfLife: '',
        batchEnabled: false,
        expiryRequired: false,
        description: ''
    };


    const itemCategoryOptions = [
        { label: "Stationery", value: "stationery" },
        { label: "Furniture", value: "furniture" }
    ];

    const uomOptions = [
        { label: "Pieces", value: "pcs" },
        { label: "Kilograms", value: "kg" }
    ];

    const itemTypeOptions = [
        { label: "Consumable", value: "consumable" },
        { label: "Non-consumable", value: "non-consumable" }
    ];

    const vendorOptions = [
        { label: "Vendor A", value: "vendorA" },
        { label: "Vendor B", value: "vendorB" }
    ];

    const storageOptions = [
        { label: "Room Temp", value: "room" },
        { label: "Refrigerated", value: "cold" }
    ];

    return (
        <div className="modal-overlay add-item">
            <div className="modal-content" style={{ position: 'relative', overflowY: 'auto', padding: '30px', maxHeight: '93vh' }}>
                <div className="modal-header-content d-flex justify-content-between align-items-center">
                    <h2 className="text-primary">Create Item</h2>
                    <button className="close-btn" onClick={onClose}><img src={close} alt="close" /></button>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={itemValidationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                        onClose();
                    }}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="modal-body">

                            {/* Row 1 */}
                            <div className="row mt-3">
                                <p className="fm-pr-hd mt-3 text-start fw-900" style={{ textTransform: 'uppercase' }}>Item Details</p>
                                <div className="col-md-4">
                                    <label>Item Name<span className="astrisk">*</span></label>
                                    <Field type="text" name="itemName" className="form-control input-height" placeholder="Enter item name" autoFocus/>
                                    <ErrorMessage name="itemName" component="div" className="text-danger small" />
                                </div>

                                <div className="col-md-4">
                                    <label>Item Category<span className="astrisk">*</span></label>
                                    <Select
                                        name="itemCategory"
                                        options={itemCategoryOptions}
                                        value={values.itemCategory}
                                        onChange={val => setFieldValue('itemCategory', val)}
                                        styles={reactSelectStyles}
                                    />
                                    <ErrorMessage name="itemCategory" component="div" className="text-danger small" />
                                </div>

                                <div className="col-md-4">
                                    <label>Unit of Measurement (UoM)<span className="astrisk">*</span></label>
                                    <Select
                                        name="uom"
                                        options={uomOptions}
                                        value={values.uom}
                                        onChange={val => setFieldValue('uom', val)}
                                        styles={reactSelectStyles}
                                    />
                                    <ErrorMessage name="uom" component="div" className="text-danger small" />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="row mt-3">
                                <div className="col-md-4">
                                    <label>Item Type<span className="astrisk">*</span></label>
                                    <Select
                                        name="itemType"
                                        options={itemTypeOptions}
                                        value={values.itemType}
                                        onChange={val => setFieldValue('itemType', val)}
                                        styles={reactSelectStyles}
                                    />
                                    <ErrorMessage name="itemType" component="div" className="text-danger small" />
                                </div>
                                <div className="col-md-4">
                                    <label>Min Stock Level</label>
                                    <Field type="number" name="minStock" className="form-control input-height" placeholder="Enter opening stock" />
                                    <ErrorMessage name="minStock" component="div" className="text-danger small" />
                                </div>
                                <div className="col-md-4">
                                    <label>Reorder Level</label>
                                    <Field type="number" name="reorderLevel" className="form-control input-height" placeholder="Enter reorder level" />
                                    <ErrorMessage name="reorderLevel" component="div" className="text-danger small" />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="row mt-3">
                                <div className="col-md-4">
                                    <label>SKU Code</label>
                                    <Field type="text" name="sku" className="form-control input-height" placeholder="Enter HSN / SKU code" />
                                </div>
                                <div className="col-md-4">
                                    <label>Default Vendor</label>
                                    <Select
                                        name="defaultVendor"
                                        options={vendorOptions}
                                        value={values.defaultVendor}
                                        onChange={val => setFieldValue('defaultVendor', val)}
                                        styles={reactSelectStyles}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label>Storage Condition</label>
                                    <Select
                                        name="storageCondition"
                                        options={storageOptions}
                                        value={values.storageCondition}
                                        onChange={val => setFieldValue('storageCondition', val)}
                                        styles={reactSelectStyles}
                                    />
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="row mt-3">
                                <div className="col-md-4">
                                    <label>Brand / Manufacturer</label>
                                    <Field type="text" name="brand" className="form-control input-height" placeholder="Enter brand or manufacturer" />
                                </div>
                                <div className="col-md-4">
                                    <label>Shelf Life (in days)</label>
                                    <Field type="number" name="shelfLife" className="form-control input-height" placeholder="Enter shelf life in days" />
                                    <ErrorMessage name="shelfLife" component="div" className="text-danger small" />
                                </div>
                            </div>

                            {/* Row 5 */}
                            <div className="row mt-1">
                                <div className="col-md-4 d-flex align-items-center">
                                    <Field type="checkbox" name="batchEnabled" className="me-2 input-height" />
                                    <label style={{ marginBottom: 'unset' }}>Batch No Enabled</label>
                                </div>
                                <div className="col-md-4 d-flex align-items-center">
                                    <Field type="checkbox" name="expiryRequired" className="me-2 input-height" />
                                    <label style={{ marginBottom: 'unset' }}>Expiry Date Required</label>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-md-12">
                                    <label>Item Description</label>
                                    <Field as="textarea" name="description" className="form-control" rows={5} placeholder="Enter optional remarks about item usage or quality" />
                                </div>
                            </div>

                            {/* Button Row */}
                            <div className="row mt-4">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <button type="submit" className="add-btn" style={{ minWidth: "150px", maxWidth: "180px" }}>
                                        Create Item <img src={next} className="ms-2" alt="next" />
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddItem;
