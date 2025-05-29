import React from 'react';
import "../../assets/css/LoginPage.css";
import logingif from '../../assets/Images/loginleftimage.png'

export const LeftPart = () => {
  return (
    <div className="lg-left-main" 
    style={{
        backgroundImage: `url(${logingif})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
         
    </div>
  )
}
