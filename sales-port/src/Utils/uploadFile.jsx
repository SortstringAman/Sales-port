import React, { useRef, useState } from 'react';
import { BsUpload } from 'react-icons/bs';

export const  UploadBox=({ label }) =>{
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // You can also handle upload here if needed
    }
  }

  return (
    <div className="col-md-3">
      <label className="form-label fw-medium">{label}</label>
      <div
        className="border rounded d-flex justify-content-between align-items-center p-3"
        style={{ cursor: 'pointer', color: '#7F56DA' }}
        onClick={handleClick}
      >
        <div className="d-flex align-items-center gap-2">
          <BsUpload />
          <span className="fw-semibold">Upload</span>
        </div>
        <span className="text-muted small">{fileName || 'PDF/JPG'}</span>
      </div>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

