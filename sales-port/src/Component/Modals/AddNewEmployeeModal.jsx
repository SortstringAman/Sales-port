import React, { useEffect, useState } from 'react';
import '../../assets/css/Modal.css'; // Make sure to import the CSS
import close from '../../assets/icons/close.svg';
import search from '../../assets/icons/iconamoon_search-light.svg';
import imagePlaceholder from '../../assets/Images/image 17.png';
import add from '../../assets/icons/add.svg';
import deletered from '../../assets/icons/deletered.svg';
import previous from '../../assets/icons/previous.svg';
import next from '../../assets/icons/icon.svg';
import savedraft from '../../assets/icons/savedraft.svg'
import { BasicDetails } from './EmployeeModalComponents/BasicDetails.jsx';
import {   OfficialDetails } from './EmployeeModalComponents/OfficialDetails.jsx';
import { ModalSteps } from './EmployeeModalComponents/ModalSteps.jsx';
import { UploadDocuments } from './EmployeeModalComponents/UploadDocuments.jsx';
import { AttendanceSettings } from './EmployeeModalComponents/AttendanceSettings.jsx';
import { SuccessfulPopup } from './SuccessfulPopup.jsx';

const AddNewEmployeeModal = ({ isOpen, onClose, setsubmit, orgform, setorgform, getbasicmaster, contactDetails, setContactDetails,
  handleContactChange, handleChange, handlePrimarySelect, handleSubmitbasic, countryId, stateid, countrydata, handlelocationdata, statedata, citydata, handleSameAsCorrespondence, handleCorrespondenceChange, handlePermanentChange, correspondenceAddress, setCorrespondenceAddress, permanentAddress, setPermanentAddress, sameAsCorrespondence, setSameAsCorrespondence, academicDocs, setAcademicDocs, otherDocs, setOtherDocs,
  setgetuploaddocmaster,uploaddoc,capture,showCamera,setShowCamera,capturedPhoto,setCapturedPhoto,webcamRef,
  handleOtherDocChange,handleAcademicChange,handleAcademicFileRemove
  ,handleAcademicFileChange,handleRemoveOtherFile,handleOtherFileChange,setEmployeeImageFile,employeeImageFile,handleEmployeeImageChange,handleSubmituploaddocument,submitEmployeeImage,
  handleOfficialChange,handleBankChange,bankDetails,setBankDetails,officialDetails,setOfficialDetails,
  getofficialdetailmaster,dnparentdata,setdnparentdata,departmentfromorg,desigfromorg,handleSubmitOfficialDetails,  selectedUserId
  ,isEditMode,currentStep,setCurrentStep,biometricImages,setBiometricImages,geoLocation
  ,setGeoLocation,searchLocation,setSearchLocation,
  periphery,setPeriphery,
  selectedPlace,setSelectedPlace,attendanceType,setAttendanceType,handleUpdateBasicDetails,emoployeeId,setfuncsuc,funcsuc
}) => {
  
  const steps = [
    'Basic Details',
    'Documents',
    'Official Info',
    'Attend. Setting'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      // setfuncsuc(false)
    }
  };

  // Function to go to the previous step
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // setfuncsuc(false)
    }
  };
