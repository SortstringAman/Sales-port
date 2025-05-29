import React, { useEffect, useRef, useState } from 'react';
import close from '../../assets/icons/close.svg';
import { getData } from '../../API/GlobalApi';
import Select from 'react-select';
export const VerifyDiscountPayment = ({ isOpen, onClose }) => {

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputs = useRef([]);
    const [isOtpFilled, setIsOtpFilled] = useState(false);
    const [helpdeskperson, setHelpDeskPerson] = useState([])
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [submitting, setSubmitting] = useState(false);


    const gethelpdeskPerson = async () => {
        const url = 'students/inquiry/masterdata/'
        const response = await getData(url);
        console.log("response in help desk", response?.support_desks)
        setHelpDeskPerson(response?.support_desks)

    }


    const handleClear = () => {
        setOtp(['', '', '', '', '', ''])
        setSelectedEmployeeId(null);
        // setHelpDeskPerson(null);
        setSelectedEmployeeId(null)
         setIsOtpFilled(false);
    }

    useEffect(() => {
        gethelpdeskPerson()
    }, [])

    const handleOtpChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, '');
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            otpInputs.current[index + 1]?.focus();
        } else if (value === '' && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
        setIsOtpFilled(newOtp.every(digit => digit.length === 1));
    };

    const handleSubmit = () => {
        if (!isOtpFilled || submitting) return;
        setSubmitting(true);
        console.log("OTP Submitted:", otp.join(''));
        // Simulate API or add actual API call here
        setTimeout(() => {
            setSubmitting(false);
            onClose();
            handleClear();
        }, 1000); // simulate API delay
    };


    const Getotp = async () => {

        if (!selectedEmployeeId) return;
        console.log("selected user id", selectedEmployeeId);
        // Focus the first OTP input
        setTimeout(() => {
            otpInputs.current[0]?.focus();
        }, 0);

        // const data = {
        //   mobile: phoneNumber
        // }
        // console.log("phoneNumber--", phoneNumber);
        // const url = "core/send-login-otp/"
        // const response = await Postdata(url, data)
        // console.log("response---", response);
        // if (!response.error) {
        //   setgetotpdisp(true);
        //   if (!timerRunning) {
        //     setTimerRunning(true);
        //     setCountdown(60);
        //     const timer = setInterval(() => {
        //       setCountdown((prev) => {
        //         if (prev <= 1) {
        //           clearInterval(timer);
        //           setTimerRunning(false);
        //           return 60;
        //         }
        //         return prev - 1;
        //       });
        //     }, 1000);
        //   }
        //   setgetotpdisp(true);
        // }
        // else{
        //    displayToast(response.error, 'danger');
        // }
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay verify-payment-modal">
            <div className="modal-content" style={{ position: 'relative', width: '25%', height: 'auto', padding: '25px' }}>
                {/* Modal Header */}
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 className='text-primary'>Verify Discount</h2>
                    <button className="close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </button>
                </div>
                {/* Modal Body */}
                <div className="modal-body">
                    <div className="row">
                        {/* Select Employee */}
                        <div className="col-md-12 mb-4" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
                            <div style={{ flex: 1 }}>
                                <label className="form-labell mb-2">
                                    Select Employee<span className="astrisk">*</span>
                                </label>
                                <Select
                                    classNamePrefix="select"
                                    isSearchable
                                    name="employee"
                                    options={helpdeskperson?.map(emp => ({
                                        value: emp.id,
                                        label: emp.name,
                                    }))}
                                    placeholder="-- Select Employee --"
                                    value={helpdeskperson
                                        ?.map(emp => ({
                                            value: emp.id,
                                            label: emp.name,
                                        }))
                                        .find(option => option.value === selectedEmployeeId) || null}
                                    onChange={(selected) => setSelectedEmployeeId(selected?.value)}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    styles={{
                                        control: (base) => ({ ...base, minHeight: '38px', height: '30px' }),
                                        valueContainer: (base) => ({ ...base, height: '30px', padding: '0 6px', fontSize: '14px' }),
                                        option: (base, state) => ({
                                            ...base,
                                            fontSize: '14px',
                                            backgroundColor: state.isSelected ? '#ddd' : state.isFocused ? '#f0f0f0' : 'white',
                                            color: 'black',
                                        }),
                                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                    }}
                                />
                            </div>

                            {/* Send OTP Button */}
                            <div>
                                <button
                                    type="button"
                                    onClick={Getotp}
                                    style={{
                                        padding: '10px 16px',

                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        height: '40px',
                                        whiteSpace: 'nowrap',
                                         
                                        backgroundColor: selectedEmployeeId ? '#7F56DA' : '#d3d3d3',
                                        cursor: selectedEmployeeId ? 'pointer' : 'not-allowed'
                                    }} >
                                    Send OTP
                                </button>
                            </div>
                        </div>


                        {/* OTP Fields */}
                        <div className="col-md-12" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div >
                                <label className="form-labell mb-3">Enter OTP<span className='astrisk'>*</span></label>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
                                    {otp?.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={digit}
                                            ref={(el) => otpInputs.current[index] = el}
                                            onChange={(e) => handleOtpChange(e, index)}
                                            maxLength="1"
                                            className="otp-input"
                                            style={{
                                                width: '100%',
                                                maxWidth: '50px',
                                                textAlign: 'center',
                                                borderRadius: '6px',
                                                border: '1px solid #ccc',
                                                fontSize: '15px',
                                                height: '40px',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-5 col-md-3 d-flex justify-content-end align-items-center" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button
                                disabled={!isOtpFilled || submitting}
                                onClick={handleSubmit}
                                style={{
                                    padding: '10px 16px',
                                    backgroundColor: isOtpFilled && !submitting ? '#7F56DA' : '#d3d3d3',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    height: '40px',
                                    width: '100px',
                                    cursor: isOtpFilled && !submitting ? 'pointer' : 'not-allowed',
                                }} >
                                {submitting ? 'Verifying...' : 'Verify'}
                            </button>

                        </div>
                        </div>
                         
                    </div>
                </div>
            </div>
        </div>
    );
};
