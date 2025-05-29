
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
// import edit from '../../assets/icons/pencil-square.svg';
// import { OrganisationShortDetails } from './OrganisationShortDetails.js';
import { useNavigate } from 'react-router-dom';
import { AddOrganisationModal } from '../../Component/Modals/AddOrganisationModal.jsx';
import { getBlob, getBloblive, getData, getDataformap, patchData, Postdata, updateData } from '../../API/GlobalApi.js';
import { EnquiryModal } from '../../Component/Modals/EnquiryModal.jsx';
import { EnquiryShortDetails } from './EnquiryShortDetails.jsx';
import mapIcon from '../../assets/icons/map-new.svg'
import MapWithMarkers from '../../Component/Maps/MapModal.jsx';
import exporticon from '../../assets/icons/export-data-white.svg';
import debounce from 'lodash.debounce';
import edit from '../../assets/icons/editnew.svg';
import Select from 'react-select';

const EnquiryDashboard = () => {

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isOtpFilled, setIsOtpFilled] = useState(false);
    const [getotpdisp, setgetotpdisp] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
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
    const [token, settoken] = useState('');
    const [datacount, setdatacount] = useState(null);
    const otpInputs = useRef([]);
    const [masterdata, setmasterdata] = useState([]);
    const [specializationdata, setspecializationdata] = useState([]);
    const [mapdata, setmapdata] = useState([]);
    const [createdBy, setCreatedBy] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 10;
    const [orgform, setorgform] = useState({
        fname: '',
        lname: null,
        mobileno: '',
        email: '',
        aadhar: '',
        qualifications: '',
        address: '',
        pincode: '',
        countrycode: '1',
        status: false,
        enquirysource: '',
        pincode: '',
        fathername: '',
        userId: null


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
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate();
    const [contactDetails, setContactDetails] = useState([
        { priorityCourse: null }
    ]);
    const [filterQueryString, setFilterQueryString] = useState('');
    const [showMap, setShowMap] = useState(false);
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
        console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setTimeout(() => setShowToast(false), 3000);
    };


    const handleSearchold = (query) => {
        setSearchQuery(query);
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
        queryParams.set("search", query);
        // queryParams.set("page", "1");

        const finalUrl = `students/inquiry/?${queryParams.toString()}`;

        try {
            const response = await getDataformap(finalUrl);
            setdnparentdata(response.results || []);
            // setTotalCount(response.count || 0);
            // setgetstudentsdataId(response.results[0]?.user_id || null);
            setFilterQueryString(queryParams.toString()); // Save updated string
        } catch (err) {
            console.error("Search failed:", err);
        }
    };
    const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);
    useEffect(() => {
        return () => debouncedSearch.cancel(); // cleanup
    }, []);
    const handleOtpChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ''); // Only digits
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            otpInputs.current[index + 1]?.focus();
        } else if (value === '' && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
        setIsOtpFilled(newOtp.every(digit => digit.length === 1));
    };
    const Getotpold = async () => {
        const data = { mobile: phoneNumber };
        const url = "students/inquiry/send-otp/";
        const response = await Postdata(url, data);
        if (response) {
            setgetotpdisp(true);
        }
        if (response) {
            displayToast('Otp Sent Successfully!', 'success');
        } else if (response) {
            const errorMsg = response.message?.[0] || 'Send Correct Mobile No.';
            displayToast(errorMsg, 'danger');
        } else {
            displayToast('Unexpected error occurred.', 'danger');
        }
    };
    const Getotp = async () => {
        const data = { mobile: phoneNumber };
        const url = "students/inquiry/send-otp/";

        try {
            const response = await Postdata(url, data);

            // If using axios, response.status will be available
            if (response) {
                setgetotpdisp(true);
                displayToast('OTP sent successfully!', 'success');
            } else if (response?.status === 400 || response?.status === 404) {
                const errorMsg = response?.message || 'Invalid Mobile Number or API not found.';
                displayToast(errorMsg, 'danger');
            } else {
                displayToast('Unexpected server response.', 'danger');
            }
        } catch (error) {
            // In case request itself fails (network/server down)
            console.error("OTP send error:", error);
            displayToast('Failed to send OTP. Please try again.', 'danger');
        }
    };

    const getmasterdata = async () => {
        const url = "students/inquiry/masterdata/";
        const response = await getData(url);
        if (response) {
            setmasterdata(response);
            setspecializationdata(response.specializations)
            // console.log("responseorg---", response)
            // setdnparentdata(response.results);
            // setSelectedOrgDetails(response.results[0]);
            // // setSelectedOrgid(response[0]?.id);
            // getdeptdata(response.results[0]?.id)

        }
    }


    //       const getenquirydata = async (id) => {
    //     if (!id) {
    //       return;
    //     }
    //     const url = `students/inquiry/?student_id=${id}`;
    //     try {
    //       const response = await getData(url);
    // console.log("enquire data based on id",response)
    //       if (response) {
    //         setSelectedOrgDetails(response);
    //       } else {
    //         displayToast('No Enquiry data found.', 'warning');
    //       }
    //     } catch (error) {
    //       console.error("Error fetching enquiry data:", error);
    //       displayToast('Error fetching enquiry data', 'danger');
    //     }
    //   };


    const getorgdata = async () => {
        // const url = "students/inquiry/";
        const url2 = "students/inquiry/no-pagination/";
        // const response = await getData(url);
        const response2 = await getDataformap(url2);
        // if (response) {
        //     console.log("responseorg---", response)
        //     // setdnparentdata(response.results);
        //     // setdatacount(response.count)
        //     // setSelectedOrgDetails(response.results[0]);
        // }
        if (response2) {
            setmapdata(response2);
            console.log("mapdata--", mapdata);
        }
        // console.log("response--", response);
    }
    // const getdeptdata = async (res) => {
    //     setparentorgid(res);
    //     console.log("selectedOrgDetails.id--", res);
    //     const url = `administration/organizations/${res}/departments/`;
    //     const response = await getData(url);
    //     if (response) {
    //         setdepartmentdetails(response);
    //     }
    //     console.log("responsedepartment", response);
    // }
    const getcountry = async () => {
        const url = "administration/countries/";
        const response = await getData(url);
        setcountrydata(response)
        console.log("response--", response);
    }
    const getstate = async () => {
        const url = `administration/countries/${countryId}/states/`;
        const response = await getData(url);
        setstatedata(response.state_list)
        console.log("response--", response);
    }
    const getcity = async () => {
        const url = `administration/countries/${countryId}/states/${stateid}/cities/`
        const response = await getData(url);
        setcitydata(response.city_list)
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
    const handleChangephno = (e) => {
        const value = e.target.value;
        setPhoneNumber(value.replace(/\D/g, ''));
    };
    const handleSubmitotp = async () => {
        const url = "students/inquiry/verify-otp/";
        const data = {
            mobile: phoneNumber,
            otp: otp.join('')
        }
        console.log("data---", data)
        const response = await Postdata(url, data);


        if (response && !response.error) {
            displayToast('Otp Verified Successfully!', 'success');
        } else if (response && response.error) {
            const errorMsg = response.error?.[0] || 'Otp Not Verified.';
            displayToast(errorMsg, 'danger');
        } else {
            displayToast('Unexpected error occurred.', 'danger');
        }
        // if (response.token){
        //   settoken(response.token);
        //   window.sessionStorage.setItem('token',response.token);
        // //   window.location.href = "/studentDashboard/";
        // }
        // else{
        //   alert("Wrong OTP")
        // }


        console.log("OTP Submitted:", otp.join(''));

    };
    const handleChangee = (e) => {
        const { name, value } = e.target; // Get the name and value from the input field
        setorgform(prevState => ({
            ...prevState, // Keep the previous state
            [name]: value // Dynamically update the field using the name
        }));
    };
    const handleChange = (e, index = null) => {
        const { name, value } = e.target;

        // Update the state for form fields
        setorgform((prev) => ({
            ...prev,
            [name]: value
        }));

        // Handle phone number changes separately if needed
        if (name === 'phoneNumber') {
            handleChangephno(e);
        }

        // Handle Priority In Courses changes
        if (name === 'priorityCourses' && index !== null) {
            setContactDetails((prev) => {
                const updatedDetails = [...prev];
                updatedDetails[index].priorityCourse = value;
                return updatedDetails;
            });
        }
    };

    const handleChangedept = (e) => {
        const { name, value } = e.target; // Get the name and value from the input field
        setdeptform(prevState => ({
            ...prevState, // Keep the previous state
            [name]: value // Dynamically update the field using the name
        }));
    }
    const handleSubmit = async () => {
        if (!isValidPhone(orgform.mobileno) || !isRequired(orgform.mobileno)) return displayToast('Valid Mobile no. required', 'danger');
        if (!isRequired(orgform.fname)) return displayToast('Course Name is required', 'danger');
        if (!isValidEmail(orgform.email) || !isRequired(orgform.email)) return displayToast('Valid Email is required', 'danger');
        if (!isRequired(orgform.aadhar)) return displayToast('Aadhar Number is required', 'danger');
        if (!isRequired(orgform.qualifications)) return displayToast('Qualification is required', 'danger');
        // if (!isRequired(orgform.organization_id)) return displayToast('Organization is required', 'danger');
        const specialization_ids = contactDetails?.map(item => parseInt(item.priorityCourse))  // convert to integer if needed
            .filter(id => id);
        const finalobj = {
            // user_id:1,
            first_name: orgform.fname,
            last_name: orgform.lname,
            specialization_ids: specialization_ids,
            email: orgform.email,
            qualification: orgform.qualifications,
            contact_number: orgform.mobileno,
            address: orgform.address,
            postal_code: orgform.pincode,
            country_code: '+91',
            country_id: countryId,
            state_id: stateid,
            city_id: cityid,
            area_code: '1',
            aadhar_number: orgform.aadhar,
            father_name: orgform.fathername,
            inquiry_source: orgform.enquirysource

        }
        const url = 'students/inquiry/';
        console.log("orgformenq---", finalobj)
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
        setContactDetails([{ priorityCourse: null }]);

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
            console.log("selectedor here")
            // const { id, name, parent, email } = selectedOrg;
            setSelectedOrgDetails(selectedOrg); // Set the selected organization details
            // getdeptdata(id);
            // setparentorgid(id);

            // Store the simplified data in localStorage
            // localStorage.setItem('selectedOrgDetails', JSON.stringify({ id, name, parent, email }));

            console.log("Selected enquiry Details:", selectedOrg);
        } else {
            console.error("Organization not found");
        }
    };
    const handleExportExcel = async () => {
        try {
            // const urlWithParams = filterQueryString
            //   ? `students/export-student-payments-to-xls/?${filterQueryString}`
            //   : 'students/export-student-payments-to-xls/';
            const urlWithParams = filterQueryString ? `students/inquiry/export-to-xlsx/?${filterQueryString}` : 'students/inquiry/export-to-xlsx';
            const blob = await getBloblive(urlWithParams);

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'enquiry_export.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            displayToast('❌ Excel export failed', 'danger');
        }
    };
    const handleEditold = (row) => {
        const orgData = row.original;
        console.log("orgDataedit----", orgData);
        setorgform({
            id: orgData.id,
            fname: orgData.first_name,
            lname: orgData.last_name,
            mobileno: orgData.mobile,
            email: orgData.email,
            aadhar: orgData.aadhar_number,
            qualification: orgData.qualification,
            address: orgData.addresses.address,
            pincode: orgData.addresses.pincode,
            countrycode: '1',
            // status: false,
            enquirysource: orgData.inquiry_source,
            // pincode:orgData.pincode,
            fathername: orgData.father_name,
            // priorityCourse:orgData.interested_courses
        });
        setcountryId(orgData.addresses.country_id);
        setstateid(orgData.addresses.state_id);
        setContactDetails(orgData.interested_courses)
        openModal();
        setUpdatebtn(true);

    };
    const handleEdit = (row) => {
        const orgData = row.original;
        const mainAddress = orgData.addresses?.[0] || {};
        const courses = orgData.interested_courses?.map(course => ({
            priorityCourse: course.id
        })) || [];

        setorgform({
            id: orgData.id,
            userId: orgData.id,
            fname: orgData.first_name || '',
            lname: orgData.last_name || '',
            mobileno: orgData.mobile || '',
            email: orgData.email || '',
            aadhar: orgData.aadhar_number || '',
            qualifications: orgData.qualification || '',
            address: mainAddress.address || '',
            pincode: mainAddress.pincode || '',
            countrycode: '1',
            enquirysource: orgData.inquiry_source || '',
            fathername: orgData.father_name || ''
        });

        setcountryId(mainAddress.country_id || '');
        setstateid(mainAddress.state_id || '');
        if (stateid) {
            setcityid(mainAddress.city_id || '');
        }

        setContactDetails(courses);
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
        console.log("final object for updating", finalobj)
        const url = `administration/organizations/${parentorgid}/departments/${finalobj.id}/`

        const response = await updateData(url, finalobj);
        if (response) {
            closeModaldept();
            setUpdatebtn(false);
            // getdeptdata(parentorgid);
        }
    }
    const handleUpdate = async () => {
        const specialization_ids = contactDetails?.map(item => parseInt(item.priorityCourse))  // convert to integer if needed
            .filter(id => id);
        const finalobj = {
            user_id: orgform.userId,
            first_name: orgform.fname,
            last_name: orgform.lname,
            specialization_ids: specialization_ids,
            email: orgform.email,
            qualification: orgform.qualifications,
            contact_number: orgform.mobileno,
            address: orgform.address,
            postal_code: orgform.pincode,
            country_code: '+91',
            country_id: countryId,
            state_id: stateid,
            city_id: cityid,
            area_code: '1',
            aadhar_number: orgform.aadhar,
            father_name: orgform.fathername,
            inquiry_source: orgform.enquirysource,
            created_at: orgform.created_at
            // id:orgform.id

        }
        const url = `students/inquiry/`
        const response = await updateData(url, finalobj);
        if (!response.error) {
            getorgdata();
            setUpdatebtn(false);
            closeModal();
        }

    }
    const data2 = useMemo(() => {
        return dnparentdata && dnparentdata?.map((org) => ({
            id: org.id,
            userId: org.id,
            first_name: org.first_name,
            last_name: org.last_name,
            name: `${org.first_name || ''} ${org.last_name || ''}`.trim(), // ✅ ADD THIS
            father_name: org.father_name,
            aadhar_number: org.aadhar_number,
            mobile: org.phone,
            interested_courses: org.interested_courses,
            email: org.email,
            address: org.address,
            qualification: org.qualification,
            formstatus: org.inquiry_status,
            state: org.state,
            city: org.city,
            pincode: org.pincode,
            addresses: org.addresses,
            country_id: org.country_id,
            state_id: org.state_id,
            city_id: org.city_id,
            status: org.status,
            inquiry_source: org.inquiry_source,
            crated_by: org.crated_by,
            created_at: org.created_at,
            aadhar_number: org?.aadhar_number,
            latitude: org.latitude,
            longitude: org.longitude,
            handleRowClick: handleRowClick,

            // ✅ New fields added
            is_career_mela_participant: org.is_career_mela_participant,
            is_career_mela_participantion_document: org.is_career_mela_participantion_document,
            student_board: org.student_board,
            student_inquiry_ratings: org.student_inquiry_ratings,
        }));
    }, [dnparentdata]);
    // const geoData = useMemo(() => {
    //     console.log("mapdata2--", mapdata)
    //     return mapdata?.filter(item =>
    //         typeof item.latitude === 'number' &&
    //         typeof item.longitude === 'number' &&
    //         !isNaN(item.latitude) &&
    //         !isNaN(item.longitude)
    //     );
    // }, [data2, mapdata]);
    const geoData = useMemo(() => {
        if (!Array.isArray(mapdata)) return [];
        return mapdata.filter(item =>
            typeof item.latitude === 'number' &&
            typeof item.longitude === 'number' &&
            !isNaN(item.latitude) &&
            !isNaN(item.longitude)
        );
    }, [mapdata]);



    console.log("data 2 here ", data2)


    const filteredData = useMemo(() => {
        if (!searchQuery) {
            return data2;
        }

        const lowerQuery = searchQuery.toLowerCase();

        return data2.filter((org) =>
            org?.first_name?.toLowerCase()?.includes(lowerQuery) ||
            org?.last_name?.toLowerCase()?.includes(lowerQuery) ||
            org?.email?.toLowerCase()?.includes(lowerQuery) ||
            org?.aadhar_number?.toLowerCase()?.includes(lowerQuery) ||
            org?.mobile?.toLowerCase()?.includes(lowerQuery)
        );
    }, [searchQuery, dnparentdata]);

    const handleClear = () => {
        setorgform(
            {
                fname: '',
                lname: null,
                mobileno: '',
                email: '',
                aadhar: '',
                qualifications: '',
                address: '',
                pincode: '',
                countrycode: '1',
                status: false,
                enquirysource: '',
                pincode: '',
                fathername: ''
            }
        )
        setstateid(null);
        setcountryId(null);
        // setContactDetails()
        // setContactDetails({priorityCourse:0});

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
        const url = `students/update-student-status/${row.original.id}/`;
        const response = await patchData(url, { status: newStatus });

        if (response) {
            getorgdata()
        }
        // Log or handle response as needed
        console.log("Updated Status:", response);
    };
    const fetchFilteredDataold = async () => {
        const params = new URLSearchParams();

        if (createdBy) params.append('created_by_id', createdBy); // Or use name if backend allows
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);

        const url = `students/inquiry/no-pagination/?${params.toString()}`;

        try {
            const response = await getDataformap(url); // Your API wrapper
            if (response) {
                setmapdata(response);
            }
        } catch (error) {
            console.error("Error fetching filtered map data:", error);
        }
    };
    const fetchFilteredDataoldd = async (createdByParam = createdBy, start = startDate, end = endDate) => {
        const params = new URLSearchParams();

        if (createdByParam) params.append('created_by_id', createdByParam);
        if (start) params.append('start_date', start);
        if (end) params.append('end_date', end);

        const url = `students/inquiry/no-pagination/?${params.toString()}`;

        try {
            const response = await getDataformap(url);
            if (response) {
                setmapdata(response);
            }
        } catch (error) {
            console.error("Error fetching filtered map data:", error);
        }
    };
    const fetchFilteredData = async (createdByParam = createdBy, start = startDate, end = endDate) => {
        const params = new URLSearchParams();

        // ✅ Only include if not "0"
        if (createdByParam && createdByParam !== "0") {
            params.append('created_by_id', createdByParam);
        }

        if (start) params.append('start_date', start);
        if (end) params.append('end_date', end);

        const url = `students/inquiry/no-pagination/?${params.toString()}`;

        try {
            const response = await getDataformap(url);

            // ✅ Defensive check: ensure it's an array
            if (response && Array.isArray(response)) {
                setmapdata(response);
            } else if (response?.results && Array.isArray(response.results)) {
                setmapdata(response.results);
            } else {
                setmapdata([]); // fallback to avoid mapdata.filter error
            }
        } catch (error) {
            console.error("Error fetching filtered map data:", error);
        }
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
    const handlePageChange = (data) => {
        setCurrentPage(data.selected); // updates useEffect trigger
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
                Header: 'Candidate Name',
                accessor: 'name',
                Cell: ({ row }) => (
                    <div style={{ cursor: 'pointer', height: "100%", display: 'flex', alignItems: 'center' }} onClick={() => { handleRowClick(row.original.id, row) }}>
                        <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.first_name}<span> {row.original.last_name}</span></p>
                    </div>
                )
            },
            {
                Header: 'Farther Name',
                accessor: 'father_name',
                Cell: ({ row }) => (
                    <div style={{ cursor: 'pointer', height: "100%", display: 'flex', alignItems: 'center' }}>
                        <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>
                            {row.original.father_name}


                        </p>
                    </div>
                )
            },

            {
                Header: 'Registered Phone',
                accessor: 'mobile',
                Cell: ({ row }) => (
                    <div style={{ cursor: 'pointer', height: "100%", display: 'flex', alignItems: 'center' }}>
                        <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>
                            {row.original.mobile}


                        </p>
                    </div>
                )
            },

            // {
            //     Header: 'Enquiry ID',
            //     accessor: 'Enquiryid',
            //     Cell: ({ row }) => (
            //         <div >
            //             <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.id}</p>
            //         </div>
            //     )
            // },
            {
                Header: 'Interested Courses',
                accessor: 'interested_courses',
                Cell: ({ row }) => (
                    <div>
                        {row.original.interested_courses && row.original.interested_courses.length > 0 ? (
                            row.original.interested_courses?.map((course, index) => (
                                <p key={index} style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>
                                    {course.name}
                                </p>
                            ))
                        ) : (
                            <p>No Courses Available</p> // In case the array is empty
                        )}
                    </div>
                )
            },

            {
                Header: 'Source Of Enquiry',
                accessor: 'inquiry_source',
                Cell: ({ row }) => (
                    <div >
                        <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.inquiry_source}</p>
                    </div>
                )
            },
            // {
            //     Header: 'Contacts',
            //     accessor: 'contacts',
            //     Cell: ({ row }) => (
            //         <div>
            //             <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
            //                 <img src={phone} alt="phone" />
            //                 <p>{row.original.mobile}</p>
            //             </div>
            //             <div style={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
            //                 <img src={whatsapp} style={{ width: '12px', height: '12px' }} alt="whatsapp" />
            //                 <p>{row.original.mobile}</p>
            //             </div>
            //         </div>
            //     ),
            // },
            // {
            //     Header: 'Email',
            //     accessor: 'email',
            //     Cell: ({ row }) => (
            //         <div >
            //             <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.email}</p>
            //         </div>
            //     )
            // },
            {
                Header: 'Created By / Date',
                accessor: 'created_by',
                Cell: ({ row }) => {
                    const createdBy = row.original?.crated_by || 'N/A';
                    const createdAtRaw = row.original?.created_at;
                    const createdAt = createdAtRaw
                        ? new Date(createdAtRaw).toLocaleDateString('en-GB') // Outputs DD/MM/YYYY
                        : 'N/A';

                    const formattedDate = createdAt.replace(/\//g, '-'); // Convert to DD-MM-YYYY

                    return (
                        <div style={{ lineHeight: '1.4', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ margin: 0, color: '#222F3E', fontWeight: 500 }}>{createdBy}</p>
                            <small style={{ color: '#555' }}>({formattedDate})</small>
                        </div>
                    );
                }
            },

            {
                Header: 'Enquiry Status',
                accessor: 'EnquiryStatus',
                Cell: ({ row }) => {
                    // Get the status value
                    const status = row.original.formstatus;

                    // Determine the color based on the status value
                    let statusColor = '';
                    if (status === 'OPEN') {
                        statusColor = 'gray';  // Open status color
                    } else if (status === 'IN PROGRESS') {
                        statusColor = 'blue';  // In progress status color
                    } else if (status === 'CLOSE (WIN)') {
                        statusColor = 'green';  // Close win status color
                    } else if (status === 'CLOSE (LOST)') {
                        statusColor = 'red';  // Close lost status color
                    }

                    return (
                        <div>
                            <p style={{
                                textAlign: 'left',
                                fontWeight: 500,
                                margin: 0,
                                color: statusColor
                            }}>
                                {status}
                            </p>
                        </div>
                    );
                }
            },

            {
                Header: 'Action',
                Cell: ({ row }) => (<>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <div class="form-check form-switch custom-switch"
                        //  onClick={console.log("rowswitch--", row.original.addresses.status)}
                        >
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ cursor: 'pointer' }} checked={row.original.status} onChange={() => handleStatus(row)} />
                        </div>
                        <img src={edit} style={{ cursor: 'pointer' }} onClick={() => handleEdit(row)}></img>
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
        getmasterdata();
        // getdeptdata();

    }, []);
    useEffect(() => {
        getstate()
    }, [countryId])
    useEffect(() => {
        getcity()
    }, [stateid])
   useEffect(() => {
  const fetchStudents = async (page = 0) => {
    try {
      const url = filterQueryString
        ? `students/inquiry/?${filterQueryString}&page=${page + 1}`
        : `students/inquiry/?page=${page + 1}`;
      
      const response = await getData(url);

      // Defensive check: If response or results is undefined or empty array
      const results = response?.results || [];
      
      setdnparentdata(results);
      setdatacount(response?.count || 0);
      setTotalCount(response?.count || 0);

      if (results.length > 0) {
        setSelectedOrgDetails(results[0]);
      } else {
        setSelectedOrgDetails(null); // or {} or however you want to handle no data
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      setdnparentdata([]);
      setdatacount(0);
      setSelectedOrgDetails(null);
      setTotalCount(0);
    }
  };

  fetchStudents(currentPage);
}, [currentPage, filterQueryString]);

    const pageCounts = Math.ceil(totalCount / pageSize);
    return (
        <>
            <div className="dashboard">
                {/* Content for the Dashboard */}
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div >
                        <h2 className='main-heading'>Admission Enquiry</h2>
                    </div>
                    <div >
                        <button className='add-btn' onClick={() => openModal()}><span className='me-2'>
                            <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
                            </svg>
                        </span>Add Enq</button>
                    </div>
                </div>
                {/* <div className="dashboard-cards row mt-5" style={{ padding: "20px" }} >
                    <ProfileStatus
                        label="New Enquiry"
                        icon={profileicon}
                        percentage={40}
                        iconColor="#39886F"
                        bgColor="#39886F0D"
                        circleColor=" #39886F"
                        numbers="04"
                    />
                    <ProfileStatus
                        label="Candidate Contacted"
                        icon={profileicon2}
                        percentage={80}
                        iconColor="#0E9DED"
                        bgColor="#0E9DED0D"
                        circleColor="#0E9DED"
                        numbers="08"
                    />

                </div> */}
                <div className='row mt-5'>
                    <div className="col-md-9">
                        <div className="row" style={{ alignItems: 'center' }}>
                            <div className="col-md-6">
                                {/* <h4 className='text-primary'>All Enquiries ({dnparentdata?.length})</h4> */}
                                <h4 className='text-primary'>All Enquiries ({datacount})</h4>
                            </div>
                            <div className="col-md-6">
                                <div style={{ display: "flex", justifyContent: 'end' }}>
                                    <img
                                        src={mapIcon}
                                        onClick={() => setShowMap(true)}
                                        style={{ width: '35px', height: '35px', marginRight: '10px', cursor: 'pointer' }}
                                        alt="Map"
                                        title="View Map"
                                    />
                                    <SearchBar data={dnparentdata} onSearch={debouncedSearch} placeholder='Search by name , mobile no' />
                                    {/* <button
                                        className="filter-btn"
                                        onClick={handleFilterClick}
                                    >
                                        <img src={filtericon}></img>
                                    </button> */}
                                    <button
                                        className="filter-btn"
                                        style={{ height: '43px' }}
                                        // onClick={handleFilterClick}
                                        onClick={handleExportExcel}
                                    >
                                        <img src={exporticon}></img>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Table data={filteredData || []}
                                    columns={columns || []} selectedOrgDetails={selectedOrgDetails}
                                    pageCounts={pageCounts}
                                    handlePageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <EnquiryShortDetails navigate={navigate} closeModaldept={closeModaldept} isModalOpendept={isModalOpendept} openModaldept={openModaldept} selectedOrgDetails={selectedOrgDetails} departmentdetails={departmentdetails} deptform={deptform} handleChangedept={handleChangedept} handleSubmitdept={handleSubmitdept} handleEditdept={handleEditdept} Updatebtn={Updatebtn}
                            handleupdatedept={handleupdatedept} handleCleardept={handleCleardept} handleStatusDept={handleStatusDept} />
                    </div>
                </div>
            </div >

            {/* <div>
        <AddOrganisationModal isOpen={isModalOpen} onClose={closeModal} setsubmit={setsubmit} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleChange={handleChange} orgform={orgform} handleSubmit={handleSubmit} openModaldept={openModaldept} closeModaldept={closeModaldept}
          Updatebtn={Updatebtn} handleUpdate={handleUpdate} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid}/>
      </div> */}
            {/* {submit === true ? <SuccessfulPopup mainheading={'Registration Completed Successfully!'} submitclose={submitclose} /> : ''} */}
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
            {/* {showMap && (
                <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">All Enquiries - Location Map</h5>
                                <button className="btn-close" onClick={() => setShowMap(false)}></button>
                            </div>
                            <div className="modal-body" style={{ height: '600px' }}>
                                <MapWithMarkers data={geoData} />
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
            {showMap && (
                <div className="modal " style={{
                    background: 'rgba(0,0,0,0.6)',
                    // position: 'fixed',
                    // top: 0,
                    // left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1050,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className="modal-content" style={{
                        width: '90vw',
                        height: '90vh',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: "5px"
                    }}>
                        {/* <div className="modal-header" >
                            <h5 className="modal-title">Enquries ({geoData?.length})</h5>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Created By"
                                        value={createdBy}
                                        onChange={(e) => setCreatedBy(e.target.value)}
                                        className="form-control"
                                        style={{ width: '150px' }}
                                    />
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="form-control"
                                    />
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="form-control"
                                    />
                                    <button className="btn btn-primary" onClick={fetchFilteredData}>Filter</button>
                                </div>
                                <button className="btn-close" onClick={() => setShowMap(false)}></button>
                            </div>
                           
                        </div> */}
                        <div className="modal-header" style={{ padding: '0', borderBottom: 'none', marginBottom: '0px' }}>
                            <h5 className="modal-title">Enquiries ({geoData?.length})</h5>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', paddingTop: '0px' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div>
                                        <label className="form-labell">Created By</label>
                                        {/* <input
                                            type="text"
                                            placeholder="Created By"
                                            value={createdBy}
                                            onChange={(e) => {
                                                setCreatedBy(e.target.value);
                                                fetchFilteredData(e.target.value, startDate, endDate);
                                            }}
                                            className="form-control"
                                            style={{ width: '150px' }}
                                        /> */}
                                        {/* <select className='fm-modal form-control form-select'
                                            onChange={(e) => {
                                                const newVal = e.target.value;
                                                setCreatedBy(newVal);
                                                fetchFilteredData(newVal, startDate, endDate);
                                            }}
                                            placeholder='Select Created By'
                                            value={createdBy}
                                        // name='contact_type'
                                        >
                                            <option value='0'>Select </option>
                                            {
                                                masterdata && masterdata.support_desks.map((val, ind) => {
                                                    return (
                                                        <option value={val.id} key={ind}>{val.name}</option>
                                                    )
                                                })
                                            }
                                        </select> */}
                                        <Select

                                            className="selectmap"
                                            // classNamePrefix="select"
                                            placeholder="Select Created By"
                                            // isClearable
                                            name="createdBy"
                                            options={masterdata.support_desks?.map(item => ({
                                                value: item.id,
                                                label: item.name
                                            })) || []}
                                            value={
                                                masterdata.support_desks?.find(item => item.id === parseInt(createdBy))
                                                    ? {
                                                        value: parseInt(createdBy),
                                                        label: masterdata.support_desks.find(item => item.id === parseInt(createdBy))?.name
                                                    }
                                                    : null
                                            }
                                            onChange={(selectedOption) => {
                                                const selectedId = selectedOption ? selectedOption.value : '';
                                                setCreatedBy(selectedId);
                                                fetchFilteredData(selectedId, startDate, endDate);
                                            }}
                                        />

                                    </div>
                                    <div>
                                        <label className="form-labell">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => {
                                                setStartDate(e.target.value);
                                                fetchFilteredData(createdBy, e.target.value, endDate);
                                            }}
                                            className="form-control"
                                            style={{ height: '51px' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="form-labell">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => {
                                                setEndDate(e.target.value);
                                                fetchFilteredData(createdBy, startDate, e.target.value);
                                            }}
                                            className="form-control"
                                            style={{ height: '51px' }}
                                        />
                                    </div>

                                </div>
                                <button className="btn-close" style={{ position: 'absolute', top: '22px', right: '15px' }} onClick={() => { setShowMap(false); setEndDate(); setStartDate(); setCreatedBy() }}></button>
                            </div>
                        </div>
                        <div className="modal-body" style={{ flex: 1, padding: 0 }}>
                            <MapWithMarkers data={geoData} />
                        </div>
                    </div>
                </div>
            )}


            <div>
                <EnquiryModal isOpen={isModalOpen} onClose={closeModal} setsubmit={setsubmit} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleChange={handleChange} orgform={orgform} handleSubmit={handleSubmit} openModaldept={openModaldept} closeModaldept={closeModaldept}
                    Updatebtn={Updatebtn} handleUpdate={handleUpdate} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid} phoneNumber={phoneNumber} otp={otp} getotp={Getotp} otpInputs={otpInputs} handleOtpChange={handleOtpChange} isOtpFilled={isOtpFilled} handleChangephno={handleChangephno} handleSubmitotp={handleSubmitotp} getotpdisp={getotpdisp}
                    masterdata={masterdata} specializationdata={specializationdata}
                    setContactDetails={setContactDetails} contactDetails={contactDetails} />
            </div>
        </>
    );
};

export default EnquiryDashboard;
