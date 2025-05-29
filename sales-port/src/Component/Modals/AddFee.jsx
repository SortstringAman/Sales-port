import React, { useEffect, useState } from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import useAutoFocus from '../../Utils/autoFocus';
import { getData, getDataById } from '../../API/GlobalApi';

export const Addfee= ({ 
    isOpen,onClose,selectedOrgDetails , handleFeeChange ,setFeeform ,feeForm  , handleUpdateFee, Updatebtn, handleChange,handleSubmitFee

}) => {
    const nameInputRef = useAutoFocus(isOpen);
 
console.log("selectedOrgDetails.intake_limit", selectedOrgDetails );




    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ position: 'relative', width: '40%' }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className="text-primary">{Updatebtn ? 'Update Fee' : 'Add Fee'}</h2>
                    <button className="close-btn" 
                    onClick={onClose}
                    >
                        <img src={close} alt="close" />
                    </button>
                </div>

                <div className="modal-body">
                   
                      <div className="row">
                        <div className="col-md-12">
                            { selectedOrgDetails && (
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
                                    📘 Course: <span style={{ fontWeight: '700' }}>{selectedOrgDetails.course}</span>
                                </div>
                            )}
                        </div>
                    </div>

                 

                    <div className="row mt-2">
                        <div className="col-md-12">
                            <label className="form-labell">Provisional  fee<span className="astrisk">*</span></label>
                            <input
                                type="text"
                                className="fm-modal form-control"
                                placeholder="Enter Provisional  fee"
                                name="provisional_fee"
                                value={feeForm.provisional_fee || ''}
                                onChange={handleFeeChange}
                                ref={nameInputRef}

                            />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-12">
                            <label className="form-labell"> Fee<span className="astrisk">*</span></label>
                            <input
                                type="text"
                                className="fm-modal form-control"
                                placeholder="Enter Semester Fee"
                                name="fees"
                                 value={feeForm.fees || ''}
                                 onChange={handleFeeChange}
                            />
                        </div>
                    </div>

                       <div className="row mt-2">
                        <div className="col-md-12">
                            <label className="form-labell">Intake Limit<span className="astrisk">*</span></label>
                            <input
                                type="text"
                                className="fm-modal form-control"
                                placeholder="Enter Intake Limit"
                                name="intake_limit"
                                 value={feeForm.intake_limit || ''}
                                 onChange={handleFeeChange}
                            />
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-end">
                            <button
                                className="add-btn"
                                  onClick={Updatebtn ? handleUpdateFee : handleSubmitFee}
                              
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