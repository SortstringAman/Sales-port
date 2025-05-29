import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import { VerifyDiscountPayment } from './VerifyDiscountPaymentModel';
import { getData } from '../../API/GlobalApi';
import StudentSearch from '../SearchStudent';
import useAutoFocus from '../../Utils/autoFocus';

export const ReceivePayment = ({
    isReceivedPaymentModalOpen,
    onClose,
    setpaymentmodal,
}) => {
    const [amount, setAmount] = useState(22490);
    const [discount, setDiscount] = useState(10);
    const [isPercentage, setIsPercentage] = useState(true);
    const [showDiscountModal, setShowDiscountModal] = useState(false);
    const [studentsData, setStudentsData] = useState([])
    const [selectedStudentId, setSelectedStudentId] = useState()
    const [selectedStudent, setSelectedStudent] = useState()

    const nameInputRef = useAutoFocus(isReceivedPaymentModalOpen);

    const getAllStudents = async () => {
        const url = "students/all/";
        const response = await getData(url);
        console.log("response getting all students", response);
        if (response) {
            setStudentsData(response);
        }
    };


    useEffect(() => {
        getAllStudents()
    }, [])


    const getStudentById = async (userId) => {
        try {
            const response = await getData(`students/get-student-ledger-details/${userId}/`);
            const data = response?.data;
            if (data) {
                console.log("Single student data:", data);
                return data;
            } else {
                console.warn("No student data in response");
                return null;
            }
        } catch (error) {
            console.error("Error fetching student by ID:", error);
            return null;
        }
    };
    const [resetSearchKey, setResetSearchKey] = useState(0);

    const handleNewFee = () => {
        setSelectedStudent(null);           // Clear selected student data
        setSelectedStudentId(null);         // Reset selected student ID
        setAmount(0);                       // Reset amount
        setDiscount(0);                     // Reset discount
        setIsPercentage(true);              // Default to percentage
        setResetSearchKey(prev => prev + 1); // Trigger search reset
    };


    const handleAddandCloseFee = () => {
        setSelectedStudent(null);           // Clear selected student data
        setSelectedStudentId(null);         // Reset selected student ID
        setAmount(0);                       // Reset amount
        setDiscount(0);                     // Reset discount
        setIsPercentage(true);              // Default to percentage
        setResetSearchKey(prev => prev + 1); // Trigger search 
        onClose()
        setpaymentmodal(true)
    };

    const calculateTotal = () => {
        let discountValue = isPercentage ? (amount * discount) / 100 : discount;
        return amount - discountValue;
    };


    const openFeeDiscountModal = () => setShowDiscountModal(true);
    const closeFeeDiscountModal = () => setShowDiscountModal(false);

    const handleStudentChange = async (selectedOption) => {
       
        if (!selectedOption) {
            setSelectedStudent(null);
            return;
        }
        const userId = selectedOption.user_id;
        const studentData = await getStudentById(userId);
        setSelectedStudentId(userId);
        setSelectedStudent(studentData);
    };

    const filterByRegNo = (option, input) => {
        if (!input) return true;  // show all when input is empty
        return option.data.regNo.toLowerCase().includes(input.toLowerCase());
    };


    const studentOptions = studentsData?.map(student => ({
        value: student.user_id,
        label: student.permanent_registration_number,  // Only show reg no here
        fullName: student.full_name,                    // Keep name if needed elsewhere
    }));

    // const handleStudentSelect = (student) => {
    //     if (!student) {
    //         setSelectedStudent(null);
    //         setSelectedStudentId(null);
    //         return;
    //     }
    //     // student here is the full student object from the search component
    //     getStudentById(student.user_id);
    // };
    if (!isReceivedPaymentModalOpen) return null;

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content" style={{ position: 'relative', width: '50%', display: 'flex', flexDirection: 'column', overflowY: "hidden" }}>
                    <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h2 className='text-primary'>Receive Payment</h2>
                        <button className="close-btn" onClick={onClose}><img src={close} alt="close" /></button>
                    </div>

                    <div className="modal-body" style={{ overflowY: selectedStudent ? 'scroll' : "unset !important", padding: '0 10px', overflowX: 'hidden' }}>
                        <div className="mb-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <StudentSearch
                                        studentsData={studentsData}
                                        nameInputRef={nameInputRef}
                                        onSelectStudent={handleStudentChange}
                                        resetTrigger={resetSearchKey}
                                    />
                                </div>
                            </div>
                        </div>

                        <> <div className="row" style={{ background: '#F9FAFC', padding: "10px" }}>
                            <h4 className='fm-pr-hd'>STUDENT'S DETAILS</h4>
                            <div className="col-md-6">
                                <div className="student-details" style={{ textAlignLast: 'left' }}>
                                    <div>
                                        <p className='sd-p'>Reg No</p>
                                        <p className='n-p-t'>{selectedStudent?.permanent_registration_number}</p>
                                    </div>
                                    <div>
                                        <p className='sd-p'>Name</p>
                                        <p className='n-p-t'>{selectedStudent?.student_name}</p>
                                    </div>
                                    <div>
                                        <p className='sd-p'>Phone</p>
                                        <p className='n-p-t'>{selectedStudent?.primary_contact_number}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="student-details" style={{ textAlignLast: 'left' }}>
                                    <div>
                                        <p className='sd-p'>Course</p>
                                        <p className='n-p-t'>{selectedStudent?.course_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div className="row mt-3 d-flex justify-content-center m-auto">
                                <div className="col-md-10">
                                    <div className="payment-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <div className='row'>
                                            <div className="col-md-4">
                                                <label className='form-labell'>Payment Date<span className='astrisk'>*</span></label>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="date" className='form-control fm-modal' />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className='form-labell'>Mode of Payment<span className='astrisk'>*</span></label>
                                            </div>
                                            <div className="col-md-8">
                                                <select className='form-control fm-modal'>
                                                    <option>Credit Card</option>
                                                    <option>Debit Card</option>
                                                    <option>Net Banking</option>
                                                    <option>UPI</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className='form-labell'>Amount<span className='astrisk'>*</span></label>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" className='form-control fm-modal' value={amount.toFixed(2)} readOnly />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12 d-flex justify-content-end align-items-center mt-3">
                                                <button type="button"
                                                    disabled={!selectedStudentId}

                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: "10px",
                                                        cursor: selectedStudentId ? 'pointer' : 'not-allowed',
                                                        backgroundColor: selectedStudentId ? '#7F56DA' : '#d3d3d3',
                                                    }}


                                                    onClick={openFeeDiscountModal}>
                                                    Apply Discount
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className='form-labell'>Any Discount<span className='astrisk'>*</span></label>
                                            </div>
                                            <div className="col-md-8">
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <input type="number" className='form-control fm-modal' value={discount} onChange={(e) => setDiscount(e.target.value)} style={{ width: '30%' }} />
                                                    <div style={{ display: 'flex', marginLeft: '10px', gap: '20px' }}>
                                                        <label>
                                                            <input type="radio" checked={isPercentage} onChange={() => setIsPercentage(true)} /> %
                                                        </label>
                                                        <label>
                                                            <input type="radio" checked={!isPercentage} onChange={() => setIsPercentage(false)} /> Value
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className='form-labell'>Total Payment<span className='astrisk'>*</span></label>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" className='form-control fm-modal' value={calculateTotal().toFixed(2)} readOnly />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className='form-labell'>Amount in words</label>
                                            </div>
                                            <div className="col-md-8">
                                                <p><strong>Twenty-two thousand four hundred ninety</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions" style={{ position: 'sticky', background: 'white', display: 'flex', alignItems: 'center' }}>
                                <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={handleNewFee}>
                                    Receive & New
                                    {/* <img src={next} alt="next" /> */}
                                </button>
                                <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={handleAddandCloseFee}>
                                    Receive & Close <img src={close} alt="next" style={{ color: "white !important" }} />
                                </button>
                            </div>
                        </>
                    </div>
                </div>

                <VerifyDiscountPayment isOpen={showDiscountModal} onClose={closeFeeDiscountModal} />
            </div>
        </>
    );
};


