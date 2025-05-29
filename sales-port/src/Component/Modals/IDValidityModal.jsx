import React, { useEffect, useState } from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import { Postdata } from '../../API/GlobalApi';

export const IDValidityModal = ({ isModalOpendept, closeModaldept, deptform, handleSubmitdept, Updatebtn, handleupdatedept, setpaymentmodal, setcardpreview, setshowvaliditymodal, setvaliditydata, validtydata, setFingerprints, setCapturedPhoto, selectedOrgDetails,idcarddata }) => {
    // if (!isModalOpendept) return null;
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const displayToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setTimeout(() => setShowToast(false), 3000);
    };
    const Submitvalidity = async () => {
        const finalobj = {
            student: selectedOrgDetails?.user_id,
            valid_from_date: validtydata.fromdate,
            valid_to_date: validtydata.Todate

        }

        if (validtydata.fromdate.length > 0 && validtydata.Todate.length > 0) {
            const url = `students/students-attendance/`;
            const res = await Postdata(url, finalobj);
            if (!res.error) {

                setcardpreview(true); setpaymentmodal(false); setshowvaliditymodal(false);
            }
        }
        else {
            displayToast("Fill all the required details", 'danger')
        }
    }
    useEffect(() => {
        // Set default or existing values from idcarddata
        const today = new Date().toISOString().split('T')[0];
        setvaliditydata({
            fromdate: idcarddata?.valid_from_date || today,
            Todate: idcarddata?.valid_to_date || ''
        });
    }, [idcarddata]);

    const handleChangedept = (e) => {
        const { name, value } = e.target;
        setvaliditydata((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content" style={{ position: 'relative', width: '40%' }}>
                    <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h2 className='text-primary'>Validity of ID Card</h2>
                        <button className="close-btn" onClick={() => { setpaymentmodal ? setpaymentmodal(false) : setshowvaliditymodal(false); setCapturedPhoto(); setFingerprints([null, null, null]) }}><img src={close}></img></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-12">
                                <label className='form-labell'>Validity From<span className='astrisk'>*</span></label>
                                <input type="date" className='fm-modal form-control' placeholder="" name='fromdate' value={validtydata.fromdate} onChange={handleChangedept} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className='form-labell'>Validity Till<span className='astrisk'>*</span></label>
                                <input type="date" className='fm-modal form-control' placeholder=""
                                    name='Todate' value={validtydata.Todate} onChange={handleChangedept} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                                <button className='add-btn' style={{ width: "100%", display: 'flex', justifyContent: 'center' }} onClick={() => {

                                    Submitvalidity()
                                }}><span>
                                    </span>Generate ID Card<img src={next} className='ms-2'></img></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <div
                    className={`custom-toast toast align-items-center text-white bg-${toastVariant} border-0 position-fixed top-0 end-0 m-3`}
                    role="alert"
                    style={{
                        display: 'block',
                        minWidth: '300px',
                        maxWidth: '400px',
                        borderRadius: '8px',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                        fontSize: '15px',
                        zIndex: 9999
                    }}
                >
                    <div className="d-flex">
                        <div className="toast-body" style={{ padding: '12px 16px' }}>
                            {toastMessage}
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            onClick={() => setShowToast(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                </div>

            )}
        </>

    )
}
