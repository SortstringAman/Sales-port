
import { useState, useMemo, useEffect, useRef } from 'react';
import Webcam from "react-webcam";
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
// import { StudentShortDetails } from './StudentShortDetails';
import { useNavigate } from 'react-router-dom';
import { UserShortDetails } from './UserShortDetails.jsx';
import AddNewEmployeeModal from '../../Component/Modals/AddNewEmployeeModal.jsx';
import { getData, patchData, Postdata, Postdataform, updateData } from '../../API/GlobalApi.js';
import { validateEmail } from '../../Utils/ValidationService.js';

const UserDashboard = () => {

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
  const [uploaddoc, setgetuploaddocmaster] = useState([]);
  const [getbasicmaster, setgetbasicmaster] = useState([]);
  const [getofficialdetailmaster, setgetofficialdetailmaster] = useState([]);
  const [emoployeeId, setemoployeeId] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [employeeImageFile, setEmployeeImageFile] = useState(null);
  const [parentidfromorg, setparentidfromorg] = useState(null)
  const [departmentidfromorg, setdepartmentidfromorg] = useState(null)
  const [departmentfromorg, setdepartmentfromorg] = useState([]);
  const [reporttofromorg, setreporttofromorg] = useState([]);
  const [desigfromorg, setdesigfromorg] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [getemployeesdata, setgetemployeesdata] = useState([]);
  const [getemployeesdataId, setgetemployeesdataId] = useState(null);
  const [dpimgpath, setdpimgpath] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const webcamRef = useRef(null);
  const [attendanceType, setAttendanceType] = useState('biometric');
  const [biometricImages, setBiometricImages] = useState([]);
  const [geoLocation, setGeoLocation] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [periphery, setPeriphery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [funcsuc, setfuncsuc] = useState(false);
  const [orgform, setorgform] = useState({
    salutation: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    alias: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    marital_status: "",
    father_name: "",
    mother_name: "",
    email: ""
  })
  // const [uploaddocuments form]
  const [deptform, setdeptform] = useState({
    name: "",
    parent_department_id: null,
    country_code: "",
    area_code: '',
    landline: "",
    mobile: "",
    email: ""
  })
  const [contactDetails, setContactDetails] = useState([
    { number: '', contact_type: 'Personal', is_available_on_whatsapp: false, is_primary: true, country_code: '+91' }
  ]);
  const [correspondenceAddress, setCorrespondenceAddress] = useState({
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: ''
  });

  const [permanentAddress, setPermanentAddress] = useState({
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: ''
  });

  const [sameAsCorrespondence, setSameAsCorrespondence] = useState(false);

  const [academicDocs, setAcademicDocs] = useState([
    { id: Date.now(), qualification: '', board: '', specialization: '', percentage: '', file: null }
  ]);

  const [otherDocs, setOtherDocs] = useState([
    { id: Date.now(), documentType: '', documentNumber: '', expiryDate: '', file: null }
  ]);
  const [officialDetails, setOfficialDetails] = useState({
    organization: '',
    department: '',
    designation: '',
    reportTo: '',
    employeeCode: '',
    jobType: '',
    workingShift: '',
    dateOfJoining: '',
    employmentType: '',
    subjects: ['']
  });
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedPhoto(imageSrc);
    setShowCamera(false); // close camera
  };
  const displayToast = (message, variant = 'success') => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setemoployeeId(userId)
    setIsEditMode(true);
    setIsModalOpen(true); // open the modal
  };
  const getorgdata = async (page = 1) => {
    // const url = `administration/designations/?page=${page}`;
    const url = `administration/designations-no-pagination/`;
    const response = await getData(url);
    if (response) {
      setdnparentdata(response);
      //   getdeptdata(response[0]?.id)
    }
  };
  const handleSameAsCorrespondence = (e) => {
    const checked = e.target.checked;
    setSameAsCorrespondence(checked);
    if (checked) {
      setPermanentAddress({ ...correspondenceAddress });
    }
  };
  const handleCorrespondenceChange = (e) => {
    const { name, value } = e.target;
    setCorrespondenceAddress(prev => ({ ...prev, [name]: value }));
  };
  const handlePermanentChange = (e) => {
    const { name, value } = e.target;
    setPermanentAddress(prev => ({ ...prev, [name]: value }));
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const students = [
    { name: 'Chandra Bajaj', email: 'debra.holt@example.com' },
    { name: 'Jamal Musiala', email: 'billsanders@example.com' },
    { name: 'Jacob Jones', email: 'nathon.roberts@example.com' },
    { name: 'Robert Fox', email: 'felicia.reid@example.com' },
    { name: 'Cameron Williamson', email: 'michelle.young@example.com' },
    // Add more data as needed
  ];
  const getbasicmasterdata = async () => {
    const url = "staff/teacher-basic-details/get-master-data/";
    const response = await getData(url);
    if (response) {
      setgetbasicmaster(response.master);
      // setspecializationdata(response.specializations)
      // console.log("responseorg---", response)
      // setdnparentdata(response.results);
      // setSelectedOrgDetails(response.results[0]);
      // // setSelectedOrgid(response[0]?.id);
      // getdeptdata(response.results[0]?.id)

    }
  }
  const getuploaddocmasterdata = async () => {
    const url = "staff/teacher-document-details/get-master-data/";
    const response = await getData(url);
    if (response) {
      setgetuploaddocmaster(response.master);
      // setspecializationdata(response.specializations)
      // console.log("responseorg---", response)
      // setdnparentdata(response.results);
      // setSelectedOrgDetails(response.results[0]);
      // // setSelectedOrgid(response[0]?.id);
      // getdeptdata(response.results[0]?.id)

    }
  }
  const getofficialdetailmasterdata = async () => {
    const url = "staff/teacher-official-details/get-master-data/";
    const response = await getData(url);
    if (response) {
      setgetofficialdetailmaster(response.master);
      // setspecializationdata(response.specializations)
      // console.log("responseorg---", response)
      // setdnparentdata(response.results);
      // setSelectedOrgDetails(response.results[0]);
      // // setSelectedOrgid(response[0]?.id);
      // getdeptdata(response.results[0]?.id)

    }
  }
  const getorgdataold = async () => {
    const url = "administration/organizations/";
    const response = await getData(url);
    if (response) {
      console.log("responseorg---", response)
      setdnparentdata(response);
      setSelectedOrgDetails(response[0]);
      // setSelectedOrgid(response[0]?.id);
      getdeptdata(response[0]?.id)

    }
    // console.log("response--", response);
  }
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
        // console.log("responsestate--",response)
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
    const { name, value } = e.target; // Get the name and value from the input field
    setorgform(prevState => ({
      ...prevState, // Keep the previous state
      [name]: value // Dynamically update the field using the name
    }));
  };
  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...contactDetails];
    updatedContacts[index][field] = value;
    setContactDetails(updatedContacts);
  };
  const handlePrimarySelect = (index) => {
    const updatedContacts = contactDetails?.map((contact, i) => ({
      ...contact,
      is_primary: i === index // Only the selected one is true
    }));
    setContactDetails(updatedContacts);
  };
  const handleAcademicChange = (e, id) => {
    const { name, value } = e.target;
    const updatedDocs = academicDocs?.map(doc =>
      doc.id === id ? { ...doc, [name]: value } : doc
    );
    setAcademicDocs(updatedDocs);
  };
  // Handle input changes for Other Docs
  const handleOtherDocChange = (e, id) => {
    const { name, value } = e.target;
    const updatedDocs = otherDocs?.map(doc =>
      doc.id === id ? { ...doc, [name]: value } : doc
    );
    setOtherDocs(updatedDocs);
  };
  const handleAcademicFileChange = (e, id) => {
    const file = e.target.files[0];
    const updatedDocs = academicDocs?.map(doc =>
      doc.id === id ? { ...doc, file } : doc
    );
    setAcademicDocs(updatedDocs);
  };
  const handleAcademicFileRemove = (id) => {
    const updatedDocs = academicDocs?.map(doc =>
      doc.id === id ? { ...doc, file: null } : doc
    );
    setAcademicDocs(updatedDocs);
  };
  const handleOtherFileChange = (e, id) => {
    const file = e.target.files[0];
    const updatedDocs = otherDocs?.map(doc =>
      doc.id === id
        ? { ...doc, file, fileName: file ? file.name : 'No File Selected' }
        : doc
    );
    setOtherDocs(updatedDocs);
  };
  const handleRemoveOtherFile = (id) => {
    const updatedDocs = otherDocs?.map(doc =>
      doc.id === id
        ? { ...doc, file: null, fileName: 'No File Selected', fileSize: 0 }
        : doc
    );
    setOtherDocs(updatedDocs);
  };
  const handleEmployeeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployeeImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedPhoto(reader.result); // shows preview
      };
      reader.readAsDataURL(file);
    }
  };
  const submitEmployeeImage = async () => {
    const apiUrl = "staff/upload-file/";
    const token = sessionStorage.getItem('token');
    let formData = new FormData();

    if (employeeImageFile) {
      formData.append("file", employeeImageFile);
    } else if (capturedPhoto) {
      const blob = await fetch(capturedPhoto).then(res => res.blob());
      const file = new File([blob], "captured-photo.jpg", { type: "image/jpeg" });
      formData.append("file", file);
    } else {
      // alert("Please upload or capture an image before submitting.");
      displayToast('Please upload or capture an image before submitting', 'danger')
      return null;
    }

    try {
      // const response = await fetch(apiUrl, {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     ...(token && { 'Authorization': `Token ${token}` }),
      //   },
      // });
      const response = await Postdataform(apiUrl,formData)

      // if (!response.ok) throw new Error("Upload failed");

      // const result = await response.json();
      console.log("✅ Uploaded image URL:", response);
      displayToast('Image Uploaded Successfully', 'success')
      return response.file_url; // Return URL instead of setting state

    } catch (error) {
      // console.error("❌ Error uploading image:", error);
      displayToast(error, 'danger')
      return null;
    }
  };
  const handleOfficialChangeold = (e, index) => {
    const { name, value } = e.target;
    const updated = [...officialDetails];
    updated[index][name] = value;
    setOfficialDetails(updated);
  };
  const handleOfficialChange = async (e, index) => {
    const { name, value } = e.target;

    // Update selected field inside the specific row
    setOfficialDetails(prev => ({
      ...prev,
      [name]: value
    }));

    // Keep your API logic intact
    if (name === 'organization') {
      setparentidfromorg(value);
      const urldept = `administration/organizations/${value}/departments/`;
      const response = await getData(urldept);
      if (response) setdepartmentfromorg(response);
    }

    if (name === 'department') {
      setdepartmentidfromorg(value);
      const url = `administration/organizations/${parentidfromorg}/departments/${value}/designations/`;
      const response = await getData(url);
      setreporttofromorg(response);
      setdesigfromorg(response);
    }
  };
  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };
  const handleChangedept = (e) => {
    const { name, value } = e.target; // Get the name and value from the input field
    setdeptform(prevState => ({
      ...prevState, // Keep the previous state
      [name]: value // Dynamically update the field using the name
    }));
  }
  const handleSubmitbasic = async () => {
    const finalobj = {
      salutation: orgform.salutation,
      first_name: orgform.first_name,
      middle_name: orgform.middle_name,
      last_name: orgform.last_name,
      alias: orgform.alias,
      gender: orgform.gender,
      date_of_birth: orgform.date_of_birth,
      blood_group: orgform.blood_group,
      marital_status: orgform.marital_status,
      father_name: orgform.father_name,
      mother_name: orgform.mother_name,
      email: orgform.email,
      contact_numbers: contactDetails,
      addresses: [
        // {
        //   address_type: "Correspondence",
        //   address: correspondenceAddress.address,
        //   city_id: correspondenceAddress.city,
        //   state_id: correspondenceAddress.state,
        //   country_id: correspondenceAddress.country,
        //   pincode: correspondenceAddress.pincode
        // },
        {
          address_type: "Permanent",
          address: permanentAddress.address,
          city_id: permanentAddress.city,
          state_id: permanentAddress.state,
          country_id: permanentAddress.country,
          pincode: permanentAddress.pincode
        }

      ]
    }
    console.log("finalobj--", finalobj)
    // if (orgform.salutation > 0 && orgform.first_name.length > 0 && orgform.alias.length > 0
    //   && orgform.gender.length > 0 && orgform.date_of_birth.length > 0 && orgform.marital_status > 0&&orgform.contactDetails[0]?.number.length === 10
    //   && orgform.father_name.length > 0 && orgform.mother_name.length > 0 
    //   && validateEmail(orgform.email)){
    if (finalobj.salutation.length > 0 && finalobj.first_name.length > 0 && finalobj.last_name.length > 0 && finalobj.alias.length > 0 && finalobj.gender.length > 0 && finalobj.date_of_birth.length > 0 && finalobj.marital_status.length > 0 && finalobj.father_name.length > 0 && validateEmail(finalobj.email) &&
      finalobj.contact_numbers[0].number.length === 10 && finalobj.addresses[0].address.length > 0 && finalobj.addresses[0].pincode.length > 0) {
      const url = 'staff/teacher-basic-details/';
      console.log("orgformbasic---", finalobj)
      const response = await Postdata(url, finalobj);
      if (!response.error) {
        setfuncsuc(true);
        displayToast('Basic Details Submit SuccessFully', 'success');
        setemoployeeId(response.user_id);
        sessionStorage.setItem("employeeId", response.user_id)
        return true;
      }
      else {
        displayToast(response.error, 'danger');
        return false;
      }
    }
    else {
      displayToast('Please Fill All Required Fields!!', 'danger');
      return false;
    }



    // closeModal();
    // openModaldept();
    getorgdata()


  }
  const handleSubmituploaddocuments = async () => {
    const employeeId = sessionStorage.getItem('employeeId')
    const employee_id = emoployeeId ? emoployeeId : employeeId; // or pull from props/context/state
    let res = await submitEmployeeImage();
    if (res) {
      setdpimgpath(res.file_url);
    }
    // Map academicDocs to qualifications
    const qualifications = academicDocs?.map(doc => ({
      qualification_type: doc.qualification,
      board: doc.board,
      percentage: parseFloat(doc.percentage || 0),
      subjects: doc.specialization ? [{ subject: doc.specialization }] : [],
      documents: doc.file
        ? [{
          document: doc.file.name, // or base64/File URL if uploading
          document_type: "Certificate"
        }]
        : []
    }));

    // Map otherDocs to employee_documents
    const employee_documents = otherDocs?.map(doc => ({
      document_type: doc.documentType,
      document_number: doc.documentNumber,
      document: doc.file?.name || "No File Selected",
      validity: doc.expiryDate
    }));

    const payload = {
      employee_id,
      qualifications,
      employee_documents
    };

    console.log("🚀 Final Payload:", payload);

    const url = 'staff/teacher-document-details/';
    // console.log("orgformbasic---", finalobj)
    const response = await Postdata(url, payload);

    if (!response.error) {
      setemoployeeId(response.user_id)
      // closeModal();
      // openModaldept();
      getorgdata()

    }

    // Call your API here:
    // axios.post('/api/employees/upload-docs', payload).then(...).catch(...)
  };
  const handleSubmituploaddocumentold = async () => {
    setfuncsuc(false);
    const employeeId = sessionStorage.getItem('employeeId');
    const employee_id = emoployeeId ? emoployeeId : employeeId;

    // ✅ Get uploaded DP path
    const dpFileUrl = await submitEmployeeImage();
    console.log("✅ dpFileUrl:", dpFileUrl);

    const qualifications = academicDocs?.map(doc => ({
      qualification_type: doc.qualification,
      board: doc.board,
      percentage: parseFloat(doc.percentage || 0),
      subjects: doc.specialization ? [{ subject: doc.specialization }] : [],
      documents: doc.file
        ? [{
          document: doc.file.name,
          document_type: "Certificate"
        }]
        : []
    }));

    const employee_documents = otherDocs?.map(doc => ({
      document_type: doc.documentType,
      document_number: doc.documentNumber,
      document: doc.file?.name || "No File Selected",
      validity: doc.expiryDate
    }));

    // ✅ Push DP image if present
    if (dpFileUrl) {
      employee_documents.push({
        document_type: "Certificate",
        document_number: "DP",
        document: dpFileUrl,
        validity: null
      });
    }

    const payload = {
      employee_id,
      qualifications,
      employee_documents
    };

    if (qualifications.board?.length > 0 && qualifications.subjects?.length > 0 && qualifications.documents.document?.length > 0 && qualifications.documents.document_type?.length > 0 && employee_documents.document_type?.length > 0 && employee_documents.document_number?.length > 0 && employee_documents.document?.length > 0 && employee_documents.validity?.length > 0) {
      console.log("🚀 Final Payload with DP:", payload);

      const url = 'staff/teacher-document-details/';
      const response = await Postdata(url, payload);

      if (!response.error) {
        setfuncsuc(true)
        displayToast('Documents Uploaded Submit SuccessFully', 'success');
        setemoployeeId(response.user_id);
        getorgdata();
        return true;
      }
      else {
        displayToast(response.error, 'danger');
        return false;
      }
    }
    else {
      displayToast('Fill all the required Details', 'danger');
      return false;
    }
  };
  const handleSubmituploaddocument = async () => {
    setfuncsuc(false);
    const employeeId = sessionStorage.getItem('employeeId');
    const employee_id = emoployeeId ? emoployeeId : employeeId;

    // ✅ Upload DP image if provided
    const dpFileUrl = await submitEmployeeImage();
    console.log("✅ DP file URL:", dpFileUrl);

    // ✅ Build academic qualifications
    const qualifications = academicDocs.map(doc => ({
        qualification_type: doc.qualification,
        board: doc.board,
        percentage: parseFloat(doc.percentage || 0),
        subjects: doc.specialization ? [{ subject: doc.specialization }] : [],
        documents: doc.file
            ? [{
                document: doc.file.name,
                document_type: "Certificate"
            }]
            : []
    }));

    // ✅ Build other documents
    const employee_documents = otherDocs?.map(doc => ({
        document_type: doc.documentType,
        document_number: doc.documentNumber,
        document: doc.file?.name || "No File Selected",
        validity: doc.expiryDate
    }));

    // ✅ Append DP image as a document if uploaded
    if (dpFileUrl) {
        employee_documents.push({
            document_type: "Certificate",
            document_number: "DP",
            document: dpFileUrl,
            validity: null
        });
    }

    // ✅ Validate academicDocs
    const isValid = qualifications.every(q =>
        q.qualification_type &&
        q.board &&
        q.subjects.length > 0 &&
        q.documents.length > 0 &&
        q.documents[0].document &&
        q.documents[0].document_type
    );

    // ✅ Validate otherDocs
    const isOtherDocsValid = employee_documents.every(doc =>
        doc.document_type &&
        doc.document_number &&
        doc.document &&
        (doc.validity !== undefined) // allow null for DP
    );

    // ✅ Build payload
    const payload = {
        employee_id,
        qualifications,
        employee_documents
    };

    // ✅ Final Submission
    if (isValid && isOtherDocsValid) {
        console.log("🚀 Final Payload:", payload);
        const url = 'staff/teacher-document-details/';
        const response = await Postdata(url, payload);

        if (!response.error) {
            setfuncsuc(true);
            displayToast('Documents Uploaded Successfully ✅', 'success');
            setemoployeeId(response.user_id);
            getorgdata();
            return true;
        } else {
            displayToast(response.error || 'Submission failed', 'danger');
            return false;
        }
    } else {
        // 🔍 Debug help (Optional)
        console.warn("❌ Invalid Academic Docs:", qualifications);
        console.warn("❌ Invalid Other Docs:", employee_documents);
        displayToast('Fill all the required Details', 'danger');
        return false;
    }
};

  const handleSubmitOfficialDetails = async () => {
    setfuncsuc(false);
    const token = sessionStorage.getItem("token");
    const employeeId = sessionStorage.getItem("employeeId")
    const employee_id = emoployeeId ? emoployeeId : employeeId;

    if (!officialDetails || officialDetails.length === 0) {
      displayToast('Please fill in official details', 'danger');
      // alert("Please fill in official details.");
      return;
    }

    const payload = {
      user_id: Number(employee_id),
      organization_id: Number(officialDetails.organization) || 0,
      department_id: Number(officialDetails.department) || 0,
      designation_id: Number(officialDetails.designation) || 0,
      unique_code: officialDetails.employeeCode || "EMP-001",
      working_shift: officialDetails.workingShift || "Morning",
      date_of_joining: officialDetails.dateOfJoining || new Date().toISOString().split("T")[0],
      employment_type: officialDetails.employmentType || "Full Time",
      manager: Number(officialDetails.reportTo) || 0,
      // subjects: (officialDetails.subjects || []).filter(Boolean), 
      bank_id: 1, // optional if you're not sending it
      account_holder_name: bankDetails.accountHolderName || "",
      bank_account_number: bankDetails.accountNumber || ""
    };

    if (payload.organization_id.length > 0 && payload.department_id.length > 0 && payload.designation_id.length > 0 && payload.account_holder_name.length > 0 && payload.bank_account_number.length > 0) {
      try {
        // const response = await fetch(`https://bgi.sortstring.com/api/v1/staff/teacher-official-details/${employee_id}/`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Token ${token}`
        //   },
        //   body: JSON.stringify(payload)
        // });
        const response = await updateData(`staff/teacher-official-details/${employee_id}/`,payload)
        // if (!response.ok) throw new Error("Failed to save official details");

        // const result = await response.json();
        if(!response.error){
          setfuncsuc(true);
          displayToast('Official details saved successfully', 'success');
          return true;
        }
        console.log("✅ Official details saved successfully:", response);
        // alert("Official details saved!");
      } catch (error) {
        // console.error("❌ Error saving official details:", error);
        // alert("Failed to save official details.");
        displayToast(error, 'danger');
        return false;
      }
    }
    else {
      displayToast('Fill All the required details', 'danger');
      return false;
    }
  };
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
      getdeptdata(parentorgid)
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
  const handleRowClickold = (orgId, row) => {
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

      // Store the simplified data in localStorage
      localStorage.setItem('selectedOrgDetails', JSON.stringify({ id, name, parent, email }));

      console.log("Selected Organisation Details:", selectedOrg);
    } else {
      console.error("Organization not found");
    }
  };
  const handleRowClick = async (userId, row) => {
    const token = sessionStorage.getItem("token");

    try {
      // const response = await fetch(`https://bgi.sortstring.com/api/v1/staff/get-employees/${userId}/`, {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `Token ${token}`
      //   }
      // });
      const response = await getData(`staff/get-employees/${userId}/`)
      // if (!response.ok) {
      //   throw new Error("Failed to fetch employee details");
      // }

      // const employeeData = await response.json();
      setSelectedOrgDetails(response);
      // Save data in state or localStorage (depending on your use case)
      localStorage.setItem("selectedEmployeeData", JSON.stringify(response));
      console.log("✅ Employee Data:", response);

      // Optionally, update state to use in a modal
      // setSelectedEmployeeData(employeeData); // if you're using it in a modal later

    } catch (error) {
      console.error("❌ Error fetching employee data:", error);
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
      getdeptdata(parentorgid);
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
  const handleUpdateBasicDetails = async () => {
    const employeeId = sessionStorage.getItem('employeeId');
    const employee_id = emoployeeId ? emoployeeId : employeeId;
    const finalobj = {
      salutation: orgform.salutation,
      first_name: orgform.first_name,
      middle_name: orgform.middle_name,
      last_name: orgform.last_name,
      alias: orgform.alias,
      gender: orgform.gender,
      date_of_birth: orgform.date_of_birth,
      blood_group: orgform.blood_group,
      marital_status: orgform.marital_status,
      father_name: orgform.father_name,
      mother_name: orgform.mother_name,
      email: orgform.email,
      contact_numbers: contactDetails,
      addresses: [
        // {
        //   address_type: "Correspondence",
        //   address: correspondenceAddress.address,
        //   city_id: correspondenceAddress.city,
        //   state_id: correspondenceAddress.state,
        //   country_id: correspondenceAddress.country,
        //   pincode: correspondenceAddress.pincode
        // },
        {
          address_type: "Permanent",
          address: permanentAddress.address,
          city_id: permanentAddress.city,
          state_id: permanentAddress.state,
          country_id: permanentAddress.country,
          pincode: permanentAddress.pincode
        }

      ]
    }
    if (finalobj.salutation.length > 0 && finalobj.first_name.length > 0 && finalobj.last_name.length > 0 && finalobj.alias.length > 0 && finalobj.gender.length > 0 && finalobj.date_of_birth.length > 0 && finalobj.marital_status.length > 0 && finalobj.father_name.length > 0 && validateEmail(finalobj.email) &&
      finalobj.contact_numbers[0].number.length === 10 && finalobj.addresses[0].address.length > 0 && finalobj.addresses[0].pincode.length > 0) {
      const url = `staff/teacher-basic-details/${employee_id}/`;
      console.log("orgformbasic---", finalobj)
      const response = await updateData(url, finalobj);
      if (!response.error) {
          setfuncsuc(true);
          setemoployeeId(response.user_id);
          sessionStorage.setItem("employeeId", response.user_id)
          displayToast("Basic Details Uploaded Successfully",'success')
        
        // closeModal();
        // openModaldept();
        getorgdata()
        return true;
      }
    } else {
      displayToast("Fill all the required details",'danger');
      return false;
    }
  }
  const dataemploye = useMemo(() => {
    return getemployeesdata?.map((emp) => ({
      id: emp.user_id,
      name: `${emp.first_name || ''} ${emp.last_name || ''}`,
      email: emp.email || '',
      department_name: emp.department?.name || '',
      designation: emp.designation?.name || '',
      contacts: emp.contact_numbers || [],
      img: emp.latest_photo?.document || null,
      status: emp.status,
      handleRowClick:handleRowClick
    }));
  }, [getemployeesdata]);

  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return dataemploye;
    }
    return dataemploye.filter((org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase())
      // org.id.toString().includes(searchQuery)
    );
  }, [searchQuery, getemployeesdata]);
  const handleClear = () => {
    setorgform({
      salutation: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      alias: "",
      gender: "",
      date_of_birth: "",
      blood_group: "",
      marital_status: "",
      father_name: "",
      mother_name: "",
      email: ""
    })
    // const [uploaddocuments form]
    setdeptform({
      name: "",
      parent_department_id: null,
      country_code: "",
      area_code: '',
      landline: "",
      mobile: "",
      email: ""
    })
    setContactDetails([
      { number: '', contact_type: 'Personal', is_available_on_whatsapp: false, is_primary: true, country_code: '+91' }
    ]);
    setCorrespondenceAddress({
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: ''
    });

    setPermanentAddress({
      address: '',
      country: '',
      state: '',
      city: '',
      pincode: ''
    });
    setAcademicDocs([
      { id: Date.now(), qualification: '', board: '', specialization: '', percentage: '', file: null }
    ]);

    setOtherDocs([
      { id: Date.now(), documentType: '', documentNumber: '', expiryDate: '', file: null }
    ]);
    setOfficialDetails({
      organization: '',
      department: '',
      designation: '',
      reportTo: '',
      employeeCode: '',
      jobType: '',
      workingShift: '',
      dateOfJoining: '',
      employmentType: '',
      subjects: ['']
    });
    setBankDetails({
      accountHolderName: '',
      bankName: '',
      accountNumber: ''
    });
    setAttendanceType('biometric');
    setBiometricImages([]);
    setGeoLocation('');
    setSearchLocation('');
    setPeriphery('');
    setSelectedPlace(null);
    setCurrentStep(0);

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
    const url = `staff/update-employee-status/${row.original.id}/`;
    // staff/update-employee-status/16/
    const response = await patchData(url, { status: newStatus });

    if (response) {
      getorgdata();
      displayToast('Status Uploaded Successfully','success')
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
  const handleFilterClickold = () => {
    // onFilter(searchQuery); 
  };
  const getemployees = async () => {
    const url = `staff/get-employees/`;
    const response = await getData(url);
    setgetemployeesdata(response.results);
    setgetemployeesdataId(response.results[0]?.user_id)

  }
  const dataemployeold = useMemo(() => {
    return getemployeesdata && getemployeesdata?.map((org) => ({
      id: org.user_id,
      name: org.name,
      department_name: org.department_name,
      organization_name: org.organization_name,
      report_to_name: org.report_to_name,
      status: org.status,
      organization_id: org.organization_id,
      depart_id: org.department_id
    }));
  }, [getemployeesdata])
  // Table columns definition


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
        Header: 'Img',
        accessor: 'img',
        Cell: ({ value }) => {
          const imageUrl = value ? `http://bgi.sortstring.com/media/uploads/${value}` : image;
          return (
            <img
              src={imageUrl}
              alt="Profile"
              style={{ width: '40px', height: '40px', borderRadius: '8px', border: "1px solid #E9E9E9" }}
            />
          );
        },
      },
      
      {
        Header: 'Employee\'s Name / ID',
        accessor: 'name',
        Cell: ({ row }) => (
          <div style={{ cursor: 'pointer' }} onClick={() => { handleRowClick(row.original.id, row) }}>
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.name}</p>
            <p style={{ textAlign: 'left', margin: 0 }}>({row.original.id})</p>
          </div>
        )
      },

      {
        Header: 'Designation',
        accessor: 'course',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.designation}</p>
          </div>
        )
      },
      {
        Header: 'Department',
        accessor: 'semester',
        Cell: ({ row }) => (
          <div >
            <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.department_name}</p>
          </div>
        )
      },
      {
        Header: 'Contacts',
        accessor: 'contacts',
        Cell: ({ row }) => (
          <div>
            {Array.isArray(row?.original.contacts) && row.original.contacts?.map((contact, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <img
                  src={contact.is_available_on_whatsapp ? whatsapp : phone}
                  alt="icon"
                  style={{ width: 12, height: 12 }}
                />
                <p>{contact.country_code} {contact.number}</p>
              </div>
            ))}
          </div>
        )
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
      {
        Header: 'Action',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div class="form-check form-switch custom-switch" onClick={console.log("rowswitch--", row.original.status)} >
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: 'pointer' }} checked={row.original.status} onChange={() => handleStatus(row)} />
              </div>
            </div>
            <img src={edit} style={{ cursor: 'pointer' }} onClick={() => { handleEditClick(row.original.id) }}></img>

          </div>
        ),
      },
      {
        Header: <img src={setting}></img>,
        accessor: 'setting',
        Cell: ({ row }) => (
          // <img src={tablelast}></img>
          <p></p>
        )
      },
    ],
    []
  );

  useEffect(() => {
    getbasicmasterdata();
    getcountry();
    getuploaddocmasterdata();
    getofficialdetailmasterdata();
    getemployees();
  }, [])
  useEffect(() => {
    const fetchAllData = async () => {
      if (isEditMode && selectedUserId) {
        try {
          const token = sessionStorage.getItem("token");

          const [basicRes, uploadDocRes, officialRes, attendanceRes] = await Promise.all([
            // fetch(`https://bgi.sortstring.com/api/v1/staff/teacher-basic-details/${selectedUserId}/`, { headers: { Authorization: `Token ${token}` } }),
            // fetch(`https://bgi.sortstring.com/api/v1/staff/get-teacher-document-details/${selectedUserId}/`, { headers: { Authorization: `Token ${token}` } }),
            // fetch(`https://bgi.sortstring.com/api/v1/staff/teacher-official-details/${selectedUserId}/`, { headers: { Authorization: `Token ${token}` } }),
            // fetch(`staff/attendance-settings/${selectedUserId}/`, { headers: { Authorization: `Token ${token}` } }),
            getData(`staff/teacher-basic-details/${selectedUserId}/`),
            getData(`staff/get-teacher-document-details/${selectedUserId}/`),
            getData(`staff/teacher-official-details/${selectedUserId}/`)
          ]);

          const basicData = await basicRes.json();
          const uploadData = await uploadDocRes.json();
          const officialData = await officialRes.json();
          console.log("uploadData---", uploadData);
          // const attendanceData = await attendanceRes.json();
          if (basicData.addresses && Array.isArray(basicData.addresses)) {
            const permanent = basicData.addresses.find(addr => addr.address_type === 'Permanent');
            const correspondence = basicData.addresses.find(addr => addr.address_type === 'Correspondence');

            if (permanent) {
              setPermanentAddress({
                address: permanent.address || '',
                country: permanent.country_id || '',
                state: permanent.state_id || '',
                city: permanent.city_id || '',
                pincode: permanent.pincode || ''
              });
            }

            if (correspondence) {
              setCorrespondenceAddress({
                address: correspondence.address || '',
                country: correspondence.country || '',
                state: correspondence.state || '',
                city: correspondence.city || '',
                pincode: correspondence.pincode || ''
              });
            }
          }
          // ✅ populate respective form states
          setorgform(basicData);
          setContactDetails(basicData.contact_numbers)
          // setCorrespondenceAddress(basicData.addresses);
          // setPermanentAddress(basicData.addresses)
          // Academic Docs: Handle specialization and file (if needed for preview)
          // setAcademicDocs(
          //   uploadData.qualifications?.map((item) => ({
          //     id: item.id,
          //     qualification: item.qualification_type || '',
          //     board: item.board || '',
          //     specialization: item.subjects?.[0]?.subject || '', // 🟣 this is your specialization
          //     percentage: item.percentage || '',
          //     file: item.documents?.[0]?.document || null
          //   })) || []
          // );
          setAcademicDocs(
            uploadData.qualifications && uploadData.qualifications.length > 0
              ? uploadData.qualifications?.map((item) => ({
                id: item.id,
                qualification: item.qualification_type || '',
                board: item.board || '',
                specialization: item.subjects?.[0]?.subject || '',
                percentage: item.percentage || '',
                file: item.documents?.[0]?.document || null
              }))
              : [{ id: Date.now(), qualification: '', board: '', specialization: '', percentage: '', file: null }]
          );

          setOtherDocs(
            uploadData.employee_documents && uploadData.employee_documents.length > 0
              ? uploadData.employee_documents?.map((item) => ({
                id: item.id,
                documentType: item.document_type || '',
                documentNumber: item.document_number || '',
                expiryDate: item.validity || '',
                file: item.document || null
              }))
              : [{ id: Date.now(), documentType: '', documentNumber: '', expiryDate: '', file: null }]
          );


          // Other Docs: Bind expiry date and file
          // setOtherDocs(
          //   uploadData.employee_documents?.map((item) => ({
          //     id: item.id,
          //     documentType: item.document_type || '',
          //     documentNumber: item.document_number || '',
          //     expiryDate: item.validity || '', // ✅ ensure your API returns this
          //     file: item.document || null
          //   })) || []
          // );

          setEmployeeImageFile(uploadData.image || null);

          setOfficialDetails({
            organization: officialData.organization || '',
            department: officialData.department || '',
            designation: officialData.designation || '',
            reportTo: officialData.manager || '', // manager is ID or full name based on backend
            employeeCode: officialData.unique_code || '',
            jobType: officialData.job_type || '', // if available
            workingShift: officialData.working_shift || '',
            dateOfJoining: officialData.date_of_joining || '',
            employmentType: officialData.employment_type || '',
            subjects: officialData.subjects || []
          });

          setBankDetails({
            accountHolderName: officialData.account_holder_name,
            bankName: officialData.bank,
            accountNumber: officialData.bank_account_number
          });

          // If Attendance needs update
          // setAttendanceState({
          //   attendance_mode: attendanceData.attendance_mode,
          //   fensing_type: attendanceData.fensing_type,
          //   periphery: attendanceData.periphery,
          //   latitude: attendanceData.latitude,
          //   longitude: attendanceData.longitude,
          //   ...attendanceData,
          // });

        } catch (err) {
          console.error("❌ Failed to fetch employee data:", err);
        }
      }
    };

    fetchAllData();
  }, [isEditMode, selectedUserId]);
  useEffect(() => {
    const handleRowClick = async () => {
      const token = sessionStorage.getItem("token");

      try {
        // const response = await fetch(`https://bgi.sortstring.com/api/v1/staff/get-employees/${getemployeesdataId}/`, {
        //   method: 'GET',
        //   headers: {
        //     Authorization: `Token ${token}`
        //   }
        // });
        const response = await getData(`staff/get-employees/${getemployeesdataId}/`)
        if (!response.ok) {
          throw new Error("Failed to fetch employee details");
        }

        // const employeeData = await response.json();
        setSelectedOrgDetails(response);
        // Save data in state or localStorage (depending on your use case)
        localStorage.setItem("selectedEmployeeData", JSON.stringify(response));
        console.log("✅ Employee Data:", response);

        // Optionally, update state to use in a modal
        // setSelectedEmployeeData(employeeData); // if you're using it in a modal later

      } catch (error) {
        console.error("❌ Error fetching employee data:", error);
      }
    };
    handleRowClick()
  }, [getemployeesdataId])
  return (
    <>
      <div className="dashboard">
        {/* Content for the Dashboard */}
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <div >
            <h2 className='main-heading'>Employee Dashboard</h2>
          </div>
          <div >
            <button className='add-btn' onClick={openModal}><span className='me-2'>
              <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
              </svg>
            </span>Add New Employee</button>
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
                <h4 className='text-primary'>Employees ({getemployeesdata?.length})</h4>
              </div>
              <div className="col-md-6">
                <div style={{ display: "flex", justifyContent: 'end' }}>
                  <SearchBar data={dataemploye} onSearch={handleSearch} />
                  <button
                    className="filter-btn"
                  // onClick={handleSearch}
                  >
                    <img src={filtericon}></img>
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Table data={filteredData} columns={columns} selectedOrgDetails={selectedOrgDetails} />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <UserShortDetails
              navigate={navigate} closeModaldept={closeModaldept} isModalOpendept={isModalOpendept} openModaldept={openModaldept} selectedOrgDetails={selectedOrgDetails} departmentdetails={departmentdetails} deptform={deptform} handleChangedept={handleChangedept} handleSubmitdept={handleSubmitdept} handleEditdept={handleEditdept} Updatebtn={Updatebtn}
              handleupdatedept={handleupdatedept} handleCleardept={handleCleardept} handleStatusDept={handleStatusDept} getemployeesdataId={getemployeesdataId} />
          </div>
        </div>
      </div >
      <div>
        <AddNewEmployeeModal isOpen={isModalOpen} onClose={closeModal} setsubmit={setsubmit}
          orgform={orgform} setorgform={setorgform} getbasicmaster={getbasicmaster} contactDetails={contactDetails} setContactDetails={setContactDetails} handleContactChange={handleContactChange} handleChange={handleChange} handlePrimarySelect={handlePrimarySelect}
          handleSubmitbasic={handleSubmitbasic} countryId={countryId} stateid={stateid} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleSameAsCorrespondence={handleSameAsCorrespondence} handleCorrespondenceChange={handleCorrespondenceChange} handlePermanentChange={handlePermanentChange} correspondenceAddress={correspondenceAddress} setCorrespondenceAddress={setCorrespondenceAddress} permanentAddress={permanentAddress} setPermanentAddress={setPermanentAddress} sameAsCorrespondence={sameAsCorrespondence} setSameAsCorrespondence={setSameAsCorrespondence} academicDocs={academicDocs}
          setAcademicDocs={setAcademicDocs} otherDocs={otherDocs}
          setOtherDocs={setOtherDocs} setgetuploaddocmaster={setgetuploaddocmaster} uploaddoc={uploaddoc}
          capture={capture} showCamera={showCamera} setShowCamera={setShowCamera} capturedPhoto={capturedPhoto} setCapturedPhoto={setCapturedPhoto} webcamRef={webcamRef}
          handleOtherDocChange={handleOtherDocChange} handleAcademicChange={handleAcademicChange}
          handleAcademicFileRemove={handleAcademicFileRemove}
          handleAcademicFileChange={handleAcademicFileChange}
          handleOtherFileChange={handleOtherFileChange}
          handleRemoveOtherFile={handleRemoveOtherFile}
          employeeImageFile={employeeImageFile}
          setEmployeeImageFile={setEmployeeImageFile} handleEmployeeImageChange={handleEmployeeImageChange}
          handleSubmituploaddocument={handleSubmituploaddocument} submitEmployeeImage={submitEmployeeImage} handleOfficialChange={handleOfficialChange} handleBankChange={handleBankChange} bankDetails={bankDetails} setBankDetails={setBankDetails} officialDetails={officialDetails} setOfficialDetails={setOfficialDetails}
          getofficialdetailmaster={getofficialdetailmaster}
          dnparentdata={dnparentdata} setdnparentdata={setdnparentdata} departmentfromorg={departmentfromorg} desigfromorg={desigfromorg}
          handleSubmitOfficialDetails={handleSubmitOfficialDetails} selectedUserId={selectedUserId}
          isEditMode={isEditMode} currentStep={currentStep} setCurrentStep={setCurrentStep}
          biometricImages={biometricImages} setBiometricImages={setBiometricImages} geoLocation={geoLocation}
          setGeoLocation={setGeoLocation} searchLocation={searchLocation} setSearchLocation={setSearchLocation}
          periphery={periphery} setPeriphery={setPeriphery}
          selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} attendanceType={attendanceType}
          setAttendanceType={setAttendanceType} handleUpdateBasicDetails={handleUpdateBasicDetails}
          emoployeeId={emoployeeId} setfuncsuc={setfuncsuc} funcsuc={funcsuc}
        />
      </div>
      {submit === true ? <SuccessfulPopup mainheading={'Registration Completed Successfully!'} submitclose={submitclose} /> : ''}
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
  );
};

export default UserDashboard;
