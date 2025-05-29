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
import { getData, patchData } from '../../../API/GlobalApi';
// import 'react-select/dist/react-select.css';


export const OfficialInformation = ({ onClose, currentStep, setCurrentStep, handlePrev, handleNext, steps, setsubmit, studentid, officialdata, selectedUserId, mainnamehead ,setgeneratedregno,registrationnumforhead,regMode}) => {

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [org, setorg] = useState([]);
  const [coursedata, setcoursedata] = useState([]);
  const [classdata, setclassdata] = useState([]);
  const [courseid, setcourseid] = useState(null);
  const [classid, setclassid] = useState(null);
  const [academicgroupid, setacademicgroupid] = useState(null);
  const [academicgroupdata, setacademicgroupdata] = useState([]);
  const [orgid, setorgid] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [confirmreg, setconfirmreg] = useState(false);
  const studentId = studentid || sessionStorage.getItem('studentid');
  const displayToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    setTimeout(() => setShowToast(false), 3000);
  };

  const getorgdata = async () => {
    const url = "administration/organizations/";
    const response = await getData(url);
    if (response) {
      console.log("responseorg---", response)
      setorg(response);
    }
  }
  const handleChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions);
  };
  const getcourselist = async () => {

    let url = `students/get-course-list-by-organization/?organization_id=${orgid}`;
    let res = await getData(url);
    if (res) {
      setcoursedata(res);
    }
  }
  const getspclist = async () => {
    let url = `students/get-academic-group-list-by-specialization/?specialization_id=${courseid}`;
    let res = await getData(url);
    if (res) {
      setclassdata(res);
    }
  }
  const handleChangenest = async (e) => {
    const { name, value } = e.target;
    if (name === "org") {
      setorgid(value);
      if (value) {
        let url = `students/get-course-list-by-organization/?organization_id=${value}`;
        let res = await getData(url);
        if (res) {
          setcoursedata(res);
        }
      }
    }
    // if (name === 'course_name') {
    //   setcourseid(value)
    //   let url = `students/get-academic-group-list-by-specialization/?specialization_id=${value}`;
    //   let res = await getData(url);
    //   if (res) {
    //     setclassdata(res);
    //   }
    // }
    if (name === 'course_name') {
      setcourseid(value)
      let url = `students/get-academic-groups-by-specialization/?specialization_id=${value}`;
      let res = await getData(url);
      if (res) {
        setacademicgroupdata(res);
      }
    }
    if (name === 'academicgroup') {
      setacademicgroupid(value)
      let url = `students/get-least-academic-groups-by-academic-group/?academic_group_id=${value}`;
      let res = await getData(url);
      if (res) {
        setclassdata(res);
      }
    }
    if (name === 'class') {
      setclassid(value)

    }
  }
  // const handleSubmit = () => {

  //   const finalobj = {
  //     lag: classid
  //   }
  //   let url = `students/student-onboarding-official-details/${studentid || selectedUserId}/`;
  //   let res = patchData(url, finalobj);
  //   if (res) {
  //     setCurrentStep(0);
  //     onClose();
  //     if (!selectedUserId) {

  //       setsubmit(true);
  //     }
  //     alert('Form Updated Successfully')
  //   }

  //   console.log('submit clicked')
  // }
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
    if (!orgid || !courseid || !classid) {
      let missingFields = [];

      if (!orgid) missingFields.push('Organisation');
      if (!courseid) missingFields.push('Course Name');
      if (!classid) missingFields.push('Class');

      // alert(`Please select the following field(s): ${missingFields.join(', ')}`);         
      displayToast('Fill All Required Fields', 'danger');
      return;
    }


    const finalobj = {
      lag: classid
    };

    const url = `students/student-onboarding-official-details/${studentId || selectedUserId}/`;
    const res = await patchData(url, finalobj);

    console.log("response after confirme",res)

    if (res) {
      setgeneratedregno(res.permanent_registration_number);

      if (selectedUserId) {
        setsubmit(true);
      }

      displayToast('Official Information submitted successfully', 'success');
      await new Promise(resolve => setTimeout(resolve, 200));
      setCurrentStep(0);
      clearsessiondata()
      onClose();
    } else {
      // alert('Something went wrong while submitting. Please try again.');
      displayToast('Something went wrong', 'danger');
    }
  };


  const CustomValueContainer = ({ children, ...props }) => {
    return <components.ValueContainer {...props}>{null}</components.ValueContainer>;
  };

  useEffect(() => {
    getorgdata()
  }, [])

  // useEffect(()=>{
  //   getcourselist()
  // },orgid)
  // useEffect(()=>{
  //   getspclist()
  // },courseid)
  // useEffect(() => {
  //    {
  //     const orgId = officialdata.lag.academic_group.specialization.course.organization.id;
  //     const courseId = officialdata.lag.academic_group.specialization.id;
  //     const classId = officialdata.lag.academic_group.id;
  //     const lagId = officialdata.lag.id;

  //     const fetchDropdowns = async () => {
  //       setorgid(orgId);
  //       setcourseid(courseId)
  //       // const courses = await getData(`students/get-course-list-by-organization/?organization_id=${orgId}`);
  //       // setcoursedata(courses);

  //       // setcourseid(courseId);
  //       // const classes = await getData(`students/get-academic-group-list-by-specialization/?specialization_id=${courseId}`);
  //       const academicgroup = await getData(`students/get-academic-groups-by-specialization/?specialization_id=${courseId}`);
  //       // setclassdata(classes);
  //       setacademicgroupdata(academicgroup)

  //       // setclassid(lagId);
  //     };

  //     fetchDropdowns();
  //   }
  // }, [officialdata]);
  useEffect(() => {
    const fetchOfficialData = async () => {
      const url = `students/get-student-onboarding-official-details/${studentId || selectedUserId}/`;
      const res = await getData(url);

      if (res) {
        const orgId = res.provisional_academic_group.specialization.course.organization.id;
        const courseId = res?.provisional_academic_group?.specialization?.id;
        // const classId = res.lag.id;
        const academicGroupId = res.lag?.academic_group?.id;
        const classId = res.lag?.id;
        console.log("CLASSid--",classId)

        // Set values for controlled selects
        setorgid(orgId);
        setcourseid(courseId);
        setacademicgroupid(academicGroupId);
        setclassid(classId)
        // setclassid(classId);

        // Populate dropdowns accordingly
        const courses = await getData(`students/get-course-list-by-organization/?organization_id=${orgId}`);
        setcoursedata(courses);

        const academicgrp = await getData(`students/get-academic-groups-by-specialization/?specialization_id=${courseId}`);
        // setclassdata(classes);
        setacademicgroupdata(academicgrp)

        let url = `students/get-least-academic-groups-by-academic-group/?academic_group_id=${academicGroupId}`;
        let resp = await getData(url);
        setclassdata(resp);
      }
    };

    fetchOfficialData();
  }, [currentStep]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let url = `students/get-least-academic-groups-by-academic-group/?academic_group_id=${courseid}`;
  //     let res = await getData(url);
  //     if (res) {
  //       setclassdata(res);
  //       setacademicgroupdata(res)
  //     }
  //   };

  //   if (courseid) {
  //     fetchData();
  //   }
  // }, [courseid]);

  return (
    <>
      <div className="col-md-10" style={{ height: "77vh", overflowY: 'scroll' }}>
        <div style={{ position: 'sticky', top: 0, background: "#fff" }}>
          <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className='text-primary'>{mainnamehead} {registrationnumforhead?`(${registrationnumforhead})`:''}</h2>
            <button className="close-btn" onClick={() => {
              onClose(); setCurrentStep(0);
              clearsessiondata()
            }}><img src={close} style={{padding:"4px",background:'#F2F3F4',borderRadius:'50%'}}></img></button>
          </div>
        </div>
        <div className="row" >
          <div className="col-md-6">
            <label className='form-labell'>Institution Name</label><span className='astrisk'>*</span>
            <select className='fm-modal form-control form-select' onChange={handleChangenest} name='org' value={orgid} disabled={regMode? true:false}>
              <option value=''>Select Institution Name</option>
              {org && org?.map((val, ind) => {
                // console.log("val--", val)
                return (<>
                  <option key={ind} value={val.id}
                  >{val.name}</option>
                </>
                )
              })}
            </select>
          </div>
          {/* <div className="col-md-6">
              <label className='form-labell'>Session Year<span className='astrisk'>*</span></label>
              <select className='fm-modal form-control form-select' >
                <option value="0">Select Year</option>
                <option value="1">Mr</option>
                <option value="2">Mrs</option>
                <option value="2">Ms</option>
              </select>
            </div> */}
          <div className="col-md-6">
            <label className='form-labell'>Course Name</label><span className='astrisk'>*</span>
            <select className='fm-modal form-control form-select' onChange={handleChangenest} name='course_name' value={courseid} disabled={regMode? true:false}>
              <option value=''>Select Course Name</option>
              {coursedata && coursedata?.map((val, ind) => {
                // console.log("val--", val)
                return (<>
                  <option key={ind} value={val?.id}
                  >{val.course_specialization}</option>
                </>
                )
              })}
            </select>
          </div>

        </div>
        <div className="row" >
          {/* <div className="col-md-6">
              <label className='form-labell'>Course Name<span className='astrisk'>*</span></label>
              <select className='fm-modal form-control form-select' >
                <option value="0">Select Course</option>
                <option value="1">Mr</option>
                <option value="2">Mrs</option>
                <option value="2">Ms</option>
              </select>
            </div> */}
          <div className="col-md-6">
            <label className='form-labell'>Academic Group</label><span className='astrisk'>*</span>
            <select className='fm-modal form-control form-select' onChange={handleChangenest} name='academicgroup' value={academicgroupid} >
              <option value=''>Select Academic Group </option>
              {academicgroupdata && academicgroupdata?.map((val, ind) => {
                // console.log("val--", val)
                return (<>
                  <option key={ind} value={val.id}
                  >{val.name}</option>
                </>
                )
              })}
            </select>
          </div>
          <div className="col-md-6">
            <label className='form-labell'>Class</label><span className='astrisk'>*</span>
            <select className='fm-modal form-control form-select' onChange={handleChangenest} name='class' value={classid} >
              <option value=''>Select Class </option>
              {classdata && classdata?.map((val, ind) => {
                // console.log("val--", val)
                return (<>
                  <option key={ind} value={val.id} disabled={val.is_limit_full}
                  >{val?.name} ({val.registered_students}/{val.intake_limit}) {val.is_limit_full?'Intake Capacity Reached':''}</option>
                </>
                )
              })}
            </select>
          </div>
        </div>
        {/* <div className="row">
            <div className="col-md-6">
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
            </div>
          </div> */}
      </div>
      <div className="form-actions" style={{ position: 'sticky', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: "flex", gap: '20px' }}>
          <button type="button" onClick={() => { handlePrev() }} style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
            disabled={currentStep === 0}><img src={previous}></img>Previous</button>
          {/* <p style={{ cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: 'red', margin: 0 }}><img src={savedraft}></img>Save to Draft</p> */}
        </div>
        <div>
          {regMode?
             <button type="btn" style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
             // onClick={async () => {
             //   // handleNext(); handleSubmit() 
             //   const success = await handleSubmit();  // ✅ first await submission
             //   if (success) {
             //     handleNext();  // ✅ only move next if form successfully submitted
             //   }
             // }}
             onClick={() => setconfirmreg(true)}
           >Submit</button>:
           <button type="btn" style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
           onClick={async () => {
             // handleNext(); handleSubmit() 
             const success = await handleSubmit();  // ✅ first await submission
             if (success) {
               handleNext();  // ✅ only move next if form successfully submitted
             }
           }}
          //  onClick={() => setconfirmreg(true)}
         >Submit</button>}
         
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
      {confirmreg&&regMode ? <div className="modal-overlay">
        <div className="modal-content mc-cus" >
          {/* <h3>Admission Confirmed</h3> */}
          <p style={{fontSize:'16px'}}>
            Do you want to confirm the admission?
          </p>
          <div style={{display:'flex',justifyContent:'end',gap:'5px',marginTop:'20px'}}>
            <button type="btn" style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
              onClick={() => setconfirmreg(false)}
            >No</button>
            <button type="btn" style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
              onClick={async () => {
                // handleNext(); handleSubmit() 
                const success = await handleSubmit();  // ✅ first await submission
                if (success) {
                  handleNext();  // ✅ only move next if form successfully submitted
                }
              }}
            // onClick={() => setconfirmreg(true)}
            >Yes</button>
          </div>
        </div>
      </div> : ''}

    </>
  )
}
