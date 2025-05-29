import React, { useEffect, useState } from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import useAutoFocus from '../../Utils/autoFocus';
import { getData, getDataById } from '../../API/GlobalApi';

export const AddClass = ({ isOpen, orgform, onClose, handleSubmit, handleUpdate, Updatebtn, handleChange, setorgform ,orgs,courses,semesters,getOrganizations,getCourses,getSemesters,setSemesters,setCourses,selectedOrgDetails}) => {
    const nameInputRef = useAutoFocus(isOpen);

    console.log("orgform===",orgform)
 
//     useEffect(() => {
//         if (isOpen) {
//             getOrganizations();
//         }
//     }, [isOpen]);


// const handleOrgChange = async (e) => {
//   const orgId = e.target.value;
//   handleChange(e);  // This will update the `orgform` state if needed (like updating name)
  
//   if (orgId) {
//     await getCourses(orgId);  // Fetch courses based on selected organization
//   } else {
//     setCourses([]);
//     setSemesters([]);
//   }
// };

// const handleCourseChange = async (e) => {
//   const courseId = e.target.value;
//   handleChange(e);  // This will update the `orgform` state if needed (like updating name)
  
//   if (courseId) {
//     await getSemesters(courseId);  // Fetch semesters based on selected course
//   } else {
//     setSemesters([]);
//   }
// };


    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ position: 'relative', width: '40%' }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className="text-primary">{Updatebtn ? 'Update Class' : 'Add Class'}</h2>
                    <button className="close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </button>
                </div>

                <div className="modal-body">



                    <div className="row mt-2">
                        <div className="col-md-12">
                            <label className="form-labell">Class Name <span className="astrisk">*</span></label>
                            <input
                                type="text"
                                className="fm-modal form-control"
                                placeholder="Enter Name"
                                name="name"
                                value={orgform.name || ''}
                                onChange={handleChange}
                                ref={nameInputRef}

                            />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-12">
                            <label className="form-labell">Intake Limit <span className="astrisk">*</span></label>
                            <input
                                type="text"
                                className="fm-modal form-control"
                                placeholder="Enter Intake Limit"
                                name="intakelimit"
                                value={orgform.intakelimit || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-end">
                            <button
                                className="add-btn"
                                onClick={Updatebtn ? handleUpdate : handleSubmit}
                                style={{
                                    minWidth: '150px',
                                    width: '100%',
                                    maxWidth: '180px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                {Updatebtn ? 'Update Class' : 'Add Class'}<img src={next} className="ms-2" alt="next" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};