import React from 'react';
// import moment from 'moment';
import '../../assets/css/StudentShortDetails.css';
import studentShortpic from '../../assets/Images/stushortpic.png';
import std from '../../assets/Images/unnaemmeduser.png'
import nexticon from '../../assets/icons/icon.svg';

export const VendorShortDetails = ({ navigate, selectedVendor }) => {
    if (!selectedVendor) return null;
    console.log("selected vendor Detailsshort--", selectedVendor)







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
        <>

            <div>
                <div className="col-md-12">
                    <p style={{
                        background: '#F9F9F9',
                        padding: '16px',
                        borderRadius: '8px',
                        textAlign: 'left',
                        fontWeight: 500,
                        color: "#222F3E"
                    }}>
                        VENDOR'S SHORT DETAILS:
                    </p>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="stu-pro" style={{ marginTop: '6px' }}>
                            <div className='stu-pro-inner'>
                                <div style={{ display: 'flex', gap: "15px", flexDirection: "column", alignItems: 'start', justifyContent: 'space-between' }}>
                                    <div>
                                        <h4 className='fm-pr-hd' style={{
                                            margin: 0, marginBottom: "10px", fontWeight: '600', fontSize: "18px", textTransform: 'uppercase'
                                        }}>{selectedVendor.name}</h4>
                                        <p className='sd-p'>
                                            {selectedVendor.permanent_registration_number || 'N/A'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className='sd-p'>Vendor Type</p>
                                        <p className='alg-l'>{selectedVendor.vendor_type || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                <div>
                                    <p className='sd-p'>Contact Person</p>
                                    <p className='alg-l'>{selectedVendor.contact_person_name || 'N/A'}</p>
                                </div>

                            </div>

                            <div>
                                <p className='sd-p'>Contact Numbers</p>
                                {selectedVendor.contacts?.map((contact, i) => (
                                    <p className='alg-l' key={i}>
                                        {contact.contact_type}: {contact.number}
                                        {/* /{contact.is_available_on_whatsapp ? ' (WhatsApp)' : ''} */}
                                    </p>
                                )) || 'N/A'}
                            </div>

                            <div>
                                <p className='sd-p'>Billing Address</p>
                                <p className='alg-l'>{selectedVendor.billing_address || 'N/A'}</p>
                            </div>

                            <div>
                                <h4 className='fm-pr-hd mt-3' >BANK'S DETAILS</h4>
                                <div>
                                    <p className='sd-p'>Bank Name</p>
                                    <p className='alg-l'>{selectedVendor?.bank_details?.bank_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className='sd-p'>A/C Number</p>
                                    <p className='alg-l'>{selectedVendor?.bank_details?.account_number || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className='sd-p'>IFSC Code</p>
                                    <p className='alg-l'>{selectedVendor?.bank_details?.ifsc_code || 'N/A'}</p>
                                </div>
                                 <div>
                                    <p className='sd-p'>Payment Terms</p>
                                    <p className='alg-l'>{selectedVendor?.bank_details?.ifsc_code || 'N/A'}</p>
                                </div>
                            </div>

                           

                        </div>
                    </div>
                </div>
            </div>


            <div style={{
                marginTop:'10px',
                background: '#F9F9F9',
                padding: '16px',
                borderRadius: '8px',
                textAlign: 'left',
                fontWeight: 500,
                color: "#222F3E"
            }}>
                <h4 className='fm-pr-hd mt-3' >TAX & COMPLIANCE</h4>
                <div>
                    <p className='sd-p'>GST Number</p>
                    <p className='alg-l'>{selectedVendor?.tax_compliance?.gst_number || 'N/A'}</p>
                </div>
                <div>
                    <p className='sd-p'>PAN Number</p>
                    <p className='alg-l'>{selectedVendor?.tax_compliance?.pan_number || 'N/A'}</p>
                </div>
                <div>
                    <p className='sd-p'>MSME Registration Number</p>
                    <p className='alg-l'>{selectedVendor?.tax_compliance?.msme_registration_no || 'N/A'}</p>
                </div>
            </div>

        </>

    );
};
