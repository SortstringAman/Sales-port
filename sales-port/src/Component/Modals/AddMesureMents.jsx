import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import close from '../../assets/icons/close.svg';

import '../../assets/css/Modal.css';

import { MeasurementSchema } from '../../Pages/ManageMasters/ManageMeasure/schema';


export const AddMeasurement = ({ isOpen, onClose }) => {
  const initialValues = {
    name: '',
    shortCode: '',
    description: '',
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{
          position: 'relative',
          height: '65vh',
          overflowY: 'auto',
          padding: '30px',
          width: '40vw',
        }}
      >
        <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary">Create Measurement Unit</h2>
          <button className="close-btn" onClick={onClose}>
            <img src={close} alt="close" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={MeasurementSchema}
          onSubmit={(values) => {
            console.log('Measurement Submitted:', values);
            // Add your API call here
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="row" style={{ justifyContent: 'center' }}>
                <div className="col-sm-10 col-md-10">
                  <label className="form-labell">
                    Unit Name <span className="astrisk">*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className={`form-control input-height ${touched.name && errors.name ? 'is-invalid' : ''}`}
                    placeholder="e.g. Kilogram"
                  />
                  <ErrorMessage name="name" component="div" className="invalid-feedback error" />
                </div>

                <div className="col-sm-10 col-md-10">
                  <label className="form-labell">
                    Short Code <span className="astrisk">*</span>
                  </label>
                  <Field
                    type="text"
                    name="shortCode"
                    className={`form-control input-height ${touched.shortCode && errors.shortCode ? 'is-invalid' : ''}`}
                    placeholder="e.g. kg"
                  />
                  <ErrorMessage name="shortCode" component="div" className="invalid-feedback error" />
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
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="add-btn">
                  Save Measurement
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
