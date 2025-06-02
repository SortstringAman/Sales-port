import React from 'react';
// import moment from 'moment';
import '../../assets/css/StudentShortDetails.css';
import studentShortpic from '../../assets/Images/stushortpic.png';
import std from '../../assets/Images/unnaemmeduser.png'
import nexticon from '../../assets/icons/icon.svg';

export const ItemShortDetails = ({ navigate, selectedOrgDetails }) => {
    if (!selectedOrgDetails) return null;
    console.log("selectedOrgDetailsshort--", selectedOrgDetails)



    const {
        first_name,
        last_name,
        gender,
        date_of_birth,
        roll_number,
        registration_number,
        blood_group,
        category,
        privilege_category,
        father_name,
        mother_name,
        guardian_name,
        contact_numbers,
        addresses,
        lag,
        profile_picture,
        email,
        course,
        provisional_admission_date,
        admission_date

    } = selectedOrgDetails;

    console.log("selectedOrgDetails''''", selectedOrgDetails)
    const calculateAge = (dob) => {
        console.log("dob--", dob)
        if (!dob) return null;
        const parts = dob.split('-');
        const birthDate = new Date(parts[0], parts[1] - 1, parts[2]);
        const today = new Date();


        let age = today.getFullYear() - birthDate.getFullYear();
        console.log("AGEEEEEEEEEEEEEEEEEEEEE", age)
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        console.log("agedfjlskfslkfds", age)
        return age;
    };



    const fullName = `${first_name || ''} ${last_name || ''}`.trim();
    const age = calculateAge(date_of_birth ? date_of_birth : null);
    const contact = contact_numbers?.find(c => c.is_primary) || contact_numbers?.[0];
    const address = addresses?.find(a => a.address_type === 'Current') || addresses?.[0];
    const guardianContact = contact_numbers?.find(c =>
        ['GuardianNo', 'Father Mo.', 'Mother Mo.'].includes(c.contact_type)
    );
    const primaryContact = contact_numbers?.find(c => c.is_primary) || contact_numbers?.[0];

    const formattedAddress = address
        ? `${address.address || ''}, ${address.city?.name || ''}, ${address.state?.name || ''}, ${address.country?.name || ''} – ${address.pincode || ''}`
        : 'N/A';
    const imageUrl = profile_picture;
    return (
        <div>
            <div className="col-md-12">
                <p style={{ background: '#F9F9F9', padding: '16px', borderRadius: '8px', textAlign: 'left', fontWeight: 600, color: "#222F3E" }}>TRANSACTION'S  DETAILS:</p>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro">
                        <div className='stu-pro-inner'>
                            <div style={{ display: 'flex', gap: "15px", flexDirection: "column", alignItems: 'start', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 className='fm-pr-hd' style={{ margin: 0, marginBottom: "10px",fontWeight:"bold",fontSize:"17px" }}>RS/2025-26/25</h4>
                                    <p style={{ textAlign: 'left' }}>16/05/25 10:15AM</p>
                                </div>
                                <div>
                                    <p className='sd-p'>Bill No</p>
                                    <p style={{ fontSize: '14px', textAlign: 'left' }}>SYT/2025-26/256</p>
                                </div>
                            </div>

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <p className='sd-p'>Vendor Name</p>
                                <p className='alg-l'>Shyam Trader</p>
                            </div>

                        </div>

                        <div>
                            <p className='sd-p'> Address</p>
                            <p className='alg-l'>1/265, Vardan Khand, Lucknow, Uttar Pradesh, India – 226010</p>
                        </div>

                        <div>
                            <p className='sd-p'>Stock Location</p>
                            <p className='alg-l'>Lucknow</p>
                        </div>


                        <div>
                            <h4 className='fm-pr-hd' style={{ margin: "10px 0", marginBottom: "10px" }}>STOCK'S DETAILS</h4>
                            <div>
                                <p className='sd-p'>Item's Name</p>
                                <p className='alg-l'>Tetra Pack(PM00546)</p>
                            </div>
                            <div>
                                <p className='sd-p'>Item Group</p>
                                <p className='alg-l'>Packaging Material</p>
                            </div>
                            <div>
                                <p className='sd-p'>Quantity</p>
                                <p className='alg-l'>5000.PCS</p>
                            </div>

                            <div>
                                <p className='sd-p'>Quantity</p>
                                <p className='alg-l'>5000.PCS</p>
                            </div>
                            <div>
                                <p className='sd-p'>Batch No</p>
                                <p className='alg-l'>BT1706</p>
                            </div>
                              <div>
                                <p className='sd-p'>Expire Date</p>
                                <p className='alg-l'>N/A</p>
                            </div>

                          
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* 
            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro">
                        <h4 className='fm-pr-hd' style={{ marginBottom: "10px" }}>ACADEMIC INFO</h4>
                        <div>
                            <p className='sd-p'>Course</p>
                            <p className='alg-l'>{lag?.academic_group?.specialization?.course?.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className='sd-p'>Semester</p>
                            <p className='alg-l'>{lag?.academic_group?.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className='sd-p'>Section</p>
                            <p className='alg-l'>{lag?.name || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* <div className='row'>
                <div className="col-md-12">
                    <button className='add-btn' style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }} onClick={() => navigate('/studentDashboard/StudentFullProfile/')}>
                        View Full Profile <img src={nexticon} alt="Next" />
                    </button>
                </div>
            </div> */}
        </div>
    );
};
