import React from 'react';
import '../assets/css/ProfileStatus.css';

const ProfileStatus = ({
  label,
  numbers,
  icon,
  percentage = 0,
  iconColor,
  bgColor,
  circleColor,
  colClass = "col-12 col-md-4 mb-3" // default value
}) => {
  return (
    <div className={`progress-card ${colClass}`} style={{ backgroundColor: bgColor }}>
      <div style={{ display: "flex", alignItems: 'center', padding: '15px' }}>
        <div style={{
          height: '44px',
          width: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: bgColor,
          marginRight: "20px"
        }}>
          <img src={icon} alt={label} className="progress-card-icon" />
        </div>
        <div className="progress-card-label">
          <p className='m-0' style={{ color: iconColor, fontSize: '30px', fontWeight: '500' }}>{numbers}</p>
          <p className='m-0' style={{ color: iconColor, fontSize: '14px', fontWeight: '500' }}>{label}</p>
        </div>
      </div>
      {/* <div className="progress-card-body d-flex justify-content-center pb-3">
        <div className="circle" style={{ position: 'relative', width: '60px', height: '60px' }}>
          <svg width="60" height="60" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="35" stroke="#ddd" strokeWidth="7" fill="none" />
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke={circleColor}
              strokeWidth="5"
              fill="none"
              strokeDasharray={`${(percentage || 0) * 2.2} 220`}
              strokeLinecap="round"
            />
          </svg>
          <div className="percentage" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '12px',
            color: iconColor,
            fontWeight: '600'
          }}>
            {percentage}%
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileStatus;
