import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import close from '../../assets/icons/close.svg';
import '../../assets/css/Modal.css'; // Make sure to import the CSS
import { reactSelectStyles } from '../../Utils/selectboxStyle';
import Select from 'react-select';
import { locationInitialValues, locationValidationSchemas } from '../../Pages/ManageMasters/ManageLocations/schema';
const MultpleLocationModal = ({ isOpen, onClose, fieldType, onSubmit, height }) => {
    if (!isOpen) return null;

    const getTitle = () => {
        switch (fieldType) {
            case 'country': return 'Add Country';
            case 'state': return 'Add State';
            case 'district': return 'Add District';
            default: return 'Add Data';
        }
    };

    const countryOptions = [
        { value: 'india', label: 'India' },
        { value: 'usa', label: 'USA' }
    ];

    const stateOptions = [
        { value: 'maharashtra', label: 'Maharashtra', country: 'india' },
        { value: 'gujarat', label: 'Gujarat', country: 'india' },
        { value: 'california', label: 'California', country: 'usa' },
        { value: 'texas', label: 'Texas', country: 'usa' }
    ];

    const initialValues = locationInitialValues[fieldType] || { name: '' };
    const validationSchema = locationValidationSchemas[fieldType];
    

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    let payload = {};
    let apiEndpoint = '';

    if (fieldType === 'country') {
        // apiEndpoint = '/api/countries/';
        payload = {
            name: values.name,
        };
    } else if (fieldType === 'state') {
        // apiEndpoint = '/api/states/';
        payload = {
            name: values.name,
            country: values.country?.value,
        };
    } else if (fieldType === 'district') {
        // apiEndpoint = '/api/districts/';
        payload = {
            name: values.name,
            country: values.country?.value,
            state: values.state?.value,
        };
    } else {
        apiEndpoint = '/api/unknown/';
        payload = values;
    }

    // Simulate API call and log
    // console.log('🚀 Submitting data to:', apiEndpoint);
    console.log('📦 Payload:', payload);

    // // Simulate delay like an API call
    // await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('✅ Data submitted successfully!');
    resetForm();
    onClose();
    setSubmitting(false);
};





    return (
        <div className="modal-overlay">
            <div
                className="modal-content"
                style={{
                    position: 'relative',
                    height: height,
                    overflowY: 'auto',
                    padding: '30px',
                    width: '40vw',
                }}
            >
                <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">{getTitle()}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </button>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
                        <Form>
                            <div className="row" style={{ justifyContent: 'center' }}>
                                {fieldType === 'country' && (
                                    <div className="col-10">
                                        <label className="form-labell">Name <span className="astrisk">*</span></label>
                                        <Field
                                            name="name"
                                            className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                            placeholder={`Enter ${fieldType} name`}
                                        />
                                        <ErrorMessage name="name" component="div" className="invalid-feedback error" />
                                    </div>
                                )}
                                {fieldType === 'state' && (
                                    <>
                                        <div className="col-10 mb-3">
                                            <label className="form-labell">
                                                Country Name <span className="astrisk">*</span>
                                            </label>
                                            <Select
                                                name="country"
                                                options={countryOptions}
                                                placeholder="Select Country"
                                                styles={reactSelectStyles}
                                                value={values.country}
                                                onChange={(selectedOption) => setFieldValue('country', selectedOption)}
                                                onBlur={() => setFieldTouched('country', true, true)}
                                            />
                                            {errors.country && touched.country && (
                                                <div className="invalid-feedback error d-block">
                                                    {typeof errors.country === 'string'
                                                        ? errors.country
                                                        : errors.country.label}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-10">
                                            <label className="form-labell">
                                                State Name <span className="astrisk">*</span>
                                            </label>
                                            <Field
                                                name="name"
                                                type="text"
                                                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                placeholder="Enter State Name"
                                            />
                                            <ErrorMessage name="name" component="div" className="invalid-feedback error" />
                                        </div>
                                    </>
                                )}

                                {fieldType === 'district' && (
                                    <>
                                        {/* Country Dropdown */}
                                        <div className="col-10 mb-3">
                                            <label className="form-labell">Country Name <span className="astrisk">*</span></label>
                                            <Select
                                                name="country"
                                                options={countryOptions} // pass via props or define here
                                                placeholder="Select Country"
                                                styles={reactSelectStyles}
                                                value={values.country}
                                                onChange={(option) => {
                                                    setFieldValue('country', option);
                                                    setFieldValue('state', null); // reset state when country changes
                                                }}
                                                onBlur={() => setFieldTouched('country', true)}
                                            />
                                            {errors.country && touched.country && (
                                                <div className="invalid-feedback error d-block">{errors.country.label || errors.country}</div>
                                            )}
                                        </div>

                                        {/* State Dropdown */}
                                        <div className="col-10 mb-3">
                                            <label className="form-labell">State Name <span className="astrisk">*</span></label>
                                            <Select
                                                name="state"
                                                options={stateOptions.filter(state => state.country === values.country?.value)}
                                                placeholder="Select State"
                                                styles={reactSelectStyles}
                                                value={values.state}
                                                onChange={(option) => setFieldValue('state', option)}
                                                onBlur={() => setFieldTouched('state', true)}
                                                isDisabled={!values.country}
                                            />
                                            {errors.state && touched.state && (
                                                <div className="invalid-feedback error d-block">{errors.state.label || errors.state}</div>
                                            )}
                                        </div>

                                        {/* District Name */}
                                        <div className="col-10">
                                            <label className="form-labell">District Name <span className="astrisk">*</span></label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                placeholder="Enter District Name"
                                            />
                                            <ErrorMessage name="name" component="div" className="invalid-feedback error" />
                                        </div>
                                    </>
                                )}


                            </div>

                            <div className="d-flex justify-content-end mt-4">
                                <button type="submit" className="add-btn">Create</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default MultpleLocationModal;
