import React, { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/Images/logo.png';
import clock from '../../assets/icons/clock.svg';
import { getData, Postdata } from '../../API/GlobalApi';

export const RightSupportDeskLoginComp = ({ setIsOtpVerified, isOtpVerified }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isOtpFilled, setIsOtpFilled] = useState(false);
    const [countdown, setCountdown] = useState(15); // Countdown starts at 15 seconds
    const [timerRunning, setTimerRunning] = useState(false);
    const [getotpdisp, setgetotpdisp] = useState(false);
    const [masterdata, setmasterdata] = useState([]);
    const [countryId, setcountryId] = useState(null);
    const [countrydata, setcountrydata] = useState([]);
    const [statedata, setstatedata] = useState([]);
    const [citydata, setcitydata] = useState([]);
    const [stateid, setstateid] = useState(null);
    const [cityid, setcityid] = useState(null);
    // const [isOtpVerified, setIsOtpVerified] = useState(false); 
    const [token, settoken] = useState('');
    const otpInputs = useRef([]);
    const [sendform,setsendform]=useState({
        primary_contact_number: "",
        name: "",
        last_name: "",
        email: "",
        support_desk_type_id: null,
        adderss: "",
        city_id: null,
        state_id: null,
        country_id: null,
        pincode: ""
    })

    const getmasterdata = async () => {
        const url = "administration/support-desks/masterdata";
        const response = await getData(url);
        if (response) {
            setmasterdata(response.master_data);
            console.log("responseorg---", response.master_data)
            // setdnparentdata(response.results);
            // setSelectedOrgDetails(response.results[0]);
            // // setSelectedOrgid(response[0]?.id);
            // getdeptdata(response.results[0]?.id)

        }
    }
    const getcountry = async () => {
        const url = "administration/countries/";
        const response = await getData(url);
        setcountrydata(response)
        console.log("response--", response);
    }
    const handlelocationdata = async (e) => {
        const value = e.target.value;
        const name = e.target.name;
        console.log("name--", name);
        console.log("value--", value);
        if (name === "country") {
            setcountryId(value)
            console.log("countryId--", countryId)
            try {
                const url = `administration/countries/${value}/states/`
                // Make an API call to get states for the selected country
                const response = await getData(url); // Replace with your actual state API URL
                console.log("responsestate--", response)
                if (response) {
                    setstatedata(response.state_list)
                    console.log("responsestatedata--", statedata)
                }
            } catch (error) {
                console.error("Error fetching state data:", error);
            }
        }
        else if (name === 'state') {
            setstateid(value)
            try {
                const url = `administration/countries/${countryId}/states/${value}/cities/`
                // Make an API call to get states for the selected country
                const response = await getData(url); // Replace with your actual state API URL
                // console.log("responsestate--",response)
                if (response) {
                    setcitydata(response.city_list)
                }
            } catch (error) {
                console.error("Error fetching state data:", error);
            }
        }
        else if (name === 'city') {
            setcityid(value)
        }
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value.replace(/\D/g, ''));
    };
    const handleChangeform=(e)=>{
        const { name, value } = e.target; // Get the name and value from the input field
        setsendform(prevState => ({
          ...prevState, // Keep the previous state
          [name]: value // Dynamically update the field using the name
        }));
    }
    const handleformsubmit = async()=>{
        const finalobj={
            primary_contact_number: sendform.primary_contact_number,
            name: sendform.name,
            last_name: sendform.last_name,
            email: sendform.email,
            support_desk_type_id: sendform.support_desk_type_id,
            adderss: sendform.adderss,
            city_id: cityid,
            state_id: stateid,
            country_id: countryId,
            pincode: sendform.pincode
        }
        const url=`administration/support-desks/`
        const response= await Postdata(url,finalobj)
        console.log("responsesubmit",response)
    }

    const Getotp = async () => {
        const data = { mobile: phoneNumber };
        const url = "core/send-login-otp/";
        const response = await Postdata(url, data);
        if (response) {
            setgetotpdisp(true);
        }
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to next input or previous input
        if (value && index < 5) {
            otpInputs.current[index + 1]?.focus();
        } else if (value === '' && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }

        if (newOtp.every((digit) => digit.length === 1)) {
            setIsOtpFilled(true);
        } else {
            setIsOtpFilled(false);
        }
    };

    const handleSubmit = async () => {
        const url = "core/login/";
        const data = {
            mobile: phoneNumber,
            otp: otp.join('')
        };
        const response = await Postdata(url, data);
        if (response.token) {
            settoken(response.token);
            window.localStorage.setItem('token', response.token);
            setIsOtpVerified(true); // Set OTP verified to true
        } else {
            alert("Wrong OTP");
        }
    };

    const handleResendOtp = () => {
        if (!timerRunning) {
            setTimerRunning(true);
            setCountdown(15);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setTimerRunning(false);
                        return 15;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    useEffect(() => {
        otpInputs.current[0]?.focus();
        getmasterdata();
        getcountry();
    }, []);

    return (
        <div className='lg-rg-main-sd'>
            <div>
                <img src={Logo} alt="logo" className='lg-logo' />


                {/* If OTP is not verified, show OTP form */}
                {!isOtpVerified ? (
                    <>
                        <h5 style={{ fontSize: '30px', marginBottom: "50px", fontWeight: '500', color: '#222F3E' }}>Register / Sign in to your account</h5>
                        {getotpdisp === false ? (
                            <>
                                <div className="input-group mb-3" style={{ border: "1px solid #222F3E33", borderRadius: "6px" }}>
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
                                        value={phoneNumber}
                                        onChange={handleChange}
                                        maxLength="10"
                                    />
                                </div>
                                <button className={`get-otp-btn ${phoneNumber.length === 10 ? 'enabled' : 'disabled'}`}
                                    disabled={phoneNumber.length !== 10} onClick={Getotp}>Get OTP</button>
                            </>
                        ) : (
                            <>
                                <p style={{ fontSize: '16px', marginBottom: '30px', textAlign: 'left', color: '#4D5765' }}>
                                    Please enter the 6 Digits OTP <br />sent to <span style={{ color: 'black' }}>{phoneNumber}</span>
                                </p>
                                <div className="otp-input-container">
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
                                                width: '50px',
                                                textAlign: 'center',
                                                margin: '0 5px',
                                                borderRadius: '6px',
                                                border: '1px solid #222F3E33',
                                                fontSize: '15px',
                                                color: '#222F3E'
                                            }}
                                        />
                                    ))}
                                </div>
                                <button
                                    className={`get-otp-btn ${isOtpFilled ? 'enabled' : 'disabled'}`}
                                    disabled={!isOtpFilled}
                                    onClick={handleSubmit}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        backgroundColor: isOtpFilled ? '#7F56DA' : '#d3d3d3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: isOtpFilled ? 'pointer' : 'not-allowed',
                                        marginTop: '20px',
                                    }}
                                >
                                    Login
                                </button>
                                <p
                                    style={{
                                        marginTop: '20px',
                                        fontSize: '14px',
                                        textAlign: 'left',
                                        color: '#4D5765'
                                    }}
                                >
                                    Didn't receive an OTP?{' '}<br />
                                    <span
                                        onClick={handleResendOtp}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <span style={{ color: "#222F3E4D" }}>Resend OTP</span> <img src={clock} /> <span style={{ color: '#7F56DA' }}>in {countdown} sec</span>
                                    </span>
                                </p>
                            </>
                        )}
                    </>
                ) : (
                    <div>
                        <h5 style={{ fontSize: '30px', marginBottom: "50px", fontWeight: '500', color: '#222F3E' }}>Enter your details & complete your profile</h5>
                        
                            <div className="mb-3">
                                <label className='form-labell'> First Name <span className='astrisk'>*</span></label>
                                <input type="text" className="form-control fm-modal" id="name" placeholder="Enter Your first Name" required
                                 name="name" onChange={handleChangeform}/>
                            </div>
                            <div className="mb-3">
                                <label className='form-labell'> Last Name <span className='astrisk'>*</span></label>
                                <input type="text" className="form-control fm-modal" id="last_name" placeholder="Enter Your Last Name" 
                                 name="last_name" onChange={handleChangeform}/>
                            </div>
                            <div className="mb-3">
                                <label className='form-labell'> Enter Phone Number <span className='astrisk'>*</span></label>
                                <input type="text" className="form-control fm-modal" id="name" placeholder="Enter Your Name" required 
                                name="primary_contact_number"
                                onChange={handleChangeform}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email <span className='astrisk'>*</span></label>
                                <input type="email" className="form-control fm-modal" id="email" placeholder="Enter Your Email" required 
                                name="email"
                                onChange={handleChangeform}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location Type <span className='astrisk'>*</span></label>
                                <select className="form-control" id="location" required
                                name="support_desk_type_id"
                                onChange={handleChangeform}>
                                    <option value="">Select</option>
                                    {masterdata && masterdata?.map((val, ind) => {
                                        return (
                                            <option value={val.id}>{val.name}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address <span className='astrisk'>*</span></label>
                                <input type="text" className="form-control fm-modal" id="address" placeholder="Enter Your Address" required 
                                name="adderss"
                                onChange={handleChangeform}/>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="country" className="form-label">Country</label>
                                        <select className='fm-modal form-control form-select' value={countryId} name='country' onChange={(e) => { handlelocationdata(e) }} >
                                            <option >Select Country</option>
                                            {countrydata && countrydata?.map((val, ind) => {
                                                return (
                                                    <option value={val.id}>{val.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <select className='fm-modal form-control form-select' value={stateid} name='state' onChange={(e) => { handlelocationdata(e) }} >
                                            <option >Select State</option>
                                            {statedata && statedata?.map((val, ind) => {
                                                return (
                                                    <option value={val.id}>{val.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="row">

                                <div className="col-md-6">
                                    <label htmlFor="state" className="form-label">City</label>
                                    <select className='fm-modal form-control form-select' name='city' onChange={(e) => { handlelocationdata(e) }} >
                                        <option >Select City</option>
                                        {citydata && citydata?.map((val, ind) => {
                                            return (
                                                <option value={val.id}>{val.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="pinCode" className="form-label">Pin Code</label>
                                        <input type="text" className="form-control fm-modal" id="pinCode" placeholder="Enter Pin Code" 
                                        name='pincode'
                                        onChange={handleChangeform} />
                                    </div>
                                </div>
                            </div>
                            <button className='add-btn' onClick={handleformsubmit} style={{ width: "100%", display: 'flex', justifyContent: 'center' }}><span>
                            </span>Submit</button>
                    </div>
                )}
            </div>
        </div>
    );
};

