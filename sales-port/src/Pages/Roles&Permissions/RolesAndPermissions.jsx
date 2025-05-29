import { useState, useMemo, useEffect } from 'react';
import CommonLayout from '../../Component/CommonLayout';
import profileicon from '../../assets/icons/solar_square-academic-cap-2-outline.svg'
import profileicon2 from '../../assets/icons/solar_square-academic-cap-2-outline (1).svg'
import profileicon3 from '../../assets/icons/solar_documents-minimalistic-linear.svg'
import profileicon4 from '../../assets/icons/hugeicons_manager.svg'
import profileicon5 from '../../assets/icons/hugeicons_biometric-device.svg'
import ProfileStatus from '../../Component/ProfileStatus';
import filtericon from '../../assets/icons/mage_filter-fill.svg'
import '../../assets/css/StudentDashboard.css'
import '../../assets/css/Roles.css'
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
import edit from '../../assets/icons/pencil-square.svg';
// import { OrganisationShortDetails } from './OrganisationShortDetails.js';
import { useNavigate } from 'react-router-dom';
import { AddOrganisationModal } from '../../Component/Modals/AddOrganisationModal.jsx';
import { getData, patchData, Postdata, updateData } from '../../API/GlobalApi.js';
import { RolesAndPermissionsShortDetails } from './RolesAndPermissionsShortDetails.jsx';
import { AddDesignationModal } from '../../Component/Modals/AddDesignationModal.jsx';

