import { useState } from 'react'
import close from '../../assets/icons/close.svg';
import search from '../../assets/icons/iconamoon_search-light.svg';
import imagePlaceholder from '../../assets/Images/image 17.png';
import add from '../../assets/icons/add.svg';
import deletered from '../../assets/icons/deletered.svg';
import previous from '../../assets/icons/previous.svg';
import next from '../../assets/icons/icon.svg';
import savedraft from '../../assets/icons/savedraft.svg'

export const IssueNewForm = ({ onClose, currentStep, setCurrentStep, handlePrev, handleNext, steps, isOpen }) => {
    const [contactDetails, setContactDetails] = useState([
        { mobileNumber: '', personType: 'Personal', availableOnWhatsapp: false }
    ]);

    const addContactRow = () => {
        setContactDetails([...contactDetails, { mobileNumber: '', personType: 'Personal', availableOnWhatsapp: false }]);
    };

    // Function to handle input changes for each contact
    const handleContactChange = (index, event) => {
        const values = [...contactDetails];
        values[index][event.target.name] = event.target.value;
        setContactDetails(values);
    };

    // Function to handle checkbox changes
    const handleCheckboxChange = (index) => {
        const values = [...contactDetails];
        values[index].availableOnWhatsapp = !values[index].availableOnWhatsapp;
        setContactDetails(values);
    };
    const handleRemoveContact = (index) => {
        if (index !== 0) { // Prevent removing the first contact row
            const values = contactDetails.filter((_, i) => i !== index);
            setContactDetails(values);
        }
    };
    if (!isOpen) return null;
    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content" style={{ position: 'relative',height:'95vh' }}>
                    <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h2 className='text-primary'>Issue New Form</h2>
                        <button className="close-btn" onClick={onClose}><img src={close}></img></button>
                    </div>
                    <div className="modal-body" style={{ height: "95vh", overflowY: 'scroll', padding: '0 10px', overflowX: 'hidden' }}>
                        {/* <div style={{ position: 'sticky', top: 0, background: "#fff", marginBottom: "10px" }}>
                        <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h2 className='text-primary'>Add New Student</h2>
                            <button className="close-btn" onClick={onClose}><img src={close}></img></button>
                        </div>
                    </div> */}
                        <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
                            <p>Application Number:</p>
                            <h4 className='fm-pr-hd' style={{fontWeight:'600'}}>2024-25/0001</h4>
                        </div>

                        <h4 className='fm-pr-hd'>PERSONAL DETAILS</h4>

                        <div className="">
                            <div className='row' style={{ justifyContent: 'space-between' }}>
                                <div className="col-md-4">
                                    <label className='form-labell'>First Name<span className='astrisk'>*</span></label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter First Name" />
                                </div>
                                <div className="col-md-4">
                                    <label className='form-labell'>Middle Name</label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Middle Name" />
                                </div>
                                <div className="col-md-4">
                                    <label className='form-labell'>Last Name</label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Last Name" />
                                </div>

                            </div>
                        </div>

                        <div className="row" style={{ justifyContent: 'space-between' }}>
                            <div className="col-md-4">
                                <label className='form-labell'>Gender<span className='astrisk'>*</span></label>
                                <select className='fm-modal form-control form-select' >
                                    <option value="0">Select Gender</option>
                                    <option value="1">Mr</option>
                                    <option value="2">Mrs</option>
                                    <option value="2">Ms</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className='form-labell'>Date of Birth<span className='astrisk'>*</span></label>
                                <input type="date" className='fm-modal form-control' />
                            </div>
                            <div className="col-md-4">
                                <label className='form-labell'>Father's Name<span className='astrisk'>*</span></label>
                                <input type="text" className='fm-modal form-control' placeholder="Enter Father's Name" />
                            </div>
                        </div>

                        <div>
                            <h4 className='fm-pr-hd'>CONTACT DETAILS</h4>
                        </div>
                        {contactDetails && contactDetails?.map((val, index) => {
                            return (
                                <div className="row" >
                                    <div className="col-md-4">
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
                                                <option value="+1">+1</option>
                                                <option value="+44">+44</option>
                                                <option value="+61">+61</option>
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
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <select className='fm-modal form-control form-select' >
                                            <option value="0">Select </option>
                                            <option value="1">Personal</option>
                                            <option value="2">Home</option>
                                            <option value="2">Office</option>
                                        </select>
                                    </div>
                                    <div className="col-md-5 input-group2" >
                                        <label >
                                            <input
                                                className='me-2'
                                                type="radio"
                                                name="contactType"
                                                value="primary"
                                            // checked={isPrimary}
                                            // onChange={handleRadioChange}
                                            />
                                            Primary
                                        </label>

                                        {/* Checkbox for Available on WhatsApp? */}
                                        <label className="whatsapp-checkbox ">
                                            <input
                                                type="checkbox"
                                                className='me-2'
                                            // checked={whatsappStatus}
                                            // onChange={handleWhatsappChange}
                                            />
                                            Available on WhatsApp?
                                        </label>
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
                        <div>
                            <h4 className='fm-pr-hd'>CORRESPONDENCE ADDRESS</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className='form-labell'>Address<span className='astrisk'>*</span></label>
                                <input type="text" className='fm-modal form-control' placeholder="Enter Address Line 1 " />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label className='form-labell'>Pin Code</label>
                                <input type="text" className='fm-modal form-control' placeholder="Enter Pin Code " />
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>Country</label>
                                <select className='fm-modal form-control form-select' >
                                    <option value="0">Select Country</option>
                                    <option value="1">Mr</option>
                                    <option value="2">Mrs</option>
                                    <option value="2">Ms</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>State</label>
                                <select className='fm-modal form-control form-select' >
                                    <option value="0">Select State</option>
                                    <option value="1">Mr</option>
                                    <option value="2">Mrs</option>
                                    <option value="2">Ms</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>City</label>
                                <select className='fm-modal form-control form-select' >
                                    <option value="0">Select Country</option>
                                    <option value="1">Mr</option>
                                    <option value="2">Mrs</option>
                                    <option value="2">Ms</option>
                                </select>
                            </div>

                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h4 className='fm-pr-hd'>PERMANENT ADDRESS</h4>
                            <p>Same as Correspondence Address <input type='Checkbox'></input></p>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <label className='form-labell'>Address<span className='astrisk'>*</span></label>
                                <input type="text" className='fm-modal form-control' placeholder="Enter Address Line 1 " />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label className='form-labell'>Pin Code</label>
                                <input type="text" className='fm-modal form-control' placeholder="Enter Pin Code " />
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>Country</label>
                                <select className='fm-modal form-control form-select' >
                                    <option value="0">Select Country</option>
                                    <option value="1">Mr</option>
                                    <option value="2">Mrs</option>
                                    <option value="2">Ms</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>State</label>
                                <select className='fm-modal form-control form-select' >
                                    <option value="0">Select State</option>
                                    <option value="1">Mr</option>
                                    <option value="2">Mrs</option>
                                    <option value="2">Ms</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>City</label>
                                <select className='fm-modal form-control form-select' >
                                    <option value="0">Select Country</option>
                                    <option value="1">Mr</option>
                                    <option value="2">Mrs</option>
                                    <option value="2">Ms</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="form-actions" style={{ position: 'sticky', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={handleNext} >Issue Form & Receive Payment<img src={next}></img></button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
