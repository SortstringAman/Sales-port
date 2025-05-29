import React, { useState } from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import exporticon from '../../assets/icons/export-data.svg';
import useAutoFocus from '../../Utils/autoFocus';
import Select from 'react-select';
import ConfirmationModal from './ConfirmationModal';

export const UploadFee = ({
    isOpen, onClose, handleSubmitFee, Updatebtn, handleExportExcelFeeDue, allCourses, allFeeTypes, setFeeFile, uploadErrors, setUploadErrors, feeFile
}) => {

    const nameInputRef = useAutoFocus(isOpen);
    const [showDownloadOptions, setShowDownloadOptions] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState('');
    const [selectedFeeTypeId, setSelectedFeeTypeId] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const courseOptions = allCourses?.map(course => ({
        value: course.ag_id,
        label: `${course.course_name}`,
        ...course
    }));

    const feeTypeOptions = allFeeTypes?.map(fee => ({
        value: fee.id,
        label: fee.name,
    }));

    const handleClear = () => {
        setSelectedFeeTypeId(null);
        setSelectedGroupId(null);
    };

    const handleDownloadClick = () => {
        if (selectedGroupId && selectedFeeTypeId) {
            const downloadData = [{
                ag_id: parseInt(selectedGroupId),
                fee_type_id: parseInt(selectedFeeTypeId)
            }];
            handleExportExcelFeeDue(downloadData);
            setShowDownloadOptions(false);
            handleClear();
            setUploadErrors(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content custom-modal-content">
                <div className="modal-header-content d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">Upload Fee</h2>
                    <button className="close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </button>
                </div>

                <div className="modal-body custom-modal-body">
                    {/* Download Template Section */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="d-flex align-items-center gap-3">
                                <span className="form-labell">Download Template</span>
                                <button
                                    type="button"
                                    onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                                    className="btn btn-outline-#7F56DA d-flex align-items-center"
                                    style={{
                                        height: '40px',
                                        padding: '0 10px',
                                        borderRadius: '6px',
                                        border: '1px solid #7F56DA',
                                        color: '#7F56DA',
                                        backgroundColor: 'transparent'
                                    }}  >
                                    <img src={exporticon} alt="Export" style={{ height: '24px' }} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dropdowns */}
                    {showDownloadOptions && (
                        <div className="mt-3 p-3 border rounded">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className='form-labell mb-2'>Select Academic Group</label>
                                    <Select
                                        classNamePrefix="select"
                                        isSearchable
                                        options={courseOptions}
                                        placeholder="-- Select Group --"
                                        value={courseOptions.find(option => option.value === selectedGroupId) || null}
                                        onChange={(selected) => setSelectedGroupId(selected?.value)}
                                        menuPortalTarget={document.body}
                                        menuPosition="fixed"
                                        styles={{
                                            control: (base) => ({ ...base, minHeight: '38px', height: '30px' }),
                                            valueContainer: (base) => ({ ...base, height: '30px', padding: '0 6px', fontSize: '14px' }),
                                            option: (base, state) => ({
                                                ...base,
                                                fontSize: '14px',
                                                backgroundColor: state.isSelected ? '#ddd' : state.isFocused ? '#f0f0f0' : 'white',
                                                color: 'black',
                                            }),
                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                        }}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className='form-labell mb-2'>Select Fee Type</label>
                                    <Select
                                        classNamePrefix="select"
                                        isSearchable
                                        options={feeTypeOptions}
                                        placeholder="-- Select Fee Type --"
                                        value={feeTypeOptions.find(option => option.value === selectedFeeTypeId) || null}
                                        onChange={(selected) => setSelectedFeeTypeId(selected?.value)}
                                        menuPortalTarget={document.body}
                                        menuPosition="fixed"
                                        styles={{
                                            control: (base) => ({ ...base, minHeight: '38px', height: '30px' }),
                                            valueContainer: (base) => ({ ...base, height: '30px', padding: '0 6px', fontSize: '14px' }),
                                            option: (base, state) => ({
                                                ...base,
                                                fontSize: '14px',
                                                backgroundColor: state.isSelected ? '#ddd' : state.isFocused ? '#f0f0f0' : 'white',
                                                color: 'black',
                                            }),
                                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="row mt-3">
                                <div className="col-md-12 d-flex justify-content-end">
                                    <button
                                        className="add-btn"
                                        onClick={handleDownloadClick}
                                        disabled={!selectedGroupId || !selectedFeeTypeId}
                                        style={{
                                            cursor: (!selectedGroupId || !selectedFeeTypeId) ? 'not-allowed' : 'pointer',
                                            opacity: (!selectedGroupId || !selectedFeeTypeId) ? 0.6 : 1
                                        }}
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Upload Section */}
                    <div className="row mt-3">
                        <div className="col-md-8">
                            <label className="form-labell">Upload File <span className="astrisk">*</span></label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    setFeeFile(e.target.files[0]);
                                    setUploadErrors([]);
                                }}
                                className="form-control"
                                name="fee_document"
                            />
                        </div>
                    </div>

                    {/* Upload Errors */}
                    {uploadErrors?.length > 0 && (
                        <ul className="mt-2 text-danger" style={{ fontSize: '0.9rem' }}>
                            {uploadErrors?.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    )}

                    {/* Submit */}
                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-end">
                            <button
                                className="add-btn"
                                disabled={!feeFile}

                                onClick={() => setShowConfirmModal(true)}
                                style={{
                                    minWidth: '150px',
                                    maxWidth: '180px',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    cursor: feeFile ? 'pointer' : 'not-allowed',
                                      backgroundColor: feeFile ? '#7F56DA' : '#d3d3d3',
                                }}
                            >
                                Upload Fee
                                <img src={next} className="ms-2" alt="next" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showConfirmModal}
                title="Confirm Upload"
                message="Are you sure you want to upload the selected fee file?"
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={() => {
                    handleSubmitFee();
                    setShowConfirmModal(false);
                }}
            />
        </div>
    );
};