const RolesAndPermissions = () => {
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
  const [departmentdetails, setdepartmentdetails] = useState(null);
  const [parentidfromorg, setparentidfromorg] = useState(null)
  const [departmentidfromorg, setdepartmentidfromorg] = useState(null)
  const [departmentfromorg, setdepartmentfromorg] = useState([]);
  const [reporttofromorg, setreporttofromorg] = useState([]);
  const [Updatebtn, setUpdatebtn] = useState(false);
  const [parentorgid, setparentorgid] = useState(null);
  const [searchQuery, setSearchQuery] = useState('')
  const [orgform, setorgform] = useState({
    orgname: '',
    parentorgid: null,
    gstin: '',
    email: '',
    landlineno: '',
    mobileno: '',
    address: '',
    pincode: '',
    countrycode: '1'

  })
  const [deptform, setdeptform] = useState({
    name: "",
    reporttoid: null,
    id: null,
    orgid: null,
    deptid: null,
  })
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);
  const isRequired = (val) => val && val.trim() !== '';
  const handleRowClick = (orgId, row) => {
    let selectedOrg = null;
    console.log("row--", row.original)

    if (row.original.id === orgId) {
      selectedOrg = row.original;
    }


    if (selectedOrg) {
      const { id, name, parent, email, organization_id } = selectedOrg; // Only store necessary fields
      setSelectedOrgDetails(selectedOrg); // Set the selected organization details
      getdeptdata(id);
      setparentidfromorg(organization_id);
      console.log("iddddddddd", id)
      setdeptform({
        id: id
      })
      // setparentorgid(id);

      // Store the simplified data in localStorage
      localStorage.setItem('selectedOrgDetails', JSON.stringify({ id, name, parent, email }));

      console.log("Selected Organisation Details:", selectedOrg);
    } else {
      console.error("Organization not found");
    }
  };
  const data2 = useMemo(() => {
    return dnparentdata && dnparentdata?.map((org) => ({
      id: org.id,
      name: org.name,
      department_name: org.department_name,
      organization_name: org.organization_name,
      report_to_name: org.report_to_name,
      status: org.status,
      organization_id: org.organization_id,
      depart_id: org.department_id,
      handleRowClick: handleRowClick
    }));
  }, [dnparentdata])
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0); // Total records from backend
  const [currentPage, setCurrentPage] = useState(0); // Current page from backend or frontend
  const [itemsPerPage, setItemsPerPage] = useState(8); // Number of items per page
  const getorgdataa = async () => {
    const url = "administration/designations/";
    const response = await getData(url);
    if (response) {
      console.log("responseorg---", response)
      setdnparentdata(response);
      setSelectedOrgDetails(response.results[0]);
      // setSelectedOrgid(response[0]?.id);
      getdeptdata(response[0]?.id)

    }
    // console.log("response--", response);
  }
  const getorgdata = async (page = 1) => {
    // const url = `administration/designations/?page=${page}`;
    const url = `administration/designations-no-pagination/`;
    const response = await getData(url);
 
    if (response) {
      setdnparentdata(response); // Set paginated results
      setTotalCount(response.count); // Set total count for pagination
      setSelectedOrgDetails(response[0]);
      getdeptdata(response[0]?.id)
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return data2;
    }
    return data2.filter((org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.department_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.organization_name.toLowerCase().includes(searchQuery.toLowerCase())
      // org.id.toString().includes(searchQuery)
    );
  }, [searchQuery, dnparentdata]);
  const handleStatus = async (row) => {

    const newStatus = !row.original.status;  // Toggle status for that specific row
    // Update the status for that row in your table
    row.original.status = newStatus;
    const orgData = row.original;
    // Optionally, make an API call here to update the status on the backend
    const url = `administration/organizations/${orgData.organization_id}/departments/${orgData.depart_id}/designations/${orgData.id}`
    const response = await patchData(url, { status: newStatus });

    if (response) {
      getorgdata()
    }
    // Log or handle response as needed
    console.log("Updated Status:", response);
  };
  const handlePageChangenext = async (selectedPage, setCurrentPage) => {
    console.log("selectedPage--", selectedPage)

    const nextpage = selectedPage + 1;
    setCurrentPage(nextpage) // ReactPaginate uses 0-based index
    const url = `administration/designations/?page=${nextpage}`;
    const response = await getData(url);
    if (response) {
      setdnparentdata(response.results); // Set paginated results
      setTotalCount(response.count); // Set total count for pagination
    }
  };
  const handlePageChangeprev = async (selectedPage) => {
    console.log("selectedPage--", selectedPage)
    const prev = selectedPage - 1; // ReactPaginate uses 0-based index
    setCurrentPage(prev)
    const url = `administration/designations/?page=${prev}`;
    const response = await getData(url);
    if (response) {
      setdnparentdata(response.results); // Set paginated results
      setTotalCount(response.count); // Set total count for pagination
    }
  };
  const getdeptdata = async (res) => {
    setparentorgid(res);
    console.log("selectedOrgDetails.id--", res);
    const url = `administration/organizations/${res}/departments/`;
    const response = await getData(url);
    if (response) {
      setdepartmentdetails(response);
    }
    console.log("responsedepartment", response);
  }
  const getcountry = async () => {
    const url = "administration/countries/";
    const response = await getData(url);
    setcountrydata(response)
    console.log("response--", response);
  }
  const handlelocationdata = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log("name--", name);
    console.log("value--", value);
    if (name === "country") {
      setcountryId(value)
      console.log("countryId--", countryId)
      try {
        const url = `administration/countries/${value}/states/`
        // Make an API call to get states for the selected country
        const response = await getData(url); // Replace with your actual state API URL
        console.log("responsestate--", response)
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
        // console.log("responsestate--",response)
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
    const { name, value } = e.target; // Get the name and value from the input field
    setorgform(prevState => ({
      ...prevState, // Keep the previous state
      [name]: value // Dynamically update the field using the name
    }));
  };
  const handleChangedept = async (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setdeptform(prevState => ({
        ...prevState, // Keep the previous state
        [name]: value // Dynamically update the field using the name
      }));
    }
    else if (name === 'parentorgidog') {
      setparentidfromorg(value);
      const urldept = `administration/organizations/${value ? value : parentidfromorg}/departments/`;
      const response = await getData(urldept);
      if (response) {
        setdepartmentfromorg(response)
      }
    }
    else if (name === 'department') {
      setdepartmentidfromorg(value);
      const urlreportto = `administration/organizations/${parentidfromorg ? parentidfromorg : deptform.orgid}/departments/${value}/designations/`
      const response2 = await getData(urlreportto);
      setreporttofromorg(response2)
      console.log("response2----", response2);
    }
    else if (name === 'reporttoid') {
      setdeptform(prevState => ({
        ...prevState, // Keep the previous state
        [name]: value // Dynamically update the field using the name
      }));
    }
  }
  const handleSubmit = async () => {
    const finalobj = {
      name: deptform.name,
      report_to_id: deptform.reporttoid
    }
    const url = `administration/organizations/${parentidfromorg}/departments/${departmentidfromorg}/designations/`
    console.log("orgform---", finalobj)
    const response = await Postdata(url, finalobj);
    if (!response.error) {
      closeModal();
      // openModaldept();
      getorgdata()

    }
  }
  const handleSubmitdept = async () => {
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
    const response = Postdata(url, finalobj);
    if (!response.error) {
      getdeptdata()
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
    handleCleardept();
  };
  const openModaldept = () => {
    setIsModalOpendept(true);
  };
  const closeModaldept = () => {
    setIsModalOpendept(false);
  };
  const submitclose = () => {
    setsubmit(false);
  };

  const handleEdit = async (row) => {
    const orgData = row.original;
    setdeptform({
      id: orgData.id,
      name: orgData.name,
      orgid: orgData.organization_id,
      deptid: orgData.depart_id
    })
    const urldept = `administration/organizations/${orgData.organization_id}/departments/`;
    const response = await getData(urldept);
    if (response) {
      setdepartmentfromorg(response)
      const urlreportto = `administration/organizations/${orgData.organization_id}/departments/${orgData.depart_id}/designations/`
      const response2 = await getData(urlreportto);
      setreporttofromorg(response2)
    }
    // setparentidfromorg(orgData.organization_id)
    openModal();
    setUpdatebtn(true);
  };
  const handleUpdate = async () => {
    const finalobj = {
      id: deptform.id,
      name: deptform.name,
      report_to_id: deptform.reporttoid
    }
    console.log(finalobj)
    const url = `administration/organizations/${deptform.orgid}/departments/${deptform.deptid}/designations/${finalobj.id}`
    const response = await updateData(url, finalobj);
    if (!response.error) {
      getorgdata();
      setUpdatebtn(false);
      closeModal();
    }
    console.log("responseupdate-----", response)
  }

  const handleCleardept = () => {
    setdeptform({
      id: null,
      name: "",
      orgid: null,
      deptid: null,
      reporttoid: null,


    })
    setparentidfromorg(null);
    setdepartmentidfromorg(null);
    setUpdatebtn(false);
  }

  const columns = useMemo(
    () => [
      {
        Header: <input type='checkbox' />,
        accessor: 'checkbox',
        Cell: ({ row }) => (
          <input type="checkbox" checked={row.isSelected} onChange={() => row.toggleRowSelected()} />
        ),
      },
      {
        Header: 'Designation ',
        accessor: 'name',
        Cell: ({ row }) => (
          <div style={{ cursor: 'pointer', height: "100%", display: 'flex', alignItems: 'center' }} onClick={() => { handleRowClick(row.original.id, row) }}>
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.name}</p>
          </div>
        )
      },

      {
        Header: 'Department',
        accessor: 'parent',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.department_name}</p>
          </div>
        )
      },
      {
        Header: 'Organisation',
        accessor: 'email',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.organization_name}</p>
          </div>
        )
      },
      {
        Header: 'Reporting To',
        accessor: 'reporting',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.report_to_name}</p>
          </div>
        )
      },
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <div class="form-check form-switch custom-switch" onClick={console.log("rowswitch--", row.original.status)} >
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: 'pointer' }} checked={row.original.status} onChange={() => handleStatus(row)} />
            </div>
            <img src={edit} style={{ cursor: 'pointer' }} onClick={() => handleEdit(row)}></img>
          </div>
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
  // useEffect(() => {
  //   handleChangedept()

  // }, [departmentidfromorg, parentidfromorg])
  console.log("selectedOrgDetails--", selectedOrgDetails)

  const pageCount = Math.ceil(totalCount / itemsPerPage);
  return (
    <>
      <div className="dashboard">
        {/* Content for the Dashboard */}
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <div >
            <h2 className='main-heading'>Designations</h2>
          </div>
          <div >
            <button className='add-btn' onClick={() => openModal()}><span className='me-2'>
              <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
              </svg>
            </span>Add New Designation</button>
          </div>
        </div>
        {/* <div className="dashboard-cards row mt-5" style={{ padding: "20px" }} >
          <ProfileStatus
            label="Profile Completed"
            icon={profileicon}
            percentage={40}
            iconColor="#39886F"
            bgColor="#39886F0D"
            circleColor=" #39886F"
            numbers="04"
          />
          <ProfileStatus
            label="Academic Info"
            icon={profileicon2}
            percentage={80}
            iconColor="#0E9DED"
            bgColor="#0E9DED0D"
            circleColor="#0E9DED"
            numbers="08"
          />
          <ProfileStatus
            label="Documents Uploaded"
            icon={profileicon3}
            percentage={70}
            iconColor=" #FF9B04"
            bgColor="#FF9B040D"
            circleColor=" #FF9B04"
            numbers="04"
          />
          <ProfileStatus
            label=" Official Information "
            icon={profileicon4}
            percentage={70}
            iconColor=" #2A62C8"
            bgColor=" #2A62C80D"
            circleColor=" #2A62C8"
            numbers="04"
          />
          <ProfileStatus
            label="ID Card/Biometric"
            icon={profileicon5}
            percentage={70}
            iconColor=" #F19289"
            bgColor=" #F192890D"
            circleColor="#F19289"
            numbers="04"
          />
        </div> */}
        <div className='row mt-5'>
          <div className="col-md-9">
            <div className="row" style={{ alignItems: 'center' }}>
              <div className="col-md-6">
                <h4 className='text-primary'>Oraganisation & Department ({dnparentdata?.length})</h4>
              </div>
              <div className="col-md-6">
                <div style={{ display: "flex", justifyContent: 'end' }}>
                  <SearchBar data={dnparentdata} onSearch={handleSearch} />
                  <button
                    className="filter-btn"
                    onClick={handleFilterClick}
                  >
                    <img src={filtericon}></img>
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table data={filteredData} columns={columns} selectedOrgDetails={selectedOrgDetails} pageCountFromBackend={pageCount} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <RolesAndPermissionsShortDetails navigate={navigate} closeModaldept={closeModaldept} isModalOpendept={isModalOpendept} openModaldept={openModaldept} selectedOrgDetails={selectedOrgDetails} departmentdetails={departmentdetails} deptform={deptform} handleChangedept={handleChangedept} handleSubmitdept={handleSubmitdept} />
          </div>
        </div>
      </div >
      <div>
        <AddDesignationModal isOpen={isModalOpen} onClose={closeModal} setsubmit={setsubmit} dnparentdata={dnparentdata} handleSubmit={handleSubmit} deptform={deptform}
          handleChangedept={handleChangedept} departmentfromorg={departmentfromorg} reporttofromorg={reporttofromorg} parentidfromorg={parentidfromorg} departmentidfromorg={departmentidfromorg}
          handleUpdate={handleUpdate} Updatebtn={Updatebtn} />
      </div>
      {submit === true ? <SuccessfulPopup mainheading={'Registration Completed Successfully!'} submitclose={submitclose} /> : ''}
    </>
  );
};

export default RolesAndPermissions;
