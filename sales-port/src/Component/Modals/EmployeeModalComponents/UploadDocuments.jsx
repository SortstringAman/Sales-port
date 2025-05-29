import { useState } from 'react';
import close from '../../../assets/icons/close.svg';
import search from '../../../assets/icons/iconamoon_search-light.svg';
import imagePlaceholder from '../../../assets/Images/image 17.png';
import add from '../../../assets/icons/add.svg';
import deletered from '../../../assets/icons/deletered.svg';
import previous from '../../../assets/icons/previous.svg';
import next from '../../../assets/icons/icon.svg';
import savedraft from '../../../assets/icons/savedraft.svg';
import Webcam from "react-webcam";

export const UploadDocuments = ({ onClose, currentStep, setCurrentStep, handlePrev, handleNext, steps, academicDocs, setAcademicDocs, otherDocs, setOtherDocs, setgetuploaddocmaster, uploaddoc, capture, showCamera, setShowCamera, capturedPhoto, setCapturedPhoto, webcamRef, handleOtherDocChange, handleAcademicChange, handleAcademicFileRemove, handleAcademicFileChange, handleRemoveOtherFile, handleOtherFileChange, setEmployeeImageFile, employeeImageFile, handleEmployeeImageChange,handleSubmituploaddocument,submitEmployeeImage,emoployeeId,funcsuc }) => {
    const [highSchoolFile, setHighSchoolFile] = useState('No File Selected!');
    const [intermediateFile, setIntermediateFile] = useState('No File Selected!');
    const [graduationFile, setGraduationFile] = useState('No File Selected!');
    // const [contactDetails, setContactDetails] = useState([
    //     { mobileNumber: '', personType: 'Personal', availableOnWhatsapp: false }
    // ]);


    const addAcademicRow = () => {
        setAcademicDocs([
            ...academicDocs,
            { id: Date.now(), qualification: '', board: '', specialization: '', percentage: '', file: null }
        ]);
    };

    const addOtherDocRow = () => {
        setOtherDocs([
            ...otherDocs,
            { id: Date.now(), documentType: '', documentNumber: '', expiryDate: '', file: null }
        ]);
    };

    const removeAcademicRow = (index) => {
        if (index !== 0) {
            const updated = academicDocs.filter((_, i) => i !== index);
            setAcademicDocs(updated);
        }
    };

    const removeOtherDocRow = (index) => {
        if (index !== 0) {
            const updated = otherDocs.filter((_, i) => i !== index);
            setOtherDocs(updated);
        }
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        console.log(file);
        if (fileType === 'highSchool') {
            setHighSchoolFile(file ? file.name : 'No File Selected!');
        } else if (fileType === 'intermediate') {
            setIntermediateFile(file ? file.name : 'No File Selected!');
        } else if (fileType === 'graduation') {
            setGraduationFile(file ? file.name : 'No File Selected!');
        }
    };
    const handleFileChangemult = (e, id) => {
        const file = e.target.files[0];
        const updatedDocuments = otherDocs?.map((doc) =>
            doc.id === id ? {

                fileName: file ? file.name : 'No File Selected',
            } : doc
        );
        setOtherDocs(updatedDocuments);
    };
    const handleFileRemove = (fileType) => {
        if (fileType === 'highSchool') {
            setHighSchoolFile(null);
        } else if (fileType === 'intermediate') {
            setIntermediateFile(null);
        } else if (fileType === 'graduation') {
            setGraduationFile(null);
        }
    };
    const handleRemoveFilemult = (id) => {
        const updatedDocuments = otherDocs?.map((doc) =>
            doc.id === id ? { ...doc, file: null, fileName: 'No File Selected', fileSize: 0 } : doc
        );
        setOtherDocs(updatedDocuments);
    };
    const videoConstraints = {
        width: 300,
        height: 300,
        facingMode: "environment" // use "user" for front camera
    };

    return (
        <>
            <div className="col-md-10" style={{ height: "77vh", overflowY: 'scroll' }}>
                <div style={{ position: 'sticky', top: 0, background: "#fff", paddingBottom: "25px" }}>
                    <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 className='text-primary'>Upload Documents</h2>
                        <button className="close-btn pt-0" onClick={onClose}><img src={close} style={{ padding: "4px", background: '#F2F3F4', borderRadius: '50%' }}></img></button>
                    </div>
                </div>
                <div>
                    <h4 className='fm-pr-hd'>ACADEMIC QUALIFICATIONS</h4>
                </div>


                {academicDocs && academicDocs?.map((val, index) => {
                    return (
                        <>
                            <div className="row align-items-end">
                                <div className="col-md-3">
                                    <label className='form-labell'>Qualification<span className='astrisk'>*</span></label>
                                    <select className='fm-modal form-control form-select'
                                        name="qualification"
                                        value={val.qualification}
                                        onChange={(e) => handleAcademicChange(e, val.id)}
                                    >
                                        <option value="0">Select Qualification</option>
                                        {uploaddoc && uploaddoc.qualification_type?.map((val, ind) => {
                                            return (
                                                <option value={val}>{val}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className='form-labell'>Board/University
                                    <span className='astrisk'>*</span>
                                    </label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Board/University "
                                        value={val.board}
                                        onChange={(e) => handleAcademicChange(e, val.id)} name="board" />
                                </div>
                                <div className="col-md-3">
                                    <label className='form-labell'>Specialization
                                    <span className='astrisk'>*</span>
                                    </label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Specialization "
                                        name="specialization"
                                        value={val.specialization}
                                        onChange={(e) => handleAcademicChange(e, val.id)} />
                                </div>
                                <div className="col-md-3">
                                    <label className='form-labell'>Percentage</label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Percentage "
                                        name="percentage"
                                        value={val.percentage}
                                        onChange={(e) => handleAcademicChange(e, val.id)} />
                                </div>

                            </div>
                            <div className="row">
                                <label className='form-labell'>Upload Document <span className='astrisk'>*</span> </label>
                                <div className="file-upload-container">
                                    <div className="upload-btn-container">
                                        <input
                                            type="file"
                                            id={`upload-${val.id}`}
                                            className="file-upload-input"
                                            onChange={(e) => handleAcademicFileChange(e, val.id)}
                                        />
                                        <label htmlFor={`upload-${val.id}`} className="upload-btn">
                                            <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_747_3180)">
                                                    <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                                    <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_747_3180">
                                                        <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            Upload File
                                        </label>
                                    </div>
                                    {val.file && (
                                        <div className="ms-3">
                                            <div className="me-3">{val.file.name}
                                                <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleAcademicFileRemove(val.id)}>
                                                    &times;
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-3 input-group2 mt-2" >
                                {index !== 0 && (
                                    <p className='Removebtn' onClick={() => removeAcademicRow(index)}><img src={deletered}></img>Remove</p>
                                )}
                            </div>
                        </>
                    )
                })}
                <div onClick={addAcademicRow} style={{ cursor: 'pointer' }}>
                    <h4 className='fm-pr-hd'>  <svg width="10" height="10" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="#7F56DA" />
                    </svg> Add More</h4>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className='linehr'></div>
                    </div>
                </div>
                <div>
                    <h4 className='fm-pr-hd'>OTHER DOCUMENTS</h4>
                </div>
                {otherDocs && otherDocs?.map((val, index) => {
                    return (
                        <div className="row align-items-end">
                            <div className="col-md-3">
                                <label className='form-labell'>Selected Document Type<span className='astrisk'>*</span></label>
                                <select className='fm-modal form-control form-select'
                                    name="documentType"
                                    value={val.documentType}
                                    onChange={(e) => handleOtherDocChange(e, val.id)}>
                                    <option value="0">Select Documents</option>
                                    {uploaddoc && uploaddoc.employee_documents?.map((val, ind) => {
                                        return (
                                            <option value={val}>{val}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>Document Number<span className='astrisk'>*</span></label>
                                <input type="text" className='fm-modal form-control' placeholder="Enter Document Number"
                                    name="documentNumber"
                                    value={val.documentNumber}
                                    onChange={(e) => handleOtherDocChange(e, val.id)} />
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>Expiry Date<span className='astrisk'>*</span></label>
                                <input type="date" className='fm-modal form-control' placeholder="Enter Document Number"
                                    name="expiryDate"
                                    value={val.expiryDate}
                                    onChange={(e) => handleOtherDocChange(e, val.id)} />
                            </div>
                            <div className='col-md-6 mt-2'>
                                <div className="file-upload-container">
                                    <div className="upload-btn-container">
                                        <input
                                            type="file"
                                            id={`other-upload-${val.id}`}
                                            className="file-upload-input"
                                            onChange={(e) => handleOtherFileChange(e, val.id)}
                                        />
                                        <label htmlFor={`other-upload-${val.id}`} className="upload-btn">
                                            <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_747_3180)">
                                                    <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                                    <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_747_3180">
                                                        <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            Upload File
                                        </label>
                                    </div>
                                    {val.file && (
                                        <div className="ms-3">
                                            <div className="me-3">
                                                {val.file.name}
                                                <span
                                                    className="remove-tag"
                                                    style={{ color: 'red', cursor: 'pointer' }}
                                                    onClick={() => handleRemoveOtherFile(val.id)}
                                                >
                                                    &times;
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-3 input-group2" >
                                {index !== 0 && (
                                    <p className='Removebtn' onClick={() => removeOtherDocRow(index)}><img src={deletered}></img>Remove</p>
                                )}
                            </div>
                        </div>
                    )
                })}


                <div onClick={addOtherDocRow} style={{ cursor: 'pointer' }}>
                    <h4 className='fm-pr-hd'>  <svg width="10" height="10" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="#7F56DA" />
                    </svg> Add More</h4>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className='linehr'></div>
                    </div>
                </div>
                <div>
                    <h4 className='fm-pr-hd'>ADD EMPLOYEE PICTURE</h4>
                </div>

                <div className="row">
                    <div className="col-md-12" style={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                        <img src={capturedPhoto || imagePlaceholder} style={{ width: '100px', height: '100px' }}></img>
                        <div>
                            <button className='add-btn' onClick={() => setShowCamera(true)}><span style={{ marginRight: "5px" }}>
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.39841 1.85273C5.61686 0.780916 6.57086 0.0224609 7.66314 0.0224609H10.337C11.4292 0.0224609 12.3824 0.780916 12.6017 1.85273C12.6259 1.97076 12.689 2.07722 12.781 2.15498C12.8731 2.23275 12.9886 2.2773 13.109 2.28146H13.136C14.2839 2.33219 15.1659 2.47292 15.9022 2.95646C16.3661 3.26082 16.7654 3.65192 17.0763 4.10928C17.4633 4.6771 17.6335 5.33001 17.7153 6.11873C17.7955 6.89028 17.7955 7.85655 17.7955 9.08055V9.1501C17.7955 10.3741 17.7955 11.3412 17.7153 12.1119C17.6335 12.9006 17.4633 13.5536 17.0763 14.1222C16.7637 14.5792 16.3649 14.9708 15.9022 15.275C15.327 15.6522 14.6668 15.8191 13.8666 15.8985C13.0828 15.977 12.1001 15.977 10.8516 15.977H7.1485C5.89995 15.977 4.91732 15.977 4.1335 15.8985C3.33332 15.8191 2.67304 15.653 2.09786 15.275C1.63513 14.9706 1.23631 14.5787 0.923772 14.1214C0.536772 13.5536 0.36659 12.9006 0.284772 12.1119C0.20459 11.3412 0.20459 10.3741 0.20459 9.1501V9.08055C0.20459 7.85655 0.20459 6.89028 0.284772 6.11873C0.36659 5.33001 0.536772 4.6771 0.923772 4.10928C1.23631 3.65197 1.63513 3.26009 2.09786 2.95564C2.83423 2.47292 3.71623 2.33219 4.86414 2.28228L4.87804 2.28146H4.89114C5.01154 2.2773 5.12704 2.23275 5.21905 2.15498C5.31106 2.07722 5.37424 1.97076 5.39841 1.85273ZM7.66314 1.24973C7.1395 1.24973 6.70014 1.61219 6.60114 2.09737C6.44159 2.88282 5.7445 3.50137 4.90586 3.50873C3.80295 3.55782 3.21223 3.69282 2.77041 3.98246C2.44268 4.1984 2.16007 4.47601 1.93832 4.79982C1.7125 5.13119 1.57668 5.55582 1.50468 6.24555C1.43268 6.94592 1.43186 7.84919 1.43186 9.11573C1.43186 10.3823 1.43186 11.2847 1.5055 11.9851C1.57668 12.6748 1.7125 13.0995 1.93914 13.4316C2.15841 13.754 2.44068 14.0322 2.77123 14.249C3.11241 14.4724 3.54932 14.6074 4.25541 14.6777C4.9705 14.7489 5.89177 14.7497 7.18204 14.7497H10.818C12.1075 14.7497 13.0288 14.7497 13.7447 14.6777C14.4508 14.6074 14.8877 14.4732 15.2289 14.249C15.5594 14.0322 15.8425 13.754 16.0618 13.4308C16.2876 13.0995 16.4234 12.6748 16.4954 11.9851C16.5674 11.2847 16.5682 10.3815 16.5682 9.11573C16.5682 7.85001 16.5682 6.94592 16.4946 6.24555C16.4234 5.55582 16.2876 5.13119 16.061 4.79982C15.8393 4.47571 15.5567 4.19782 15.2289 3.98164C14.7887 3.69283 14.198 3.55782 13.0934 3.50873C12.2556 3.50055 11.5585 2.88364 11.399 2.09737C11.3466 1.85541 11.2123 1.63894 11.0188 1.4845C10.8254 1.33007 10.5845 1.24715 10.337 1.24973H7.66314ZM9.00004 6.97701C8.51181 6.97701 8.04356 7.17096 7.69833 7.5162C7.35309 7.86143 7.15914 8.32968 7.15914 8.81792C7.15914 9.30616 7.35309 9.7744 7.69833 10.1196C8.04356 10.4649 8.51181 10.6588 9.00004 10.6588C9.48828 10.6588 9.95653 10.4649 10.3018 10.1196C10.647 9.7744 10.841 9.30616 10.841 8.81792C10.841 8.32968 10.647 7.86143 10.3018 7.5162C9.95653 7.17096 9.48828 6.97701 9.00004 6.97701ZM5.93186 8.81792C5.93186 8.00418 6.25512 7.22378 6.83051 6.64838C7.40591 6.07299 8.18631 5.74973 9.00004 5.74973C9.81378 5.74973 10.5942 6.07299 11.1696 6.64838C11.745 7.22378 12.0682 8.00418 12.0682 8.81792C12.0682 9.63165 11.745 10.4121 11.1696 10.9874C10.5942 11.5628 9.81378 11.8861 9.00004 11.8861C8.18631 11.8861 7.40591 11.5628 6.83051 10.9874C6.25512 10.4121 5.93186 9.63165 5.93186 8.81792ZM13.2955 6.36337C13.2955 6.20062 13.3602 6.04454 13.4752 5.92946C13.5903 5.81438 13.7464 5.74973 13.9091 5.74973H14.7273C14.8901 5.74973 15.0461 5.81438 15.1612 5.92946C15.2763 6.04454 15.341 6.20062 15.341 6.36337C15.341 6.52612 15.2763 6.6822 15.1612 6.79728C15.0461 6.91236 14.8901 6.97701 14.7273 6.97701H13.9091C13.7464 6.97701 13.5903 6.91236 13.4752 6.79728C13.3602 6.6822 13.2955 6.52612 13.2955 6.36337Z" fill="white" />
                                </svg>

                            </span>Capture Image</button>

                        </div>
                        <div className="file-upload-container">
                            <div className="upload-btn-container">
                                <label htmlFor="file-upload" className="upload-btn">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="file-upload-input"
                                        accept="image/*"
                                        onChange={handleEmployeeImageChange}
                                    />
                                    <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_747_3180)">
                                            <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                            <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_747_3180">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    Upload File
                                </label>
                            </div>
                            <div className="ms-3" >
                                {employeeImageFile ? employeeImageFile.name : 'No file Uploaded'}
                            </div>
                        </div>
                    </div>

                </div>



            </div >
            <div className="form-actions" style={{ position: 'sticky', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: "flex", gap: '20px' }}>
                    <button type="button" onClick={() => { handlePrev() }} style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
                        disabled={currentStep === 0}><img src={previous}></img>Previous</button>
                    <p style={{ cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: 'red', margin: 0 }}><img src={savedraft}></img>Save to Draft</p>
                </div>
                <div>
                    <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={async()=>{
                        let fn= await handleSubmituploaddocument();
                        if(fn ){
                            handleNext();
                        }
                        // handleNext();
                    }}
                        disabled={currentStep === steps.length - 1}>Next<img src={next}></img></button>
                </div>
            </div>
            {showCamera && (
                <div className="camera-modal">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                    <button onClick={capture}>Take Photo</button>
                    <button onClick={() => setShowCamera(false)}>Cancel</button>
                </div>
            )}
        </>
    )
}
