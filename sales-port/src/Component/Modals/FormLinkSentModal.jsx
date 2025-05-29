import React from 'react';
import checkgif from '../../assets/gif/successfullgif.gif';
import close from '../../assets/icons/close.svg';

export const FormLinkSentModal = () => {
    return (
        <div className="modal-overlay">
            <div className="modal-content formlinkmodal" style={{ position: 'relative'}}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    {/* <button className="close-btn"><img src={close}></img></button> */}
                </div>
                <div className="modal-body">
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={checkgif} style={{width:'100px',height:'100px'}}></img>
                        {/* <p>Form link sent successfully!</p> */}
                        <p style={{marginTop:'10px'}}>A link to the provisional form has been sent to the provided phone number. Please check your SMS and complete the required details.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
