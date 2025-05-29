import React from 'react';
import Select from 'react-select';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import useAutoFocus from '../../Utils/autoFocus';

export const AddOrganisationModal = ({
    onClose,
    isOpen,
    dnparentdata,
    countrydata,
    handlelocationdata,
    statedata,
    citydata,
    handleChange,
    orgform,
    handleSubmit,
    Updatebtn,
    handleUpdate,
    setparentorgidsub,
    parentorgidsub,
    countryId,
    stateid
}) => {

    const nameInputRef = useAutoFocus(isOpen);

    if (!isOpen) return null;

    console.log("country data in add",countrydata)
    const parentOptions = dnparentdata?.map(val => ({ label: val.name, value: val.id }));
    const countryOptions = countrydata?.map(val => ({ label: val.name, value: val.id }));
    const stateOptions = statedata?.map(val => ({ label: val.name, value: val.id }));
    const cityOptions = citydata?.map(val => ({ label: val.name, value: val.id }));

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ position: 'relative', height: '65vh', overflowY: 'auto', padding: '30px' }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className='text-primary'>Add Institution</h2>
                    <button className="close-btn" onClick={onClose}><img src={close} alt="close" /></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-4">
                            <label className='form-labell'>Institution Name<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' ref={nameInputRef} placeholder="Enter Institution Name" value={orgform.orgname} onChange={handleChange} name='orgname' />
                        </div>
                        <div className="col-md-4">
                            <label className='form-labell'>Parent Institution</label>
                            <Select
                                className="react-select-container"
                                classNamePrefix="react-select"
                                name='parentorgidog'
                                options={parentOptions}
                                value={parentOptions?.find(opt => opt.value === parentorgidsub)}
                                onChange={(selected) => setparentorgidsub(selected?.value || '')}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className='form-labell'>GSTIN<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter GSTIN" value={orgform.gstin} onChange={handleChange} name='gstin' />
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-4">
                            <label className='form-labell'>Email<span className='astrisk'>*</span></label>
                            <input type="email" className='fm-modal form-control' placeholder="Enter Email" value={orgform.email} onChange={handleChange} name='email' />
                        </div>
                        <div className="col-md-4">
                            <label className='form-labell'>Landline Number<span className='astrisk'>*</span></label>
                            <div className="mb-3 d-flex" style={{ border: "1px solid #ccc", borderRadius: "6px" }}>
                                <select className="form-select code-select" style={{ backgroundColor: '#F9F9F9', border: 'none', width: '80px' }}>
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                </select>
                                <input type="text" className="form-control code-select" placeholder="Enter Landline" maxLength="10" value={orgform.landlineno} onChange={handleChange} name='landlineno' />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label className='form-labell'>Mobile Number<span className='astrisk'>*</span></label>
                            <div className="mb-3 d-flex" style={{ border: "1px solid #ccc", borderRadius: "6px" }}>
                                <select className="form-select code-select" style={{ backgroundColor: '#F9F9F9', border: 'none', width: '80px' }}>
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                </select>
                                <input type="text" className="form-control code-select" placeholder="Enter Mobile" maxLength="10" value={orgform.mobileno} onChange={handleChange} name='mobileno' />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-4">
                            <label className='form-labell'>Country</label>
                            <Select
                                className="react-select-container"
                                classNamePrefix="react-select"
                                name='country'
                                options={countryOptions}
                                value={countryOptions?.find(opt => opt.value === countryId)}
                                onChange={(selected) => handlelocationdata({ target: { name: 'country', value: selected?.value } })}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className='form-labell'>State</label>
                            <Select
                                className="react-select-container"
                                classNamePrefix="react-select"
                                name='state'
                                options={stateOptions}
                                value={stateOptions?.find(opt => opt.value === stateid)}
                                onChange={(selected) => handlelocationdata({ target: { name: 'state', value: selected?.value } })}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className='form-labell'>City</label>
                            <Select
                                className="react-select-container"
                                classNamePrefix="react-select"
                                name='city'
                                options={cityOptions}
                                onChange={(selected) => handlelocationdata({ target: { name: 'city', value: selected?.value } })}
                            />
                        </div>

                        <div className="col-md-8 mt-2">
                            <label className='form-labell'>Address<span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Address" value={orgform.address} onChange={handleChange} name='address' />
                        </div>

                        <div className="col-md-4 mt-2">
                            <label className='form-labell'>Pin Code</label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Pin Code" value={orgform.pincode} onChange={handleChange} name='pincode' />
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-end">
                            {Updatebtn === false ? (
                                <button className="add-btn" onClick={handleSubmit} style={{ minWidth: "150px", width: "100%", maxWidth: "180px", display: 'flex', justifyContent: 'center' }}>
                                    Add Institution
                                    <img src={next} className="ms-2" alt="next" />
                                </button>
                            ) : (
                                <button className="add-btn" onClick={handleUpdate} style={{ minWidth: "150px", width: "100%", maxWidth: "180px", display: 'flex', justifyContent: 'center' }}>
                                    Update Institution
                                    <img src={next} className="ms-2" alt="next" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
