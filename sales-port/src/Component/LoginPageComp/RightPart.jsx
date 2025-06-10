// import React, { useState, useEffect, useRef } from 'react';
// import Logo from '../../assets/Images/logo.png';
// import clock from '../../assets/icons/clock.svg';
// // import { useNavigate } from 'react-router-dom'
// import { Postdata } from '../../API/GlobalApi';
// import { Link } from 'react-router-dom';


// export const RightPart = () => {
//   // const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle sign in logic
//     console.log("data after logi",{ email, password, rememberMe });
//   };
//   const [showToast, setShowToast] = useState(false);
//   const [toastVariant, setToastVariant] = useState('success');
//   const [toastMessage, setToastMessage] = useState('');
//   const displayToast = (message, variant = 'success') => {
//     setToastMessage(message);
//     setToastVariant(variant);
//     setShowToast(true);
//     // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
//     setTimeout(() => setShowToast(false), 3000);
//   };


//   return (
//     <div className='lg-rg-main'>
//       <div className="p-4" style={{ width: '100%', maxWidth: '500px' }}>
//         <h1 className="mb-3" style={{ color: "black",fontWeight:"700-" }}>Welcome back</h1>
//         <p className="text-muted mb-5 text-start" style={{ fontSize: '16px' }}>
//           Please enter your details to sign in</p>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control text-muted fw-normal"
//               id="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//                style={{ color: "#D1D5DB", padding: "10px 22px" }}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label ">Password</label>
//             <input
//               type="password"
//               className="form-control text-muted fw-normal"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ color: "#D1D5DB", padding: "10px 22px" }}
//             />
//           </div>

//           <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
//             <div className="form-check">
//               <input
//                 type="checkbox"
//                 className="form-check-input fw-lighter" 
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <label className="form-check-label fw-lighter" style={{fontSize:"14px"}} htmlFor="rememberMe">Remember me</label>
//             </div>
//             <p className="" style={{color:"#7F56DA",fontSize:"14px"}}>Forgot password?</p>

//           </div>

//           <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#7F56DA', border: 'none' ,padding:"13px 10px"}}>
//             Sign in
//           </button>
//         </form>
//       </div>


//       {showToast && (
//         <div
//           className={`custom-toast toast align-items-center text-white bg-${toastVariant} border-0 position-fixed top-0 end-0 m-3`}
//           role="alert"
//           style={{
//             display: 'block',
//             minWidth: '300px',
//             maxWidth: '400px',
//             borderRadius: '8px',
//             boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
//             fontSize: '15px',
//             zIndex: 9999
//           }}
//         >
//           <div className="d-flex">
//             <div className="toast-body" style={{ padding: '12px 16px' }}>
//               <strong>{toastVariant === 'success' ? '✅' : '❌'} </strong> {toastMessage}
//             </div>
//             <button
//               type="button"
//               className="btn-close btn-close-white me-2 m-auto"
//               onClick={() => setShowToast(false)}
//               aria-label="Close"
//             ></button>
//           </div>
//         </div>
//       )}
//     </div>

//   )

// }


