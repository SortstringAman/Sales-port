import React from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';

export const ShareLinkModal = ({ isModalOpendept, closeModaldept,handleChangedept,deptform,handleSubmitdept,Updatebtn,handleupdatedept,setpaymentmodal,setcardpreview,handleChange,handleChangesharelink,setsharemobno,handlesharelink,setIsModalOpen}) => {
    // if (!isModalOpendept) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content mc-cus" style={{ position: 'relative'}}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className='text-primary'>Share link</h2> 
                    <button className="close-btn" onClick={()=>{setIsModalOpen(false)}}><img src={close}></img></button>
                </div>
                <div className="modal-body">
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
                                    {/* <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+61">+61</option> */}
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
                                    // value={phoneNumber}
                                    // onChange={handleChange}
                                    maxLength="10"
                                    onChange={handleChangesharelink} name='mobileno'
                                />
                            </div>
                        </div>
                    </div>
                       
                    <div className="row mt-4">
                        <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                              <button className='add-btn' style={{ width: "100%", display: 'flex', justifyContent: 'center' }} onClick={()=>{setIsModalOpen(false);handlesharelink()}}><span>
                            </span>Send<img src={next} className='ms-2'></img></button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
