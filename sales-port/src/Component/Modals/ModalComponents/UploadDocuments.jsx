import { useEffect, useState } from 'react';
import close from '../../../assets/icons/close.svg';
import search from '../../../assets/icons/iconamoon_search-light.svg';
import imagePlaceholder from '../../../assets/Images/image 17.png';
import add from '../../../assets/icons/add.svg';
import deletered from '../../../assets/icons/deletered.svg';
import previous from '../../../assets/icons/previous.svg';
import next from '../../../assets/icons/icon.svg';
import savedraft from '../../../assets/icons/savedraft.svg'
import { getData, Postdata, Postdataform } from '../../../API/GlobalApi';
import downicon from '../../../assets/icons/mynaui_download.svg'

export const UploadDocuments = ({ onClose, currentStep, setCurrentStep, handlePrev, handleNext, steps, studentid, docdata, selectedUserId, mainnamehead, registrationnumforhead }) => {
    const [highSchoolFile, setHighSchoolFile] = useState('No File Selected!');
    const [intermediateFile, setIntermediateFile] = useState('No File Selected!');
    const [graduationFile, setGraduationFile] = useState('No File Selected!');
    const [masterdata, setmasterdata] = useState();
    const [academicdata, setacademicdata] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const studentId = studentid || sessionStorage.getItem('studentid');
    // const [contactDetails, setContactDetails] = useState([
    //     { mobileNumber: '', personType: 'Personal', availableOnWhatsapp: false }
    // ]);
    const [documents, setDocuments] = useState([
        { id: Date.now(), documentType: 'Certificate', file: null, fileName: 'No file selected' }
    ]);
    const displayToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setTimeout(() => setShowToast(false), 3000);
    };

    const addDocumentRow = () => {
        setDocuments([
            ...documents,
            { id: Date.now(), documentType: 'Certificate', file: null, fileName: 'No file selected' }
        ]);
    };
    const handleRemoveContact = (index) => {
        if (index !== 0) { // Prevent removing the first contact row
            const values = documents.filter((_, i) => i !== index);
            setDocuments(values);
        }
    };

    const handleFileChangeold = (e, fileType) => {
        const file = e.target.files[0];
        console.log(file);
        console.log("fileType", fileType)
        if (fileType === 'highSchool') {
            setHighSchoolFile(file ? file : 'No File Selected!');
        } else if (fileType === 'intermediate') {
            setIntermediateFile(file ? file : 'No File Selected!');
        } else if (fileType === 'intermediatecer') {
            setGraduationFile(file ? file : 'No File Selected!');
        }
    };
    const handleFileChange = async (e, fileType) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem("token");
            // const response = await fetch('https://bgi.sortstring.com/api/v1/staff/upload-file/', {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': `Token ${token}`
            //     },
            //     body: formData
            // });
            const response = await Postdataform('staff/upload-file/', formData)

            // const data = await response.json();
            console.log(`Uploaded ${fileType} file`, response);

            const fileObj = {
                name: response.file_name,
                document: response.file_url  // use this in API payload
            };

            if (fileType === 'highSchool') {
                setHighSchoolFile(fileObj);
            } else if (fileType === 'intermediate') {
                setIntermediateFile(fileObj);
            } else if (fileType === 'intermediatecer') {
                setGraduationFile(fileObj);
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleFileChangemultold = (e, id) => {
        const file = e.target.files[0];
        console.log('file--------', file);
        console.log("id----", id)
        const updatedDocs = documents?.map((doc) =>
            doc.id === id
                ? {
                    ...doc,
                    file,
                    fileName: file ? file.name : 'No File Selected',
                }
                : doc
        );
        setDocuments(updatedDocs);
    };
    const handleFileChangemult = async (e, id) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem("token");
            // const response = await fetch('https://bgi.sortstring.com/api/v1/staff/upload-file/', {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': `Token ${token}`
            //     },
            //     body: formData
            // });
            const response = await Postdataform('staff/upload-file/', formData)
            // const data = await response.json();

            const updatedDocs = documents?.map((doc) =>
                doc.id === id
                    ? {
                        ...doc,
                        fileName: response.file_name,
                        document: response.file_url
                    }
                    : doc
            );
            setDocuments(updatedDocs);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const handleFileRemoveold = (fileType) => {
        if (fileType === 'highSchool') {
            setHighSchoolFile(null);
        } else if (fileType === 'intermediate') {
            setIntermediateFile(null);
        } else if (fileType === 'graduation') {
            setGraduationFile(null);
        }
    };
    const handleFileRemove = (fileTypeOrId) => {
        if (fileTypeOrId === 'highSchool') {
            setHighSchoolFile(null);
        } else if (fileTypeOrId === 'intermediate') {
            setIntermediateFile(null);
        } else if (fileTypeOrId === 'graduation') {
            setGraduationFile(null);
        } else {
            // handle dynamic ID for other documents
            const updatedDocuments = documents?.map((doc) =>
                doc.id === fileTypeOrId
                    ? { ...doc, file: null, fileName: null, document: null }
                    : doc
            );
            setDocuments(updatedDocuments);
        }
    };

    const handleRemoveFilemult = (id) => {
        const updatedDocuments = documents?.map((doc) =>
            doc.id === id ? { ...doc, file: null, fileName: 'No File ', fileSize: 0 } : doc
        );
        setDocuments(updatedDocuments);
    };
    const handleSubmitold = async () => {
        const formData = new FormData();

        // Attach known academic files (if used)
        if (highSchoolFile instanceof File) formData.append('high_school_file', highSchoolFile);
        if (intermediateFile instanceof File) formData.append('intermediate_file', intermediateFile);
        if (graduationFile instanceof File) formData.append('graduation_file', graduationFile);

        // Attach other uploaded documents
        documents.forEach((doc, index) => {
            if (doc.file) {
                formData.append(`documents[${index}][documentType]`, doc.documentType);
                formData.append(`documents[${index}][file]`, doc.file);
            }
        });

        // Make your API call here
        try {
            const res = await fetch('your/api/upload-url/', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                console.log('Success:', data);
                handleNext(); // move to next step
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // const handleSubmit = () => {
    //     if(!academicdata) return;

    //     const highSchoolQual = academicdata?.qualifications?.find(q => q.qualification_type === 'HSC');
    //     const intermediateQual = academicdata?.qualifications?.find(q => q.qualification_type === 'SSC');
    //     const payload = {
    //         student_id: studentid||selectedUserId, // make sure this is defined in your component
    //         documents: documents.map(doc => ({
    //             id: doc.id || 0,
    //             document_type: doc.documentType,
    //             document: doc.file?.name// or `doc.file.name` if you want the file name
    //         })),
    //         qualifying_documents: [
    //             {
    //                 qualification_id: highSchoolQual?.id || 0,
    //                 document_type: 'Certificate',
    //                 document: highSchoolFile.name
    //             },
    //             {
    //                 qualification_id: intermediateQual?.id || 0,
    //                 document_type: 'Certificate',
    //                 document: intermediateFile.name
    //             },
    //             {
    //                 qualification_id: intermediateQual?.id || 0,
    //                 document_type: 'Certificate',
    //                 document: graduationFile.name
    //             }
    //         ]
    //     };

    //     console.log("Payload for upload:", payload);
    //     const url='students/student-onboarding-documents-details/'
    //     const res=Postdata(url,payload);

    //     // Continue to next step
    //     // handleNext(); 
    // };
    const handleSubmit = async () => {
        if (!academicdata) return;

        const highSchoolQual = academicdata?.qualifications?.find(q => q.qualification_type === 'HSC');
        const intermediateQual = academicdata?.qualifications?.find(q => q.qualification_type === 'SSC');

        // Validation checks
        if (
            !(highSchoolFile && (highSchoolFile instanceof File || highSchoolFile?.name)) ||
            !(intermediateFile && (intermediateFile instanceof File || intermediateFile?.name))
            // !(graduationFile && (graduationFile instanceof File || graduationFile?.name))
        ) {
            displayToast('Please upload all academic documents', 'danger');
            // alert('Please upload all academic documents: High School, Intermediate, and Graduation.');
            return;
        }

        const isOtherDocsValid = documents.every(doc =>
            doc.documentType && doc.documentType !== '0' && (doc.file || doc.fileName)
        );

        if (!isOtherDocsValid) {
            displayToast('Please ensure all other documents have valid types and files.', 'danger');
            // alert('Please ensure all other documents have valid types and files.');
            return false;
        }

        const payload = {
            student_id: studentId || selectedUserId,
            documents: documents?.map(doc => ({
                // id: doc.id || 0,
                document_type: doc.documentType,
                // document: doc.file?.name || doc.fileName 
                document: doc.document
            })),
            qualifying_documents: [
                {
                    qualification_id: highSchoolQual?.id || 0,
                    document_type: 'Certificate',
                    document: highSchoolFile.document
                },
                {
                    qualification_id: intermediateQual?.id || 0,
                    document_type: 'Certificate',
                    document: intermediateFile.document
                },
                // {
                //     qualification_id: intermediateQual?.id || 0,
                //     document_type: 'Certificate',
                //     document: graduationFile.name
                // }
            ]
        };

        console.log("Validated Payload:", payload);
        const url = 'students/student-onboarding-documents-details/';
        const res = await Postdata(url, payload);

        if (!res.error) {
            displayToast('Documents Uploaded Successfully', 'success');
            await new Promise(resolve => setTimeout(resolve, 200));
            return true;
        } else {
            displayToast(res.error, 'danger');
            // alert(`Error: ${res.error}`);
        }
    };
    const clearsessiondata = () => {
        sessionStorage.removeItem('studentBasicForm');
        sessionStorage.removeItem('studentBasicFormMobileNumber');
        sessionStorage.removeItem('studentBasicFormAddress');
        sessionStorage.removeItem('studentid');
        sessionStorage.removeItem('topphoneNumber');
        sessionStorage.removeItem('otpverified');
        sessionStorage.removeItem('profilepic');

        // Store dropdown-related states after setting them



        // Also store dropdowns if already available
        sessionStorage.removeItem('studentPrivilegeCategories');
        sessionStorage.removeItem('studentCategories');
        sessionStorage.removeItem('salutations');
        sessionStorage.removeItem('genders');
        sessionStorage.removeItem('bloodGroups');
        sessionStorage.removeItem('contactNumberTypes');
        // sessionStorage.setItem('addressTypes', JSON.stringify(addressTypes));
        sessionStorage.removeItem('courses');

        sessionStorage.removeItem('correspondenceCountry');
        sessionStorage.removeItem('permanentCountry');
        sessionStorage.removeItem('correspondenceState');
        sessionStorage.removeItem('permanentState');
        sessionStorage.removeItem('correspondenceCity');
        sessionStorage.removeItem('permanentCity');
    }
    const getmasterdata = async () => {
        const url = 'students/student-onboarding-documents-details/get-master-data/'
        const res = await getData(url)
        setmasterdata(res.master);

    }
    useEffect(() => {
        getmasterdata()
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            const url = `students/get-student-onboarding-qualification-details/${studentId || selectedUserId}/`
            const res = await getData(url);
            setacademicdata(res)
        }
        fetchdata();

    }, [])
    // useEffect(() => {
    //     if (docdata && docdata.qualifying_documents?.length > 0) {
    //         const hs = docdata.qualifying_documents.find(d => d.qualification_type === 'HSC');
    //         const inter = docdata.qualifying_documents.find(d => d.qualification_type === 'SSC');
    //         const grad = docdata.qualifying_documents.find(d => d.qualification_type === 'Graduation'); // replace with actual type if different

    //         if (hs && hs.documents.length > 0) {
    //             setHighSchoolFile({ name: hs.documents[0].document });
    //         }

    //         if (inter && inter.documents.length > 0) {
    //             setIntermediateFile({ name: inter.documents[0].document });

    //             if (inter.documents.length > 1) {
    //                 // You might want to map this to graduation if that's your logic
    //                 setGraduationFile({ name: inter.documents[1].document });
    //             }
    //         }

    //         // Optional: if you have a separate qualification_type for graduation
    //         if (grad && grad.documents.length > 0) {
    //             setGraduationFile({ name: grad.documents[0].document });
    //         }
    //     }

    //     if (docdata?.other_documents?.length > 0) {
    //         const formattedDocs = docdata.other_documents.map((doc, index) => ({
    //             id: Date.now() + index,
    //             documentType: doc.document_type,
    //             file: null,
    //             fileName: doc.document || 'No file selected'
    //         }));
    //         setDocuments(formattedDocs);
    //     }
    // }, [docdata]);
    useEffect(() => {
        const fetchStudentDocuments = async () => {
            const studentId = studentid || sessionStorage.getItem('studentid');
            const url = `students/student-onboarding-documents-details/get-student-documents/?student_id=${studentId || selectedUserId}`;
            const res = await getData(url);

            if (res?.qualifying_documents?.length > 0) {
                res.qualifying_documents.forEach(doc => {
                    const qType = doc.qualification_type;

                    if (qType === 'HSC' && doc.documents?.length > 0) {
                        const hscDoc = doc.documents[0];
                        setHighSchoolFile({
                            name: hscDoc.document.split('/').pop(),
                            document: hscDoc.document
                        });
                    }

                    if (qType === 'SSC' && doc.documents?.length > 0) {
                        const intermediateDoc = doc.documents[0];
                        setIntermediateFile({
                            name: intermediateDoc.document.split('/').pop(),
                            document: intermediateDoc.document
                        });

                        if (doc.documents.length > 1) {
                            const graduationDoc = doc.documents[1];
                            setGraduationFile({
                                name: graduationDoc.document.split('/').pop(),
                                document: graduationDoc.document
                            });
                        }
                    }

                    if (qType === 'Graduation' && doc.documents?.length > 0) {
                        const gradDoc = doc.documents[0];
                        setGraduationFile({
                            name: gradDoc.document.split('/').pop(),
                            document: gradDoc.document
                        });
                    }
                });
            }

            if (res?.other_documents?.length > 0) {
                const formatted = res.other_documents?.map((doc, idx) => ({
                    id: Date.now() + idx,
                    documentType: doc.document_type,
                    file: null,
                    fileName: doc.document.split('/').pop(),
                    document: doc.document
                }));
                setDocuments(formatted);
            }
        };

        fetchStudentDocuments();
    }, []);




    // const formatFileSize = (size) => {
    //     if (!size) return '0 KB';
    //     const sizeInKB = (size / 1024).toFixed(2);
    //     return `${sizeInKB} KB`;
    // };
    return (
        <>
            <div className="col-md-10" style={{ height: "77vh", overflowY: 'scroll' }}>
                <div style={{ position: 'sticky', top: 0, background: "#fff", paddingBottom: "25px" }}>
                    <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 className='text-primary'>{mainnamehead} {registrationnumforhead ? `(${registrationnumforhead})` : ''}</h2>
                        <button className="close-btn pt-0" onClick={() => { onClose(); setCurrentStep(0); clearsessiondata() }}><img src={close} style={{ padding: "4px", background: '#F2F3F4', borderRadius: '50%' }}></img></button>
                    </div>
                </div>
                <div>
                    <h4 className='fm-pr-hd mt-0'>ACADEMIC DOCUMENTS</h4>
                </div>

                {/* High School File Upload */}
                <div>
                    <label className='form-labell'>High School <span className='astrisk'>*</span> </label>
                    <div className="file-upload-container">
                        <div className="upload-btn-container">
                            <input
                                type="file"
                                id="high-school-upload"
                                className="file-upload-input"
                                onChange={(e) => handleFileChange(e, 'highSchool')}
                            />
                            <label htmlFor="high-school-upload" className="upload-btn">
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
                        {highSchoolFile && (
                            <div className="ms-3">
                                <div className="me-3">{highSchoolFile.name}<span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove('highSchool')}>
                                    &times;
                                </span>
                                    {highSchoolFile.document && (
                                        <a
                                            // href={highSchoolFile.document.startsWith('http') ? highSchoolFile.document : `https://bgi.sortstring.com/media/${highSchoolFile.document}`}
                                            href={highSchoolFile.document.startsWith('http') ? highSchoolFile.document : window.baseurl + `media/${highSchoolFile.document}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', fontSize: '14px', color: '#0E9DED', fontWeight: '500' }}
                                            download
                                        >
                                            <button style={{ marginLeft: '10px', background: '#fff', border: '1px solid black' }}>
                                                <img src={downicon}></img>
                                            </button>
                                        </a>
                                    )}
                                </div>

                            </div>

                        )}
                    </div>
                </div>

                {/* Intermediate File Upload */}
                <div>
                    <label className='form-labell'>Intermediate <span className='astrisk'>*</span> </label>
                    <div className="file-upload-container">
                        <div className="upload-btn-container">
                            <input
                                type="file"
                                id="intermediate-upload"
                                className="file-upload-input"
                                onChange={(e) => handleFileChange(e, 'intermediate')}
                            />
                            <label htmlFor="intermediate-upload" className="upload-btn">
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
                        {intermediateFile && (
                            <div className="ms-3">
                                <div className="me-3">{intermediateFile.name} <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove('intermediate')}>
                                    &times;
                                </span>
                                    {intermediateFile.document && (
                                        <a
                                            // href={intermediateFile.document.startsWith('http') ? intermediateFile.document : `https://bgi.sortstring.com/media/${intermediateFile.document}`}
                                            href={intermediateFile.document.startsWith('http') ? intermediateFile.document : window.baseurl + `media/${intermediateFile.document}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', fontSize: '14px', color: '#0E9DED', fontWeight: '500' }}
                                            download
                                        >
                                            <button style={{ marginLeft: '10px', background: '#fff', border: '1px solid black' }}>
                                                <img src={downicon}></img>
                                            </button>
                                        </a>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                </div>

                {/* Graduation File Upload */}
                {/* <div>
                    <label className='form-labell'>Intermediate <span className='astrisk'>*</span> </label>
                    <div className="file-upload-container">
                        <div className="upload-btn-container">
                            <input
                                type="file"
                                id="intermediatecer-upload"
                                className="file-upload-input"
                                onChange={(e) => handleFileChange(e, 'intermediatecer')}
                            />
                            <label htmlFor="intermediatecer-upload" className="upload-btn">
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
                        {graduationFile && (
                            <div className="ms-3">
                                <div className="me-3">{graduationFile.name}  <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove('intermediatecer')}>
                                    &times;
                                </span></div>

                            </div>
                        )}
                    </div>
                </div> */}

                <div>
                    <h4 className='fm-pr-hd'>OTHER DOCUMENTS</h4>
                </div>
                {documents && documents?.map((val, index) => {
                    return (
                        <div className="row align-items-end">
                            <div className="col-md-3">
                                <label className='form-labell'>Document Type<span className='astrisk'>*</span></label>
                                <select className='fm-modal form-control form-select'
                                    value={val.documentType}
                                    onChange={(e) => {
                                        const updated = [...documents];
                                        updated[index].documentType = e.target.value;
                                        setDocuments(updated);
                                    }} >
                                    <option value="0">Select Document</option>
                                    {
                                        masterdata && masterdata?.document_type?.map((val, ind) => {
                                            return (
                                                <option value={val} key={ind}>{val}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-md-3'>
                                <label className='form-labell'>Document <span className='astrisk'>*</span> </label>
                                <div className="file-upload-container">
                                    <div className="upload-btn-container">
                                        <input
                                            type="file"
                                            id={val.id}
                                            className="file-upload-input"
                                            onChange={(e) => handleFileChangemult(e, val.id)}
                                        />
                                        <label htmlFor={val.id} className="upload-btn">
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
                                    {val && (
                                        <div className="ms-3">
                                            <div className="me-3" style={{ display: 'flex', gap: "5px" }}>{val.fileName} <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove(val.id)}>
                                                &times;
                                            </span>
                                                {val.document && (
                                                    <a
                                                        // href={val.document.startsWith('http') ? val.document : `https://bgi.sortstring.com/media/${val.document}`}
                                                        href={val.document.startsWith('http') ? val.document : window.baseurl+`media/${val.document}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ textDecoration: 'none', fontSize: '14px', color: '#0E9DED', fontWeight: '500' }}
                                                        download
                                                    >
                                                        <button style={{ marginLeft: '10px', background: '#fff', border: '1px solid black' }}>
                                                            <img src={downicon}></img>
                                                        </button>
                                                    </a>
                                                )}
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className=" input-group2" >
                                {index !== 0 && (
                                    <p className='Removebtn' style={{ marginTop: "5px" }} onClick={() => handleRemoveContact(index)}><img src={deletered}></img>Remove</p>
                                )}
                            </div>
                        </div>
                    )
                })}


                <div onClick={addDocumentRow} style={{ cursor: 'pointer' }}>
                    <h4 className='fm-pr-hd'>  <svg width="10" height="10" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="#7F56DA" />
                    </svg> Add More</h4>
                </div>


            </div>
            <div className="form-actions" style={{ position: 'sticky', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: "flex", gap: '20px' }}>
                    <button type="button" onClick={() => { handlePrev() }} style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
                        disabled={currentStep === 0}><img src={previous}></img>Previous</button>
                    {/* <p style={{ cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: 'red', margin: 0 }}><img src={savedraft}></img>Save to Draft</p> */}
                </div>
                <div>
                    <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={() => handleNext(handleSubmit)}
                        disabled={currentStep === steps.length - 1}>Next<img src={next}></img></button>
                </div>
            </div>
            {showToast && (
                <div
                    className={`custom-toast toast align-items-center text-white bg-${toastVariant} border-0 position-fixed top-0 end-0 m-3`}
                    role="alert"
                    style={{
                        display: 'block',
                        minWidth: '300px',
                        maxWidth: '400px',
                        borderRadius: '8px',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                        fontSize: '15px',
                        zIndex: 9999
                    }}
                >
                    <div className="d-flex">
                        <div className="toast-body" style={{ padding: '12px 16px' }}>
                            <strong>{toastVariant === 'success' ? '✅' : '❌'} </strong> {toastMessage}
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            onClick={() => setShowToast(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                </div>

            )}
        </>
    )
}
