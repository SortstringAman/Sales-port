import { useEffect, useState } from 'react'
import close from '../../../assets/icons/close.svg';
import search from '../../../assets/icons/iconamoon_search-light.svg';
import imagePlaceholder from '../../../assets/Images/image 17.png';
import add from '../../../assets/icons/add.svg';
import deletered from '../../../assets/icons/deletered.svg';
import previous from '../../../assets/icons/previous.svg';
import next from '../../../assets/icons/icon.svg';
import savedraft from '../../../assets/icons/savedraft.svg';
import Select from 'react-select';
import { components } from 'react-select';
import { getData, Postdata } from '../../../API/GlobalApi';
// import 'react-select/dist/react-select.css';


export const AcademicDetails = ({ onClose, currentStep, setCurrentStep, handlePrev, handleNext, steps, studentid, academicdata, selectedUserId,isEditMode,mainnamehead,registrationnumforhead }) => {

    const [masterdata, setmasterdata] = useState();
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const [qualifications, setQualifications] = useState([
        {
            id: 0,
            course_name: '',
            qualification_type: 'SSC',
            board: '',
            college: '',
            year_of_admission: '',
            year_of_passing: '',
            percentage: '',
            // qualifying_subjects: [{ subject: '' }],
            subjects: '',
        }
    ]);
    const displayToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setTimeout(() => setShowToast(false), 3000);
    };
    const handleAcademicChange = (e, index) => {
        const { name, value } = e.target;
        const updated = [...qualifications];
        updated[index][name] = value;
        setQualifications(updated);
    };
    const addQualification = () => {
        setQualifications([
            ...qualifications,
            {
                id: 0,
                course_name: '',
                qualification_type: 'SSC',
                board: '',
                college: '',
                year_of_admission: '',
                year_of_passing: '',
                percentage: '',
                // qualifying_subjects: [{ subject: '' }],
                subjects: '',
            },
        ]);
    };
    const removeQualification = (index) => {
        const updated = qualifications.filter((_, i) => i !== index);
        setQualifications(updated);
    };
    const CustomValueContainer = ({ children, ...props }) => {
        return <components.ValueContainer {...props}>{null}</components.ValueContainer>;
    };
    const getmasterdata = async () => {
        console.log('hiii')
        let url = 'students/student-onboarding-qualification-details/get-master-data/';
        const res = await getData(url);
        if (res) {
            setmasterdata(res.master)
        }
    }
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
    const handleSubmit = async () => {
        const studentId = studentid || sessionStorage.getItem('studentid');
        const payload = {
            student_id: studentId || selectedUserId,
            qualifications: qualifications?.map(q => ({
                ...q,
                qualifying_subjects: q.subjects
                    .split(',')?.map(subject => ({ subject: subject.trim() })),
            }))
        };
        // if 
        // (qualifications.course_name.length > 0 && qualifications.qualification_type > 0 && qualifications.board.length > 0 && qualifications.college.length > 0 && qualifications.year_of_admission.length > 0 && qualifications.grade > 0 && qualifications.subjects.length > 0

        // ) 
        if (
            qualifications.length > 0 &&
            qualifications.every(q =>
                q.course_name?.trim() &&
                q.qualification_type?.trim() &&
                q.board?.trim() &&
                q.college?.trim() &&
                q.year_of_admission &&
                q.percentage?.toString().trim() &&
                q.subjects?.trim()
            )
        ) {
            const url = 'students/student-onboarding-qualification-details/';
            const res = await Postdata(url, payload);

            if (!res.error) {
                displayToast("Academic Details Submit Successfully", 'success');
                await new Promise(resolve => setTimeout(resolve, 200));
                return true;
            }
            else {
                // alert(res.error)
                displayToast(res.error, 'danger');
            }
        }
        else {
            // alert('Please fill all the required fields')
            displayToast("Please fill all the required fields", 'danger');
        }

    };


    useEffect(() => {
        // console.log("Hiiiiiiiiiiiiiiiiaccdeta")
        (async () => {
            const studentId = studentid || sessionStorage.getItem('studentid');
            console.log('Calling getmasterdata...');
            await getmasterdata();

            if (studentId) {
                const url = `students/get-student-onboarding-qualification-details/${studentId}/`;
                const res = await getData(url);

                if (res && res.qualifications) {
                    const formatted = res.qualifications?.map(q => ({
                        id: q.id || 0,
                        course_name: q.course_name || '',
                        qualification_type: q.qualification_type || 'SSC',
                        board: q.board || '',
                        college: q.college || '',
                        year_of_admission: q.year_of_admission || '',
                        year_of_passing: q.year_of_passing || '',
                        percentage: q.percentage || '',
                        subjects: q.qualifying_subjects?.map(s => s.subject).join(', ') || ''
                    }));
                    setQualifications(formatted);
                }
            }
        })();
    }, []);

    useEffect(() => {
        if (academicdata && academicdata.qualifications?.length > 0) {
            const formatted = academicdata.qualifications?.map(q => ({
                id: q.id || 0,
                course_name: q.course_name || '',
                qualification_type: q.qualification_type || 'SSC',
                board: q.board || '',
                college: q.college || '',
                year_of_admission: q.year_of_admission || '',
                year_of_passing: q.year_of_passing || '',
                percentage: q.percentage || '',
                subjects: q.qualifying_subjects?.map(s => s.subject).join(', ') || ''
            }));
            setQualifications(formatted);
        }
    }, [academicdata]);
    // useEffect(async()=>{
    //     let url=`students/get-student-onboarding-qualification-details/${studentid || selectedUserId}/`
    //     let res= await getData(url);

    // },[])



    return (
        <>
            <div className="col-md-10" style={{ height: "77vh", overflowY: 'scroll' }}>
                <div style={{ position: 'sticky', top: 0, background: "#fff",paddingBottom:"25px" }}>
                    <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h2 className='text-primary'>{mainnamehead} {registrationnumforhead?`(${registrationnumforhead})`:''}</h2>
                        <button className="close-btn pt-0" onClick={() => { onClose(); setCurrentStep(0); clearsessiondata() }}><img src={close}style={{padding:"4px",background:'#F2F3F4',borderRadius:'50%'}}></img></button>
                    </div>
                </div>
                <form className="">
                    <div>
                        <h4 className='fm-pr-hd mt-0'>PREVIOUS EDUCATIONAL DETAILS</h4>
                    </div>
                    {qualifications && qualifications?.map((val, index) => {
                        return (<>
                            <div className="row" >
                               
                                <div className="col-md-4">
                                    <label className='form-labell'>Qualification Type<span className='astrisk'>*</span></label>
                                    <select className='fm-modal form-control form-select' onChange={(e) => handleAcademicChange(e, index)} name='qualification_type' value={qualifications[index].qualification_type}>
                                        <option value="0">Select Qualification Type</option>
                                        {
                                            masterdata && masterdata?.qualification_type?.map((value, ind) => {
                                                let displayValue = value;
                                                if (value === 'HSC') displayValue = 'HSC (Intermediate)';
                                                if (value === 'SSC') displayValue = 'SSC (HighSchool)';
                                            
                                                return (
                                                  <option value={value} key={ind}>{displayValue}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className='form-labell' style={{marginTop:'0px',marginBottom:'2px'}}>Course/Program<span className='astrisk'>*</span>
                                    <small style={{ fontWeight: '10px' }}> (for eg: Highschool/Intermediate/BSC(IT))</small></label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Course/Program"
                                        value={qualifications[index].course_name}
                                        name='course_name'
                                        onChange={(e) => handleAcademicChange(e, index)} />
                                </div>
                                <div className="col-md-4">
                                    <label className='form-labell'>Name of the Institution<span className='astrisk'>*</span></label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Name of the Institution"
                                        value={qualifications[index].college}
                                        name='college'
                                        onChange={(e) => handleAcademicChange(e, index)} />
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-6">
                                    <label className='form-labell'>Board/University<span className='astrisk'>*</span></label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Board/University"
                                        value={qualifications[index].board}
                                        name='board'
                                        onChange={(e) => handleAcademicChange(e, index)} />
                                </div>
                                <div className="col-md-6">
                                    <label className='form-labell'>Subjects<small style={{ fontWeight: '10px' }}> (for eg: Hindi, English, Math)</small><span className='astrisk'>*</span></label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Subjects"
                                        value={qualifications[index].subjects}
                                        name='subjects'
                                        onChange={(e) => handleAcademicChange(e, index)} />
                                </div>
                                {/* <div className="col-md-6">
                                    <label className='form-labell'>Subjects Taken<span className='astrisk'>*</span></label>
                                    <Select
                                        id='Subjects'
                                        isMulti
                                        name="subjects"
                                        options={options}
                                        value={selectedSubjects}
                                        onChange={handleChange}
                                        closeMenuOnSelect={false}
                                        // components={{ MultiValueRemove: customRemoveIcon }}
                                        placeholder="Select Subjects"
                                        // hideSelectedOptions={true} 
                                        components={{
                                            ValueContainer: CustomValueContainer, // Prevent rendering of selected tags inside the input
                                        }}

                                    />
                                    <div className="selected-tags mt-3">
                                        {selectedSubjects.map((subject, index) => (
                                            <span key={index} className="tag">
                                                {subject.label}
                                                <span
                                                    className="remove-tag"
                                                    onClick={() => {
                                                        setSelectedSubjects(
                                                            selectedSubjects.filter((item) => item.value !== subject.value)
                                                        );
                                                    }}
                                                >
                                                    &times;
                                                </span>
                                            </span>
                                        ))}
                                    </div>

                                </div> */}
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <label className='form-labell'>Year of Admission<span className='astrisk'>*</span></label>
                                    {/* <input type="text" className='fm-modal form-control' placeholder="Enter Year Of Admission"
                                        value={qualifications[index].year_of_admission}
                                        name='year_of_admission'
                                        onChange={(e) => handleAcademicChange(e, index)} /> */}

                                    <select
                                        className='fm-modal form-control form-select'
                                        value={val.year_of_admission}
                                        onChange={(e) => handleAcademicChange(e, index)}
                                        name='year_of_admission'
                                    >
                                        <option value="">Select</option>
                                        {Array.from({ length: 2025 - 1957 + 1 }, (_, i) => 2025 - i)?.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>

                                </div>  <div className="col-md-3">
                                    <label className='form-labell'>Year of Passing</label>
                                    {/* <input type="text" className='fm-modal form-control' placeholder="Enter Year Of Admission"
                                        value={qualifications[index].year_of_passing}
                                        name='year_of_passing'
                                        onChange={(e) => handleAcademicChange(e, index)} /> */}

                                    <select
                                        className='fm-modal form-control form-select'
                                        value={val.year_of_passing}
                                        onChange={(e) => handleAcademicChange(e, index)}
                                        name='year_of_passing'
                                    >
                                        <option value="">Select</option>
                                        {Array.from({ length: 2025 - 1957 + 1 }, (_, i) => 2025 - i)
                                            .filter(year => !val.year_of_admission || year >= parseInt(val.year_of_admission))
                                            .map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                    </select>
                                </div>
                                {/* <div className="col-md-2">
                                    <label className='form-labell'>Marks/Grade Obtained<span className='astrisk'>*</span></label>
                                    <input type="text" className='fm-modal form-control' placeholder="Enter Marks or Percentage"
                                        value={qualifications[index].grade}
                                        name='grade'
                                        onChange={(e) => handleAcademicChange(e, index)} />
                                </div> */}
                                <div className="col-md-3">
                                    <label className='form-labell'>Percentage/Grade<span className='astrisk'>*</span></label>
                                    <input type="text" className='fm-modal form-control' value={qualifications[index].percentage} name='percentage' placeholder="Enter Percentage/Grade"
                                        onChange={(e) => {
                                            const input = e.target.value;
                                            if (input.length <= 6) {
                                                handleAcademicChange(e, index);
                                            }
                                        }} />
                                </div>
                            </div>

                            <div className="col-md-5 input-group2" style={{marginTop:'5px'}} >
                                {index !== 0 && (
                                    <p className='Removebtn' onClick={() => removeQualification(index)}><img src={deletered}></img>Remove</p>
                                )}
                            </div>
                        </>
                        )
                    })}

                    <div onClick={addQualification} style={{ cursor: 'pointer' }}>
                        <h4 className='fm-pr-hd'>  <svg width="10" height="10" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="#7F56DA" />
                        </svg> Add More</h4>
                    </div>
                </form>
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