// useEffect(()=>{
//   setfuncsuc(false)
// },[currentStep])
  if (!isOpen) return null;


  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ position: 'relative',height:'95vh',paddingTop:'20px' }}>
        <div className="row">
          <div className="col-md-2">
            <ModalSteps steps={steps} currentStep={currentStep} />
          </div>
          {currentStep === 0 ? <BasicDetails onClose={onClose} currentStep={currentStep} setCurrentStep={setCurrentStep} handlePrev={handlePrev} handleNext={handleNext} steps={steps}
            orgform={orgform} setorgform={setorgform} getbasicmaster={getbasicmaster} contactDetails={contactDetails} setContactDetails={setContactDetails} handleContactChange={handleContactChange} handleChange={handleChange} handlePrimarySelect={handlePrimarySelect}
            handleSubmitbasic={handleSubmitbasic} countryId={countryId} stateid={stateid} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata}
            handleSameAsCorrespondence={handleSameAsCorrespondence} handleCorrespondenceChange={handleCorrespondenceChange} handlePermanentChange={handlePermanentChange} correspondenceAddress={correspondenceAddress} setCorrespondenceAddress={setCorrespondenceAddress} permanentAddress={permanentAddress} setPermanentAddress={setPermanentAddress} sameAsCorrespondence={sameAsCorrespondence} setSameAsCorrespondence={setSameAsCorrespondence} isEditMode={isEditMode} handleUpdateBasicDetails={handleUpdateBasicDetails} emoployeeId={emoployeeId} funcsuc={funcsuc}
          /> : currentStep === 1 ? <UploadDocuments onClose={onClose} currentStep={currentStep} setCurrentStep={setCurrentStep} handlePrev={handlePrev} handleNext={handleNext} steps={steps}
            academicDocs={academicDocs}
            setAcademicDocs={setAcademicDocs} otherDocs={otherDocs}
            setOtherDocs={setOtherDocs} setgetuploaddocmaster={setgetuploaddocmaster} uploaddoc={uploaddoc}
            capture={capture} showCamera={showCamera} setShowCamera={setShowCamera} capturedPhoto={capturedPhoto} setCapturedPhoto={setCapturedPhoto} webcamRef={webcamRef}          handleOtherDocChange={handleOtherDocChange} handleAcademicChange={handleAcademicChange}
            handleAcademicFileRemove={handleAcademicFileRemove}
            handleAcademicFileChange={handleAcademicFileChange} handleRemoveOtherFile={handleRemoveOtherFile} handleOtherFileChange={handleOtherFileChange} employeeImageFile={employeeImageFile} 
            setEmployeeImageFile={setEmployeeImageFile} handleEmployeeImageChange={handleEmployeeImageChange}
            handleSubmituploaddocument={handleSubmituploaddocument} submitEmployeeImage={submitEmployeeImage} isEditMode={isEditMode} emoployeeId={emoployeeId} funcsuc={funcsuc}/> : currentStep === 2 ? <OfficialDetails
              onClose={onClose} currentStep={currentStep} setCurrentStep={setCurrentStep} handlePrev={handlePrev} handleNext={handleNext} steps={steps} handleOfficialChange={handleOfficialChange} handleBankChange={handleBankChange} bankDetails={bankDetails} setBankDetails={setBankDetails} officialDetails={officialDetails} setOfficialDetails={setOfficialDetails} getofficialdetailmaster={getofficialdetailmaster} dnparentdata={dnparentdata} setdnparentdata={setdnparentdata} departmentfromorg={departmentfromorg} desigfromorg={desigfromorg} handleSubmitOfficialDetails={handleSubmitOfficialDetails}
              isEditMode={isEditMode} emoployeeId={emoployeeId} funcsuc={funcsuc}/> :
            currentStep === 3 ? <AttendanceSettings onClose={onClose} currentStep={currentStep} setCurrentStep={setCurrentStep} handlePrev={handlePrev} handleNext={handleNext} steps={steps} setsubmit={setsubmit}   selectedUserId={selectedUserId}
            isEditMode={isEditMode} biometricImages={biometricImages} setBiometricImages={setBiometricImages} geoLocation={geoLocation}
            setGeoLocation={setGeoLocation} searchLocation={searchLocation} setSearchLocation={setSearchLocation}
            periphery={periphery} setPeriphery={setPeriphery}
            selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} attendanceType={attendanceType}
            setAttendanceType={setAttendanceType} emoployeeId={emoployeeId} funcsuc={funcsuc}/> : ''}
        </div>
      </div>
    </div>
  );
};

export default AddNewEmployeeModal;
