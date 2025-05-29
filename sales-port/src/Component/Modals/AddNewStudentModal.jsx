import React, { useState } from 'react';
import '../../assets/css/Modal.css'; // Make sure to import the CSS
import close from '../../assets/icons/close.svg';
import search from '../../assets/icons/iconamoon_search-light.svg';
import imagePlaceholder from '../../assets/Images/image 17.png';
import add from '../../assets/icons/add.svg';
import deletered from '../../assets/icons/deletered.svg';
import previous from '../../assets/icons/previous.svg';
import next from '../../assets/icons/icon.svg';
import savedraft from '../../assets/icons/savedraft.svg'
import { BasicDetails } from './ModalComponents/BasicDetails';
import { AcademicDetails } from './ModalComponents/AcademicDetails';
import { ModalSteps } from './ModalComponents/ModalSteps';
import { UploadDocuments } from './ModalComponents/UploadDocuments';
import { OfficialInformation } from './ModalComponents/OfficialInformation';
import { SuccessfulPopup } from './SuccessfulPopup';

const AddNewStudentModal = ({ isOpen, onClose, setsubmit,basicdata,setbasicdata
  ,academicdata,setacademicdata,docdata,setdocdata,officialdata,setofficialdata,isEditMode,selectedUserId,registrationnumforhead,mainnamehead ,setgeneratedregno,regMode,setCurrentStep,currentStep}) => {
  
  const [studentid,setstudentid]=useState(null)
  const steps = [
    'Basic Details',
    'Academics',
    'Documents',
    'Official Info'
  ];
  const handleNext = async (funcall) => {
    console.log("calll", currentStep)
    if (currentStep < steps.length - 1) {
      if (currentStep === 0) {
        const resp = await funcall();
        if(resp){
          
          setstudentid(resp.user_id);
          setCurrentStep(currentStep + 1);
        }
      }
      if(currentStep===1){
        const resp= await funcall();
        if(resp){
          setCurrentStep(currentStep + 1);
        }
        console.log(resp)
      }
      if(currentStep===2){
        const resp=await funcall();
        if(resp){
          setCurrentStep(currentStep + 1);
        }

      }

    }
  };
  // Function to go to the previous step
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  if (!isOpen) return null;
  
    

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ position: 'relative',height:'95vh',paddingTop:'20px' }}>
        <div className="row">
          <div className="col-md-2">
            <ModalSteps steps={steps} currentStep={currentStep} />
          </div>
          {currentStep === 0 ? <BasicDetails onClose={onClose} currentStep={currentStep} setCurrentStep={setCurrentStep} handlePrev={handlePrev} handleNext={handleNext} steps={steps} basicdata={basicdata} setbasicdata={setbasicdata} isEditMode={isEditMode} selectedUserId={selectedUserId} registrationnumforhead={registrationnumforhead} mainnamehead={mainnamehead}/> : currentStep === 1 ? <AcademicDetails
            onClose={onClose} currentStep={currentStep} setCurrentStep={setCurrentStep} handlePrev={handlePrev} handleNext={handleNext} steps={steps} studentid={studentid} academicdata={academicdata} setacademicdata={setacademicdata} selectedUserId={selectedUserId}
            isEditMode={isEditMode} registrationnumforhead={registrationnumforhead} mainnamehead={mainnamehead}/> : currentStep === 2 ? <UploadDocuments onClose={onClose} currentStep={currentStep} setCurrentStep={setCurrentStep} handlePrev={handlePrev} handleNext={handleNext} steps={steps} 
            studentid={studentid} docdata={docdata} setdocdata={setdocdata} selectedUserId={selectedUserId}isEditMode={isEditMode} registrationnumforhead={registrationnumforhead} mainnamehead={mainnamehead}/> : currentStep === 3 ? <OfficialInformation onClose={onClose} currentStep={currentStep} setCurrentStep={setCurrentStep} handlePrev={handlePrev} handleNext={handleNext} steps={steps} setsubmit={setsubmit} studentid={studentid} officialdata={officialdata} setofficialdata={setofficialdata} selectedUserId={selectedUserId} isEditMode={isEditMode} registrationnumforhead={registrationnumforhead} mainnamehead={mainnamehead}
            setgeneratedregno={setgeneratedregno} regMode={regMode}/> : ''}
        </div>
      </div>
    </div>
  );
};

export default AddNewStudentModal;
