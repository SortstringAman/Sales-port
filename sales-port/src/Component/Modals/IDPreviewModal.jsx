import React from 'react';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from "qrcode.react";

import close from '../../assets/icons/close.svg';
import demoPhoto from '../../assets/Images/idimg.png';
import scanner from '../../assets/icons/QRCode.svg';
import demoLogo from '../../assets/icons/college-name.svg';
import demoLogo2 from '../../assets/Images/logocompleteforId.png';
import clgLogo from '../../assets/icons/BanarasInstLogo.svg';
import clgname from '../../assets/icons/Nameclglogo.svg';
import icon1 from '../../assets/icons/idcardicon1.svg';
import icon2 from '../../assets/icons/idcardicon2.svg';
import icon3 from '../../assets/icons/idcardicon3.svg';
import icon4 from '../../assets/icons/idcardicon4.svg';
import sign from '../../assets/Images/idcardsignnew.png';
import next from '../../assets/icons/icon.svg';
import { Postdata, Postdataform } from '../../API/GlobalApi';

export const IDPreviewModal = ({ setcardpreview, selectedOrgDetails, capturedPhoto, idcarddata, setidcarddata }) => {

  const admissionYear = selectedOrgDetails?.admission_date
    ? new Date(selectedOrgDetails.admission_date).getFullYear()
    : null;

  const passingYear = selectedOrgDetails?.passing_year;
  const sessionText = admissionYear && passingYear
    ? `${admissionYear}–${String(passingYear).slice(-2)}`
    : 'N/A';

  const downloadElementAsJpeg = async (id, fileName) => {
    const element = document.getElementById(id);
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const dataUrl = canvas.toDataURL('image/jpeg', 1.0);

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${fileName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadold = () => {
    const finalobj = {
      id_card_student_picture: '',
      id_card_photo_back: '',
    }
    let url = `students/students-attendance/`;
    let res = Postdata(url, finalobj);
    console.log("resdownload--", res)
    downloadElementAsJpeg("id-card-front", "IDCard_Front");
    setTimeout(() => {
      downloadElementAsJpeg("id-card-back", "IDCard_Back");
    }, 800);
  };
  const handleDownload = async () => {
    const frontCanvas = await html2canvas(document.getElementById("id-card-front"), { scale: 2 });
    const backCanvas = await html2canvas(document.getElementById("id-card-back"), { scale: 2 });

    const frontBlob = await new Promise((resolve) => frontCanvas.toBlob(resolve, "image/jpeg"));
    const backBlob = await new Promise((resolve) => backCanvas.toBlob(resolve, "image/jpeg"));

    const uploadFile = async (blob, filename) => {
      const formData = new FormData();
      formData.append("file", blob, filename);
      const response = await Postdataform("staff/upload-file/", formData)
      // const response = await fetch("https://bgi.sortstring.com/api/v1/staff/upload-file/", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Token ${localStorage.getItem("token")}`,
      //   },
      //   body: formData,
      // });

      // const result = await response.json();
      return response?.file_url;
    };

    try {
      const frontUrl = await uploadFile(frontBlob, "IDCard_Front.jpg");
      const backUrl = await uploadFile(backBlob, "IDCard_Back.jpg");

      const finalobj = {
        student: selectedOrgDetails.user_id,
        id_card_student_picture: frontUrl,
        id_card_photo_back: backUrl,
      };

      const saveResponse = await Postdata("students/students-attendance/", finalobj);
      console.log("✅ ID card images uploaded and saved:", saveResponse);
      downloadElementAsJpeg("id-card-front", "IDCard_Front");
      setTimeout(() => {
        downloadElementAsJpeg("id-card-back", "IDCard_Back");
      }, 800);
    } catch (err) {
      console.error("❌ Error in uploading ID card images:", err);
    }
  };

  const registrationNumber = selectedOrgDetails?.permanent_registration_number || "";
  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ position: 'relative', width: '90%', height: "95vh" }}>
        <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className='text-primary'>ID Card Preview</h2>
          <button className="close-btn" onClick={() => setcardpreview(false)}>
            <img src={close} alt="close" />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '20px' }}>
          {/* Front Side */}
          <div id="id-card-front" style={{
            width: '300px',
            height: '480px',
            border: '1px solid #ccc',
            overflow: 'hidden',
            fontFamily: 'sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ background: '#E31C25', height: '20px' }}></div>
              <div style={{ background: '#003C8F', height: '6px' }}></div>
            </div>

            <div style={{ textAlign: 'center', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingBottom: '0px' }}>
              <img src={demoLogo2} alt="logo" style={{ width: '100%' }} />
              <img src={capturedPhoto || demoPhoto} alt="student" style={{ width: '100px', height: '100px', borderRadius: '100%', objectFit: 'cover' }} />
              <h3 style={{ color: '#E31C25', fontWeight: 700, fontSize: '16px', textTransform: 'uppercase' }}>{(selectedOrgDetails?.first_name || '') + ' ' + (selectedOrgDetails.middle_name === null || selectedOrgDetails.middle_name === "null" || selectedOrgDetails.middle_name === "Null" ? '' : selectedOrgDetails.middle_name) + " " + (selectedOrgDetails?.last_name || '')}</h3>
              <p style={{ fontSize: '13px', color: '#1A4277', fontWeight: '600' }}>
                {(selectedOrgDetails?.lag?.academic_group?.specialization?.course?.alias || 'N/A')}
                <span style={{ marginLeft: '5px' }}>({new Date().getFullYear()}–{String(new Date().getFullYear() + 1).slice(-2)})</span>
              </p>
            </div>

            <div style={{ fontSize: '9px', padding: '0 15px', lineHeight: '1.8', fontWeight: 500, color: "#000" }}>
              <div style={{ display: 'flex' }}><p style={{ minWidth: '100px', fontSize: '11px', textAlign: 'left', fontWeight: '700' }}>Father’s Name</p><p style={{ fontSize: '11px', fontWeight: '700' }}><span style={{ marginRight: '5px' }}>:</span> {selectedOrgDetails?.father_name || 'N/A'}</p></div>
              <div style={{ display: 'flex' }}><p style={{ minWidth: '100px', fontSize: '11px', fontWeight: '700', textAlign: 'left' }}>Reg. No.</p><p style={{ fontSize: '11px', fontWeight: '700' }}><span style={{ marginRight: '5px' }}>:</span> {selectedOrgDetails?.permanent_registration_number || 'N/A'}</p></div>


            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <QRCodeCanvas
                value={registrationNumber}
                size={70}
                level={"H"}
              />
            </div>
            <div style={{
              padding: '0 15px', marginTop: '0px', textAlign: 'center', display: "flex", flexDirection: "column", alignItems: "center"
            }}>
              <img src={sign} alt="signature" style={{ width: '30px' }} />
              <p style={{ fontSize: '11px', marginTop: '2px' }}>Authorized Sign.</p>
            </div>

            <div>
              <div style={{ background: '#003C8F', height: '6px' }}></div>
              <div style={{ background: '#E31C25', height: '20px' }}></div>
            </div>
          </div>

          {/* Back Side */}
          <div id="id-card-back" style={{
            width: '300px',
            height: '480px',
            border: '1px solid #ccc',
            overflow: 'hidden',
            fontFamily: 'sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div><div style={{ background: '#E31C25', height: '20px' }}></div><div style={{ background: '#003C8F', height: '6px' }}></div></div>
            <div style={{ padding: '0 15px', marginTop: "10px" }}>
              <div style={{ background: '#E9E9E9', padding: '10px 15px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', marginBottom: '5px' }}>
                  <p style={{ minWidth: '100px', fontSize: '11px', fontWeight: '700', textAlign: 'left' }}>DOB</p>
                  <p style={{ fontSize: '11px', fontWeight: '700' }}>
                    <span style={{ marginRight: '5px' }}>:</span>
                    {selectedOrgDetails?.date_of_birth
                      ? new Date(selectedOrgDetails.date_of_birth).toLocaleDateString('en-GB')
                      : 'N/A'}
                  </p>
                </div>
                <div style={{ display: 'flex', marginBottom: '5px' }}><p style={{ minWidth: '100px', fontSize: '11px', fontWeight: '700', textAlign: 'left' }}>Blood Group</p><p style={{ fontSize: '11px', fontWeight: '700' }}><span style={{ marginRight: '5px' }}>:</span> {selectedOrgDetails?.blood_group || 'N/A'}</p></div>
                <div style={{ display: 'flex', marginBottom: '5px' }}><p style={{ minWidth: '100px', fontSize: '11px', fontWeight: '700', textAlign: 'left' }}>Contact No</p><p style={{ fontSize: '11px', fontWeight: '700' }}><span style={{ marginRight: '5px' }}>:</span> {selectedOrgDetails?.contact_numbers?.[0]?.number || 'N/A'}</p></div>
                <div style={{ display: 'flex', marginBottom: '5px' }}><p style={{ minWidth: '100px', fontSize: '11px', fontWeight: '700', textAlign: 'left' }}>Address</p><span style={{ marginRight: '5px', fontSize: '11px', fontWeight: '700' }}>:</span><p style={{ fontSize: '11px', fontWeight: '700', textAlign: 'left' }}> {selectedOrgDetails?.addresses?.[0]?.address || 'N/A'} , {selectedOrgDetails?.addresses?.[0]?.city?.name || 'N/A'},{selectedOrgDetails?.addresses?.[0]?.state?.name || 'N/A'} | {selectedOrgDetails?.addresses?.[0]?.pincode || 'N/A'}</p></div>
                <div style={{ display: 'flex', marginBottom: '5px' }}><p style={{ minWidth: '100px', fontSize: '11px', fontWeight: '700', textAlign: 'left' }}>Issue Date</p><span style={{ marginRight: '5px', fontSize: '11px', fontWeight: '700' }}>:</span><p style={{ fontSize: '11px', fontWeight: '700', textAlign: 'left' }}> {idcarddata.valid_from_date ? new Date(idcarddata.valid_from_date).toLocaleDateString('en-GB')
                  : 'N/A' || 'N/A'}</p></div>
                <div style={{ display: 'flex', marginBottom: '5px' }}><p style={{ minWidth: '100px', fontSize: '11px', fontWeight: '700', textAlign: 'left' }}>Valid Till</p><span style={{ marginRight: '5px', fontSize: '11px', fontWeight: '700' }}>:</span><p style={{ fontSize: '11px', fontWeight: '700', textAlign: 'left' }}> {idcarddata.valid_to_date ? new Date(idcarddata.valid_to_date).toLocaleDateString('en-GB')
                  : 'N/A' || 'N/A'}</p></div>
              </div>
            </div>

            {/* <div style={{ textAlign: 'center', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
              <img src={clgLogo} alt="logo" style={{ width: '100px' }} />
              <img src={clgname} alt="logo" style={{ width: '270px' }} />
              <p style={{ fontSize: '10px', color: '#444' }}>NCTE द्वारा मान्यता प्राप्त एवं UGC की धारा 2(f) एवं 12(B) के अंतर्गत</p>
            </div> */}

            <div style={{ padding: '0 15px', fontSize: '11px', lineHeight: '1.5' }}>
              <h5 style={{ fontSize: '11px', fontWeight: '800', color: '#2B2B2A', marginTop: '10px' }}>Terms & Conditions</h5>
              <ul style={{ paddingLeft: '15px', margin: 0 }}>
                <li style={{ fontSize: '11px' }}>Institutional property; to be carried at all times by the assigned student only.
                </li>
                <li style={{ fontSize: '11px' }}>Must be presented on demand; loss or damage to be reported promptly—replacement fee may apply.
                </li>
                <li style={{ fontSize: '11px' }}>Any misuse or tampering is subject to disciplinary action.</li>
              </ul>
            </div>
            {/* 
            <div style={{ textAlign: 'center', margin: '10px 0' }}>
              <img src={scanner} alt="QR" style={{ width: '80px', height: '80px' }} />
            </div> */}

            <div style={{ fontSize: '11px', textAlign: 'center', padding: '0 10px', marginBottom: "5px" }}>
              <div style={{ display: 'flex', gap: "5px", marginBottom: "5px" }}><img src={icon3} /><p style={{ fontSize: '11px' }}>+91-9670635888</p></div>
              <div style={{ display: 'flex', gap: "5px", marginBottom: "5px" }}><img src={icon2} /><p style={{ fontSize: '11px' }}>admission@bitevns.ac.in</p></div>
              <div style={{ display: 'flex', gap: "5px", marginBottom: "5px" }}><img src={icon4} /><p style={{ fontSize: '11px' }}>www.bitevns.ac.in</p></div>
              <div style={{ display: 'flex', gap: "5px", marginBottom: "5px" }}><img src={icon1} /><p style={{ fontSize: '11px' }}>Babatpur, Varanasi, Uttar Pradesh, 221204</p></div>

            </div>

            <div><div style={{ background: '#003C8F', height: '6px' }}></div><div style={{ background: '#E31C25', height: '20px' }}></div></div>
          </div>
        </div>

        <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <button className='add-btn' style={{ width: "12%", display: 'flex', justifyContent: 'center' }} onClick={handleDownload}>
            Download <img src={next} className='ms-2' alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
};
