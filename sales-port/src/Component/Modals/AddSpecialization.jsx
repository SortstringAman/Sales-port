import React from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import useAutoFocus from '../../Utils/autoFocus';

export const AddSpecialization = ({ isModalOpendept, closeModaldept, handleChangedept, deptform, handleSubmitdept, Updatebtn, handleupdatedept, courseName }) => {


     
    const nameInputRef = useAutoFocus(isModalOpendept); // use custom hook for autofocus


    if (!isModalOpendept) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ position: 'relative', width: '40%' }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className='text-primary'>{Updatebtn ? 'Update Specialization' : 'Add Specialization'}</h2>
                    <button className="close-btn" onClick={closeModaldept}><img src={close}></img></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12">
                            {courseName && (
                                <div
                                    className="p-2 px-3 mb-3"
                                    style={{
                                        backgroundColor: '#e8f0fe',
                                        borderLeft: '4px solid #7F56DA',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        color: '#7F56DA',
                                        fontSize: '15px',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    📘 Course: <span style={{ fontWeight: '700' }}>{courseName}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <label className='form-labell'>Specialization Name<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' ref={nameInputRef} placeholder="Enter Specializaion Name" name='name' value={deptform.name} onChange={handleChangedept} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label className='form-labell'>Course Code<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Course Code"
                                name='course_code' value={deptform.course_code} onChange={handleChangedept} />
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-12">
                            <label className='form-labell'>Semester Fees<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Semester Fees" 
                            name='semester_fee' value={deptform.semester_fee} onChange={handleChangedept}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label className='form-labell'>Provisional Fees<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Provisional Fees" 
                            name='provisional_fee' value={deptform.provisional_fee} onChange={handleChangedept}/>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-md-12">
                            <label className='form-labell'>Intake Capacity<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Intake Capacity"
                                name='intech_capacity' value={deptform.intech_capacity} onChange={handleChangedept} />
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-end" >
                            {Updatebtn === false ? <button className='add-btn' style={{ minWidth: "150px", width: "100%", maxWidth: "180px", display: 'flex', justifyContent: 'center' }} onClick={handleSubmitdept}><span>
                            </span>Add Specialization<img src={next} className='ms-2'></img></button> : <button className='add-btn' style={{ minWidth: "200px", width: "100%", maxWidth: "210px", display: 'flex', justifyContent: 'center' }} onClick={handleupdatedept}><span>
                            </span>Update Specialization<img src={next} className='ms-2'></img></button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
