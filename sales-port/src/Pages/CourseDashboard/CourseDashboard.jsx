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
import { CourseShortDetails } from './CourseShortDetails.jsx';
import { useNavigate } from 'react-router-dom';
import { AddOrganisationModal } from '../../Component/Modals/AddOrganisationModal.jsx';
import { getData, patchData, Postdata, PostdataWithJson, updateData } from '../../API/GlobalApi.js';
import { AddCourse } from '../../Component/Modals/AddCourse.jsx';

export const CourseDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpendept, setIsModalOpendept] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [dnparentdata, setdnparentdata] = useState([]);
  const [classPage, setClassPage] = useState(0);
  const [classTotalCount, setClassTotalCount] = useState(0);
  const [classData, setClassData] = useState([]);
  const [dnparentdata2, setdnparentdata2] = useState([]);
  const [countryId, setcountryId] = useState(null);
  const [countrydata, setcountrydata] = useState([]);
  const [statedata, setstatedata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [stateid, setstateid] = useState(null);
  const [cityid, setcityid] = useState(null);
  const [selectedOrgDetails, setSelectedOrgDetails] = useState([]);
  const [departmentdetails, setdepartmentdetails] = useState(null);
  const [parentorgid, setparentorgid] = useState(null);
  const [parentorgidsub, setparentorgidsub] = useState(null);
  const [Updatebtn, setUpdatebtn] = useState(false);
  const [status, setStatus] = useState(false);
  const [masterdata, setmasterdata] = useState([]);
  const [orgform, setorgform] = useState({
    name: "",
    level: "",
    mode: "",
    mode_count: null,
    duration: null,
    organization_id: null,
    status: false,
    alias: ""

  })
  const [deptform, setdeptform] = useState({
    id: null,
    name: "",
    course_code: "",
    semester_fee: "",
    provisional_fee: "",
    intech_capacity: null
  })
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate();

  const isRequired = (val) => {
    if (typeof val === 'string') {
      return val.trim() !== '';
    }
    return val !== null && val !== undefined && val !== '';
  };


  const [isCourseSearching, setIsCourseSearching] = useState(false);
  const [filteredCourseData, setFilteredCourseData] = useState([]);
  const handleSearch = async (query) => {
    if (!query) {
      // Reset to paginated view
      setFilteredCourseData([]);
      setIsCourseSearching(false);
      return;
    }

    setIsCourseSearching(true);
    const searchURL = `academics/courses/?name=${encodeURIComponent(query)}`;
    const response = await getData(searchURL);

    if (response?.results?.length > 0) {

      const results = response.results?.map((course) => ({
        id: course.id,
        name: course.name,
        alias: course.alias,
        level: course.level,
        mode: course.mode,
        duration: course.duration,
        organization: course.organization,
        status: course.status,
        organization_id: course.organization_id,
        mode_count: course.mode_count,
        handleRowClick: handleRowClick
      }));

      setFilteredCourseData(results);
    } else {
      setFilteredCourseData([]);
    }
  };


  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  const displayToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000);
  };
  const getmasterdata = async () => {
    const url = "academics/courses/get-master-data/";
    const response = await getData(url);
    if (response) {
      setmasterdata(response);

    }
  }
  const getorgdata = async (page = 0, updatedRowId = null) => {
    const url = `academics/courses/?page=${page + 1}`;
    const response = await getData(url);
    console.log("respomse in course", response)
    if (response) {
      const results = response.results;

      // Find updated row object or fallback to first row
      let selectedOrg = results[0];
      if (updatedRowId) {
        const updatedRow = results.find(item => item.id === updatedRowId);
        if (updatedRow) selectedOrg = updatedRow;
      }

      setClassData(results);
      setClassTotalCount(response.count || 0);
      setdnparentdata(results);
      setSelectedOrgDetails(selectedOrg);
      getdeptdata(selectedOrg?.id);
    }
  };




  const pageSize = 10;

  const classPageCount = Math.ceil(classTotalCount / pageSize);

  useEffect(() => {
    getorgdata(classPage);
  }, [classPage]);


  
  const [currentClassPage, setCurrentClassPage] = useState(0);

  const handleClassPageChange = ({ selected }) => {
    setCurrentClassPage(selected);
    getorgdata(selected); // Load data for the selected page
  };

  const getorgdata2 = async () => {
    const url = "administration/organizations/";
    const response = await getData(url);
    if (response) {
      setdnparentdata2(response);

    }

  }
  const getdeptdata = async (res) => {
    setparentorgid(res);
    const url = `academics/courses/${res}/specializations/`;
    const response = await getData(url);
    if (response) {
      setdepartmentdetails(response.results);
    }
  }
  const getcountry = async () => {
    const url = "administration/countries/";
    const response = await getData(url);
    setcountrydata(response)

  }
  const handlelocationdata = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "country") {
      setcountryId(value)

      try {
        const url = `administration/countries/${value}/states/`
        // Make an API call to get states for the selected country
        const response = await getData(url); // Replace with your actual state API URL
        if (response) {
          setstatedata(response)
        }
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    }
    else if (name === 'state') {
      setstateid(value)
      try {
        const url = `administration/countries/${countryId}/states/${value}/cities/`
        // Make an API call to get states for the selected country
        const response = await getData(url); // Replace with your actual state API URL
        if (response) {
          setcitydata(response)
        }
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    }
    else if (name === 'city') {
      setcityid(value)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      // Allow letters, spaces, and special characters, but not starting with a digit
      if (/^\d/.test(value)) return; // Prevent starting with digit
      const validName = value.replace(/[^a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>-]/g, ''); // Allow letters, numbers, spaces, and special characters
      setorgform(prev => ({ ...prev, [name]: validName }));

    } else if (name === 'duration' || name === 'mode_count') {
      // Allow only digits for duration and mode_count
      const validNumber = value.replace(/\D/g, '');
      setorgform(prev => ({ ...prev, [name]: validNumber }));
    } else if (name === 'alias') {
      if (/^\d/.test(value)) return; // Prevent starting with digit
      const validName = value.replace(/[^a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>-]/g, '');
      setorgform(prev => ({ ...prev, [name]: validName }));
    }
    else {
      // Handle other fields as usual
      setorgform(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleChangedept = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      // Allow only alphabets and spaces
      const validName = value.replace(/[^a-zA-Z0-9 .\-&()]/g, '');
      setdeptform(prev => ({ ...prev, [name]: validName }));
    } else if (
      name === 'semester_fee' ||
      name === 'provisional_fee' ||
      name === 'intech_capacity'
    ) {
      // Allow only digits
      const validNumber = value.replace(/\D/g, '');
      setdeptform(prev => ({ ...prev, [name]: validNumber }));

    } else {
      // Allow all other inputs (like course_code) as-is
      setdeptform(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!isRequired(orgform.organization_id)) return displayToast('Institution is required', 'danger');
    if (!isRequired(orgform.name)) return displayToast('Course Name is required', 'danger');
    if (!isRequired(orgform.level)) return displayToast('Level is Required', 'danger');
    if (!isRequired(orgform.mode)) return displayToast('Mode is required', 'danger');
    if (!isRequired(orgform.mode_count)) return displayToast('Mode count is required', 'danger');
    if (!isRequired(orgform.duration)) return displayToast('Duration is required', 'danger');
    if (!isRequired(orgform.alias)) return displayToast('Alias is required', 'danger');


    const finalobj = {
      name: orgform.name,
      level: orgform.level,
      mode: orgform.mode,
      mode_count: parseInt(orgform.mode_count),
      duration: orgform.duration,
      organization_id: parseInt(orgform.organization_id),
      alias: orgform.alias

    }

    const url = 'academics/courses/';
    const response = await PostdataWithJson(url, finalobj);
    console.log("response in creatin courese", response)
    if (response && !response.error) {
      displayToast('Course Added successfully!', 'success');
      getorgdata();
      closeModal();
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error Adding Course.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
  }

  const handleSubmitdept = async () => {

    if (!isRequired(deptform.name)) return displayToast('Specialization Name is required', 'danger');
    if (!isRequired(deptform.course_code)) return displayToast('Course is Required', 'danger');
    // if (!isRequired(deptform.semester_fee)) return displayToast('SemhandleSubmit,ester fee is required', 'danger');
    // if (!isRequired(deptform.provisional_fee)) return displayToast('Provisional Fee is required', 'danger');
    if (!isRequired(deptform.intech_capacity)) return displayToast('Intech Capacity is required', 'danger');

    const finalobj = {
      id: deptform.id,
      name: deptform.name,
      course_code: deptform.course_code,
      semester_fee: deptform.semester_fee,
      provisional_fee: deptform.provisional_fee,
      intech_capacity: parseInt(deptform.intech_capacity)
    }
    console.log("final obj", finalobj)
    const url = `academics/courses/${parentorgid ? parentorgid : finalobj.id}/specializations/`;
    const response = await PostdataWithJson(url, finalobj);
    if (response && !response.error) {
      displayToast('Specialization Added successfully!', 'success');
      getdeptdata(parentorgid);
      closeModaldept();
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error Adding Specialization.';
      displayToast(errorMsg, 'danger');
    } else {
      console.log("error in add", response.error)
      displayToast('Unexpected error occurred.', 'danger');
    }
    // console.log("responsedept---",response);
  }
  const handleFilterClick = () => {
    // onFilter(searchQuery); 
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setUpdatebtn(false);
    handleClear();

  };
  const openModaldept = () => {
    setIsModalOpendept(true);
  };
  const closeModaldept = () => {
    setIsModalOpendept(false);
    handleCleardept();
    setUpdatebtn(false);
  };
  const submitclose = () => {
    setsubmit(false);
  };
  const handleRowClick = (orgId, row) => {
    let selectedOrg = null;
    console.log("row--", row.original)

    if (row.original.id === orgId) {
      selectedOrg = row.original;
    }


    if (selectedOrg) {
      const { id, name, parent, email } = selectedOrg; // Only store necessary fields
      setSelectedOrgDetails(selectedOrg); // Set the selected organization details
      getdeptdata(id);
      setparentorgid(id);
      setdeptform({ id: id })

      // Store the simplified data in localStorage
      localStorage.setItem('selectedOrgDetails', JSON.stringify({ id, name, parent, email }));
    } else {
      console.error("Organization not found");
    }
  };
  const handleEdit = (row) => {
    const orgData = row.original;
    console.log("orgDataedit----", orgData);
    setorgform({
      id: orgData.id,
      name: orgData.name,
      level: orgData.level,
      mode: orgData.mode,
      mode_count: orgData.mode_count,
      duration: orgData.duration,
      organization_id: orgData.organization_id,
      alias: orgData.alias,
      // status:false
    });
    setparentorgidsub(orgData.id);
    openModal();
    setUpdatebtn(true);

  };
  const handleEditdept = (row) => {
    setdeptform(
      {
        id: row.id,
        name: row.name,
        course_code: row.course_code,
        semester_fee: row.semester_fee,
        provisional_fee: row.provisional_fee,
        intech_capacity: parseInt(row.intech_capacity)
      }
    )
    setUpdatebtn(true);
    openModaldept();
  }
  const handleupdatedept = async () => {
    if (!isRequired(deptform.name)) return displayToast('Specialization Name is required', 'danger');
    if (!isRequired(deptform.course_code)) return displayToast('Course is Required', 'danger');
    if (!isRequired(deptform.semester_fee)) return displayToast('Semester fee is required', 'danger');
    if (!isRequired(deptform.provisional_fee)) return displayToast('Provisional Fee is required', 'danger');
    if (!isRequired(deptform.intech_capacity)) return displayToast('Intech Capacity is required', 'danger');


    const finalobj = {
      id: deptform.id,
      name: deptform.name,
      course_code: deptform.course_code,
      semester_fee: deptform.semester_fee,
      provisional_fee: deptform.provisional_fee,
      intech_capacity: parseInt(deptform.intech_capacity)
    }
    const url = `academics/courses/${parentorgid}/specializations/${finalobj.id}/`

    const response = await updateData(url, finalobj);
    if (response && !response.error) {
      displayToast('Specialization Added successfully!', 'success');
      getdeptdata(parentorgid)
      closeModaldept()

    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error Adding Specialization.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
  }
  const handleUpdate = async () => {
    if (!isRequired(orgform.name)) return displayToast('Course Name is required', 'danger');
    if (!isRequired(orgform.level) || !isRequired(orgform.level)) return displayToast('Level is Required', 'danger');
    if (!isRequired(orgform.mode) || !isRequired(orgform.mode)) return displayToast('Mode is required', 'danger');
    if (!isRequired(orgform.mode_count)) return displayToast('Mode count is required', 'danger');
    if (!isRequired(orgform.duration)) return displayToast('Duration is required', 'danger');
    if (!isRequired(orgform.organization_id)) return displayToast('Organization is required', 'danger');
    if (!isRequired(orgform.alias)) return displayToast('Alias is required', 'danger');
    const finalobj = {
      id: orgform.id,
      name: orgform.name,
      level: orgform.level,
      mode: orgform.mode,
      mode_count: orgform.mode_count,
      duration: orgform.duration,
      organization_id: orgform.organization_id,
      alias: orgform.alias

    }
    const url = `academics/courses/${finalobj.id}/`
    const response = await updateData(url, finalobj);

    if (response && !response.error) {
      displayToast('Course Updated successfully!', 'success');
      // Pass current page and updated row id to getorgdata
      getorgdata(currentClassPage, selectedOrgDetails.id);
      setUpdatebtn(false);
      closeModal();
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error Updating Course.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
    console.log("responseupdate-----", response)
  }



  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);


  const data2 = useMemo(() => {
    return dnparentdata && dnparentdata?.map((org) => ({
      id: org.id,
      name: org.name,
      level: org.level,
      mode: org.mode,
      alias: org.alias,
      mode_count: org.mode_count,
      duration: org.duration,
      organization_id: org.organization_id,
      organization: org.organization,
      status: org.status,
      handleRowClick: handleRowClick
    }));
  }, [dnparentdata])

  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return data2;
    }

    if (!searchQuery.trim()) {
      return data2;
    }

    const lowerSearch = searchQuery.toLowerCase();
    return data2?.filter((org) =>
      (org?.name || "").toLowerCase().includes(lowerSearch) ||
      (org?.organization || "").toLowerCase().includes(lowerSearch) ||
      (org?.mode || "").toLowerCase().includes(lowerSearch) ||
      (org?.level || "").toLowerCase().includes(lowerSearch) ||
      (org?.alias || "").toLowerCase().includes(lowerSearch)
    );

  }, [searchQuery, isSearching, searchResults, data2]);
  const handleClear = () => {
    setorgform(
      {
        orgname: '',
        parentorgidog: null,
        gstin: '',
        email: '',
        landlineno: '',
        mobileno: '',
        address: '',
        pincode: '',
        countrycode: '1'
      }
    )
    setparentorgidsub(null);
    setstateid(null);
    setcountryId(null);

  }
  const handleCleardept = () => {
    setdeptform({
      name: "",
      parent_department_id: null,
      country_code: "",
      area_code: '',
      landline: "",
      mobile: "",
      email: ""
    })
    setUpdatebtn(false);
  }
  const handleStatus = async (row) => {
    const newStatus = !row.original.status;  // Toggle status for that specific row
    // Update the status for that row in your table
    row.original.status = newStatus;

    // Optionally, make an API call here to update the status on the backend
    const url = `academics/courses/${row.original.id}/`;
    const response = await patchData(url, { status: newStatus });

    if (response && !response.error) {
      displayToast('Status Updated successfully!', 'success');
      getorgdata()
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error Updating Status.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
    // Log or handle response as needed
    console.log("Updated Status:", response);
  };
  const handleStatusDept = async (department) => {
    const newStatus = !department.status;

    // Update the status locally
    const updatedDepartmentDetails = departmentdetails?.map(dept => {
      if (dept.id === department.id) {
        return { ...dept, status: newStatus }; // Toggle the status of the selected department
      }
      return dept;
    });

    // Set the updated department details with the toggled status
    setdepartmentdetails(updatedDepartmentDetails);
    const url = `academics/courses/${parentorgid}/specializations/${department.id}/`; // Update department URL
    const response = await patchData(url, { status: newStatus });

    if (response && !response.error) {
      displayToast('Status Updated successfully!', 'success');
      // getorgdata()
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error Updating Status.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: <input type='checkbox' />,
        accessor: 'checkbox',
        Cell: ({ row }) => (
          <input type="checkbox" checked={row.isSelected} onChange={() => row.toggleRowSelected()}
            style={{ cursor: 'pointer' }} />
        ),
      },
      {
        Header: 'Course Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <div style={{ cursor: 'pointer', height: "100%", display: 'flex', alignItems: 'center' }} onClick={() => { handleRowClick(row.original.id, row) }}>
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.name}</p>
          </div>
        )
      },
      {
        Header: 'Alias',
        accessor: 'alias',
        Cell: ({ row }) => (
          <div style={{ cursor: 'pointer', height: "100%", display: 'flex', alignItems: 'center' }}>

            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.alias}</p>
          </div>
        )
      },

      {
        Header: 'Level',
        accessor: 'level',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.level}</p>
          </div>
        )
      },
      {
        Header: 'Mode',
        accessor: 'mode',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.mode}</p>
          </div>
        )
      },
      {
        Header: 'Semester Count',
        accessor: 'modecount',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.mode_count}</p>
          </div>
        )
      },
      {
        Header: 'Duration( in month)',
        accessor: 'duration',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.duration}</p>
          </div>
        )
      },
      {
        Header: 'Institution Name',
        accessor: 'organization',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.organization}</p>
          </div>
        )
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (<>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div class="form-check form-switch custom-switch"
            // onClick={console.log("rowswitch--", row.original.status)}
            >
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: 'pointer' }} checked={row.original.status} onChange={() => handleStatus(row)} />
            </div>
            <img src={edit} style={{ cursor: 'pointer' }} onClick={() => handleEdit(row)}></img>
          </div>
        </>
        ),
      },

    ],
    []
  );
  useEffect(() => {
    getorgdata();
    getcountry();
    getdeptdata();
    getmasterdata();
    getorgdata2();

  }, [])


  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  return (
    <>
      <div className="dashboard">
        {/* Content for the Dashboard */}
        {/* <div >
            <h2 className='main-heading'>Courses</h2>
          </div>
           */}
        <div className='row'>
          <div className="col-md-12 d-flex justify-content-end">
            <button className='add-btn' onClick={() => openModal()}><span className='me-2'>
              <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
              </svg>
            </span>Add New Course</button>
          </div>
        </div>

        <div className='row mt-5'>
          <div className="col-md-9">
            <div className="row" style={{ alignItems: 'center' }}>
              <div className="col-md-6">
                <h2 className='main-heading'>Courses ({classTotalCount})</h2>
              </div>
              <div className="col-md-6">
                <div style={{ display: "flex", justifyContent: 'end' }}>
                  {console.log("dnparend data for searcing", dnparentdata)}
                  <SearchBar data={dnparentdata} onSearch={handleSearch} ref={searchInputRef} placeholder="Search by Course name " /> {/*mode, level...   add this also*/}
                  {/* <button
                    className="filter-btn"
                    onClick={handleFilterClick}  >
                    <img src={filtericon}></img>
                  </button> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {
                  (isCourseSearching ? filteredCourseData.length : classData.length) > 0 ? (
                    <Table
                      data={
                        isCourseSearching
                          ? filteredCourseData
                          : classData?.map(item => ({
                            ...item,
                            handleRowClick: handleRowClick,
                          }))
                      }
                      columns={columns}
                      handlePageChange={!isCourseSearching ? handleClassPageChange : undefined}
                      pageCounts={!isCourseSearching ? classPageCount : 0}
                    />
                  ) : (


                    <div className="no-data-message" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                      {isCourseSearching ? 'No results found for your search.' : 'No data available.'}
                    </div>
                  )
                }


              </div>
            </div>
          </div>
          <div className="col-md-3">
            <CourseShortDetails navigate={navigate} closeModaldept={closeModaldept} isModalOpendept={isModalOpendept} openModaldept={openModaldept} selectedOrgDetails={selectedOrgDetails} departmentdetails={departmentdetails} deptform={deptform} handleChangedept={handleChangedept} handleSubmitdept={handleSubmitdept} handleEditdept={handleEditdept} Updatebtn={Updatebtn}
              handleupdatedept={handleupdatedept} handleCleardept={handleCleardept} handleStatusDept={handleStatusDept} courseName={selectedOrgDetails?.name} />
          </div>
        </div>
      </div >
      <div>
        <AddCourse isOpen={isModalOpen} onClose={closeModal} setsubmit={setsubmit} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleChange={handleChange} orgform={orgform} handleSubmit={handleSubmit} openModaldept={openModaldept} closeModaldept={closeModaldept}
          Updatebtn={Updatebtn} handleUpdate={handleUpdate} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid} masterdata={masterdata}
          dnparentdata2={dnparentdata2} />
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
      {submit === true ? <SuccessfulPopup mainheading={'Registration Completed Successfully!'} submitclose={submitclose} /> : ''}
    </>
  );
};


