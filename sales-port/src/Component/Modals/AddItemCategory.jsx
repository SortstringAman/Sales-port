import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import close from '../../assets/icons/close.svg';
import Select from 'react-select';
import '../../assets/css/Modal.css';

import { CategorySchema } from '../../Pages/ManageMasters/ManageItemCategory/schema';
import { reactSelectStyles } from '../../Utils/selectboxStyle';

export const AddItemCategory = ({ isOpen, onClose }) => {
    const initialValues = {
        name: '',
        isActive: true,
        description: '',
    };

    const statusOptions = [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' },
    ];

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div
                className="modal-content"
                style={{
                    position: 'relative',
                    height: '68vh',
                    overflowY: 'auto',
                    padding: '30px',
                    width: '40vw',
                }}
            >
                <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">Create Item Category</h2>
                    <button className="close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </button>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={CategorySchema}
                    onSubmit={(values) => {
                        console.log('Category Submitted:', values);
                        // Add your API call here
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="row" style={{ justifyContent: 'center' }}>
                                <div className="col-sm-10 col-md-10">
                                    <label className="form-labell">
                                        Category Name <span className="astrisk">*</span>
                                    </label>
                                    <Field
                                        type="text"
                                        name="name"
                                        className={`form-control input-height ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                        placeholder="e.g. Stationery"
                                    />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback error" />
                                </div>

                                <div className="col-sm-10 col-md-10">
                                    <label className="form-labell">Description</label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        className={`form-control input-height ${touched.description && errors.description ? 'is-invalid' : ''}`}
                                        rows={2}
                                        placeholder="Enter description (optional)"
                                    />
                                    <ErrorMessage name="description" component="div" className="invalid-feedback error" />
                                </div>

               
                                <div className="col-sm-10 col-md-10">
                                    <label className="form-labell">
                                        Status <span className="astrisk">*</span>
                                    </label>
                                    <Field name="isActive">
                                        {({ field, form }) => (
                                            <Select
                                                options={statusOptions}
                                                value={statusOptions.find(option => option.value === field.value)}
                                                  styles={reactSelectStyles}
                                                onChange={option => form.setFieldValue('isActive', option.value)}
                                                classNamePrefix="react-select"
                                                className={touched.isActive && errors.isActive ? 'is-invalid' : ''}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="isActive" component="div" className="invalid-feedback error" />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mt-4">
                                <button type="submit" className="add-btn">
                                    Save Category
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};