import React, { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/Images/logo.png';
import clock from '../../assets/icons/clock.svg';
// import { useNavigate } from 'react-router-dom'
import { Postdata } from '../../API/GlobalApi';
import Notifier from '../../Utils/notify';
import Session from '../../Service/session';
import { useNavigate } from 'react-router-dom';

export const RightPart = () => {
  // const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpFilled, setIsOtpFilled] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(60); // Countdown starts at 15 seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [getotpdisp, setgetotpdisp] = useState(false);
  const [token, settoken] = useState('');
  const otpInputs = useRef([]);


  const handleChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value.replace(/\D/g, ''));
  };
  const Getotp = async () => {
    const data = { mobile: phoneNumber };
    const url = 'core/send-login-otp/';

    console.log("phoneNumber--", phoneNumber);
    console.log("url for sent", url);

    try {
      const response = await Postdata(url, data);
      console.log("response---", response);

      if (response?.error) {
        Notifier.error(response.error || "Something went wrong");
        return;
      }

      Notifier.success("OTP sent successfully!");
      setgetotpdisp(true);

      if (!timerRunning) {
        setTimerRunning(true);
        setCountdown(60);

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              setTimerRunning(false);
              return 60;
            }
            return prev - 1;
          });
        }, 1000);
      }

    } catch (err) {
      console.error("OTP Error:", err);
      Notifier.error(err?.message || "Network error. Please try again.");
    }
  };


  // const Getotp = async () => {
  //   const data = {
  //     mobile: phoneNumber,
  //   };

  //   console.log("phoneNumber--", phoneNumber);

  //   const url = "core/send-login-otp/";

  //   try {
  //     // Call Postdata function
  //     const response = await Postdata(url, data);
  //     console.log("response---", response); // Log the full response to inspect the data

  //     // Check for response status and OTP
  //     if (response && response.status === 200) {
  //       // Check if the response contains OTP or an error message
  //       if (response.otp && response.otp !== '') {
  //         console.log("OTP sent successfully:", response);
  //         setgetotpdisp(true); // Show OTP input
  //       } else {
  //         // Handle errors like "wrong number" based on the response data
  //         console.error("Failed to send OTP:", response);
  //         alert("Entered wrong number");
  //       }
  //     } else {
  //       // Handle API error or status other than 200
  //       console.error("API Error:", response);
  //       alert("Failed to send OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error while sending OTP:", error);
  //     alert("Error while sending OTP. Please check your connection.");
  //   }
  // };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // If value is filled and we're not at the last input, move focus to the next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
    else if (value === '' && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }

    // Check if OTP is completely filled
    if (newOtp.every((digit) => digit.length === 1)) {
      setIsOtpFilled(true);
    } else {
      setIsOtpFilled(false);
    }
  };


  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      const url = 'core/login/';
      const data = {
        mobile: phoneNumber,
        otp: otp.join('')
      };

      const response = await Postdata(url, data);

      console.log("✅ Response received: ater submit", response);

      if (response.token) {
        setIsOtpVerified(true);
        settoken(response.token);
        Session.set("token", response.token);
        Notifier.success(response?.message)
        navigate('/')
      } else if (response.error) {
        Notifier.error(response.error?.error); // Show proper error
      } else {
        Notifier.error("Unexpected error. Please try again.");
      }
    } catch (error) {
      console.error("❗ Error during OTP submission:", error);
      Notifier.error("Something went wrong. Please try again later.");
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
  }, []);

  
  return (
    <div className='lg-rg-main '>
      <div>
        <img src={Logo} alt="logo" className='lg-logo' />
        <h5 style={{ fontSize: '30px', marginBottom: "50px", fontWeight: '500' }}>Login to your account</h5>

        {getotpdisp === false ? (<>
          <div className="input-group mb-3" style={{ border: "1px solid #222F3E33", borderRadius: "6px" }}>
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
              value={phoneNumber}
              onChange={handleChange}
              maxLength="10"
            />
          </div>
          <button className={`get-otp-btn ${phoneNumber.length === 10 ? 'enabled' : 'disabled'}`}
            disabled={phoneNumber.length !== 10} onClick={Getotp}>Get OTP</button></>) : (<>
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
                {/* {
                  isOtpVerified === false ?
                    timerRunning === false ?
                      <button className={`get-otp-btn ${phoneNumber.length === 10 ? 'enabled' : 'disabled'}`} disabled={phoneNumber.length !== 10} onClick={Getotp} style={{ width: '30%', marginBottom: "5px" }}>Get OTP</button>
                      : <p
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
                          <span style={{ color: "#222F3E4D" }}>Resend OTP {countdown} sec</span>
                        </span>
                      </p>
                    : ""
                } */}
                {
                  isOtpVerified === false && (
                    timerRunning ? (
                      <p
                        style={{
                          marginTop: '20px',
                          fontSize: '14px',
                          textAlign: 'left',
                          color: '#4D5765'
                        }}
                      >
                        Didn't receive an OTP?{' '}
                        <br />
                        <span style={{ color: "#222F3E4D" }}>
                          Resend OTP {countdown} sec
                        </span>
                      </p>
                    ) : getotpdisp ? (
                      <p
                        style={{
                          marginTop: '20px',
                          fontSize: '14px',
                          textAlign: 'left',
                          color: '#4D5765'
                        }}
                      >
                        Didn't receive an OTP?{' '}
                        <br />
                        <span
                          onClick={Getotp}
                          style={{ cursor: 'pointer', color: '#7F56DA', textDecoration: 'underline' }}
                        >
                          Resend OTP
                        </span>
                      </p>
                    ) : (
                      <button
                        className={`get-otp-btn ${phoneNumber.length === 10 ? 'enabled' : 'disabled'}`}
                        disabled={phoneNumber.length !== 10}
                        onClick={Getotp}
                        style={{ width: '30%', marginBottom: "5px" }}
                      >
                        Get OTP
                      </button>
                    )
                  )
                }
              </p></>)}
      </div>

    </div>

  )
}
