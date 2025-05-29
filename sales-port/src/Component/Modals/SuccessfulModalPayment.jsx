import React from 'react';
import successgif from '../../assets/gif/successfullgif.gif';
import copy from '../../assets/icons/Copy.svg';
import print from '../../assets/icons/print.svg';
import whatsappicon from '../../assets/icons/logos_whatsapp-icon.svg'
import emailicon from '../../assets/icons/Layer_1.svg'
import messageicon from '../../assets/icons/Layer_2.svg';
import close from '../../assets/icons/close.svg';

export const SuccessfulModalPayment = ({ mainheading, submitclose, }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content-success" style={{ position: 'relative' }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginBottom: '10px' }}>
                    {/* <button className="close-btn" onClick={submitclose}><img src={close}></img></button> */}
                </div>
                <div className="row justify-content-center" style={{ position: 'absolute', top: '-50px', right: '40%' }} >
                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%', background: '#fff',
                            boxShadow: "0px 6px 16px 0px #7A7A7A1F", display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <img src={successgif} style={{ width: '60px', height: '60px' }}></img>
                        </div>
                        {/* <p>{mainheading}</p> */}
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <p style={{ color: '#7F56DA', fontWeight: '600', fontSize: '18px' }}>Payment Success!</p>
                            {/* <img src={copy}></img> */}
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <p style={{ fontSize: '14px', margin: 0 }}>Your payment has been successfully done.</p>
                    </div>
                    <div style={{ border: " 1px solid #E8EAED", width: '159px', marginTop: '10px' }} ></div>
                </div>
                <div className="row mt-3 ">
                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                        <p>Total Payment</p>
                    </div>
                </div>
                <div>
                    <p style={{ color: "#121212", fontSize: '24px', fontWeight: '600', marginTop: '15px' }}>INR 20,241.00</p>
                </div>
                <div className='row mt-2'>
                    <div className="col-md-6">
                        <div style={{ border: "1px solid #EDEDED", padding: '6px 12px', borderRadius: '6px' }}>
                            <p className='sd-p'> Ref Number</p>
                            <p className='alg-l'>000085752257</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div style={{ border: "1px solid #EDEDED", padding: '6px 12px', borderRadius: '6px' }}>
                            <p className='sd-p'> Ref Number</p>
                            <p className='alg-l'>000085752257</p>
                        </div>
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className="col-md-6">
                        <div style={{ border: "1px solid #EDEDED", padding: '6px 12px', borderRadius: '6px' }}>
                            <p className='sd-p'> Ref Number</p>
                            <p className='alg-l'>000085752257</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div style={{ border: "1px solid #EDEDED", padding: '6px 12px', borderRadius: '6px' }}>
                            <p className='sd-p'> Ref Number</p>
                            <p className='alg-l'>000085752257</p>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-12">
                        <p>Print Receipt
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginLeft:'5px'}}>
                                <path d="M13 4.61523V1.61523H5.00003V4.61523H4.00003V0.615234H14V4.61523H13ZM14.615 8.11523C14.8984 8.11523 15.136 8.01923 15.328 7.82723C15.52 7.63523 15.6157 7.3979 15.615 7.11523C15.6144 6.83257 15.5187 6.5949 15.328 6.40223C15.1374 6.20957 14.8997 6.11357 14.615 6.11423C14.3304 6.1149 14.093 6.2109 13.903 6.40223C13.713 6.59357 13.617 6.83123 13.615 7.11523C13.613 7.39923 13.709 7.63657 13.903 7.82723C14.097 8.0179 14.3337 8.1139 14.615 8.11523ZM13 14.9992V10.4612H5.00003V14.9992H13ZM14 15.9992H4.00003V11.9992H0.577026V4.61523H17.423V11.9992H14V15.9992ZM16.423 10.9992V5.61523H1.57703V10.9992H4.00003V9.46123H14V10.9992H16.423Z" fill="black" />
                            </svg>

                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}
