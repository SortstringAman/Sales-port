import React from 'react';
// import moment from 'moment';
import '../../assets/css/StudentShortDetails.css';
import studentShortpic from '../../assets/Images/stushortpic.png';
import std from '../../assets/Images/unnaemmeduser.png'
import nexticon from '../../assets/icons/icon.svg';

export const ItemLedgerShortDetails = ({ navigate, selectedItemLedgerDetails }) => {
    if (!selectedItemLedgerDetails) return null;
    console.log("selectedItemLedgerDetailsshort--", selectedItemLedgerDetails)



    const {
        first_name,
        last_name,
        gender,
        date_of_birth,
        roll_number,
        registration_number,
        blood_group,
        category,
        privilege_category,
        father_name,
        mother_name,
        guardian_name,
        contact_numbers,
        addresses,
        lag,
        profile_picture,
        email,
        course,
        provisional_admission_date,
        admission_date

    } = selectedItemLedgerDetails;
    return (
        <div>
            <div className="col-md-12">
                <p style={{ background: '#F9F9F9', padding: '16px', borderRadius: '8px', textAlign: 'left', fontWeight: 600, color: "#222F3E" }}>TRANSACTION'S  DETAILS:</p>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro" style={{ marginTop: '6px' }}>
                        <div className='stu-pro-inner'>
                            <div style={{ display: 'flex', gap: "15px", flexDirection: "column", alignItems: 'start', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 className='fm-pr-hd' style={{ margin: 0, marginBottom: "10px",fontWeight:"bold",fontSize:"17px" }}>RS/2025-26/25</h4>
                                    <p style={{ textAlign: 'left' , fontWeight: 600, color: "#222F3E" }}>{selectedItemLedgerDetails?.date} </p>
                                </div>
                                <div>
                                    <p className='sd-p'>Bill No</p>
                                    <p style={{ fontSize: '14px', textAlign: 'left' ,}}>{selectedItemLedgerDetails?.billNo}</p>
                                </div>
                            </div>

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <p className='sd-p'>Vendor Name</p>
                                <p className='alg-l'>{selectedItemLedgerDetails?.vendorName}</p>
                            </div>

                        </div>

                        <div>
                            <p className='sd-p'> Address</p>
                            <p className='alg-l'>{selectedItemLedgerDetails?.address}</p>
                        </div>

                        <div>
                            <p className='sd-p'>Stock Location</p>
                            <p className='alg-l'>{selectedItemLedgerDetails?.stockLocation}</p>
                        </div>


                        <div>
                            <h4 className='fm-pr-hd' style={{ margin: "10px 0", marginBottom: "10px" }}>STOCK'S DETAILS</h4>
                            <div>
                                <p className='sd-p'>Item's Name</p>
                                <p className='alg-l'>{selectedItemLedgerDetails?.itemName}</p>
                            </div>
                            <div>
                                <p className='sd-p'>Item Group</p>
                                <p className='alg-l'>{selectedItemLedgerDetails?.itemGroup}</p>
                            </div>
                            <div>
                                <p className='sd-p'>Quantity</p>
                                <p className='alg-l'>{selectedItemLedgerDetails?.quantity} </p>
                            </div>

                   
                            <div>
                                <p className='sd-p'>Batch No</p>
                                <p className='alg-l'> {selectedItemLedgerDetails?.batchNo} </p>
                            </div>
                              <div>
                                <p className='sd-p'>Expire Date</p>
                                <p className='alg-l'>{selectedItemLedgerDetails?.expiryDate} </p>
                            </div>

                          
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* 
            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro">
                        <h4 className='fm-pr-hd' style={{ marginBottom: "10px" }}>ACADEMIC INFO</h4>
                        <div>
                            <p className='sd-p'>Course</p>
                            <p className='alg-l'>{lag?.academic_group?.specialization?.course?.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className='sd-p'>Semester</p>
                            <p className='alg-l'>{lag?.academic_group?.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className='sd-p'>Section</p>
                            <p className='alg-l'>{lag?.name || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div className='row'>
                <div className="col-md-12">
                    <button className='add-btn' style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }} onClick={() => navigate('/studentDashboard/StudentFullProfile/')}>
                        View Full Profile <img src={nexticon} alt="Next" />
                    </button>
                </div>
            </div> */}
        </div>
    );
};
