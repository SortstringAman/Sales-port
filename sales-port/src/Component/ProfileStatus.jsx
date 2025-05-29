import React from 'react';
import '../assets/css/ProfileStatus.css'

const ProfileStatus = ({ label, numbers, icon, percentage, iconColor, bgColor, circleColor }) => {
    return (
        <div className="progress-card col-sm-3" style={{ backgroundColor: bgColor }}>
            <div className="" style={{ display: "flex", alignItems: 'center' }}>
                <div style={{height:'44px',width:'44px',borderRadius:'22px',display:'flex',alignItems:'center',background: bgColor,justifyContent:'center',marginRight:"20px"}}>
                    <img src={icon} alt={label} style={{ color: iconColor }} className="progress-card-icon" />
                </div>
                <div className="progress-card-label">
                    <p className='m-0' style={{ color: iconColor, fontSize: '30px', fontWeight: '500' }}>{numbers}</p>
                    <p className='m-0' style={{ color: iconColor, fontSize: '14px', fontWeight: '500' }}>{label}</p>
                </div>
            </div>
            <div className="progress-card-body">
                <div className="circle">
                    <svg width="50" height="50" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40" cy="40" r="35" stroke="#ddd" strokeWidth="7" fill="none" />
                        <circle
                            cx="40"
                            cy="40"
                            r="35"
                            stroke={circleColor}
                            strokeWidth="5"
                            fill="none"
                            strokeDasharray={`${(percentage * 2.2)} 220`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="percentage" style={{ color: iconColor }}>{percentage}%</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStatus;
