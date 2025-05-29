import React from 'react';
import "../../assets/css/LoginPage.css";
import logingif from '../../assets/gif/login.gif'

export const LeftSupportDeskLoginComp = ({isOtpVerified}) => {
  return (
    <div className={!isOtpVerified?"lg-left-main-sd":'lg-left-main-sd-sp'}>
        <img src={logingif} className='logingif' alt='logingif'></img>
    </div>
  )
}
