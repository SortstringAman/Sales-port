// import React, { useEffect } from 'react';
// import PaymentSuccessGif from '../../assets/gif/PaymentSuccess.gif'; // Make sure this path is correct
// import { useNavigate } from 'react-router-dom';
// import returnicon from '../../assets/icons/returnicon.svg'

// export const PaymentSuccessPage = () => {


//   return (
//     <div style={styles.pageContainer}>
//       <div style={styles.card}>
//         <img src={PaymentSuccessGif} alt="Payment Success" style={styles.gif} />

//         <h2 style={styles.successText}>Your Payment is Successful!</h2>

//         <p style={styles.description}>
//           Thank you for your payment. An automated payment receipt will be generated.
//         </p>

//         <button style={styles.button} onClick={()=>window.location.href='https://bite.sortstring.com/AdmissionForm/'}>
//           Return to Provisional Form <img src={returnicon}></img>
//         </button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f5f8ff',
//     padding: '1rem',
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: '20px',
//     padding: '40px',
//     width: '100%',
//     maxWidth: '600px',
//     textAlign: 'center',
//     boxShadow: '0 0 30px rgba(0,0,0,0.05)',
//   },
//   gif: {
//     height: '180px',
//     marginBottom: '20px',
//   },
//   successText: {
//     color: '#28a745',
//     marginBottom: '10px',
//   },
//   description: {
//     color: '#555',
//     fontSize: '16px',
//     marginBottom: '30px',
//   },
//   button: {
//     backgroundColor: '#7F56DA',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '8px',
//     padding: '12px 24px',
//     fontWeight: 400,
//     fontSize: '16px',
//     cursor: 'pointer',
//   },
// };

import React, { useState, useEffect, useRef } from 'react';
// import PaymentRejected from '../../assets/gif/PaymentRejected.gif';
import PaymentSuccessGif from '../../assets/gif/PaymentSuccess.gif';
// import PaymentSuccessGif3 from '../../../public/';
import returnicon from '../../assets/icons/returnicon.svg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { postDataWithToken } from '../../API/GlobalApi';

