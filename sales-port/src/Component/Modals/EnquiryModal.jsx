import React, { useState } from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import deletered from '../../assets/icons/deletered.svg';

export const EnquiryModal = ({ onClose, isOpen, dnparentdata, countrydata, handlelocationdata, statedata, citydata, handleChange, orgform, handleSubmit, Updatebtn, handleUpdate, setparentorgidsub, parentorgidsub, countryId, stateid, phoneNumber, isOtpFilled, handleOtpChange, otpInputs, getotp, otp, handleChangephno, handleSubmitotp, getotpdisp, masterdata, specializationdata, setContactDetails, contactDetails }) => {

    if (!isOpen) return null;



    const addContactRow = () => {
        setContactDetails([...contactDetails, { priorityCourse: null }]);
    };
    const handleRemoveContact = (index) => {
        if (index !== 0) { // Prevent removing the first contact row
            const values = contactDetails.filter((_, i) => i !== index);
            setContactDetails(values);
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ position: 'relative', height: "95vh" }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className='text-primary'>{Updatebtn ? 'Update Enquiry' : "Add Enqiry"}</h2>
                    <button className="close-btn" onClick={onClose}><img src={close}></img></button>
                </div>
                <div className="modal-body">
                    {!Updatebtn ?
                        <div className="mb-s">
                            <p>Verify your registered mobile number</p>


                            <div className="d-flex align-items-center justify-content-between">
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'end', width: '35%' }}>
                                    <div>
                                        <label className='form-labell'>Phone Number</label><span className='astrisk'>*</span>
                                        <div className="input-group" style={{ border: "1px solid #222F3E33", borderRadius: "6px", width: '100%' }}>

                                            <select className="form-select code-select" style={{ backgroundColor: '#F9F9F9', border: 'none', padding: '10px', borderRadius: '6px 0 0 6px', width: '40px' }}>
                                                <option value="+91">+91</option>
                                                <option value="+1">+1</option>
                                                <option value="+44">+44</option>
                                                <option value="+61">+61</option>
                                            </select>
                                            <input
                                                type="text"
                                                className="form-control code-select"
                                                placeholder="Enter Mobile Number"
                                                value={phoneNumber}
                                                onChange={handleChangephno}
                                                maxLength="10"
                                                style={{ border: 'none', padding: '10px', borderRadius: '0 6px 6px 0', width: 'calc(100% - 80px)' }}
                                            />
                                        </div>
                                    </div>
                                    <button className={`get-otp-btn ${phoneNumber.length === 10 ? 'enabled' : 'disabled'}`} disabled={phoneNumber.length !== 10} onClick={getotp} style={{ width: '30%', marginBottom: "5px" }}>Get OTP</button>
                                </div>
                                {getotpdisp && (
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'end' }}>
                                        <div>
                                            <label className='form-labell'>Enter OTP</label><span className='astrisk'>*</span>
                                            <div className="otp-input-container" style={{ marginBottom: '0' }}>
                                                {otp?.map((digit, index) => (
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        value={digit}
                                                        ref={(el) => otpInputs.current[index] = el}
                                                        onChange={(e) => handleOtpChange(e, index)}
                                                        maxLength="1"
                                                        className="otp-input"
                                                        style={{ width: '50px', textAlign: 'center', margin: '0 5px', borderRadius: '6px', border: '1px solid #222F3E33', fontSize: '15px', color: '#222F3E' }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            className={`get-otp-btn ${isOtpFilled ? 'enabled' : 'disabled'}`}
                                            disabled={!isOtpFilled}
                                            onClick={handleSubmitotp}
                                            style={{ width: '100%', padding: '10px', backgroundColor: isOtpFilled ? '#7F56DA' : '#d3d3d3', color: 'white', border: 'none', borderRadius: '6px', cursor: isOtpFilled ? 'pointer' : 'not-allowed', marginBottom: '1px' }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                )}
                                {/* <div style={{ display: 'flex', gap: '20px', alignItems: 'end' }}>
                                <div>
                                    <label className='form-labell'>Enter OTP</label><span className='astrisk'>*</span>
                                    <div className="otp-input-container" style={{ marginBottom: '0' }}>
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                value={digit}
                                                ref={(el) => otpInputs.current[index] = el}
                                                onChange={(e) => handleOtpChange(e, index)}
                                                maxLength="1"
                                                className="otp-input"
                                                style={{ width: '50px', textAlign: 'center', margin: '0 5px', borderRadius: '6px', border: '1px solid #222F3E33', fontSize: '15px', color: '#222F3E' }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button
                                    className={`get-otp-btn ${isOtpFilled ? 'enabled' : 'disabled'}`}
                                    disabled={!isOtpFilled}
                                    onClick={handleSubmitotp}
                                    style={{ width: '100%', padding: '10px', backgroundColor: isOtpFilled ? '#7F56DA' : '#d3d3d3', color: 'white', border: 'none', borderRadius: '6px', cursor: isOtpFilled ? 'pointer' : 'not-allowed', marginBottom: '1px' }}
                                >
                                    Submit
                                </button>
                            </div> */}
                            </div>
                        </div> : ''
                    }
                    <div className="row">
                        <div className="col-md-3">
                            <label className='form-labell'>First Name<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter First Name" value={orgform.fname} onChange={handleChange} name='fname' />
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>Last Name<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Last Name" value={orgform.lname} onChange={handleChange} name='lname' />
                        </div>
                        <div className='col-md-3'>
                            <label className='form-labell'>Phone Number</label><span className='astrisk'>*</span>
                            <div className="input-group" style={{ border: "1px solid #222F3E33", borderRadius: "6px", width: '100%', height: '52px' }}>

                                <select className="form-select code-select" style={{ backgroundColor: '#F9F9F9', border: 'none', padding: '10px', borderRadius: '6px 0 0 6px', width: '40px' }}>
                                    <option value="+91">+91</option>
                                </select>
                                <input
                                    type="text"
                                    className="form-control code-select"
                                    placeholder="Enter Mobile Number"
                                    value={orgform.mobileno}
                                    name='mobileno'
                                    onChange={handleChange}
                                    maxLength="10"
                                    style={{ border: 'none', padding: '10px', borderRadius: '0 6px 6px 0', width: 'calc(100% - 80px)' }}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>Email<span className='astrisk'>*</span></label>
                            <input type="email" className='fm-modal form-control' placeholder="Enter Email" value={orgform.email} onChange={handleChange} name='email' />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <label className='form-labell'>Aadhar<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Aadhar number" value={orgform.aadhar} onChange={handleChange} name='aadhar' />
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>Highest Qualification <span className='astrisk'>*</span> </label>
                            <select className='fm-modal form-control form-select' name='qualifications' onChange={handleChange} value={orgform.qualifications} >
                                <option >Select Qualification </option>
                                {masterdata && masterdata.qualifications?.map((val, ind) => {
                                    return (
                                        <option value={val}>{val}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className='form-labell'>Address</label>
                            <input type="email" className='fm-modal form-control' placeholder="Enter Address" value={orgform.address} onChange={handleChange} name='address' />
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>Enquiry Source <span className='astrisk'>*</span></label>
                            <select className='fm-modal form-control form-select' name='enquirysource' onChange={handleChange} value={orgform.enquirysource}>
                                <option >Select Enquiry Source</option>
                                {masterdata && masterdata.inquiry_source?.map((val, ind) => {
                                    return (
                                        <option value={val}>{val}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-3">
                            <label className='form-labell'>Country</label>
                            <select className='fm-modal form-control form-select' value={countryId} name='country' onChange={(e) => { handlelocationdata(e) }} >
                                <option >Select Country</option>
                                {countrydata && countrydata?.map((val, ind) => {
                                    return (
                                        <option value={val.id}>{val.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>State</label>
                            <select className='fm-modal form-control form-select' value={stateid} name='state' onChange={(e) => { handlelocationdata(e) }} >
                                <option >Select State</option>
                                {statedata && statedata.map((val, ind) => {
                                    return (
                                        <option value={val.id}>{val.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>City</label>
                            <select className='fm-modal form-control form-select' name='city' onChange={(e) => { handlelocationdata(e) }} >
                                <option >Select City</option>
                                {citydata && citydata?.map((val, ind) => {
                                    return (
                                        <option value={val.id}>{val.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>Pin Code</label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Pin Code "
                                value={orgform.pincode}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^\d{0,6}$/.test(val)) {
                                        handleChange(e);
                                    }
                                }}
                                name='pincode' />
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label className='form-labell'>Father's Name<span className='astrisk'>*</span></label>
                                <input type="text" className='fm-modal form-control' placeholder="Enter Last Name" value={orgform.fathername} onChange={handleChange} name='fathername' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className='fm-pr-hd'>INTERESTED COURSES</h4>
                    </div>
                    {contactDetails && contactDetails?.map((val, index) => {
                        return (
                            <div className="row mb-2" >
                                <div className="col-md-3">
                                    <label className='form-labell'>Priority In Courses<span className='astrisk'>*</span></label>

                                    <select className='fm-modal form-control form-select' name='priorityCourses' value={val.priorityCourse} onChange={(e) => handleChange(e, index)}>
                                        <option value="0">Select</option>
                                        {specializationdata && specializationdata?.length > 0 ? (
                                            specializationdata?.map((val, ind) => (
                                                <option key={val.id} value={val.id}>
                                                    {val.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No specializations available</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-5 input-group2" >
                                    {index !== 0 && (
                                        <p className='Removebtn' onClick={() => handleRemoveContact(index)}><img src={deletered}></img>Remove</p>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                    <div onClick={addContactRow} style={{ cursor: 'pointer' }}>
                        <h4 className='fm-pr-hd'>  <svg width="10" height="10" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="#7F56DA" />
                        </svg> Add More</h4>
                    </div>

                </div>
                <div className="row mt-4">
                    {Updatebtn === false ? <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='add-btn' onClick={handleSubmit} style={{ width: "40%", display: 'flex', justifyContent: 'center' }}><span>
                        </span>Send Enquiry<img src={next} className='ms-2'></img></button>
                    </div> : <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='add-btn' onClick={handleUpdate} style={{ width: "40%", display: 'flex', justifyContent: 'center' }}><span>
                        </span>Update Enquiry<img src={next} className='ms-2'></img></button>
                    </div>}
                </div>
            </div>
        </div >
    )
}
