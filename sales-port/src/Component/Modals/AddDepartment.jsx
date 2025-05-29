import React from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import useAutoFocus from '../../Utils/autoFocus';

export const AddDepartment = ({ isModalOpendept, closeModaldept, handleChangedept, deptform, handleSubmitdept, Updatebtn, handleupdatedept }) => {

     const nameInputRef = useAutoFocus(isModalOpendept); // use custom hook for autofocus


    if (!isModalOpendept) return null;


    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ position: 'relative', width: '40%' }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className='text-primary'>{Updatebtn ? 'Update Department' : 'Add Department'}</h2>
                    <button className="close-btn" onClick={closeModaldept}><img src={close}></img></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12">
                            <label className='form-labell'>Department Name<span className='astrisk'>*</span></label>
                            <input type="text"    ref={nameInputRef}  className='fm-modal form-control' placeholder="Enter Department Name" name='name' value={deptform.name} onChange={handleChangedept} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label className='form-labell'>Email<span className='astrisk'>*</span></label>
                            <input type="email" className='fm-modal form-control' placeholder="Enter Email"
                                name='email' value={deptform.email} onChange={handleChangedept} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <label className='form-labell'>Landline Number<span className='astrisk'>*</span></label>
                            <div className=" mb-3" style={{ border: "1px solid #222F3E33", borderRadius: "6px", display: 'flex' }}>
                                {/* Replace dropdown with select */}
                                <select className="form-select code-select" style={{
                                    backgroundColor: '#F9F9F9',
                                    border: 'none',
                                    padding: '10px',
                                    borderRadius: '6px 0 0 6px',
                                    width: '80px', // Adjust the width for the country code
                                }}>
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+61">+61</option>
                                    {/* Add other country codes as needed */}
                                </select>
                                <input
                                    type="text"
                                    className="form-control code-select"
                                    aria-label="Text input with dropdown button"
                                    placeholder="Enter Landline Number"
                                    style={{
                                        border: 'none',
                                        padding: '10px',
                                        borderRadius: '0 6px 6px 0',
                                        width: 'calc(100% - 80px)', // Adjust width to take full remaining space
                                    }}
                                    name='landline' value={deptform.landline} onChange={handleChangedept}
                                    // value={phoneNumber}
                                    // onChange={handleChange}
                                    maxLength="10"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label className='form-labell'>Mobile Number<span className='astrisk'>*</span></label>
                            <div className=" mb-3" style={{ border: "1px solid #222F3E33", borderRadius: "6px", display: 'flex' }}>
                                {/* Replace dropdown with select */}
                                <select className="form-select code-select" style={{
                                    backgroundColor: '#F9F9F9',
                                    border: 'none',
                                    padding: '10px',
                                    borderRadius: '6px 0 0 6px',
                                    width: '80px', // Adjust the width for the country code
                                }}>
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+61">+61</option>
                                    {/* Add other country codes as needed */}
                                </select>
                                <input
                                    type="text"
                                    className="form-control code-select"
                                    aria-label="Text input with dropdown button"
                                    placeholder="Enter Mobile Number"
                                    style={{
                                        border: 'none',
                                        padding: '10px',
                                        borderRadius: '0 6px 6px 0',
                                        width: 'calc(100% - 80px)', // Adjust width to take full remaining space
                                    }}
                                    name='mobile' value={deptform.mobile} onChange={handleChangedept}
                                    // value={phoneNumber}
                                    // onChange={handleChange}
                                    maxLength="10"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-end"
                            >
                            {Updatebtn === false ? <button className='add-btn'    style={{ minWidth: "150px", width: "100%", maxWidth: "180px", display: 'flex', justifyContent: 'center' }} onClick={handleSubmitdept}><span>
                            </span>Add Department<img src={next} className='ms-2'></img></button> : <button className='add-btn' 
                             style={{ minWidth: "200px", width: "100%", maxWidth: "210px", display: 'flex', justifyContent: 'center' }} onClick={handleupdatedept}><span>
                            </span>Update Department<img src={next} className='ms-2'></img></button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
