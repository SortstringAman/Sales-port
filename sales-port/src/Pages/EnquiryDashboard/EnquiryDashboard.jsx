
import { useState, useMemo, useEffect, useRef } from 'react';
import CommonLayout from '../../Component/CommonLayout';
import profileicon from '../../assets/icons/solar_square-academic-cap-2-outline.svg'
import profileicon2 from '../../assets/icons/solar_square-academic-cap-2-outline (1).svg'
import profileicon3 from '../../assets/icons/solar_documents-minimalistic-linear.svg'
import profileicon4 from '../../assets/icons/hugeicons_manager.svg'
import profileicon5 from '../../assets/icons/hugeicons_biometric-device.svg'
import ProfileStatus from '../../Component/ProfileStatus';
import filtericon from '../../assets/icons/mage_filter-fill.svg'
import '../../assets/css/StudentDashboard.css'
import SearchBar from '../../Component/SearchBar';
import AddNewStudentModal from '../../Component/Modals/AddNewStudentModal';
import { SuccessfulPopup } from '../../Component/Modals/SuccessfulPopup';
import Table from '../../Component/Table';
import image from '../../assets/Images/image.png';
import setting from '../../assets/icons/settings.svg';
import phone from '../../assets/icons/ic_round-phone.svg';
import whatsapp from '../../assets/icons/logos_whatsapp-icon.svg';
import adstatus from '../../assets/icons/statuspur.svg'
import adstatusred from '../../assets/icons/status-red.svg';
import tablelast from '../../assets/icons/tablelast.svg';
import edit from '../../assets/icons/editnew.svg';

import { useNavigate } from 'react-router-dom';
import { getBlob, getData, patchData } from '../../API/GlobalApi';
import { GenerateIDModal } from '../../Component/Modals/GenerateIDModal';
import { PhotoEditor } from '../../Component/PhotoEditor';
import { IDValidityModal } from '../../Component/Modals/IDValidityModal';
import { IDPreviewModal } from '../../Component/Modals/IDPreviewModal';
import confirmadicon from '../../assets/icons/confirm-admission.svg';
import exporticon from '../../assets/icons/export-data.svg';

