
import { Formik, Form, Field, ErrorMessage } from 'formik';
import close from '../../assets/icons/close.svg';
import '../../assets/css/Modal.css';
import { ItemtypesValidationSchema } from '../../Pages/ManageMasters/ManageItemTypes/schema';

export const AddItemTypes = ({ isOpen, onClose }) => {
  const initialValues = {
    name: '',
    description: '',
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={{ position: 'relative', padding: '30px',width:'35vw' }}
      >
        <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-primary">Create Item Types</h2>
          <button className="close-btn" onClick={onClose}>
            <img src={close} alt="close" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={ItemtypesValidationSchema}
          onSubmit={(values) => {
            console.log('Department Submitted:', values);
            // Call your API or logic here
          }}
        >
          {({ errors, touched }) => (
            <Form>
              {/* <p className="fm-pr-hd mt-3 text-start fw-900 text-uppercase">
                Department Details
              </p> */}

              <div className="row" style={{justifyContent:'center'}}>
                <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <label className="form-labell">
                  Item Name <span className="astrisk">*</span>
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className={`form-control input-height ${touched.name && errors.name ? 'is-invalid' : ''}`}
                    placeholder="Enter Item Name"
                  />
                  <ErrorMessage name="name" component="div" className="invalid-feedback error" />
                </div>

                <div className="col-sm-10 col-md-10 col-lg-10 col-xl-10">
                  <label className="form-labell">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    className={`form-control input-height ${touched.description && errors.description ? 'is-invalid' : ''}`}
                    rows={2}
                    placeholder="Enter Description"
                  />
                  <ErrorMessage name="description" component="div" className="invalid-feedback error" />
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button type="submit" className="add-btn">
                  Save Item Types
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
