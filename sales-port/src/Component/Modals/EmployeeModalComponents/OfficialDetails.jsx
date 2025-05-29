import { useEffect, useState } from 'react'
import close from '../../../assets/icons/close.svg';
import search from '../../../assets/icons/iconamoon_search-light.svg';
import imagePlaceholder from '../../../assets/Images/image 17.png';
import add from '../../../assets/icons/add.svg';
import deletered from '../../../assets/icons/deletered.svg';
import previous from '../../../assets/icons/previous.svg';
import next from '../../../assets/icons/icon.svg';
import savedraft from '../../../assets/icons/savedraft.svg';
import Select from 'react-select';
import { components } from 'react-select';
import { getData } from '../../../API/GlobalApi';

export const OfficialDetails = ({
  onClose,
  currentStep,
  setCurrentStep,
  handlePrev,
  handleNext,
  steps,
  handleOfficialChange,
  handleBankChange,
  bankDetails,
  setBankDetails,
  officialDetails,
  setOfficialDetails,
  getofficialdetailmaster,
  dnparentdata,
  setdnparentdata,
  departmentfromorg,
  desigfromorg,handleSubmitOfficialDetails,
  emoployeeId
}) => {
  const handleSubjectChange = (index, value) => {
    const updated = [...officialDetails.subjects];
    updated[index] = value;
    setOfficialDetails({ ...officialDetails, subjects: updated });
  };

  const removeSubject = (index) => {
    const updated = officialDetails.subjects.filter((_, i) => i !== index);
    setOfficialDetails({ ...officialDetails, subjects: updated });
  };

  const addSubject = () => {
    setOfficialDetails({
      ...officialDetails,
      subjects: [...(officialDetails.subjects || []), '']
    });
  };

  return (
    <>
      <div className="col-md-10" style={{ height: "77vh", overflowY: 'scroll' }}>
        <div style={{ position: 'sticky', top: 0, background: "#fff",paddingBottom:"25px" }}>
          <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 className='text-primary'>Official Details</h2>
            <button className="close-btn pt-0" onClick={onClose}><img src={close}style={{padding:"4px",background:'#F2F3F4',borderRadius:'50%'}}></img></button>
          </div>
        </div>

        <div className="row" >
          <div className="col-md-3">
            <label className='form-labell'>Organisation<span className='astrisk'>*</span></label>
            <select className='fm-modal form-control form-select' name="organization" value={officialDetails.organization} onChange={handleOfficialChange}>
              <option value=''>Select Organisation</option>
              {dnparentdata && dnparentdata?.map((val, ind) => (
                <option key={ind} value={val.organization_id}>{val.organization_name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className='form-labell'>Department<span className='astrisk'>*</span></label>
            <select className='fm-modal form-control form-select' name="department" value={officialDetails.department} onChange={handleOfficialChange}>
              <option value=''>Select Department</option>
              {departmentfromorg && departmentfromorg?.map((val, ind) => (
                <option key={ind} value={val.id}>{val.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className='form-labell'>Designation<span className='astrisk'>*</span></label>
            <select className='fm-modal form-control form-select' name="designation" value={officialDetails.designation} onChange={handleOfficialChange}>
              <option value=''>Select Designation</option>
              {desigfromorg && desigfromorg?.map((val, ind) => (
                <option key={ind} value={val.id}>{val.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className='form-labell'>Report To</label>
            <select className='fm-modal form-control form-select' name="reportTo" value={officialDetails.reportTo} onChange={handleOfficialChange}>
              <option value=''>Select Report To</option>
              {dnparentdata && dnparentdata?.map((val, ind) => (
                <option key={ind} value={val.id}>{val.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row" >
          <div className="col-md-3">
            <label className='form-labell'>Employee Type</label>
            <select className='fm-modal form-control form-select' name="employmentType" value={officialDetails.employmentType} onChange={handleOfficialChange}>
              <option value="">Select</option>
              {getofficialdetailmaster && getofficialdetailmaster.employment_type?.map((val, ind) => (
                <option key={ind} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className='form-labell'>Job Type</label>
            <input type="text" className='fm-modal form-control' name="jobType" value={officialDetails.jobType} onChange={handleOfficialChange} placeholder="Enter Job Type" />
          </div>
          <div className="col-md-3">
            <label className='form-labell'>Working Shift</label>
            <select className='fm-modal form-control form-select' name="workingShift" value={officialDetails.workingShift} onChange={handleOfficialChange}>
              <option value="">Select</option>
              {getofficialdetailmaster && getofficialdetailmaster.working_shift?.map((val, ind) => (
                <option key={ind} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className='form-labell'>Date of Joining</label>
            <input type="date" className='fm-modal form-control' name="dateOfJoining" value={officialDetails.dateOfJoining} onChange={handleOfficialChange} />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <label className='form-labell'>Subjects</label>
            {officialDetails.subjects?.map((subject, idx) => (
              <div key={idx} className="d-flex mb-2 gap-2 align-items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Subject"
                  value={subject}
                  onChange={(e) => handleSubjectChange(idx, e.target.value)}
                />
                {idx > 0 && (
                  <p
                    type="button"
                    onClick={() => removeSubject(idx)}
                  ><img src={deletered}></img></p>
                )}
              </div>
            ))}
            <h4
              type="button"
              className="fm-pr-hd"
              onClick={addSubject}
            >
              + Add More
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className='linehr'></div>
          </div>
        </div>

        <div className="row">
          <div>
            <h4 className='fm-pr-hd'>BANK DETAILS</h4>
          </div>
          <div className="col-md-3">
            <label className='form-labell'>Account Holder Name<span className='astrisk'>*</span></label>
            <input type="text" className='fm-modal form-control' name="accountHolderName" value={bankDetails.accountHolderName} onChange={handleBankChange} placeholder="Enter Account Holder Name" />
          </div>
          <div className="col-md-3">
            <label className='form-labell'>Bank Name<span className='astrisk'>*</span></label>
            <input type="text" className='fm-modal form-control' name="bankName" value={bankDetails.bankName} onChange={handleBankChange} placeholder="Enter Bank Name" />
          </div>
          <div className="col-md-3">
            <label className='form-labell'>Bank Account Number<span className='astrisk'>*</span></label>
            <input type="text" className='fm-modal form-control' name="accountNumber" value={bankDetails.accountNumber} onChange={handleBankChange} placeholder="Enter Account Number" />
          </div>
        </div>
      </div>

      <div className="form-actions" style={{ position: 'sticky', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: "flex", gap: '20px' }}>
          <button type="button" onClick={handlePrev} style={{ display: 'flex', alignItems: 'center', gap: "10px" }} disabled={currentStep === 0}><img src={previous}></img>Previous</button>
          <p style={{ cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: 'red', margin: 0 }}><img src={savedraft}></img>Save to Draft</p>
        </div>
        <div>
          <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={async()=>{
           let fn = await handleSubmitOfficialDetails();
            if(fn){
              handleNext();
            }
            // handleNext();
          }} 
            disabled={currentStep === steps.length - 1}>Next<img src={next}></img></button>
        </div>
      </div>
    </>
  );
};
