
import React, { useRef, useState } from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import {  SuccessfulModalPayment } from './SuccessfulModalPayment.jsx';
import { VerifyDiscountPayment } from './VerifyDiscountPaymentModel';

export const IndividualReceivePayment = ({ individualReceivePaymentModal, onClose,setIndividualReceivePaymentModal, selectedOrgDetails,  setpaymentmodal,
 }) => {
    const [amount, setAmount] = useState(22490);
    const [discount, setDiscount] = useState(10);
    const [isPercentage, setIsPercentage] = useState(true);
    console.log("selected sttudent data in receved payment", selectedOrgDetails)

    const calculateTotal = () => {
        let discountValue = isPercentage ? (amount * discount) / 100 : discount;
        return amount - discountValue;
    };

    const [showDiscountModal, setShowDiscountModal] = useState(false)
    const openFeeDiscountModal = () => {
        setShowDiscountModal(true);
    };

    const closeFeeDiscountModal = () => {
        setShowDiscountModal(false);
        // setUpdatebtn(false);
        // handleClear();
    };



    if (!individualReceivePaymentModal) return null;

    return (<>
        <div className="modal-overlay">
            <div className="modal-content" style={{ position: 'relative', width: '50%', display: 'flex', flexDirection: 'column', overflowY: "hidden" }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className='text-primary'>Receive Payment</h2>
                    <button className="close-btn" onClick={onClose}><img src={close} alt="close" /></button>
                </div>
                <div className="modal-body" style={{ height: "auto", overflowY: 'scroll', padding: '0 10px', overflowX: 'hidden' }}>
                    <div className="row" style={{ background: '#F9FAFC', padding: "10px" }}>
                        <h4 className='fm-pr-hd'>STUDENT'S DETAILS</h4>
                        <div className="col-md-6">
                            <div className="student-details" style={{ textAlignLast: 'left' }}>
                                <div>
                                    <p className='sd-p'>Reg No</p>
                                    <p className='n-p-t'>{selectedOrgDetails?.permanent_registration_number}</p>
                                </div>
                                <div>
                                    <p className='sd-p'>Name</p>
                                    <p className='n-p-t'>{selectedOrgDetails?.name}</p>
                                </div>
                                <div>
                                    <p className='sd-p'>Phone</p>
                                    <p className='n-p-t'>{selectedOrgDetails?.contact_number} </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="student-details" style={{ textAlignLast: 'left' }}>
                                <div>
                                    <p className='sd-p'>Course</p>
                                    <p className='n-p-t'> {selectedOrgDetails?.course_name} </p>
                                </div>
                                {/* <div>
                                    <p className='sd-p'>Reg No</p>
                                    <p className='n-p-t'>{selectedOrgDetails?.permanent_registration_number}</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 d-flex justify-content-center m-auto">
                        <div className="col-md-10">
                            <div className="payment-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div className='row'>
                                    <div className="col-md-4">

                                        <label className='form-labell'>Payment Date<span className='astrisk'>*</span></label>
                                    </div>
                                    <div className="col-md-8">

                                        <input type="date" className='form-control fm-modal' />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className='form-labell'>Mode of Payment<span className='astrisk'>*</span></label>
                                    </div>
                                    <div className="col-md-8">
                                        <select className='form-control fm-modal'>
                                            <option>Credit Card</option>
                                            <option>Debit Card</option>
                                            <option>Net Banking</option>
                                            <option>UPI</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className='form-labell'>Amount<span className='astrisk'>*</span></label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className='form-control fm-modal' value={amount.toFixed(2)} readOnly />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 d-flex justify-content-end align-items-center mt-3">
                                        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
                                            onClick={openFeeDiscountModal}>
                                            Apply Discount
                                            {/* <img src={next}></img> */}
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className='form-labell'>Any Discount<span className='astrisk'>*</span></label>
                                    </div>
                                    <div className="col-md-8">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input type="number" className='form-control fm-modal' value={discount} onChange={(e) => setDiscount(e.target.value)} style={{ width: '30%' }} />
                                            <div style={{ display: 'flex', marginLeft: '10px', gap: '20px' }}>
                                                <label>
                                                    <input type="radio" checked={isPercentage} onChange={() => setIsPercentage(true)} /> %
                                                </label>
                                                <label>
                                                    <input type="radio" checked={!isPercentage} onChange={() => setIsPercentage(false)} /> Value
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className='form-labell'>Total Payment<span className='astrisk'>*</span></label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className='form-control fm-modal' value={calculateTotal().toFixed(2)} readOnly />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className='form-labell'>Amount in words</label>
                                    </div>
                                    <div className="col-md-8">
                                        <p><strong>Twenty-two thousand four hundred ninety</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-actions" style={{ position: 'sticky', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={() => {  setpaymentmodal(true);onClose() }} >Receive Payment<img src={next}></img></button>
                    </div>  
                </div>
            </div>
            <VerifyDiscountPayment isOpen={showDiscountModal} onClose={closeFeeDiscountModal} />
        </div>

    </>

    );

};
