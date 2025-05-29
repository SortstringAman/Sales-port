import React from 'react';
import '../../assets/css/StudentShortDetails.css';
import defaultPic from '../../assets/Images/unnaemmeduser.png';
import nexticon from '../../assets/icons/icon.svg';

export const UserShortDetails = ({
    navigate,
    selectedOrgDetails,
    getemployeesdataId
}) => {
    const {
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        gender,
        unique_code,
        blood_group,
        latest_photo,
        contact_numbers,
        father_name,
        mother_name,
        addresses,
        organization,
        manager
    } = selectedOrgDetails || {};

    console.log("latest_photo--",latest_photo)
    const imageUrl =`http://bgi.sortstring.com/media/uploads/${latest_photo?.document}`;

    const calculateAge = (dob) => {
        if (!dob) return '-';
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };
    const fullName = `${first_name || ''} ${middle_name || ''} ${last_name || ''}`;
    const ageGender = `${calculateAge(date_of_birth)} Years / ${gender || 'N/A'}`;
    const primaryContact = contact_numbers?.find(c => c.is_primary);

    const permanentAddress = addresses?.find(addr => addr.address_type === 'Permanent');
    const correspondenceAddress = addresses?.find(addr => addr.address_type === 'Correspondence');

    return (
        <div>
            <div className="col-md-12">
                <p style={{ background: '#F9F9F9', padding: '16px', borderRadius: '8px', textAlign: 'left', fontWeight: 500, color: "#222F3E" }}>
                    EMPLOYEE'S SHORT DETAILS:
                </p>
            </div>

            {/* Section 1 */}
            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro">
                        <div className='stu-pro-inner'>
                            <div style={{ display: 'flex', gap: "15px", flexDirection: "column", alignItems: 'start' }}>
                                <div>
                                    <h4 className='fm-pr-hd' style={{ marginBottom: "10px" }}>{fullName.toUpperCase()}</h4>
                                    <p style={{ textAlign: 'left' }}>{ageGender}</p>
                                </div>
                                <div>
                                    <p className='sd-p'>Employee Code</p>
                                    <p style={{ fontSize: '14px', textAlign: 'left' }}>{unique_code}</p>
                                </div>
                            </div>
                            <div>
                                <img  src={imageUrl || defaultPic} style={{ width: '80px', height: '100px', borderRadius: '8px' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <p className='sd-p'>Blood Group</p>
                                <p className='alg-l'>{blood_group || '-'}</p>
                            </div>
                            <div>
                                <p className='sd-p'>Cast Category</p>
                                <p className='alg-l'>-</p> {/* Replace with actual field if available */}
                            </div>
                        </div>

                        {correspondenceAddress && (
                            <div>
                                <p className='sd-p'>Correspondence Address</p>
                                <p className='alg-l'>
                                    {correspondenceAddress.address}, {correspondenceAddress.city}, {correspondenceAddress.state} - {correspondenceAddress.pincode}
                                </p>
                            </div>
                        )}

                        {permanentAddress && (
                            <div>
                                <p className='sd-p'>Permanent Address</p>
                                <p className='alg-l'>
                                    {permanentAddress.address}, {permanentAddress.city}, {permanentAddress.state} - {permanentAddress.pincode}
                                </p>
                            </div>
                        )}

                        <div>
                            <h4 className='fm-pr-hd' style={{ marginTop: "10px", marginBottom: "10px" }}>GUARDIAN'S DETAILS</h4>
                            <p className='sd-p'>Father's Name</p>
                            <p className='alg-l'>{father_name || '-'}</p>
                            <p className='sd-p'>Mother's Name</p>
                            <p className='alg-l'>{mother_name || '-'}</p>
                            <p className='sd-p'>Guardian Contact Number</p>
                            {
                                contact_numbers?.find(c => c.contact_type === 'Guardian')
                                    ? `${contact_numbers.find(c => c.contact_type === 'Guardian').country_code} ${contact_numbers.find(c => c.contact_type === 'Guardian').number}`
                                    : '-'
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2 - Official Info */}
            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro">
                        <h4 className='fm-pr-hd' style={{ marginBottom: "10px" }}>OFFICIAL DETAILS:</h4>
                        <p className='sd-p'>Organisation Name</p>
                        <p className='alg-l'>{organization?.name || 'N/A'}</p>
                        <p className='sd-p'>Report To</p>
                        <p className='alg-l'>{`${manager?.first_name || ''} ${manager?.middle_name || ''} ${manager?.last_name || ''}`.trim() || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Section 3 - Button */}
            <div className='row'>
                <div className="col-md-12">
                    <button className='add-btn' style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}
                        onClick={() => { navigate('/employeedashboard/employeefullprofile/') }}>
                        View Full Profile <img src={nexticon} alt="Next" />
                    </button>
                </div>
            </div>
        </div>
    );
};