export const PaymentSuccessPage = () => {
  const [transactionId, setTransactionId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const tableRef = useRef();

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const txnId = params.get('transaction_id');
  //   const stdId = params.get('student_id');
  //   setTransactionId(txnId);
  //   setStudentId(stdId);

  //   if (txnId && stdId) {
  //     const token = sessionStorage.getItem('student_auth_token');
  //     const url = `https://bgi.sortstring.com/api/v1/students/provisional-admission/payment-status/`;
  //     const finalObj = { transaction_id: txnId, student_id: stdId };

  //     fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         ...(token && { Authorization: `Token ${token}` })
  //       },
  //       body: JSON.stringify(finalObj),
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('✅ Payment status updated:', data);
  //         setPaymentData(data);
  //       })
  //       .catch(error => {
  //         console.error('❌ Error updating payment status:', error);
  //       });
  //   }
  // }, []);
  // import { postDataWithToken } from '../../API/GlobalApi';

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const txnId = params.get('transaction_id');
  const stdId = params.get('student_id');
  setTransactionId(txnId);
  setStudentId(stdId);

  if (txnId && stdId) {
    const token = sessionStorage.getItem('student_auth_token');
    const url = 'students/provisional-admission/payment-status/';
    const finalObj = { transaction_id: txnId, student_id: stdId };

    postDataWithToken(url, finalObj, token)
      .then(data => {
        console.log('✅ Payment status updated:', data);
        setPaymentData(data);
      })
      .catch(error => {
        console.error('❌ Error updating payment status:', error);
      });
  }
}, []);


  const downloadPDFold = () => {
    const logo = new Image();
    logo.src = '../../../public/AdmissionFormlogo.png'
    html2canvas(tableRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(logo, 'PNG', 10, 10, 40, 20);
      pdf.addImage(imgData, 'PNG', 10, 10);
      pdf.save(`payment-details-${transactionId}.pdf`);
    });
  };
  const downloadPDFold2 = () => {
    const logo = new Image();
    logo.src = '/AdmissionFormlogomain.png'
    logo.onload = () => {
      html2canvas(tableRef.current).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        // Add logo at top-left
        pdf.addImage(logo, 'PNG', 10, 10, 40, 20); // (x, y, width, height)

        // Add captured table image below the logo
        pdf.addImage(imgData, 'PNG', 10, 40); // push table image below logo
        pdf.save(`payment-details-${transactionId}.pdf`);
      });
    };
  };
  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const logo = new Image();
    logo.src = '/BITENewlogo.png';
  
    logo.onload = () => {
      const logoWidth = 80;
      const logoHeight = 20;
      const logoX = (pageWidth - logoWidth) / 2;
  
      // Add logo in the center
      doc.addImage(logo, 'PNG', logoX, 10, logoWidth, logoHeight);
  
      // Title
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(16);
      doc.setTextColor('#222');
      doc.text('Payment Receipt', pageWidth / 2, 40, { align: 'center' });
  
      // Divider
      doc.setDrawColor(150);
      doc.line(40, 50, pageWidth - 40, 50);
  
      // Table content
      doc.setFontSize(12);
      doc.setTextColor(0);
  
      const data = [
        ['Payment Status', paymentData?.status],
        ['Phone No.', paymentData?.registered_phone_number],
        ['Provisional Admission No.', paymentData?.provisional_admission_no],
        ['Transaction ID', paymentData?.transaction_id],
        ['EasePay ID', paymentData?.easepayid],
        ['Mode of Payment', paymentData?.mode_of_payment],
        ['Payment Date', new Date(paymentData?.payment_date).toLocaleString()],
        ['Amount', `${paymentData?.amount}`]
      ];
  
      let y = 60;
      const labelX = 50;
      const valueX = 120;
  
      data.forEach(([label, value]) => {
        doc.text(label, labelX, y);
        doc.text(String(value), valueX, y);
        y += 12; // spacing between rows
      });
  
      doc.save(`payment-details-${paymentData?.transaction_id}.pdf`);
    };
  };
  
  return (
    <div style={styles.pageContainer}>
      <div style={styles.card}>
        <img src={PaymentSuccessGif} alt="Payment Success" style={styles.gif} />
        <h2 style={styles.successText}>Your Payment is Successful!</h2>

        {/* {transactionId && <p><b>Transaction ID:</b> {transactionId}</p>} */}

        <p style={styles.description}>
          Thank you for completing the provisional admission process. We are pleased to inform you that your application has been successfully registered and is currently under review by our admissions team. You will be notified as soon as your admission is confirmed.
        </p>

        {paymentData && (
          <>
            <div ref={tableRef} style={styles.tableWrapper}>
              <table style={styles.table}>
                <tbody>
                  <tr><th>Phone no.</th><td>{paymentData.registered_phone_number}</td></tr>
                  <tr><th>Provisional Admission No.</th><td>{paymentData.provisional_admission_no}</td></tr>
                  <tr><th>Transaction ID</th><td>{paymentData.transaction_id}</td></tr>
                  <tr><th>EasePay ID</th><td>{paymentData.easepayid}</td></tr>
                  <tr><th>Mode of Payment</th><td>{paymentData.mode_of_payment}</td></tr>
                  <tr><th>Payment Date</th><td>{new Date(paymentData.payment_date).toLocaleString()}</td></tr>
                  <tr><th>Amount</th><td>₹ {paymentData.amount}</td></tr>
                </tbody>
              </table>
            </div>
            <button onClick={downloadPDF} style={{ ...styles.button, marginTop: 10 }}>
              Download as PDF
            </button>
          </>
        )}

        <button
          style={{ ...styles.button, marginTop: '20px', marginLeft: "20px" }}
          onClick={() => window.location.href = window.baseurl+'AdmissionForm/'}
        >
          Return to Provisional Form <img src={returnicon} alt="return" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f8ff',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '700px',
    textAlign: 'center',
    boxShadow: '0 0 30px rgba(0,0,0,0.05)',
  },
  gif: {
    height: '180px',
    marginBottom: '20px',
  },
  successText: {
    color: '#28a745',
    marginBottom: '10px',
  },
  description: {
    color: '#555',
    fontSize: '16px',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#7F56DA',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontWeight: 400,
    fontSize: '16px',
    cursor: 'pointer',
  },
  tableWrapper: {
    marginTop: '20px',
    marginBottom: '20px',
    textAlign: 'left',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '15px',
  },
  th: {
    textAlign: 'left',
    backgroundColor: '#f1f1f1',
  },
};
