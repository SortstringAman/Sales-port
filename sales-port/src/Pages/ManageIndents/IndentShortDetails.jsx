import React from 'react';
// import moment from 'moment';
import '../../assets/css/StudentShortDetails.css';
import studentShortpic from '../../assets/Images/stushortpic.png';
import std from '../../assets/Images/unnaemmeduser.png'
import nexticon from '../../assets/icons/icon.svg';

export const IndentShortDetails = ({ navigate, selectedIndentDetails }) => {
    if (!selectedIndentDetails) return null;
    console.log("selectedIndentDetails===>", selectedIndentDetails)



    const {
        department, raised_by, store_location


    } = selectedIndentDetails;

    console.log("selectedIndentDetails''''", selectedIndentDetails)
    // const calculateAge = (dob) => {
    //     console.log("dob--", dob)
    //     if (!dob) return null;
    //     const parts = dob.split('-');
    //     const birthDate = new Date(parts[0], parts[1] - 1, parts[2]);
    //     const today = new Date();


    //     let age = today.getFullYear() - birthDate.getFullYear();
    //     console.log("AGEEEEEEEEEEEEEEEEEEEEE", age)
    //     const monthDiff = today.getMonth() - birthDate.getMonth();
    //     const dayDiff = today.getDate() - birthDate.getDate();

    //     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    //         age--;
    //     }
    //     console.log("agedfjlskfslkfds", age)
    //     return age;
    // };



    // const fullName = `${first_name || ''} ${last_name || ''}`.trim();
    // const age = calculateAge(date_of_birth ? date_of_birth : null);
    // const contact = contact_numbers?.find(c => c.is_primary) || contact_numbers?.[0];
    // const address = addresses?.find(a => a.address_type === 'Current') || addresses?.[0];
    // const guardianContact = contact_numbers?.find(c =>
    //     ['GuardianNo', 'Father Mo.', 'Mother Mo.'].includes(c.contact_type)
    // );
    // const primaryContact = contact_numbers?.find(c => c.is_primary) || contact_numbers?.[0];

    // const formattedAddress = address
    //     ? `${address.address || ''}, ${address.city?.name || ''}, ${address.state?.name || ''}, ${address.country?.name || ''} – ${address.pincode || ''}`
    //     : 'N/A';
    // const imageUrl = profile_picture;
    return (
        <div>
            <div className="col-md-12">
                <p style={{ background: '#F9F9F9', padding: '16px', borderRadius: '8px', textAlign: 'left', fontWeight: 600, color: "#222F3E" }}>INDENT  DETAILS</p>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro">
                        <div className='stu-pro-inner'>
                            <div style={{ display: 'flex', gap: "15px", flexDirection: "column", alignItems: 'start', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 className='fm-pr-hd' style={{ margin: 0, marginBottom: "10px", fontWeight: "bold", fontSize: "17px" }}>IND/2025-26/25</h4>
                                    <p style={{ textAlign: 'left' }}>16/05/25 10:15AM</p>
                                </div>
                                <div>
                                    <p className='sd-p'>Department</p>
                                    <p style={{ fontSize: '14px', textAlign: 'left' }}>{department}</p>
                                </div>
                            </div>

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <p className='sd-p'>Raised By</p>
                                <p className='alg-l'>{raised_by}</p>
                            </div>

                        </div>

                        <div>
                            <p className='sd-p'>Store Location</p>
                            <p className='alg-l'>{store_location}</p>
                        </div>




                        <div>

                            <div>
                                <h4 className='fm-pr-hd' style={{ margin: "10px 0", textTransform: 'uppercase', color: '#7A4FF5' }}>
                                    Indent Requirement
                                </h4>

                                {selectedIndentDetails?.indent_requirement?.map((item, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            background: '#fff',
                                            borderRadius: '8px',
                                            padding: '12px 16px',
                                            marginBottom: '12px',
                                            boxShadow: '0 0 5px rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        <div style={{ display: 'flex',justifyContent: 'space-between'}}>

                                            <div>
                                                <p style={{ fontWeight: 600, margin: 0, textAlign: 'start' }}>{item.item}</p>

                                                <p className='sd-p'>
                                                    Expected By : {item.expected_by}
                                                </p>
                                            </div>
                                            <div style={{ marginTop: '8px', display: 'flex',   fontWeight: 600 ,fontSize:'14px',flexDirection:'column'}}>
                                                <span style={{ color: '#20B55D' }}>{item.required_qty} Pcs.</span>
                                                <span style={{ color: '#F97316' }}>{item.available_qty} Pcs.</span>
                                            </div>
                                        </div>
                                        <div> <p className='sd-p'>
                                            {item.vendor}<br />
                                            {item.shape}

                                        </p></div>



                                    </div>
                                ))}
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

         
        </div>
    );
};
