import React, { useState } from 'react';
import successgif from '../../assets/gif/successfullgif.gif';
import copy from '../../assets/icons/Copy.svg';
import print from '../../assets/icons/print.svg';
import whatsappicon from '../../assets/icons/logos_whatsapp-icon.svg'
import emailicon from '../../assets/icons/Layer_1.svg'
import messageicon from '../../assets/icons/Layer_2.svg';
import close from '../../assets/icons/close.svg';

export const SuccessfulPopup = ({ mainheading, submitclose, generatedregno }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const displayToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);

        setTimeout(() => setShowToast(false), 3000);
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content-success" style={{ position: 'relative' }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: '10px' }}>
                    <button className="close-btn" onClick={submitclose}><img src={close}></img></button>
                </div>
                <div className="row justify-content-center mb-2" >
                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={successgif} style={{ width: '100px', height: '100px' }}></img>
                        <p>{mainheading}</p>
                    </div>
                    <div style={{ border: "1px dotted #222F3E4D", width: '159px' }} ></div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <p style={{ color: '#7F56DA', fontWeight: '600', fontSize: '18px' }}>{generatedregno}</p>
                            <img src={copy} style={{ cursor: 'pointer' }} onClick={() => { navigator.clipboard.writeText(generatedregno); displayToast("Registration No. Copied", "success") }}></img>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-md-12">
                        <p style={{ fontSize: '14px', margin: 0 }}>Registration Number</p>
                    </div>
                </div>
                {/* <div className="row mt-3 ">
                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>Print<img src={print}></img></button>
                    </div>
                </div> */}
                {/* <div>
                    <p style={{ color: "#6B778C", fontSize: '14px' }}>Share on</p>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={whatsappicon}></img>
                        <img src={messageicon}></img>
                        <img src={emailicon}></img>
                    </div>
                </div> */}
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
                            <strong>{toastVariant === 'success' ? '✅' : '❌'} </strong> {toastMessage}
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
        </div>


    )
}
