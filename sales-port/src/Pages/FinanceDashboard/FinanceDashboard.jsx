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
import receivepayment from '../../assets/icons/Vector (11).svg'
// import { OrganisationShortDetails } from './OrganisationShortDetails.js';
import { useNavigate } from 'react-router-dom';
import { AddOrganisationModal } from '../../Component/Modals/AddOrganisationModal.jsx';
import { getBlob, getData, patchData, Postdata, updateData } from '../../API/GlobalApi.js';
import feepaid from '../../assets/icons/feepaid.svg';
import feepend from '../../assets/icons/feepend.svg';
import { IssueNewForm } from '../../Component/Modals/IssueNewForm.jsx';
import { ReceivePayment } from '../../Component/Modals/ReceivePaymentModal.jsx';
import { SuccessfulModalPayment } from '../../Component/Modals/SuccessfulModalPayment.jsx';
import exporticon from '../../assets/icons/export-data.svg';
import debounce from 'lodash.debounce';


export const FinanceDashboard = () => {
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
  const [parentorgid, setparentorgid] = useState(null);
  const [parentorgidsub, setparentorgidsub] = useState(null);
  const [Updatebtn, setUpdatebtn] = useState(false);
  const [status, setStatus] = useState(false);
  const [paymentmodal, setpaymentmodal] = useState(false);
  const [filterQueryString, setFilterQueryString] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [orgform, setorgform] = useState({
    student_name: '',
    primary_contact_number: '',
    payment_type: '',
    mode_of_payment: '',
    payment_transaction_number: '',
    easepayid: '',
    payment_date: '',
    payment_status: '',
    amount: '1',
    course_name: "",
    provisional_registration_number: "",
    provisional_admission_date: "",
    permanent_registration_number: "",
    permanent_admission_date: "",

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
  const todayDate = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState(todayDate);
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate();

  const displayToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    const queryParams = new URLSearchParams();

    // Add existing filter query params if any
    if (filterQueryString) {
      const existingParams = new URLSearchParams(filterQueryString);
      existingParams.forEach((value, key) => {
        queryParams.append(key, value);
      });
    }

    // if (query && query.trim() !== '') {
    //   queryParams.set("query", query);  // ✅ Use `search`, not `query`
    // } else {
    //   queryParams.delete("query");      // ✅ Clear search filter
    // }

    // Add search and reset to page 1
    queryParams.set("query", query);
    // queryParams.set("page", "1");

    const finalUrl = `students/get-student-payments/?${queryParams.toString()}`;

    try {
      const response = await getData(finalUrl);
      setdnparentdata(response || []);
      // setTotalCount(response.count || 0);
      // setgetstudentsdataId(response.results[0]?.user_id || null);
      setFilterQueryString(queryParams.toString()); // Save updated string
    } catch (err) {
      console.error("Search failed:", err);
    }
  };
  const debouncedSearch = useMemo(() => debounce(handleSearch, 100), []);
  useEffect(() => {
    return () => debouncedSearch.cancel(); // cleanup
  }, []);
  const getorgdataold = async () => {
    const url = "students/get-student-payments/";
    const response = await getData(url);
    if (response) {
      console.log("responseorg---", response)
      setdnparentdata(response);
      setSelectedOrgDetails(response[0]);
      // setSelectedOrgid(response[0]?.id);
      // getdeptdata(response[0]?.id)

    }
    // console.log("response--", response);
  }
  const getorgdata = async () => {
    const url = `students/get-student-payments/?start_date=${startDate}&end_date=${endDate}`;
    const response = await getData(url);
    if (response) {
      setdnparentdata(response);
      setSelectedOrgDetails(response[0]);
      // getdeptdata(response[0]?.id);
    }
  };
  // const getdeptdata = async (res) => {
  //   setparentorgid(res);
  //   console.log("selectedOrgDetails.id--", res);
  //   const url = `administration/organizations/${res}/departments/`;
  //   const response = await getData(url);
  //   if (response) {
  //     setdepartmentdetails(response);
  //   }
  //   console.log("responsedepartment", response);
  // }
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
  const handleChangedept = (e) => {
    const { name, value } = e.target; // Get the name and value from the input field
    setdeptform(prevState => ({
      ...prevState, // Keep the previous state
      [name]: value // Dynamically update the field using the name
    }));
  }
  const handleSubmit = async () => {
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
      // getdeptdata(parentorgid)
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
      // getdeptdata(id);
      setparentorgid(id);

      // Store the simplified data in localStorage
      localStorage.setItem('selectedOrgDetails', JSON.stringify({ id, name, parent, email }));

      console.log("Selected Organisation Details:", selectedOrg);
    } else {
      console.error("Organization not found");
    }
  };
  const handleEdit = (row) => {
    const orgData = row.original;
    console.log("orgDataedit----", orgData);
    setorgform({
      id: orgData.id,
      orgname: orgData.name,
      parentorgidog: orgData.id, // Adjust if needed
      gstin: orgData.gstin,
      email: orgData.email,
      landlineno: orgData.landline,
      mobileno: orgData.mobile,
      address: orgData.address,
      pincode: orgData.pincode,
      countrycode: orgData.country_code || '91', // Default country code, adjust as needed
    });
    setparentorgidsub(orgData.id);
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
    if (response) {
      closeModaldept();
      setUpdatebtn(false);
      // getdeptdata(parentorgid);
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
    if (!response.error) {
      getorgdata();
      setUpdatebtn(false);
      closeModal();
    }
    console.log("responseupdate-----", response)
  }
  // const handleExportExcelold = () => {
  //   const token = window.localStorage.getItem('token');
  //   const baseUrl = 'https://bgi.sortstring.com/api/v1/students/export-student-payments-to-xls/';
  //   const urlWithParams = filterQueryString ? `${baseUrl}?${filterQueryString}` : baseUrl;

  //   fetch(urlWithParams, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Token ${token}`
  //     }
  //   })
  //     .then(response => {
  //       if (!response.ok) throw new Error("Failed to download file");
  //       return response.blob();
  //     })
  //     .then(blob => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = 'students_export.xlsx';
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //     })
  //     .catch(error => {
  //       displayToast('❌ Excel export failed', 'danger');
  //       console.error("Download error:", error);
  //     });
  // };

const handleExportExcel = async () => {
  try {
    const urlWithParams = filterQueryString
      ? `students/export-student-payments-to-xls/?${filterQueryString}`
      : 'students/export-student-payments-to-xls/';

    const blob = await getBlob(urlWithParams);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_export.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    displayToast('❌ Excel export failed', 'danger');
  }
};

  const data2 = useMemo(() => {
    return dnparentdata && dnparentdata?.map((org) => ({
      id: org.payment_id,
      student_name: org.student_name,
      primary_contact_number: org.primary_contact_number,
      payment_type: org.payment_type,
      mode_of_payment: org.mode_of_payment,
      payment_transaction_number: org.payment_transaction_number,
      easepayid: org.easepayid,
      payment_date: org.payment_date,
      payment_status: org.payment_status,
      amount: org.amount,
      course_name: org.course_name,
      provisional_registration_number: org.provisional_registration_number,
      provisional_admission_date: org.provisional_admission_date,
      permanent_registration_number: org.permanent_registration_number,
      permanent_admission_date: org.permanent_admission_date,
      handleRowClick: handleRowClick
    }));
  }, [dnparentdata])

  // const filteredData = useMemo(() => {
  //   if (!searchQuery) {
  //     return data2;
  //   }
  //   return data2.filter((org) =>
  //     org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     org.email.toLowerCase().includes(searchQuery.toLowerCase())
  //     // org.id.toString().includes(searchQuery)
  //   );
  // }, [searchQuery, dnparentdata]);
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

    if (response) {
      getorgdata()
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

    if (response) {
      console.log("Updated Department Status:", response);
    } else {
      console.log("Failed to update department status.");
    }
  };
  const totalAmount = useMemo(() => {
    return dnparentdata.reduce((sum, item) => {
      if (item.payment_status?.toLowerCase() === "success") {
        return sum + (parseFloat(item.amount) || 0);
      }
      return sum;
    }, 0);
  }, [dnparentdata]);

  const columns = useMemo(
    () => [
      // {
      //   Header: <input type='checkbox' />,
      //   accessor: 'checkbox',
      //   Cell: ({ row }) => (
      //     <input type="checkbox" checked={row.isSelected} onChange={() => row.toggleRowSelected()}
      //       style={{ cursor: 'pointer' }} />
      //   ),
      // },
      {
        Header: 'Pay Date & Time',
        accessor: 'datetime',
        Cell: ({ row }) => {
          const rawDate = row.original.payment_date;
          const formatted = rawDate
            ? new Intl.DateTimeFormat('en-IN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }).format(new Date(rawDate))
            : 'N/A';

          return (
            <div style={{ cursor: 'pointer', height: "100%", display: 'flex', alignItems: 'center' }}>
              <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}>
                {formatted}
              </p>
            </div>
          );
        }
      },


      {
        Header: 'Student Name',
        accessor: 'studentname',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}>{row.original.student_name}</p>
          </div>
        )
      },
      {
        Header: 'Reg. Ph. no.',
        accessor: 'regphno',
        Cell: ({ row }) => (
          <div>
            <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}>{row.original.primary_contact_number}</p>
          </div>
        ),
      },
      {
        Header: 'Course Name',
        accessor: 'coursename',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}>{row.original.course_name}</p>
          </div>
        )
      },
      {
        Header: 'Fee Type',
        accessor: 'feetype',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}>{row.original.payment_type}</p>
          </div>
        )
      },
      {
        Header: 'Payment Details',
        accessor: 'paydetails',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}><span style={{ fontWeight: '700' }}>MP -</span> ({row.original.mode_of_payment})</p>
            <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}><span style={{ fontWeight: '700' }}>Tn No -</span> {row.original.payment_transaction_number}</p>
            <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}><span style={{ fontWeight: '700' }}>Ezs Id -</span> {row.original.easepayid}</p>
          </div>
        )
      },
      // {
      //   Header: 'Mode of Pay',
      //   accessor: 'modepay',
      //   Cell: ({ row }) => (
      //     <div >
      //       <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.email}</p>
      //     </div>
      //   )
      // },      {
      //   Header: 'Trans No',
      //   accessor: 'transno',
      //   Cell: ({ row }) => (
      //     <div >
      //       <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.email}</p>
      //     </div>
      //   )
      // },
      //  {
      //   Header: 'Eazebuzz Id',
      //   accessor: 'eazebuzzid',
      //   Cell: ({ row }) => (
      //     <div >
      //       <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.email}</p>
      //     </div>
      //   )
      // },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.amount}</p>
          </div>
        )
      },
      {
        Header: 'Payment Status',
        accessor: 'paymentstatus',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.payment_status}</p>
          </div>
        )
      },
      {
        Header: 'Pro Ad Details',
        accessor: 'provisionaladmissiondetails',
        Cell: ({ row }) => {
          const formatDate = (dateStr) => {
            if (!dateStr) return 'N/A';
            const [year, month, day] = dateStr.split('-');
            return `${day}-${month}-${year}`;
          };
          return (
            <div>
              <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}>{row.original.provisional_registration_number}</p>
              <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 600, fontSize: '10px', margin: 0 }}>
                ({formatDate(row.original.provisional_admission_date)})
              </p>
            </div>
          );
        }
      },
      {
        Header: 'Reg. Details',
        accessor: 'regdetails',
        Cell: ({ row }) => {
          const formatDate = (dateStr) => {
            if (!dateStr) return 'N/A';
            const [year, month, day] = dateStr.split('-');
            return `${day}-${month}-${year}`;
          };
          return (
            <div>
              <p style={{ textAlign: 'left', color: '#222F3E', margin: 0 }}>{row.original.permanent_registration_number}</p>
              <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 600, fontSize: '10px', margin: 0 }}>
                ({formatDate(row.original.permanent_admission_date)})
              </p>
            </div>
          );
        }
      }

      //        {
      //   Header: 'Provisional Admission No',
      //   accessor: 'provisionaladmission',
      //   Cell: ({ row }) => (
      //     <div >
      //       <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.email}</p>
      //     </div>
      //   )
      // },
      //        {
      //   Header: 'Date of Provisional Admission',
      //   accessor: 'dpa',
      //   Cell: ({ row }) => (
      //     <div >
      //       <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.email}</p>
      //     </div>
      //   )
      // },
      //        {
      //   Header: 'Registration No',
      //   accessor: 'regno',
      //   Cell: ({ row }) => (
      //     <div >
      //       <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.email}</p>
      //     </div>
      //   )
      // },
      //        {
      //   Header: 'Date of Admission',
      //   accessor: 'dateofadmission',
      //   Cell: ({ row }) => (
      //     <div >
      //       <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.email}</p>
      //     </div>
      //   )
      // },
      // {
      //   Header: 'Admission Status',
      //   accessor: 'status',
      //   Cell: ({ row }) => (
      //     <div >
      //       <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
      //         <img src={adstatus}></img>
      //         <img src={adstatus}></img>
      //         <img src={adstatus}></img>
      //         <img src={adstatusred}></img>
      //         <img src={adstatusred}></img>
      //       </div>
      //     </div>
      //   )
      // },
      // {
      //   Header: 'Action',
      //   Cell: ({ row }) => (<>
      //     <div style={{ display: 'flex', gap: '10px',cursor:'pointer' }}>
      //       <p style={{color:"#7F56DA",fontWeight:600,fontSize:'15px'}}>Receive Payment</p>
      //     </div>
      //   </>
      //   ),
      // },
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
    // getdeptdata();

  }, [])
  useEffect(() => {
    if (startDate && endDate) {
      getorgdata();
    }
  }, [startDate, endDate]);
  useEffect(() => {
    if (paymentmodal) {
      const timer = setTimeout(() => {
        setpaymentmodal(false);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [paymentmodal]);
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
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <div >
            <h2 className='main-heading'>Accounts</h2>
          </div>
          <div >
            {/* <button className='add-btn' onClick={() => openModal()}><span className='me-2'>
              <img src={receivepayment}></img>
            </span>Receive payment</button> */}
          </div>
        </div>
        {/* <div className="dashboard-cards row mt-2" style={{ padding: "20px" }} >
          <ProfileStatus
            label="Fee Pending"
            icon={feepend}
            percentage={40}
            iconColor="#ED0E0E"
            bgColor="#ED0E0E0D"
            circleColor=" #ED0E0E"
            numbers="04"
          />
          <ProfileStatus
            label="Fee Paid"
            icon={feepaid}
            percentage={80}
            iconColor="#39886F"
            bgColor="#39886F0D"
            circleColor=" #39886F"
            numbers="08"
          />
          <ProfileStatus
            label="Form Issued"
            icon={profileicon3}
            percentage={70}
            iconColor=" #FF9B04"
            bgColor="#FF9B040D"
            circleColor=" #FF9B04"
            numbers="04"
          />
        </div> */}
        <div className='row mt-2'>
          <div className="col-md-12">
            <div className="row" style={{ alignItems: 'center' }}>
              <div className="col-md-2">
                {/* <h4 className='text-primary'>Payments ({dnparentdata?.length})</h4> */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 className='text-primary'>
                    Payments ({dnparentdata?.length})
                  </h4>

                </div>

              </div>
              <div className="col-md-10">
                <div style={{ display: "flex", justifyContent: 'end', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', marginRight: '10px', fontWeight: 600 }}> Total: ₹{totalAmount}</span>
                  <div style={{ width: '40%' }}>
                    <SearchBar data={dnparentdata} onSearch={debouncedSearch} ref={searchInputRef} placeholder='Search by name , mobile no , reg. no…' />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: '15px' }}>
                    <div style={{ marginBottom:'38px'}}>
                      <label className='form-labell'>Start Date</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="form-control"
                        style={{ height: '46px' }}
                      />
                    </div>
                    <div style={{ marginBottom:'38px'}}>
                      <label className='form-labell'>End Date</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="form-control"
                        style={{ height: '46px' }}
                      />
                    </div>

                    {/* <button className="add-btn" onClick={getorgdata}><img src={filtericon}></img></button> */}
                  </div>

                  {/* <button
                    className="filter-btn"
                    onClick={handleFilterClick}
                  >
                    <img src={filtericon}></img>
                  </button> */}
                  <div className=''>
                    {/* <button className='add-btn' onClick={() => openModaldept()}><span className='me-2'>
                      <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
                      </svg>
                    </span>Issue New Form</button> */}
                    <button
                      className="filter-btn"
                      style={{ background: 'white', border: '1px solid black', height: '43px' }}
                      // onClick={handleFilterClick}
                      onClick={handleExportExcel}
                    >
                      <img src={exporticon}></img>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {/* <Table data={data2} columns={columns} selectedOrgDetails={selectedOrgDetails} /> */}
                {data2.length > 0 ? (
                  <Table
                    columns={columns}
                    // pageCounts={pageCounts}
                    // handlePageChange={handlePageChange}
                    selectedOrgDetails={selectedOrgDetails}
                    data={data2}
                  />
                ) : (
                  <div className="no-data-message" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                    No data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div >
      <div>
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
        <ReceivePayment isOpen={isModalOpen} onClose={closeModal} setsubmit={setsubmit} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleChange={handleChange} orgform={orgform} handleSubmit={handleSubmit} openModaldept={openModaldept} closeModaldept={closeModaldept}
          Updatebtn={Updatebtn} handleUpdate={handleUpdate} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid} setpaymentmodal={setpaymentmodal} />
      </div>
      <div>
        <IssueNewForm isOpen={isModalOpendept} onClose={closeModaldept} setsubmit={setsubmit} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleChange={handleChange} orgform={orgform} handleSubmit={handleSubmit} openModaldept={openModaldept} closeModaldept={closeModaldept}
          Updatebtn={Updatebtn} handleUpdate={handleUpdate} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid} />
      </div>
      {submit === true ? <SuccessfulPopup mainheading={'Registration Completed Successfully!'} submitclose={submitclose} /> : ''}

      {paymentmodal ? <SuccessfulModalPayment mainheading={'Payment Success!'} /> : ''}
    </>
  );
};