import checkgif from '../../assets/gif/successfullgif.gif';
import close from '../../assets/icons/close.svg';
import { Filter } from '../../Component/Filter/Filter';
import debounce from 'lodash.debounce';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import collegeIcon from "../../assets/Images/college-full-logo.png"
import signature from '../../assets/Images/logosidebar.png'
import { formatDate, formatDateTime } from '../../Utils/data&dateTime';
export const EnquiryDashboardDetails = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');
  const [toastMessage, setToastMessage] = useState('');

  const [enquiryStatus, setEnquiryStatus] = useState([])
  const [enquirySources, setEnquirySources] = useState([])
  const [enquiryCreatedBy, setEnquiryCreatedBy] = useState([])

  const getDashboardData = async () => {

    const url = 'students/student-inquiry-dashboard/'
    const response = await getData(url);
    console.log("response geting in enquiry dashboard", response)
    setEnquiryStatus(response?.status);
    setEnquirySources(response?.source);
    setEnquiryCreatedBy(response?.created_by_stats)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  const COLORS = ['#0E9DED', '#08A74C', '#D53020', '#DD9B22', '#9E10D7'];

  const enquiryStatusData = useMemo(() => {
    const total = enquiryStatus?.reduce((sum, item) => sum + item.count, 0);
    return enquiryStatus?.map((item, index) => ({
      name: item?.name,
      value: item?.count,
      percent: ((item.count / total) * 100).toFixed(1),
      color: COLORS[index]
    }));
  }, [enquiryStatus]);


  const COLORS_SOURCE = ['#6a40c5', '#08A74C', '#D53020', '#DD9B22', '#9E10D7', '#4c8ae7', '#0E9DED', '#e67300', '#009999'];

  const sourceData = useMemo(() => {
    const total = enquirySources?.reduce((sum, item) => sum + item.count, 0);
    return enquirySources?.map((item, index) => ({
      name: item?.name,
      value: item?.count,
      percent: total ? ((item.count / total) * 100).toFixed(1) : 0,
      color: COLORS_SOURCE[index], // fixed here
    }));
  }, [enquirySources]);



  const AnimatedNumber = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(target);
      if (start === end) return;

      const incrementTime = 30; // ms
      const step = Math.ceil(end / 20);

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }, [target]);

    return <span>{count}</span>;
  };

  // Format today's date
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const handleDownloadReport = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Resize and convert image to base64 with compression
    const getResizedBase64 = (url, targetWidth = 150) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const scale = targetWidth / img.width;
          const width = targetWidth;
          const height = img.height * scale;

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          const base64 = canvas.toDataURL('image/png'); // PNG with high quality
          resolve(base64);
        };
        img.onerror = reject;
        img.src = url;
      });

    try {
      const topLogoBase64 = await getResizedBase64(collegeIcon, 1050);
      const signatureBase64 = await getResizedBase64(signature, 70);

      // --- Top Logo ---
      const logoProps = doc.getImageProperties(topLogoBase64);
      const logoWidthMm = 65; // Set fixed width
      const logoHeightMm = (logoProps.height / logoProps.width) * logoWidthMm;
      const logoX = (pageWidth - logoWidthMm) / 2;

      doc.setFillColor(255, 255, 255);
      doc.rect(logoX - 2, 10 - 2, logoWidthMm + 4, logoHeightMm + 4, 'F');
      doc.addImage(topLogoBase64, 'PNG', logoX, 10, logoWidthMm, logoHeightMm);
      const contentStartY = 10 + logoHeightMm + 10;

      // --- Header Text ---
      const now = new Date();
      const todayDate = formatDate(now); // e.g., "26 May 2025"
      const headerY = contentStartY + 5; // Extra top margin
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal'); // Set font to bol
      const reportTitle = 'Enquiry reports as of today';
      doc.text(reportTitle, 14, headerY); // left-aligned

      // doc.setFontSize(10);
      // const dateText = `Date: ${todayDate}`;
      // const dateTextWidth = doc.getTextWidth(dateText);
      // const rightX = pageWidth - 14 - dateTextWidth; // 14 is right margin
      // doc.text(dateText, rightX, headerY); // right-aligned, same Y as title


      // --- Table ---
      const columns = ['S.No.', 'Name', 'Total', 'Today'];
      const rows = enquiryCreatedBy?.map((person, index) => [
        index + 1,
        person.full_name,
        person.total_inquiries,
        person.inquiries_today,
      ]);

      const totalInquiries = enquiryCreatedBy?.reduce((sum, p) => sum + Number(p.total_inquiries), 0);
      const inquiriesToday = enquiryCreatedBy?.reduce((sum, p) => sum + Number(p.inquiries_today), 0);
      rows.push(['Total', '', totalInquiries, inquiriesToday]);

      doc.autoTable({
        startY: headerY + 7,
        head: [columns],
        body: rows,
        styles: {
          halign: 'center',
          fontSize: 10,
        },
        columnStyles: {
          0: { halign: 'center' }, // S.No.
          1: { halign: 'left' },  // Name
          2: { halign: 'center' }, // Total
          3: { halign: 'center' }, // Today
        },
        headStyles: {
          fillColor: [248, 249, 250],
          textColor: [0, 0, 0],
          fontStyle: 'bold',
        },
        didParseCell: function (data) {
          const col = data.column.index;
          if (data.row.index === rows.length - 1) {
            data.cell.styles.fontStyle = 'bold';
          }
          // Left-align "Name" column in header (column index 1, section = 'head')
          // Force header cells to be left-aligned for all columns
          // Header alignment:
          if (data.section === 'head') {
            if (col === 1) {
              data.cell.styles.halign = 'left'; // Only "Name"
            } else {
              data.cell.styles.halign = 'center'; // All others
            }
          }
        },
      });

      // --- Signature + Generated By Text ---
      const signatureWidth = 15;
      const sigProps = doc.getImageProperties(signatureBase64);
      const signatureHeight = (sigProps.height / sigProps.width) * signatureWidth;

      const margin = 10;
      const signatureX = pageWidth - signatureWidth - margin;
      const signatureY = pageHeight - signatureHeight - 10;

      const generatedByText = 'Generated by';
      const textWidth = doc.getTextWidth(generatedByText);

      const textX = signatureX - textWidth - 1;
      const textY = signatureY + signatureHeight / 2 + 1;

      const currentDateTime = formatDateTime(now); // e.g., "26 May 2025, 4:42 PM"
      const dateTextWidth = doc.getTextWidth(currentDateTime);
      const dateX = signatureX + signatureWidth - dateTextWidth; // Align date to right edge of signature
      const dateY = signatureY + signatureHeight + 4; // A bit below the image


      doc.setFontSize(10);
      doc.text(generatedByText, textX, textY);
      doc.addImage(signatureBase64, 'PNG', signatureX, signatureY, signatureWidth, signatureHeight);
      doc.text(currentDateTime, dateX, dateY);

      // --- Save PDF ---
      doc.save('Enquiry_Report.pdf');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate report. Please try again.');
    }
  };


  return (
    <>
      <div className="dashboard">
        {/* Top Row: Status Boxes */}
        <div className="row mt-2 mb-1 m-auto">
          <div className="col-md-10 m-auto">
            <h2 className='main-heading' >Enquiry Dashboard</h2>
          </div>
          <div className="col-md-10 d-flex flex-wrap gap-2 justify-content-evenly mt-5 enq-status-container m-auto">
            {enquiryStatus?.map((item, index) => {
              let bgColor = "#f0f0f0";
              let textColor = "#000";
              switch (item?.name.toLowerCase()) {
                case "open":
                  bgColor = "rgb(162 210 243)";
                  textColor = "rgb(14 153 241)";
                  break;
                case "close win":
                  bgColor = "rgb(183 241 207)";
                  textColor = "rgb(8 167 76)";
                  break;
                case "close loss":
                  bgColor = "#edb4af";
                  textColor = "#d53020";
                  break;
                case "in progress":
                  bgColor = "#ffe99ae6";
                  textColor = "#dd9b22";
                  break;
                case "unverified":
                  bgColor = "rgba(208, 156, 233, 0.7)";
                  textColor = "rgb(158 16 215)";
                  break;
              }
              return (
                <div
                  key={index}
                  className="status-box"
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    padding: '15px',
                    borderRadius: '10px',
                    width: '150px',
                    textAlign: 'center'
                  }}
                >
                  <div className="status-name">{item?.name}</div>
                  <div className="status-count">
                    <AnimatedNumber target={item?.count} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="row mt-1 m-auto justify-content-center" style={{ padding: "unset" ,gap:"7px"}}>
          {/* Enquiry Status Card */}
          <div className="col-md-5"
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '15px',
              backgroundColor: '#fff'
            }}>
            <h5 className="text-start">Status of Enquiries</h5>
            <div className="row">
              <div className="col-md-4 mt-4">
                <ul className="list-unstyled mt-3">
                  {enquiryStatusData?.map((item, index) => (
                    <li
                      key={index}
                      className="d-flex justify-content-between align-items-center "
                      style={{
                        color: item.color,
                        padding: '5px',
                        borderRadius: '8px',
                        fontWeight: '400',
                        fontSize:"14px"
                      }}
                    >
                      <span>{item.name}</span>
                      <AnimatedNumber target={item.value} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-8 d-flex align-items-center justify-content-center">
                <ResponsiveContainer width={250} height={250}>
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={enquiryStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={90}
                      stroke="none"
                      label={({ cx, cy, midAngle, outerRadius, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 20;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const percentText = `${enquiryStatusData[index].percent}%`;
                        return (
                          <g>
                            <rect x={x - 18} y={y - 12} rx={6} ry={6} width={36} height={24} fill="#fff" stroke={enquiryStatusData[index].color} strokeWidth={1} />
                            <text x={x} y={y + 1} fill={enquiryStatusData[index].color} textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
                              {percentText}
                            </text>
                          </g>
                        );
                      }}
                      activeShape={null}
                    >
                      {enquiryStatusData?.map((entry, index) => (
                        <Cell key={`cell-status-${index}`} fill="transparent" stroke={entry.color} strokeWidth={20} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Source of Enquiries Card */}
          <div className="col-md-5"
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '15px',
              backgroundColor: '#fff'
            }}>
            <h5 className="text-start">Sources of Enquiries</h5>
            <div className="row">
              <div className="col-md-4 mt-4">
                <ul className="list-unstyled mt-3">
                  {sourceData?.map((item, index) => (
                    <li
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        color: item.color,
                        padding: '5px',
                        borderRadius: '8px',
                        fontWeight: '400',
                        fontSize:"14px"
                      }}
                    >
                      <span>{item.name}</span>
                      <AnimatedNumber target={item.value} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-8 d-flex align-items-center justify-content-center">
                <ResponsiveContainer width={250} height={250}>
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={sourceData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={90}
                      stroke="none"
                      label={({ cx, cy, midAngle, outerRadius, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 20;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const percentText = `${sourceData[index].percent}%`;
                        return (
                          <g>
                            <rect x={x - 18} y={y - 12} rx={6} ry={6} width={36} height={24} fill="#fff" stroke={sourceData[index].color} strokeWidth={1} />
                            <text x={x} y={y + 1} fill={sourceData[index].color} textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="bold">
                              {percentText}
                            </text>
                          </g>
                        );
                      }}
                      activeShape={null}
                    >
                      {sourceData?.map((entry, index) => (
                        <Cell key={`cell-source-${index}`} fill="transparent" stroke={entry.color} strokeWidth={20} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>



        <div className="row mt-3">
          <div className="col-10 d-flex justify-content-between align-items-center m-auto">
            <h5 className="mb-0 text-center flex-grow-1">Field Visit Report till {today}</h5>
            <button className="add-btn ms-auto" onClick={handleDownloadReport}>
              <span className="me-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 16L12 4M12 16L8 12M12 16L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 20H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              Download Report
            </button>
          </div>
        </div>


        <div className="row mt-3 enquiry-person m-auto">
          <div
            className="col-md-10 m-auto "
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '5px',
              backgroundColor: '#fdfdfd',
            }}
          >
            <div className="table-responsive">
              <table className="table table-striped student-table" >
                <thead className="table-light">
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th className='text-center'>Total</th>
                    <th className='text-center'>Today</th>
                  </tr>
                </thead>
                <tbody style={{ verticalAlign: "middle" }}>
                  {enquiryCreatedBy?.map((person, index) => (
                    <tr key={person?.created_by_id} style={{ color: "rgb(34, 47, 62)" }}>
                      <td>{index + 1}</td>
                      <td>{person.full_name}</td>
                      <td className='text-center'>{person?.total_inquiries}</td>
                      <td className='text-center'>{person?.inquiries_today}</td>
                    </tr>
                  ))}
                  {/* Totals Row */}
                  <tr className="table-light" style={{ fontWeight: 'bold' }}>
                    <td colSpan={2}>Total</td>
                    <td className='text-center'>
                      {enquiryCreatedBy?.reduce((sum, person) => sum + Number(person.total_inquiries), 0)}
                    </td>
                    <td className='text-center'>
                      {enquiryCreatedBy?.reduce((sum, person) => sum + Number(person.inquiries_today), 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
          }}>
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
  );
};

