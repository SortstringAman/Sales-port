import React, { useState } from 'react';
import successgif from '../../assets/gif/successfullgif.gif';
import copy from '../../assets/icons/Copy.svg';
import print from '../../assets/icons/print.svg';
import whatsappicon from '../../assets/icons/logos_whatsapp-icon.svg'
import emailicon from '../../assets/icons/Layer_1.svg'
import messageicon from '../../assets/icons/Layer_2.svg';
import close from '../../assets/icons/close.svg';

export const SuccessfulPopup = ({ mainheading, submitclose, generatedregno }) => {
  
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
       
        </div>


    )
}
