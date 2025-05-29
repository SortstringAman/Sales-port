import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import imagePlaceholder from '../../assets/Images/image 17.png';
import addFingerprint from '../../assets/icons/FingerPrint.svg';
import { PhotoEditor } from '../PhotoEditor';
import { Postdata } from '../../API/GlobalApi';

export const GenerateIDModal = ({ isOpen, onClose, setpaymentmodal, selectedOrgDetails, capturedPhoto, setCapturedPhoto, setShowEditor, fingerprints, setFingerprints, setimgurl, setidcardmodal, idcarddata, setidcarddata }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    const [toastMessage, setToastMessage] = useState('');


    // const [capturedPhoto, setCapturedPhoto] = useState(null);

    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);

    const displayToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setTimeout(() => setShowToast(false), 3000);
    };




    const getSafe = (val) => val || "N/A";

    const captureFingerprint = async (index) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8367/bioenable/capture", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                // alert(`Fingerprint ${index + 1} captured!`);
                setFingerprints((prev) => {
                    const updated = [...prev];
                    updated[index] = data;
                    return updated;
                });
            } else if (xhr.readyState === 4) {
                alert("Failed to capture fingerprint. Restart RDService.");
                console.error("Capture error", xhr.status, xhr.responseText);
            }
        };
        xhr.send(JSON.stringify({ Quality: 60, TimeOut: 10 }));
    };

    const handleFileChangeold = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCapturedPhoto(reader.result);
                // setShowCropEditor(true);
            };
            reader.readAsDataURL(file);
        }

    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result;
                if (result.startsWith("data:image")) {
                    setCapturedPhoto(result);
                    //   setShowEditor(true); 
                } else {
                    displayToast("Invalid image file.", "danger");
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedPhoto(imageSrc);
        setShowCamera(false);
        // setShowCropEditor(true);
    };
    // useEffect(() => {
    //     if (idcarddata) {
    //         if (idcarddata.id_card_photo) {
    //             setCapturedPhoto(`https://bgi.sortstring.com/media/${idcarddata.id_card_photo}`);
    //         } else {
    //             setCapturedPhoto(selectedOrgDetails.profile_picture);
    //         }

    //         const updatedFingerprints = [idcarddata.finger_iso_1, idcarddata.finger_iso_2, idcarddata.finger_iso_3].map((iso, index) =>
    //             iso ? { BitmapData: iso } : null
    //         );
    //         setFingerprints(updatedFingerprints);
    //     } else {
    //         setCapturedPhoto(selectedOrgDetails.profile_picture);
    //     }
    // }, [idcarddata, selectedOrgDetails]);
    useEffect(() => {
        if (idcarddata) {
            // setCapturedPhoto(
            //     idcarddata.id_card_photo
            //         ? `https://bgi.sortstring.com/media/${idcarddata.id_card_photo}`
            //         : selectedOrgDetails.profile_picture
            // );
            const updatedFingerprints = [
                idcarddata.finger_iso_1,
                idcarddata.finger_iso_2,
                idcarddata.finger_iso_3
            ].map((iso) => (iso ? 'Captured' : null));
            setFingerprints(updatedFingerprints);
        }
        // else {
        //     setCapturedPhoto(selectedOrgDetails.profile_picture);
        // }
    }, [idcarddata, selectedOrgDetails]);

    if (!isOpen) return null;
    const hasAtLeastOneFingerprint = fingerprints.some(fp => fp !== null);

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content" style={{ position: 'relative', width: '50%', maxHeight: '95vh' }}>
                    <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 className='text-primary'>Biometric / Id card registration</h2>
                        <button className="close-btn" onClick={() => { onClose(); setCapturedPhoto() }}><img src={close} alt="close" /></button>
                    </div>

                    <div className="modal-body" style={{ overflowY: 'scroll', padding: '0 10px' }}>
                        <div className="row" style={{ background: '#F9FAFC', padding: "10px" }}>
                            <h4 className='fm-pr-hd'>STUDENT'S DETAILS</h4>
                            <div className="col-md-6">
                                <p className='sd-p'>Name</p><p className='n-p-t'>{getSafe(selectedOrgDetails?.first_name)} {getSafe(selectedOrgDetails?.last_name)}</p>
                                <p className='sd-p'>Phone</p><p className='n-p-t'>{getSafe(selectedOrgDetails?.contact_numbers?.[0]?.number)}</p>
                                <p className='sd-p'>Class</p><p className='n-p-t'>{getSafe(selectedOrgDetails?.lag?.name)}</p>
                            </div>
                            <div className="col-md-6">
                                <p className='sd-p'>Course</p><p className='n-p-t'>{getSafe(selectedOrgDetails?.lag?.academic_group?.specialization?.course_specialization)}</p>
                                <p className='sd-p'>Session</p><p className='n-p-t'>{getSafe(selectedOrgDetails?.lag?.academic_group?.name)}</p>
                            </div>
                        </div>

                        <h4 className='fm-pr-hd'>ADD STUDENT PICTURE</h4>
                        <div className="row">
                            <div className="col-md-12" style={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                                <img src={capturedPhoto || imagePlaceholder} alt="student" style={{ width: '100px', height: '100px' }} />
                                <button className='add-btn' onClick={() => setShowCamera(true)}>{!(capturedPhoto || selectedOrgDetails.profile_picture) ? 'Capture Image' : 'Recapture Image'}</button>
                                <div className="file-upload-container" style={{ minWidth: '0' }}>
                                    <label htmlFor="file-upload" className="upload-btn">
                                        <input type="file" id="file-upload" className="file-upload-input" onChange={handleFileChange} accept='image/*' />
                                        Upload File
                                    </label>
                                </div>
                            </div>
                        </div>

                        <h4 className='fm-pr-hd'>ADD BIOMETRIC</h4>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            {fingerprints?.map((fp, index) => (
                                <div key={index} style={{ textAlign: 'center' }}>
                                    <div
                                        onClick={() => captureFingerprint(index)}
                                        style={{ width: 60, height: 60, borderRadius: 6, border: '1px solid #ccc', backgroundColor: '#f2f2f2', cursor: 'pointer' }}
                                    >
                                        {fp ? (
                                            <img
                                                src={`data:image/bmp;base64,${fp.BitmapData}`}
                                                alt={`Fingerprint ${index + 1}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <img src={addFingerprint} alt="Add Fingerprint" style={{ width: '100%', height: '100%' }} />
                                        )}
                                    </div>
                                    <p style={{ marginTop: 5, fontSize: 12 }}>Add Fingerprint</p>
                                </div>
                            ))}
                            {(idcarddata?.id_card_student_picture || idcarddata?.id_card_photo_back) && (
                                <div>
                                    <h4 className="fm-pr-hd mt-0">Download ID Card</h4>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {idcarddata.id_card_student_picture && (
                                            <a
                                                // href={`https://bgi.sortstring.com/media/${idcarddata.id_card_student_picture}`}
                                                href={window.baseurl + `media/${idcarddata.id_card_student_picture}`}
                                                download="ID_Card_Front.jpg"
                                                className="add-btn"
                                                style={{ textDecoration: 'none' }}
                                                target='_blank'
                                            >
                                                <button>Download Front</button>

                                            </a>
                                        )}
                                        {idcarddata.id_card_photo_back && (
                                            <a
                                                // href={`https://bgi.sortstring.com/media/${idcarddata.id_card_photo_back}`}
                                                href={window.baseurl+`media/${idcarddata.id_card_photo_back}`}
                                                download="ID_Card_Back.jpg"
                                                className="add-btn"
                                                style={{ textDecoration: 'none' }}
                                                target='_blank'
                                            >
                                                <button>Download Back</button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>


                    <div className="form-actions" style={{ background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={() => {
                            if (!capturedPhoto) {
                                displayToast('Please upload or capture a photo first.', 'danger');
                            } else if (!hasAtLeastOneFingerprint) {
                                displayToast('Please capture at least one fingerprint.', 'danger');
                            } else {
                                setShowEditor(true);
                                // setIsModalOpen(false);
                                setidcardmodal(false);
                                // onClose();
                            }
                            // setShowEditor(true);
                            // setidcardmodal(false);
                        }}>
                            {idcarddata?.id_card_student_picture ? 'Regenerate ID Card' : 'Generate ID Card'}
                            <img src={next} alt="next" />
                        </button>
                    </div>

                    {showCamera && (
                        <div className="camera-modal" style={{ backgroundColor: '#fff', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={300} height={300} />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => setShowCamera(false)}>Cancel</button>
                                <button onClick={capturePhoto}>Take Photo</button>
                            </div>
                        </div>
                    )}


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
                            {toastMessage}
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

    );
};
