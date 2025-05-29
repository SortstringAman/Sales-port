import { useState, useMemo, useEffect, useRef } from 'react';
import CommonLayout from '../../Component/CommonLayout.jsx';
import profileicon from '../../assets/icons/solar_square-academic-cap-2-outline.svg'
import profileicon2 from '../../assets/icons/solar_square-academic-cap-2-outline (1).svg'
import profileicon3 from '../../assets/icons/solar_documents-minimalistic-linear.svg'
import profileicon4 from '../../assets/icons/hugeicons_manager.svg'
import profileicon5 from '../../assets/icons/hugeicons_biometric-device.svg'
import ProfileStatus from '../../Component/ProfileStatus.jsx';
import filtericon from '../../assets/icons/mage_filter-fill.svg'
import '../../assets/css/StudentDashboard.css'
import SearchBar from '../../Component/SearchBar.jsx';
import AddNewStudentModal from '../../Component/Modals/AddNewStudentModal.jsx';
import { SuccessfulPopup } from '../../Component/Modals/SuccessfulPopup.jsx';
import Table from '../../Component/Table.jsx';
import image from '../../assets/Images/image.png';
import setting from '../../assets/icons/settings.svg';
import phone from '../../assets/icons/ic_round-phone.svg';
import whatsapp from '../../assets/icons/logos_whatsapp-icon.svg';
import adstatus from '../../assets/icons/statuspur.svg'
import adstatusred from '../../assets/icons/status-red.svg';
import tablelast from '../../assets/icons/tablelast.svg';
import edit from '../../assets/icons/pencil-square.svg';
import { OrganisationShortDetails } from './OrganisationShortDetails.jsx';
import { useNavigate } from 'react-router-dom';
import { AddOrganisationModal } from '../../Component/Modals/AddOrganisationModal.jsx';
import { getData, patchData, Postdata, PostdataWithJson, updateData } from '../../API/GlobalApi.js';


const OrganisationDashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpendept, setIsModalOpendept] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [dnparentdata, setdnparentdata] = useState([]);
  const [countryId, setcountryId] = useState(null);
  const [countrydata, setcountrydata] = useState([]);
  const [statedata, setstatedata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [stateid, setstateid] = useState(null);
  const [cityid, setcityid] = useState(null);
  const [selectedOrgDetails, setSelectedOrgDetails] = useState([]);
  const [departmentdetails, setdepartmentdetails] = useState([]);
  const [parentorgid, setparentorgid] = useState(null);
  const [parentorgidsub, setparentorgidsub] = useState(null);
  const [Updatebtn, setUpdatebtn] = useState(false);
  const [status, setStatus] = useState(false);

  const [orgform, setorgform] = useState({
    orgname: '',
    parentorgidog: null,
    gstin: '',
    email: '',
    landlineno: '',
    mobileno: '',
    address: '',
    pincode: '',
    countrycode: '1',
    status: false

  })
  const [deptform, setdeptform] = useState({
    name: "",
    parent_department_id: null,
    country_code: "",
    area_code: '',
    landline: "",
    mobile: "",
    email: ""
  })
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidGST = (gst) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(gst);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);
  const isRequired = (val) => val && val.trim() !== '';
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const displayToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);

    setTimeout(() => setShowToast(false), 3000);
  };
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate();


  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  const getorgdata = async () => {
    const url = "administration/organizations/";
    const response = await getData(url);
    console.log("org data is here",response)
    if (response) {
      setdnparentdata(response);
      setSelectedOrgDetails(response[0]);
      // setSelectedOrgid(response[0]?.id);
      getdeptdata(response[0]?.id)

    }
  }
  const getdeptdata = async (res) => {
    setparentorgid(res);
    const url = `administration/organizations/${res}/departments/`;
    const response = await getData(url);
    if (response) {
      setdepartmentdetails(response);
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
          setstatedata(response.state_list)
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
          setcitydata(response.city_list)
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
    let validValue = value;

    if (name === 'orgname') {
      // Allow letters, numbers, spaces, and common special characters
      validValue = value.replace(/[^a-zA-Z0-9 &.,()-]/g, '');
    } else if (['landlineno', 'mobileno', 'pincode'].includes(name)) {
      // Allow only digits
      validValue = value.replace(/\D/g, '');
    }

    setorgform(prevState => ({
      ...prevState,
      [name]: validValue
    }));
  };



  const handleChangedept = (e) => {
    const { name, value } = e.target;
    let validValue = value;

    if (name === 'name') {
      // Allow letters, numbers, spaces, and common special characters
      validValue = value.replace(/[^a-zA-Z &.,()\-']/g, '');
    } else if (['mobile', 'landline'].includes(name)) {
      // Allow only digits
      validValue = value.replace(/\D/g, '');
    }

    setdeptform(prevState => ({
      ...prevState,
      [name]: validValue
    }));
  };


  const handleSubmit = async () => {
    if (!isRequired(orgform.orgname)) return displayToast('Organisation Name is required', 'danger');
    if (!isRequired(orgform.email) || !isValidEmail(orgform.email)) return displayToast('Valid Email is required', 'danger');
    if (!isRequired(orgform.gstin) || !isValidGST(orgform.gstin)) return displayToast('Valid GSTIN is required', 'danger');
    if (!isValidPhone(orgform.mobileno)) return displayToast('Valid 10-digit Mobile Number is required', 'danger');
    if (!isValidPhone(orgform.landlineno)) return displayToast('Valid 10-digit Landline Number is required', 'danger');
    if (!isRequired(orgform.address)) return displayToast('Address is required', 'danger');
    if (!isRequired(orgform.pincode)) return displayToast('Pin Code is required', 'danger');
    if (!countryId || !stateid || !cityid) return displayToast('Select Country, State and City properly', 'danger');

    const finalobj = {
      name: orgform.orgname,
      parent_organization_id: parentorgidsub,
      gstin: orgform.gstin,
      email: orgform.email,
      landline: orgform.landlineno,
      mobile: orgform.mobileno,
      address: orgform.address,
      pincode: orgform.pincode,
      country_code: '+91',
      country_id: countryId,
      state_id: stateid,
      city_id: cityid,
      area_code: '1'

    }
    const url = 'administration/organizations/';

    const response = await PostdataWithJson(url, finalobj);
    if (!response.error) {
      displayToast('Organization added successfully!', 'success');
      closeModal();
      getorgdata();
    } else {
      displayToast('Error adding organization.', 'danger');
    }
    if (response && !response.error) {
      displayToast('Organization added successfully!', 'success');
      closeModal();
      getorgdata(parentorgid);
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error adding Org.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
  }
  const handleSubmitdeptold = async () => {
    const finalobj = {
      name: deptform.name,
      parent_department_id: null,
      country_code: "+91",
      area_code: '1',
      landline: deptform.landline,
      mobile: deptform.mobile,
      email: deptform.email
    }
    const url = `administration/organizations/${parentorgid}/departments/`;
    const response = await PostdataWithJson(url, finalobj);

    if (!response.error) {
      displayToast('Organization added successfully!', 'success');
      getdeptdata(parentorgid)
    } else if (response.error) {
      displayToast({ response }, 'danger');
    }

  }
  const handleSubmitdept = async () => {
    const { name, email, landline, mobile } = deptform;
    if (!name.trim()) return displayToast('Department name is required.', 'danger');
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return displayToast('Enter a valid email address.', 'danger');
    if (!landline.trim() || !/^\d{10}$/.test(landline)) return displayToast('Enter a valid 10-digit landline number.', 'danger');
    if (!mobile.trim() || !/^\d{10}$/.test(mobile)) return displayToast('Enter a valid 10-digit mobile number.', 'danger');
    const finalobj = {
      name: deptform.name,
      parent_department_id: null,
      country_code: "+91",
      area_code: '1',
      landline: deptform.landline,
      mobile: deptform.mobile,
      email: deptform.email
    };

    const url = `administration/organizations/${parentorgid}/departments/`;
    const response = await PostdataWithJson(url, finalobj);  // <-- Await added here

    if (response && !response.error) {
      displayToast('Department added successfully!', 'success');
      closeModaldept()
      getdeptdata(parentorgid);

    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error adding department.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
  };

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

  const handleEdit = (row) => {
    const orgData = row.original;
    setorgform({
      id: orgData?.id,
      orgname: orgData?.name,
      parentorgidog: orgData?.parent_organization_id || '',
      gstin: orgData?.gstin,
      email: orgData?.email,
      landlineno: orgData?.landline,
      mobileno: orgData?.mobile,
      address: orgData?.address,
      pincode: orgData?.pincode,
      countrycode: orgData?.country_code || '91', // Default country code, adjust as needed
    });
    setparentorgidsub(orgData?.parent_organization_id || '');
    setcountryId(orgData.country_id);
    setstateid(orgData.state_id)

    openModal();
    setUpdatebtn(true);

  };
  const handleEditdept = (row) => {
    setdeptform(
      {
        id: row.id,
        name: row.name,
        parent_department_id: null,
        country_code: "+91",
        area_code: '1',
        landline: row.landline,
        mobile: row.mobile,
        email: row.email
      }
    )
    setUpdatebtn(true);
    openModaldept();
  }
  const handleupdatedept = async () => {
    const finalobj = {
      id: deptform.id,
      name: deptform.name,
      parent_department_id: null,
      country_code: '+91',
      area_code: "1",
      landline: deptform.landline,
      mobile: deptform.mobile,
      email: deptform.email
    }
    const url = `administration/organizations/${parentorgid}/departments/${finalobj.id}/`

    const response = await updateData(url, finalobj);
    if (response && !response.error) {
      displayToast('Department Updated successfully!', 'success');
      getdeptdata(parentorgid);
      closeModaldept()
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error Updating department.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
  }
  const handleUpdate = async () => {
    const finalobj = {
      id: orgform.id,
      name: orgform.orgname,
      parent_organization_id: parentorgidsub,
      gstin: orgform.gstin,
      email: orgform.email,
      landline: orgform.landlineno,
      mobile: orgform.mobileno,
      address: orgform.address,
      pincode: orgform.pincode,
      country_code: '+91',
      country_id: countryId,
      state_id: stateid,
      city_id: cityid,
      area_code: '1'

    }
    const url = `administration/organizations/${finalobj.id}/`
    const response = await updateData(url, finalobj);
    if (response && !response.error) {
      displayToast('Department added successfully!', 'success');
      getdeptdata(parentorgid);
      getorgdata()
      closeModal()
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error adding department.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
  }
  const handleRowClick = (orgId, row) => {
    let selectedOrg = null;
    if (row.original.id === orgId) {
      selectedOrg = row.original;
    }


    if (selectedOrg) {
      const { id, name, parent, email } = selectedOrg; // Only store necessary fields
      setSelectedOrgDetails(selectedOrg); // Set the selected organization details
      getdeptdata(id);
      setparentorgid(id);
      // Store the simplified data in localStorage
      localStorage.setItem('selectedOrgDetails', JSON.stringify({ id, name, parent, email }));
    } else {
      console.error("Organization not found");
    }
  };

  const data2 = useMemo(() => {
      if (!Array.isArray(dnparentdata)) return [];
 

    return dnparentdata && dnparentdata?.map((org) => ({
      id: org?.id,
      name: org?.name,
      parent: org?.parent_organization,
      landline: org?.landline,
      mobile: org?.mobile,
      area_code: org?.area_code,
      email: org?.email,
      address: org?.address,
      country: org?.country,
      state: org?.state,
      city: org?.city,
      pincode: org?.pincode,
      gstin: org?.gstin,
      country_id: org?.country_id,
      state_id: org?.state_id,
      city_id: org?.city_id,
      parent_organization_id: org?.parent_organization_id,
      status: org?.status,
      handleRowClick: handleRowClick
    }));
  }, [dnparentdata])


  const filteredData = useMemo(() => {
    if (!searchQuery) return data2;

    const lowerSearch = searchQuery.toLowerCase();

    return data2?.filter((org) =>
      (org?.name || "").toLowerCase().includes(lowerSearch) ||
      (org?.email || "").toLowerCase().includes(lowerSearch) ||
      (org?.parent || "").toLowerCase().includes(lowerSearch) ||
      (org?.mobile || "").toLowerCase().includes(lowerSearch) ||
      (org?.landline || "").toLowerCase().includes(lowerSearch) ||
      (org?.gstin || "").toLowerCase().includes(lowerSearch)
      // || org?.id?.toString().includes(lowerSearch)
    );
  }, [searchQuery, dnparentdata]);
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
    const url = `administration/organizations/${row.original.id}/`;
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
    // Toggle status for the specific department
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

    // Send the status change to the backend
    const url = `administration/organizations/${parentorgid}/departments/${department.id}/`; // Update department URL
    const response = await patchData(url, { status: newStatus });

    if (response && !response.error) {
      displayToast('Status Updated successfully!', 'success');
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
        Header: 'Institution Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <div style={{ cursor: 'pointer', height: "100%", display: 'flex', alignItems: 'center' }} onClick={() => { handleRowClick(row.original.id, row) }}>
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.name}</p>
          </div>
        )
      },

      {
        Header: 'Parent Institution',
        accessor: 'parent',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.parent}</p>
          </div>
        )
      },
      {
        Header: 'Contacts',
        accessor: 'contacts',
        Cell: ({ row }) => (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
              <img src={phone} alt="phone" />
              <p>{row.original.area_code} {row.original.landline}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
              <img src={whatsapp} style={{ width: '12px', height: '12px' }} alt="whatsapp" />
              <p>{row.original.mobile}</p>
            </div>
          </div>
        ),
      },
      {
        Header: 'Email',
        accessor: 'email',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.email}</p>
          </div>
        )
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (<>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div class="form-check form-switch custom-switch"  >
              {/* //onClick={console.log("rowswitch--", row.original.status)*/}
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: 'pointer' }} checked={row.original.status} onChange={() => handleStatus(row)} />
            </div>
            {/* <img src={edit} style={{ cursor: 'pointer' }} onClick={() => handleEdit(row)}></img> */}
          </div>
        </>
        ),
      },
      // {
      //   Header: <img src={setting}></img>,
      //   accessor: 'setting',
      //   Cell: ({ row }) => (
      //     <img src={tablelast}></img>
      //   )
      // },
    ],
    []
  );
  useEffect(() => {
    getorgdata();
    getcountry();
    getdeptdata();

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
            <h2 className='main-heading'>Institutions</h2>
          </div> */}
        <div className='row'>
          <div className="col-md-12 d-flex justify-content-end">
            <button className='add-btn' onClick={() => openModal()}><span className='me-2'>
              <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
              </svg>
            </span>Add New Institution</button>
          </div>
        </div>

        <div className='row mt-5'>
          <div className="col-md-9">
            <div className="row" style={{ alignItems: 'center' }}>
              <div className="col-md-6">
                <h2 className='main-heading'>Institution & Department ({dnparentdata?.length})</h2>
              </div>
              <div className="col-md-6">
                <div style={{ display: "flex", justifyContent: 'end' }}>
                  <SearchBar data={dnparentdata} onSearch={handleSearch}  ref={searchInputRef} placeholder="Search by Institution,parent institution,email,mobile,landline number,gstin...." />
                  {/* <button
                    className="filter-btn"
                    onClick={handleFilterClick}
                  >
                    <img src={filtericon}></img>
                  </button> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table data={filteredData} columns={columns} selectedOrgDetails={selectedOrgDetails} handleRowClick={handleRowClick} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <OrganisationShortDetails navigate={navigate} closeModaldept={closeModaldept} isModalOpendept={isModalOpendept} openModaldept={openModaldept} selectedOrgDetails={selectedOrgDetails} departmentdetails={departmentdetails} deptform={deptform} handleChangedept={handleChangedept} handleSubmitdept={handleSubmitdept} handleEditdept={handleEditdept} Updatebtn={Updatebtn}
              handleupdatedept={handleupdatedept} handleCleardept={handleCleardept} handleStatusDept={handleStatusDept} />
          </div>
        </div>
      </div >
      <div>
        <AddOrganisationModal isOpen={isModalOpen} onClose={closeModal} setsubmit={setsubmit} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleChange={handleChange} orgform={orgform} handleSubmit={handleSubmit} openModaldept={openModaldept} closeModaldept={closeModaldept}
          Updatebtn={Updatebtn} handleUpdate={handleUpdate} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid} />
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
              <strong>{toastVariant === 'success'} </strong> {toastMessage}
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

export default OrganisationDashboardPage;
