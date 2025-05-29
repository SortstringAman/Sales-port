import React from 'react';
// import moment from 'moment';
import '../../assets/css/StudentShortDetails.css';
import studentShortpic from '../../assets/Images/stushortpic.png';
import std from '../../assets/Images/unnaemmeduser.png'
import nexticon from '../../assets/icons/icon.svg';

export const EnquiryShortDetails = ({ navigate, selectedOrgDetails }) => {
    if (!selectedOrgDetails) return null;




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
        admission_date,
        inquiry_source,
        formstatus,
        qualification,
        crated_by,
        aadhar_number,
        interested_courses,is_career_mela_participant,is_career_mela_participantion_document,student_board,student_inquiry_ratings

    } = selectedOrgDetails;

    console.log("enquire short details''''", selectedOrgDetails)

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
        ? `${address.address || ''}, ${address?.city || ''}, ${address?.state || ''}, ${address?.country || ''} – ${address.pincode || ''}`
        : 'N/A';

    const imageUrl = profile_picture;
    return (
        <div>
            <div className="col-md-12">
                <p style={{ background: '#F9F9F9', padding: '16px', borderRadius: '8px', textAlign: 'left', fontWeight: 500, color: "#222F3E" }}>ENQUIRIES'S SHORT DETAILS:</p>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro"   style={{height:'700px',overflowY:'scroll',paddingTop:"0"}}>
                        <div className='stu-pro-inner'>
                            <div style={{ display: 'flex', gap: "15px", flexDirection: "column", alignItems: 'start', justifyContent: 'space-between',paddingTop:"20px" , position: "sticky",top: "0",background: "#f9f9f9",zIndex: "999",padding: "20px 0px"}}>
                                <div>
                                    <h4 className='fm-pr-hd' style={{ margin: 0, marginBottom: "10px" }}>{fullName}</h4>
                                    {/* <p style={{ textAlign: 'left' }}>{age ? `${age} Years` : 'N/A'} {gender ? `/ ${gender}` : 'N/A'}</p> */}
                                </div>

                                <div>
                                    <p className='sd-p'>Email</p>
                                    <p style={{ fontSize: '14px', textAlign: 'left' }}>{email || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className='sd-p'>Aadhar Number</p>
                                    <p style={{ fontSize: '14px', textAlign: 'left' }}>{aadhar_number || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className='sd-p'>Qualification</p>
                                    <p style={{ fontSize: '14px', textAlign: 'left' }}>{qualification || 'N/A'}</p>
                                </div>

                                <div>
                                    <p className='sd-p'>Interested Courses</p>
                                    <ul style={{ fontSize: '14px', textAlign: 'left', paddingLeft: '20px' }}>
                                        {interested_courses && interested_courses.length > 0 ? (
                                            interested_courses?.map((course, index) => (
                                                <li key={course.id || index}>{course.name}</li>
                                            ))
                                        ) : (
                                            <li>N/A</li>
                                        )}
                                    </ul>
                                </div>

                            

                            <div>
                                <p className='sd-p'>Inquiry Source</p>
                                <p style={{ fontSize: '14px', textAlign: 'left' }}>{inquiry_source || 'N/A'}</p>
                            </div>

                            <div>
                                <p className='sd-p'> Status</p>
                                <p style={{ fontSize: '14px', textAlign: 'left' }}>{formstatus || 'N/A'}</p>
                            </div>

                            <div>
                                <p className='sd-p'>Career Mela Participant</p>
                                <p style={{ fontSize: '14px', textAlign: 'left' }}>
                                    {typeof is_career_mela_participant === 'boolean' ? (is_career_mela_participant ? 'Yes' : 'No') : 'N/A'}
                                </p>
                            </div>

                            <div>
                                <p className='sd-p'>Career Mela Document</p>
                                <p style={{ fontSize: '14px', textAlign: 'left' }}>
                                    {is_career_mela_participantion_document ? 'Uploaded' : 'Not Provided'}
                                </p>
                            </div>

                            <div>
                                <p className='sd-p'>Student Board</p>
                                <p style={{ fontSize: '14px', textAlign: 'left' }}>{student_board || 'N/A'}</p>
                            </div>

                            <div>
                                <p className='sd-p'>Inquiry Ratings</p>
                                <p style={{ fontSize: '14px', textAlign: 'left' }}>
                                    {student_inquiry_ratings && Object.keys(student_inquiry_ratings).length > 0
                                        ? JSON.stringify(student_inquiry_ratings)
                                        : 'N/A'}
                                </p>
                            </div>



                        <div>
                            <p className='sd-p'>Correspondence Address</p>
                            <p className='alg-l'>{formattedAddress}</p>
                        </div>
                            </div>

                            {/* <div>
                                <img src={profile_picture ? imageUrl : std} style={{ width: '80px', height: '100px', borderRadius: '8px' }} alt="Student" />
                            </div> */}
                        </div>

                        {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <p className='sd-p'>Qualification</p>
                                <p className='alg-l'>{qualification || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='sd-p'>Cast Category</p>
                                <p className='alg-l'>{category?.name || 'N/A'}</p>
                            </div>
                        </div> */}
 


                        <div>
                            <h4 className='fm-pr-hd mt-5'  >GUARDIAN'S DETAILS</h4>
                            <div>
                                <p className='sd-p'>Father's Name</p>
                                <p className='alg-l'>{father_name || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='sd-p'>Mother's Name</p>
                                <p className='alg-l'>{mother_name || 'N/A'}</p>
                            </div>

                            {/* <div>
                                {
                                    guardianContact && (
                                        <div>
                                            <p className='sd-p'>Guardian Contact Number</p>
                                            <p className='alg-l'>+{guardianContact.country_code || ''} {guardianContact.number}</p>
                                        </div>
                                    )
                                }
                            </div> */}

                            {/* <div>
                          
                                <p className='sd-p'>Course</p>
                                <p className='alg-l'>{selectedOrgDetails?.provisional_academic_group?.specialization?.course_specialization || 'N/A'}</p>

                            </div> */}
                            {/* <div>
                                <p className='sd-p'>Course</p>
                                <p className='alg-l'>
                                    {
                                        selectedOrgDetails?.interested_courses?.length > 0
                                            ? selectedOrgDetails.interested_courses.map(c => c.name).join(', ')
                                            : 'N/A'
                                    }
                                </p>
                            </div> */}

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
