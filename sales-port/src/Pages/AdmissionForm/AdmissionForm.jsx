import React, { useState, useRef, useEffect } from 'react';
import Webcam from "react-webcam";
import AdmissionFormlogo from '../../assets/Images/BITENewlogo.png';
import copy from '../../assets/icons/copy.png';
import loader from '../../assets/gif/loader.gif';
import arrowup from '../../assets/icons/arrowup.svg';
import { getData, getDatalink, Postdata, Postdataform, UpdateDataForm } from '../../API/GlobalApi';
import '../../assets/css/AddmissionForm.css';
import deletered from '../../assets/icons/deletered.svg';
import Select from 'react-select';
import { components } from 'react-select';
import next from '../../assets/icons/icon.svg';
import savedraft from '../../assets/icons/savedraft.svg';
import imagePlaceholder from '../../assets/Images/image 17.png';
import { validateEmail } from '../../Utils/ValidationService';
import vaadinarrowforward from '../../assets/icons/vaadin_arrow-forward.svg'
import { ShareLinkModal } from '../../Component/Modals/ShareLinkModal';
import { FormLinkSentModal } from '../../Component/Modals/FormLinkSentModal';
import { useParams, useSearchParams } from 'react-router-dom';
import clock from '../../assets/icons/clock.svg';
import checked from '../../assets/icons/checked.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




export const AdmissionForm = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const [searchParams] = useSearchParams();
    const student_id = searchParams.get('studentid');
    const studentIdfromlink = student_id;
    // const { student_id: studentIdfromlink } = useParams(); 
    const tokenfromlink = searchParams.get('token');
    console.log("tokenfromlink--", tokenfromlink)
    const [isTableVisible, setIsTableVisible] = useState({
        basicDetails: true,
        academicDetails: false,
        uploadDocuments: false
    });
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    const [toastMessage, setToastMessage] = useState('');

    const [studentId, setStudentId] = useState(0);
    const sectionOrder = ['basicDetails', 'academicDetails', 'uploadDocuments'];
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isOtpFilled, setIsOtpFilled] = useState(false);
    const [getotpdisp, setgetotpdisp] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [timerRunning, setTimerRunning] = useState(false);
    const [token, settoken] = useState('');
    const [countrydata, setcountrydata] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [citydata, setCityData] = useState([]);
    const [studentPrivilegeCategories, setStudentPrivilegeCategories] = useState([]);
    const [studentCategories, setStudentCategories] = useState([]);
    const [salutations, setSalutations] = useState([]);
    const [genders, setGenders] = useState([]);
    const [bloodGroups, setBloodGroups] = useState([]);
    const [contactNumberTypes, setContactNumberTypes] = useState([]);
    const [addressTypes, setAddressTypes] = useState([]);
    const [courses, setCourses] = useState([]);
    const [qualificationType, setQualificationType] = useState([]);
    const [CourseFees, setCourseFees] = useState('');
    const [specialization_id, setspecialization_id] = useState(null);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sentmodal, setsentmodal] = useState(false);
    const [url, seturl] = useState(window.baseurl2+'AdmissionForm/');
    const [isDeclarationChecked, setIsDeclarationChecked] = useState(false);
    const [permanentCountry, setPermanentCountry] = useState([])
    const [correspondenceCountry, setCorrespondenceCountry] = useState([])
    const [permanentState, setPermanentState] = useState([])
    const [correspondenceState, setCorrespondenceState] = useState([])
    const [permanentCity, setPermanentCity] = useState([])
    const [correspondenceCity, setCorrespondenceCity] = useState([])
    const [provisional_admission_confirmed, setprovisional_admission_confirmed] = useState(false);
    const [permanent_admission_confirmed, setpermanent_admission_confirmed] = useState(false);
    const [isOtpButtonDisabled, setIsOtpButtonDisabled] = useState(false);
    const [upyes, setupyes] = useState(false);



    const [showCamera, setShowCamera] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const webcamRef = useRef(null);

    const displayToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setTimeout(() => setShowToast(false), 3000);
    };
    // const [isTableVisible, setIsTableVisible] = useState({
    //     basicDetails: false,
    //     academicDetails: false,
    //     uploadDocuments: false
    // });

    const options = [
        { value: 'computer-science', label: 'Computer Science' },
        { value: 'information-technology', label: 'Information Technology' },
        { value: 'mathematics', label: 'Mathematics' },
        { value: 'cybersecurity', label: 'Cybersecurity' },
    ];

    const [studentBasicForm, setStudentBasicForm] = useState({
        "primary_contact_number": "",
        "course_id": '',
        "salutation": "",
        "first_name": "",
        "middle_name": "",
        "last_name": "",
        "gender": "",
        "date_of_birth": "",
        "nationality": "",
        "blood_group": "",
        "father_name": "",
        "mother_name": "",
        "privilege_category": "",
        "category": '',
        "aadhar_number": "",
        "email": "",
        "contact_numbers": [],
        "addresses": [],
        "profile_picture": "",
        "file_name": "No file Uploaded"
    })

    const [studentBasicFormMobileNumber, setStudentBasicFormMobileNumber] = useState([
        {
            "contact_type": "",
            "country_code": "",
            "area_code": "",
            "number": "",
            "is_primary": false,
            "is_available_on_whatsapp": false,
            "status": false
        }
    ])
    const [studentBasicFormAddress, setStudentBasicFormAddress] = useState([
        {
            "address_type": "Current",
            "address": "",
            "address_line_2": "",
            "city_id": "",
            "state_id": "",
            "country_id": "",
            "pincode": ""
        },
        {
            "address_type": "Permanent",
            "address": "",
            "address_line_2": "",
            "city_id": "",
            "state_id": "",
            "country_id": "",
            "pincode": ""
        }
    ])
    const [acadmicDetails, setAcadmicDetails] = useState([
        {
            "student_id": 0,
            "course_name": "",
            "qualification_type": "",
            "board": "",
            "college": "",
            "year_of_admission": "",
            "year_of_passing": "",
            "percentage": "",
            "grade": "",
            "qualifying_subjects": ""
        }
    ]);
    const [selectedSubjects, setSelectedSubjects] = useState([[]]);
    const [documentForm, setDocumentForm] = useState(
        {

            "highschool_marksheet": "",
            "intermediate_marksheet": "",
            "character_certificate": "",
            "migration_certificate": "",
            "category_certificate": "",
            "aadhar_card": ""
        }
    )
    const [highSchoolFile, setHighSchoolFile] = useState('No File Selected!');
    const [intermediateFile, setIntermediateFile] = useState('No File Selected!');
    const [characterFile, setcharacterFile] = useState('No File Selected!');
    const [migrationfile, setmigrationfile] = useState('No File Selected!');
    const [scstFile, setscstFile] = useState('No File Selected!');
    const [aadharfile, setaadharfile] = useState('No File Selected!');
    const [sharemobno, setsharemobno] = useState("");
    const [lastsubmit, setlastsubmit] = useState(false);
    const [isSameAddressChecked, setIsSameAddressChecked] = useState(false);

    const fileInputRef = useRef(null);

    const getcountryold = async (val = 0) => {
        const url = "administration/countries/";
        const response = await getData(url);
        if (val === 0) {
            setcountrydata(response)
        }
        else if (val === 1) {
            setCorrespondenceCountry(response)
        }
        else if (val === 2) {
            setPermanentCountry(response)
        }
        // console.log("response--", response);
    }
    const getcountry = async (val = 0) => {
        const url = "administration/countries/";
        const response = await getData(url);

        if (!response || response.length === 0) return;

        const india = response.find(c => c.name.toLowerCase() === 'india'); // or by id: c.id === 101

        if (val === 0) {
            setcountrydata(response);
        } else if (val === 1) {
            setCorrespondenceCountry(response);
            if (india) {
                // Set default India in correspondence address
                setStudentBasicFormAddress(prev => {
                    const updated = [...prev];
                    updated[0] = {
                        ...updated[0],
                        country_id: india.id
                    };
                    return updated;
                });
                getState(india.id, 1);
            }
        } else if (val === 2) {
            setPermanentCountry(response);
            if (india) {
                // Set default India in permanent address
                setStudentBasicFormAddress(prev => {
                    const updated = [...prev];
                    updated[1] = {
                        ...updated[1],
                        country_id: india.id
                    };
                    return updated;
                });
                getState(india.id, 2);
            }
        }
    };

    const getMasterData = async () => {
        const url = "students/students-basic-details/master-data/";
        const response = await getData(url);
        console.log("response", response)
        setStudentPrivilegeCategories(response.student_privilege_categories)
        setStudentCategories(response.student_categories)
        setSalutations(response.salutations)
        setGenders(response.genders)
        setBloodGroups(response.blood_groups)
        setContactNumberTypes(response.contact_number_types)
        setAddressTypes(response.address_types)
        setCourses(response.courses)

    }
    const getState = async (countryId, val = 0) => {
        const url = `administration/countries/${countryId}/states/`;
        const response = await getData(url);
        if (val === 0) {
            setStateData(response.state_list)
        }
        else if (val === 1) {
            setCorrespondenceState(response.state_list)
        }
        else if (val === 2) {
            setPermanentState(response.state_list)
        }
    }
    const getCity = async (countryId, stateId, val) => {
        const url = `administration/countries/${countryId}/states/${stateId}/cities/`;
        const response = await getData(url);
        if (val === 0) {
            setCityData(response.city_list);
        }
        else if (val === 1) {
            setCorrespondenceCity(response.city_list)
        }
        else if (val === 2) {
            setPermanentCity(response.city_list)
        }
    }
    const getAcademicDetailsMaster = async () => {
        const url = "students/students-academic-details/master-data/";
        const response = await getData(url);
        setQualificationType(response.qualification_types)
        // console.log("response12345", response);
    }
    const handleBasicInfoChange = (e) => {
        const { name, value } = e.target;
        // if (name === "profile_picture") {
        //     setStudentBasicForm((prev) => ({ ...prev, [name]: e.target.files[0] }));
        //     setStudentBasicForm((prev) => ({ ...prev, "file_name": e.target.files[0].name }));
        // }
        if (name === "profile_picture") {
            const file = e.target.files[0];
            setStudentBasicForm((prev) => ({
                ...prev,
                profile_picture: file,
                file_name: file?.name
            }));
        }

        else {
            setStudentBasicForm((prev) => ({ ...prev, [name]: value }));
        }
        if (name === "course_id") {
            const selectedCourse = courses.find(course => course.id === parseInt(value));
            setspecialization_id(value)
            if (selectedCourse && selectedCourse.fees) {
                setCourseFees(selectedCourse.fees);
            } else {
                setCourseFees(0); // fallback if no fees or not found
            }
        }
    }
    const handleContactChangeold = (e, index) => {
        const { name, value, checked } = e.target;
        if (studentBasicFormMobileNumber.length > 0) {
            let temp = [...studentBasicFormMobileNumber]
            if (value === "on") {
                if (name !== "is_available_on_whatsapp") {
                    temp[index]["is_primary"] = checked;
                }
                else {
                    temp[index][name] = checked;
                }
            }
            else {
                temp[index][name] = value;

            }
            setStudentBasicFormMobileNumber(temp);
        }
        // else {
        //     let temp = {}
        //     if (value === "on") {
        //         if (name === "is_primary") {
        //             setStudentBasicFormMobileNumber([temp]);
        //         }
        //         else{
        //             temp[index][name] = checked;
        //             setStudentBasicFormMobileNumber([temp]);
        //         }
        //     }
        //     else {
        //         temp[index][name] = value;
        //         setStudentBasicFormMobileNumber([temp]);
        //     }


        // }
    };
    const handleContactChange = (e, index) => {
    const { name, value, checked } = e.target;

    if (studentBasicFormMobileNumber.length > 0) {
        let temp = [...studentBasicFormMobileNumber];

        if (name === "number") {
            // Allow only digits
            const numericValue = value.replace(/\D/g, '');
            temp[index][name] = numericValue;
        } else if (value === "on") {
            // Handle checkbox logic
            if (name === "is_primary") {
                temp[index]["is_primary"] = checked;
            } else {
                temp[index][name] = checked;
            }
        } else {
            temp[index][name] = value;
        }

        setStudentBasicFormMobileNumber(temp);
    }
};

    const addContactRow = () => {
        setStudentBasicFormMobileNumber([...studentBasicFormMobileNumber,
        {
            "contact_type": "",
            "country_code": "91",
            "area_code": "",
            "number": "",
            // "is_primary": false,
            "is_available_on_whatsapp": false,
            "status": false
        }]);
    };
    const handleRemoveContact = (index) => {
        if (studentBasicFormMobileNumber.length === 1) {
            // If it's the only contact, reset it instead of removing
            setStudentBasicFormMobileNumber([
                {
                    contact_type: "",
                    country_code: "",
                    area_code: "",
                    number: "",
                    // is_primary: false,
                    is_available_on_whatsapp: false,
                    status: false
                }
            ]);
        } else {
            // Otherwise remove the selected index
            const updatedContacts = studentBasicFormMobileNumber.filter((_, i) => i !== index);
            console.log("updatedContacts", updatedContacts)
            setStudentBasicFormMobileNumber([...updatedContacts]);
        }
    };

    const handleAddressChange = (e, index) => {
        const { name, value } = e.target;
        if (index === 1) {
            let temp = studentBasicFormAddress[0]
            if (name === "country_id") {
                getState(parseInt(value), 1);
            }
            else if (name === "state_id") {
                getCity(parseInt(temp.country_id), parseInt(value), 1);
            }

            temp[name] = value;
            setStudentBasicFormAddress([temp, studentBasicFormAddress[1]]);
        }
        else {
            let temp = studentBasicFormAddress[1]
            if (name === "country_id") {
                getState(parseInt(value), 2);
            }
            else if (name === "state_id") {
                getCity(parseInt(temp.country_id), parseInt(value), 2);
            }
            temp[name] = value;
            setStudentBasicFormAddress([studentBasicFormAddress[0], temp]);
        }
    }

    // const handleAddressSameold = () => {

    //     if (document.getElementById("sameAddress").checked === true) {
    //         document.getElementById("correspondenceAddress").disabled = true;
    //         setStudentBasicFormAddress([studentBasicFormAddress[0], studentBasicFormAddress[0]])

    //         getcountry(copiedAddress.country_id, 2);
    //         getState(copiedAddress.country_id, 2);
    //         getCity(copiedAddress.country_id, copiedAddress.state_id, 2);

    //     }
    //     else {
    //         document.getElementById("correspondenceAddress").disabled = false;
    //         setStudentBasicFormAddress([studentBasicFormAddress[0], {
    //             "address_type": "",
    //             "address": "",
    //             "address_line_2": "",
    //             "city_id": 0,
    //             "state_id": 0,
    //             "country_id": 0,
    //             "pincode": ""
    //         }])
    //     }
    // }
    const handleAddressSame = () => {
        const isChecked = document.getElementById("sameAddress").checked;
        setIsSameAddressChecked(isChecked);

        if (isChecked) {
            const copiedAddress = { ...studentBasicFormAddress[0] };
            // setStudentBasicFormAddress([copiedAddress, copiedAddress]);
            const currentAddress = {
                ...copiedAddress,
                address_type: "Current"
            };

            const permanentAddress = {
                ...copiedAddress,
                address_type: "Permanent"
            };

            setStudentBasicFormAddress([currentAddress, permanentAddress]);
            // Fetch state & city data for permanent dropdowns
            getcountry(copiedAddress.country_id, 2);
            getState(copiedAddress.country_id, 2);
            getCity(copiedAddress.country_id, copiedAddress.state_id, 2);

            // Optional: visually disable the fields
            document.getElementById("correspondenceAddress").disabled = true;
        } else {
            document.getElementById("correspondenceAddress").disabled = false;
            setStudentBasicFormAddress([
                studentBasicFormAddress[0],
                {
                    address_type: "",
                    address: "",
                    address_line_2: "",
                    city_id: 0,
                    state_id: 0,
                    country_id: 0,
                    pincode: ""
                }
            ]);

            // Reset dependent dropdowns
            setPermanentState([]);
            setPermanentCity([]);
        }
    };

    const handleChangesharelink = (e) => {
        const { name, value } = e.target;
        if (value) {
            setsharemobno(value);
        }
    }
    const handlesharelink = () => {
        const finalobj = {
            mobile: sharemobno,
            url: url

        }
        const url2 = 'students/provisional-admission/send-form-link/'
        let res = Postdata(url2, finalobj);
        if (res) {
            setsentmodal(true);
            setIsModalOpen(false);
        }
        console.log("resshare", res);
    }

    const handleSaveBasicInfo = async () => {
        if (!isOtpVerified) {
            displayToast("Please verify your mobile number.", "danger");
            return false;
        }
        const url = "students/students-basic-details/";
        try {
            let tempAddress = studentBasicFormAddress
            tempAddress[0].address_type = "Current"
            tempAddress[1].address_type = "Permanent"

            if (phoneNumber.length > 0 && studentBasicForm.first_name.length > 0 && studentBasicForm.gender.length > 0 && studentBasicForm.date_of_birth.length > 0
                && studentBasicForm.nationality.length > 0 && studentBasicForm.category > 0 && studentBasicForm.email.length > 0
                && studentBasicForm.father_name.length > 0 && studentBasicForm.mother_name.length > 0 && studentBasicFormMobileNumber[0].number.length === 10
                && studentBasicForm.course_id > 0 && studentBasicFormAddress[0].address.length > 0 && studentBasicFormAddress[1].address.length > 0
                && validateEmail(studentBasicForm.email)) {
                const basicInfoForm = {
                    ...studentBasicForm,
                    primary_contact_number: phoneNumber,
                    contact_numbers: [...studentBasicFormMobileNumber],
                    addresses: [tempAddress[0], tempAddress[1]]
                }
                const formData = new FormData();
                for (const key in basicInfoForm) {
                    if (
                        key === "contact_numbers" ||
                        key === "addresses"
                    ) {
                        // Convert nested arrays to JSON strings
                        formData.append(key, JSON.stringify(basicInfoForm[key]));
                    }
                    else if (typeof basicInfoForm[key] === "string" && basicInfoForm[key].startsWith("data:image/")) {
                        // Convert base64 to Blob and append
                        const byteString = atob(basicInfoForm[key].split(',')[1]);
                        const mimeString = basicInfoForm[key].split(',')[0].split(':')[1].split(';')[0];
                        const ab = new ArrayBuffer(byteString.length);
                        const ia = new Uint8Array(ab);
                        for (let i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                        }
                        const blob = new Blob([ab], { type: mimeString });
                        formData.append("profile_picture", blob, "captured_image.png");
                    }
                    else {
                        formData.append(key, basicInfoForm[key]);
                    }
                }
                const response = await UpdateDataForm(url, formData)
                console.log("responsevdfvfdvd", response)
                if (response && response.user_id) {
                    setStudentId(response.user_id);
                    console.log("save successfully")
                    displayToast('Basic Info Added successfully!', 'success');
                    return true
                }
                else {
                    displayToast(response.error, 'danger');
                    console.log("save error")
                    // alert(response.error)
                    return false
                }
            }
            else {

                displayToast('Please fill in all the fields marked with (*).', 'danger');
                // alert("");
            }
        }
        catch (error) {
            displayToast(error.message, 'danger');
            // alert(error.message)
        }

    }

    const handleUpdateBasicInfo = async () => {
        if (!phoneNumber) {
            displayToast("Please verify your mobile number.", "danger");
            return false;
        }
        const si = sessionStorage.getItem('studentId')
        const url = `students/students-basic-details/${studentId || si}/`;
        let tempAddress = studentBasicFormAddress
        tempAddress[0].address_type = "Current"
        tempAddress[1].address_type = "Permanent"
        console.log("tempAddress---", tempAddress)
        if (phoneNumber?.length > 0 && studentBasicForm?.first_name?.length > 0 && studentBasicForm?.gender?.length > 0 && studentBasicForm?.date_of_birth?.length > 0
            && studentBasicForm?.nationality?.length > 0 && studentBasicForm?.category > 0 && studentBasicForm?.email?.length > 0
            && studentBasicForm?.father_name?.length > 0 && studentBasicForm?.mother_name?.length > 0 && studentBasicFormMobileNumber[0]?.number?.length === 10
            && studentBasicForm?.course_id > 0 && studentBasicFormAddress[0]?.address?.length > 0 && studentBasicFormAddress[1].address.length > 0
        ) {
            if (!validateEmail(studentBasicForm?.email)) {
                displayToast('Please enter a valid email address.', 'danger');
                return false;
            }
            if (typeof studentBasicForm?.profile_picture === 'string' && studentBasicForm.profile_picture?.startsWith('http')) {
                studentBasicForm.profile_picture = "";
            }
            const basicInfoForm = {
                ...studentBasicForm,
                primary_contact_number: phoneNumber,
                contact_numbers: [...studentBasicFormMobileNumber],
                addresses: [tempAddress[0], tempAddress[1]]
            }
            const formData = new FormData();
            for (const key in basicInfoForm) {
                if (
                    key === "contact_numbers" ||
                    key === "addresses" ||
                    key === "specialization"
                ) {
                    // Convert nested arrays to JSON strings
                    formData.append(key, JSON.stringify(basicInfoForm[key]));
                }
                else if (key === "profile_picture") {
                    if (basicInfoForm[key] instanceof File) {
                        formData.append("profile_picture", basicInfoForm[key]); // from upload
                    } else if (typeof basicInfoForm[key] === "string" && basicInfoForm[key].startsWith("data:image/")) {
                        // Convert base64 to Blob and append
                        const byteString = atob(basicInfoForm[key].split(',')[1]);
                        const mimeString = basicInfoForm[key].split(',')[0].split(':')[1].split(';')[0];
                        const ab = new ArrayBuffer(byteString.length);
                        const ia = new Uint8Array(ab);
                        for (let i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                        }
                        const blob = new Blob([ab], { type: mimeString });
                        formData.append("profile_picture", blob, "captured_image.png");
                    }
                }
                else {
                    formData.append(key, basicInfoForm[key]);
                }
            }
            const response = await UpdateDataForm(url, formData)
            console.log("responsevdfvfdvd", response)
            try {

                console.log("response.student", response.student)
                if (response.user_id) {
                    setStudentId(response.user_id);
                    // setupyes(true);
                    // console.log("save successfully")
                    displayToast('Basic Info Added successfully!', 'success');
                    return true
                }
                else {
                    displayToast(response.error, 'danger');
                    return false
                }
            }
            catch (e) {
                displayToast(response.error, 'danger');
                return false
            }
        }
        else {
            // console.log("rest",

            //     phoneNumber.length > 0, studentBasicForm.first_name.length > 0, studentBasicForm.gender.length > 0, studentBasicForm.date_of_birth.length > 0
            //     , studentBasicForm.nationality.length > 0, studentBasicForm.privilege_category > 0, studentBasicForm.category > 0, studentBasicForm.email.length > 0
            //     , studentBasicForm.father_name.length > 0, studentBasicForm.mother_name.length > 0, studentBasicFormMobileNumber[0].number.length === 10
            //     , studentBasicForm.course_id > 0, studentBasicFormAddress[0].address.length > 0, studentBasicFormAddress[1].address.length > 0
            //     , validateEmail(studentBasicForm.email)
            // )
            displayToast('Please fill in all the fields marked with (*).', 'danger');
            // alert("Please fill in all the fields marked with (*).")
        }

    }

    const handleAcademicChange = (e, index) => {
        const { name, value } = e.target;
        if (acadmicDetails.length > 0) {
            let temp = [...acadmicDetails]
            temp[index][name] = value
            setAcadmicDetails(temp)
        }
    }

    const handleChangesubject = (selectedOptions, index) => {
        let temp = [...selectedSubjects];
        temp[index] = selectedOptions;
        setSelectedSubjects(temp);
    };
    const addMoreAcademicRow = () => {
        setAcadmicDetails((academicDetails) => ([...academicDetails,
        {
            "student_id": 0,
            "course_name": "",
            "qualification_type": "",
            "board": "",
            "college": "",
            "year_of_admission": 0,
            "year_of_passing": 0,
            "percentage": 0,
            "grade": "",
            "qualifying_subjects": ""
        }
        ]))
        // setSelectedSubjects(selectedSubjects => ([...selectedSubjects, []]))
    }
    const removeAcademicRow = (index) => {
        if (index !== 0) {
            let tempacadmic = acadmicDetails.filter((_, i) => i !== index)
            let tempsubj = selectedSubjects.filter((_, i) => i !== index)
            setAcadmicDetails(tempacadmic);
            setSelectedSubjects(tempsubj);
        }
    }
    const handleSaveAcademicDetails = async () => {
        let subjectList = [...selectedSubjects]
        let acadmeicForm = [...acadmicDetails]
        if (acadmeicForm.length >= 2) {
            const hasHSC = acadmeicForm.some(val => val.qualification_type === "HSC");
            const hasSSC = acadmeicForm.some(val => val.qualification_type === "SSC");

            if (hasHSC && hasSSC) {
                const allFieldsFilled = acadmeicForm.every((val, ind) =>
                    val.qualification_type &&
                    val.course_name &&
                    val.college &&
                    val.board &&
                    val.year_of_admission &&
                    val.year_of_passing &&
                    val.percentage &&
                    val.qualifying_subjects
                );

                if (allFieldsFilled) {
                    acadmeicForm = acadmeicForm?.map((form, ind) => ({
                        ...form,
                        student_id: studentId,
                        qualifying_subjects: [form.qualifying_subjects]
                    }));


                    const url = `students/students-academic-details/${studentId}/`;
                    const response = await Postdata(url, acadmeicForm);

                    if (response.message === "Record successfully updated") {
                        displayToast('Academic Details Added successfully!', 'success');
                        return true;
                    }
                    else {
                        displayToast(response.error, 'danger');
                        return false;
                    }
                } else {
                    displayToast('Please fill in all the fields marked with (*).', 'danger');
                    // alert("Please fill in all the fields marked with (*).");
                }
            } else {
                if (!hasHSC) {
                    displayToast('Please add HSC academic details', 'danger');
                    // alert("Please add HSC academic details");
                } else {
                    displayToast('Please add SSC academic details', 'danger');
                    // alert("Please add SSC academic details");
                }
            }
        } else {
            displayToast('Please add at least 2 academic details', 'danger');
            // alert("Please add at least 2 academic details");
        }
    }
    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        console.log(file);
        if (!file) return;
        // let url = 'https://bgi.sortstring.com/api/v1/staff/upload-file/';


        e.target.value = "";
        if (fileType === 'highSchool') {
            setDocumentForm(documentForm => ({ ...documentForm, "highschool_marksheet": file }))
            setHighSchoolFile(file ? file.name : 'No File Selected!');
        } else if (fileType === 'intermediate') {
            setDocumentForm(documentForm => ({ ...documentForm, "intermediate_marksheet": file }))
            setIntermediateFile(file ? file.name : 'No File Selected!');
        } else if (fileType === 'character') {
            setDocumentForm(documentForm => ({ ...documentForm, "character_certificate": file }))
            setcharacterFile(file ? file.name : 'No File Selected!');
        }
        else if (fileType === 'migration') {
            setDocumentForm(documentForm => ({ ...documentForm, "migration_certificate": file }))
            setmigrationfile(file ? file.name : 'No File Selected!');
        }
        else if (fileType === 'scst') {
            setDocumentForm(documentForm => ({ ...documentForm, "category_certificate": file }))
            setscstFile(file ? file.name : 'No File Selected!');
        }
        else if (fileType === 'aadhar') {
            setDocumentForm(documentForm => ({ ...documentForm, "aadhar_card": file }))
            setaadharfile(file ? file.name : 'No File Selected!');
        }
    };
    const handleFileChangenew = async (e, fileType) => {
        const file = e.target.files[0];
        if (!file) return;

        e.target.value = ""; // reset input

        // Update form state
        switch (fileType) {
            case 'highSchool':
                setDocumentForm(prev => ({ ...prev, highschool_marksheet: file }));
                setHighSchoolFile(file.name);
                break;
            case 'intermediate':
                setDocumentForm(prev => ({ ...prev, intermediate_marksheet: file }));
                setIntermediateFile(file.name);
                break;
            case 'character':
                setDocumentForm(prev => ({ ...prev, character_certificate: file }));
                setcharacterFile(file.name);
                break;
            case 'migration':
                setDocumentForm(prev => ({ ...prev, migration_certificate: file }));
                setmigrationfile(file.name);
                break;
            case 'scst':
                setDocumentForm(prev => ({ ...prev, category_certificate: file }));
                setscstFile(file.name);
                break;
            case 'aadhar':
                setDocumentForm(prev => ({ ...prev, aadhar_card: file }));
                setaadharfile(file.name);
                break;
        }

        // Upload to API
        const formData = new FormData();
        formData.append('file', file);

        try {
            // const res = await fetch('https://bgi.sortstring.com/api/v1/staff/upload-file/', {
            //     method: 'POST',
            //     headers: {
            //         //   Authorization: `Token ${sessionStorage.getItem('token')}`,
            //         // 'Content-Type' should NOT be set manually for FormData
            //     },
            //     body: formData
            // });
            const res = Postdataform('staff/upload-file/',formData)

            const result = await res.json();
            if (res.ok) {
                console.log("✅ File uploaded:", result);
            } else {
                console.error("❌ Upload failed:", result);
            }
        } catch (err) {
            console.error("❌ Upload error:", err);
        }
    };

    const handleFileRemoveold = (fileType) => {
        if (fileType === 'highSchool') {
            setHighSchoolFile(null);
            setDocumentForm(
                {
                    "highschool_marksheet": '',

                }
            )
        } else if (fileType === 'intermediate') {
            setIntermediateFile(null);
            setDocumentForm(
                {
                    "intermediate_marksheet": "",
                }
            )
        } else if (fileType === 'character') {
            setcharacterFile(null);
            setDocumentForm(
                {
                    "character_certificate": "",
                }
            )
        }
        else if (fileType === 'migration') {
            setmigrationfile(null);
            setDocumentForm(
                {

                    "migration_certificate": "",

                }
            )
        }
        else if (fileType === 'scst') {
            setscstFile(null);
            setDocumentForm(
                {
                    "category_certificate": "",
                }
            )
        }
        else if (fileType === 'aadhar') {
            setaadharfile(null);
            setDocumentForm(
                {
                    "aadhar_card": ""
                }
            )
        }

    };
    const handleFileRemove = (fileType) => {
        setDocumentForm(prev => {
            const updated = { ...prev };
            if (fileType === 'highSchool') {
                updated.highschool_marksheet = '';
                setHighSchoolFile('No File Selected!');
            } else if (fileType === 'intermediate') {
                updated.intermediate_marksheet = '';
                setIntermediateFile('No File Selected!');
            } else if (fileType === 'character') {
                updated.character_certificate = '';
                setcharacterFile('No File Selected!');
            } else if (fileType === 'migration') {
                updated.migration_certificate = '';
                setmigrationfile('No File Selected!');
            } else if (fileType === 'scst') {
                updated.category_certificate = '';
                setscstFile('No File Selected!');
            } else if (fileType === 'aadhar') {
                updated.aadhar_card = '';
                setaadharfile('No File Selected!');
            }
            return updated;
        });
    };

    const handleSaveDocumentsold = async () => {
        const url = "students/students-documents-details/";
        console.log("documentForm", documentForm)
        if (
            documentForm.highschool_marksheet instanceof File && documentForm.intermediate_marksheet instanceof File
            && documentForm.aadhar_card instanceof File
        ) {
            const formData = new FormData();
            for (const key in documentForm) {
                formData.append(key, documentForm[key])
            }
            formData.append("student_id", studentId);
            // formData.append("highschool_marksheet", highSchoolFile);
            // formData.append("intermediate_marksheet", intermediateFile);
            // formData.append("character_certificate", characterFile);
            // formData.append("migration_certificate", migrationfile);
            // formData.append("category_certificate", scstFile);
            // formData.append("aadhar_card", aadharfile);

            const response = await Postdataform(url, formData)
            if (!response.error) {
                // setStudentId(response.user_id)
                // alert("Data Saved!!")
                displayToast('Upload Documents successfully!', 'success');
                return true
            }
            else {
                displayToast(response?.error, 'danger');
                // alert("Something Went Wrong!!")
                return false
            }
        }
        else {
            displayToast("Please fill in all the fields marked with (*).", 'danger');
            // alert("Please Upload All Documents");

        }
    }
    const isValidFile = (file, fileLabel) => {
        return file instanceof File ||
            (typeof file === "string" && file.trim() !== "" && fileLabel !== "No file Selected!");
    };

    const handleSaveDocumentsnold = async () => {
        const url = "students/students-documents-details/";

        // Validation block
        if (
            !isValidFile(documentForm.highschool_marksheet, highSchoolFile) ||
            !isValidFile(documentForm.intermediate_marksheet, intermediateFile) ||
            !isValidFile(documentForm.aadhar_card, aadharfile)
        ) {
            displayToast("Please upload all mandatory documents (marked with *).", "danger");
            return false;
        }

        const formData = new FormData();
        for (const key in documentForm) {
            formData.append(key, documentForm[key]);
        }
        formData.append("student_id", studentId);

        const response = await Postdataform(url, formData);
        if (!response.error) {
            displayToast('Upload Documents successfully!', 'success');
            return true;
        } else {
            displayToast(response?.error || "Something went wrong!", 'danger');
            return false;
        }
    };

    const handleSaveDocuments = async () => {
        const url = "students/students-documents-details/";


        const requiredFiles = {
            highschool_marksheet: highSchoolFile,
            intermediate_marksheet: intermediateFile,
            aadhar_card: aadharfile
        };

        const missing = Object.entries(requiredFiles).some(([key, label]) =>
            !(documentForm[key] instanceof File) && (!label || label.toLowerCase().includes("no file"))
        );

        if (missing) {
            displayToast("Please upload all mandatory documents (marked with *).", "danger");
            return false;
        }

        const formData = new FormData();
        for (const key in documentForm) {
            // ✅ Only append File objects
            if (documentForm[key] instanceof File) {
                formData.append(key, documentForm[key]);
            }
            // ✅ Skip empty strings to avoid backend error
        }

        formData.append("student_id", studentId);
        setlastsubmit(true);
        const response = await Postdataform(url, formData);
        if (!response.error) {
            displayToast('Upload Documents successfully!', 'success');
            return true;
        } else {
            setlastsubmit(false);
            displayToast(response?.error || "Something went wrong!", 'danger');
            return false;
        }
    };
    const capturePhoto = () => {
        fileInputRef.current.click();
    };
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setCapturedPhoto(imageUrl);
        }
    };
    const videoConstraints = {
        width: 300,
        height: 300,
        facingMode: "environment" // use "user" for front camera
    };
    const getProfileImageSrc = (img) => {
        if (img instanceof File) {
            return URL.createObjectURL(img);
        }
        if (typeof img === 'string') {
            if (img.startsWith('http')) {
                return img;
            }
            if (img.startsWith('data:image')) {
                return img; // base64 from captured photo
            }
            // return `https://bgi.sortstring.com/media/${img}`;
            return window.baseurl+`media/${img}`;
        }
        return imagePlaceholder;
    };

    // const capture = () => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setCapturedPhoto(imageSrc);
    //     setShowCamera(false); // close camera
    // };
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedPhoto(imageSrc);
        setStudentBasicForm((prev) => ({
            ...prev,
            profile_picture: imageSrc,  // base64 image
            file_name: "captured_image.png"
        }));
        setShowCamera(false);
    };

    const otpInputs = useRef([]);

    const handleChangeVerifyMobileNo = (e) => {
        const value = e.target.value;
        setPhoneNumber(value.replace(/\D/g, ''));
    };

    const Getotp = async () => {
        const data = { mobile: phoneNumber };

        setIsOtpButtonDisabled(true);
        setTimeout(() => setIsOtpButtonDisabled(false), 3000);
        const url = "students/provisional-admission/send-otp/";
        const response = await Postdata(url, data);
        if (!response.error) {

            setgetotpdisp(true);
            if (!timerRunning) {
                setTimerRunning(true);
                setCountdown(60);
                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setTimerRunning(false);
                            return 15;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        }
        else if (response.error) {
            alert(response.error);
            displayToast(response.error, 'danger');
        }
    };
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
    const handleSubmitVerifyOtp = async () => {
        const url = "students/provisional-admission/verify-otp/";
        const data = { mobile: phoneNumber, otp: otp.join('') };
        const response = await Postdata(url, data);
        if (response.permanent_admission_confirmed) {
            setpermanent_admission_confirmed(true);
            return;
        }

        if (response.provisional_admission_confirmed) {
            setprovisional_admission_confirmed(true);
            return;
        }
        if (!response.error) {
            setIsOtpVerified(true);
            setgetotpdisp(false);
            handleurlgenerate();
            sessionStorage.setItem('student_auth_token', response.student_auth_token);
            if (response.student) {
                setStudentId(response.student.user_id);
                sessionStorage.setItem('studentId', response.student.user_id);
                let { addresses, contact_numbers, ...studentBasicData } = response.student;

                // console.log("studentBasicData.user_id", studentBasicData.user_id)
                // studentBasicData.privilege_category = studentBasicData.privilege_category.id;
                // studentBasicData.category = studentBasicData.category.id;
                // studentBasicData.course_id = studentBasicData.specialization.id;
                Object.keys(studentBasicData).forEach(key => {
                    if (['null', 'Null', null].includes(studentBasicData[key])) {
                        studentBasicData[key] = '';
                    }
                });


                setStudentBasicFormMobileNumber(
                    (Array.isArray(contact_numbers) ? contact_numbers : [])?.map((num, idx) => ({
                        contact_type: num.contact_type || "Mobile",
                        country_code: num.country_code || "+91",
                        area_code: num.area_code || "",
                        number: num.number || "",
                        is_primary: num.is_primary ?? false, // don't convert to boolean blindly
                        is_available_on_whatsapp: num.is_available_on_whatsapp ?? false,
                        status: num.status ?? true,
                    }))
                );

                if (studentBasicData.first_name.length > 0) {


                    const privilegeId = studentBasicData.privilege_category?.id ?? '';
                    const bloodcategory = studentBasicData.blood_group ?? '';
                    const categoryId = studentBasicData.category?.id ?? '';
                    const courseId = studentBasicData.specialization?.id ?? '';
                    // const courseId = response.student.specialization?.id ?? '';
                    const coursefees = response.student.specialization?.fees ?? '';
                    studentBasicData.privilege_category = privilegeId;
                    studentBasicData.blood_group = bloodcategory;
                    studentBasicData.category = categoryId;
                    studentBasicData.course_id = courseId;
                    // addresses = addresses.length === 0?studentBasicFormAddress:addresses;
                    // contact_numbers = contact_numbers.length === 0?studentBasicFormMobileNumber:contact_numbers;
                    setCourseFees(coursefees);
                    setspecialization_id(courseId);
                    setStudentBasicForm(studentBasicData);
                    console.log("profile_picture-----f", studentBasicForm.profile_picture)

                    // setStudentBasicFormMobileNumber(contact_numbers);
                    // setStudentBasicFormMobileNumber(
                    //     contact_numbers.map((num, idx) => ({
                    //         contact_type: num.contact_type || "Mobile",
                    //         country_code: num.country_code || "+91", // default fallback
                    //         area_code: num.area_code || "",
                    //         number: num.number || "",
                    //         is_primary: num.is_primary === true,
                    //         is_available_on_whatsapp: num.is_available_on_whatsapp || false,
                    //         status: num.status !== false // default true if not explicitly false
                    //     }))
                    // );
                    console.log('contactnumbers', contact_numbers);


                    if (response.student.profile_picture) {
                        const profilePicUrl = response.student.profile_picture;
                        const fileName = profilePicUrl.substring(profilePicUrl.lastIndexOf('/') + 1);
                        setStudentBasicForm(prev => ({
                            ...prev,
                            profile_picture: response.student.profile_picture,
                            file_name: fileName
                        }));
                    }
                    getcountry(addresses[0]?.country?.id, 1)
                    getState(addresses[0]?.country?.id, 1)
                    getCity(addresses[0]?.country?.id, addresses[0]?.state?.id, 1)

                    getcountry(addresses[1]?.country?.id, 2)
                    getState(addresses[1]?.country?.id, 2)
                    getCity(addresses[1]?.country?.id, addresses[1]?.state?.id, 2)

                    const transformedAddresses = addresses?.map(addr => ({
                        address_type: addr.address_type,
                        address: addr.address,
                        city_id: addr.city.id,
                        state_id: addr.state.id,
                        country_id: addr.country.id,
                        pincode: addr.pincode,
                        status: addr.status
                    }));

                    setStudentBasicFormAddress(transformedAddresses);
                }
                else {
                    setStudentId(studentBasicData.user_id);
                }

            }
            // settoken(response);
            // window.sessionStorage.setItem('token', response);
            // window.location.href = "/studentDashboard/";
        } else if (response.error) {
            displayToast(response.error, 'danger');
        }
    };
    const handleResendOtp = () => {
        if (!timerRunning) {
            setTimerRunning(true);
            setCountdown(60);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setTimerRunning(false);
                        return 15;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };
    const CustomValueContainer = ({ children, ...props }) => {
        return <components.ValueContainer {...props}>{null}</components.ValueContainer>;
    };
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        // setUpdatebtn(false);
        // handleClear();

    };
    const fetchacademicdataold = async () => {
        let url = `students/students-academic-details/${studentId || student_id || studentIdfromlink}/`;
        let res = getData(url);
        if (res) {

        }
        console.log('ressssssss', res);
    }
    const fetchacademicdata = async () => {
        const id = studentId || student_id || studentIdfromlink;
        const url = `students/students-academic-details/${id}/`;
        const res = await getData(url);

        if (res && Array.isArray(res)) {
            const transformed = res?.map((item) => ({
                ...item,
                qualifying_subjects: item.qualifying_subjects?.[0]?.subject || "",
                college: item.college// Only take subject from first object
            }));
            setAcadmicDetails(transformed);
        } else {
            // displayToast("No academic data found!", "warning");
        }

        console.log("Transformed Academic Data: ", res);
    };
    const getFileNameFromURL = (url) => {
        if (!url) return "No File Selected!";
        return url.substring(url.lastIndexOf('/') + 1);
    };
    const fetchdocumentdataold = async () => {
        const id = studentId || student_id || studentIdfromlink;
        const url = `students/students-documents-details/?student_id=${id}`;
        const res = await getData(url);

        if (res) {
            setDocumentForm({
                highschool_marksheet: "",
                intermediate_marksheet: "",
                character_certificate: "",
                migration_certificate: "",
                category_certificate: "",
                aadhar_card: ""
            });

            // Show only names to user (UI purpose)
            setHighSchoolFile(getFileLabel(res.highschool_marksheet));
            setIntermediateFile(getFileLabel(res.intermediate_marksheet));
            setcharacterFile(getFileLabel(res.character_certificate));
            setmigrationfile(getFileLabel(res.migration_certificate));
            setscstFile(getFileLabel(res.category_certificate));
            setaadharfile(getFileLabel(res.aadhar_card));
        }
    };
    const fetchdocumentdata = async () => {
        const id = studentId || student_id || studentIdfromlink;
        const url = `students/students-documents-details/?student_id=${id}`;
        const res = await getData(url);

        if (res) {
            // 💡 Set existing values as strings (URLs) instead of resetting to ""
            setDocumentForm({
                highschool_marksheet: res.highschool_marksheet || "",
                intermediate_marksheet: res.intermediate_marksheet || "",
                character_certificate: res.character_certificate || "",
                migration_certificate: res.migration_certificate || "",
                category_certificate: res.category_certificate || "",
                aadhar_card: res.aadhar_card || ""
            });

            // Show only file name labels to user
            setHighSchoolFile(getFileLabel(res.highschool_marksheet));
            setIntermediateFile(getFileLabel(res.intermediate_marksheet));
            setcharacterFile(getFileLabel(res.character_certificate));
            setmigrationfile(getFileLabel(res.migration_certificate));
            setscstFile(getFileLabel(res.category_certificate));
            setaadharfile(getFileLabel(res.aadhar_card));
        }
    };
    // Label extractor for file name
    const getFileLabel = (fileOrUrl) => {
        if (!fileOrUrl) return "No file Uploaded";
        if (fileOrUrl instanceof File) return fileOrUrl.name;
        return getFileNameFromURL(fileOrUrl); // Extract from URL
    };

    // Toggle section visibility
    const toggleSectionVisibilityold = (section) => {
        setIsTableVisible(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };
    const toggleSectionVisibility = (section) => {
        setIsTableVisible({
            [section]: !isTableVisible[section]
        });
    };
    const paymentgateway = async () => {
        const finalobject = {
            student_id: studentId,
            amount: CourseFees,
            payment_type: "Provisional Admission Fee",
            specialization_id: specialization_id
        }
        const url = "students/provisional-admission/payment-gateway/";
        const response = await Postdata(url, finalobject);
        if (response && response.payment_url) {
            window.location.href = response.payment_url;  // Redirect to payment URL
        } else {
            displayToast('Payment URL not received!', 'danger');
            // alert("Payment URL not received!");
        }
        console.log("responsepaymentgateway---", response);
    }
    const handleNextSectionold = async () => {
        const currentOpenIndex = sectionOrder.findIndex(section => isTableVisible[section]);
        console.log("currentOpenIndex", currentOpenIndex)
        if (currentOpenIndex === 0) {
            let resp = null;
            if (studentId === 0) {

                resp = await handleSaveBasicInfo()
            }
            else {
                resp = await handleUpdateBasicInfo();
                await fetchacademicdata()
            }
            console.log("respcbsdjcj", resp)
            if (resp) {
                if (currentOpenIndex < sectionOrder.length - 1) {
                    const nextSection = sectionOrder[currentOpenIndex + 1];
                    setIsTableVisible({
                        [nextSection]: true
                    });
                }
            }
            else {
                // alert("Somthing Went Wrong");
            }
        }
        if (currentOpenIndex === 1) {
            const resp = await handleSaveAcademicDetails();

            if (resp) {
                await fetchdocumentdata()
                if (currentOpenIndex < sectionOrder.length - 1) {
                    const nextSection = sectionOrder[currentOpenIndex + 1];
                    setIsTableVisible({
                        [nextSection]: true
                    });
                }
            }
            else {
                // alert("Somthing Went Wrong");
            }
        }
        if (currentOpenIndex === 2) {
            if (isTableVisible.uploadDocuments && !isDeclarationChecked) {
                displayToast("Please Check Declaration", 'danger');
                // alert();
            }
            else {
                const resp = await handleSaveDocuments();
                if (resp) {
                    const resp2 = await paymentgateway();
                    if (currentOpenIndex < sectionOrder.length - 1) {
                        const nextSection = sectionOrder[currentOpenIndex + 1];
                        setIsTableVisible({
                            [nextSection]: true
                        });
                    }
                }
                else {
                    // displayToast(resp?.error, 'danger');
                    // alert("Somthing Went Wrong");
                }
            }

        }

    };
    const handleNextSection = async () => {
        setupyes(true); // ⛔ Immediately disable when clicked

        const currentOpenIndex = sectionOrder.findIndex(section => isTableVisible[section]);
        console.log("currentOpenIndex", currentOpenIndex);

        try {
            if (currentOpenIndex === 0) {
                let resp = null;
                if (studentId === 0) {
                    resp = await handleSaveBasicInfo();
                } else {
                    resp = await handleUpdateBasicInfo();
                    await fetchacademicdata();
                }

                console.log("respcbsdjcj", resp);
                if (resp) {
                    if (currentOpenIndex < sectionOrder.length - 1) {
                        const nextSection = sectionOrder[currentOpenIndex + 1];
                        setIsTableVisible({ [nextSection]: true });
                    }
                }
            }
            else if (currentOpenIndex === 1) {
                const resp = await handleSaveAcademicDetails();

                if (resp) {
                    await fetchdocumentdata();
                    if (currentOpenIndex < sectionOrder.length - 1) {
                        const nextSection = sectionOrder[currentOpenIndex + 1];
                        setIsTableVisible({ [nextSection]: true });
                    }
                }
            }
            else if (currentOpenIndex === 2) {
                if (isTableVisible.uploadDocuments && !isDeclarationChecked) {
                    displayToast("Please Check Declaration", 'danger');
                } else {
                    const resp = await handleSaveDocuments();
                    if (resp) {
                        const resp2 = await paymentgateway();
                        if (currentOpenIndex < sectionOrder.length - 1) {
                            const nextSection = sectionOrder[currentOpenIndex + 1];
                            setIsTableVisible({ [nextSection]: true });
                        }
                    }
                }
            }
        } catch (error) {
            console.error("❌ Error during handleNextSection:", error);
        } finally {
            setupyes(false); // ✅ Always re-enable after everything
        }
    };

    const handlePreviousSection = () => {
        const currentOpenIndex = sectionOrder.findIndex(section => isTableVisible[section]);
        if (currentOpenIndex > 0) {
            const previousSection = sectionOrder[currentOpenIndex - 1];
            setIsTableVisible({
                [previousSection]: true
            });

            console.log("profile_picture-----f", studentBasicForm.profile_picture)
        }
    };

    const handleSaveDraft = async () => {
        const currentOpenIndex = sectionOrder.findIndex(section => isTableVisible[section]);
        console.log("currentOpenIndex", currentOpenIndex)
        if (currentOpenIndex === 0) {
            let resp = null;
            if (studentId === 0) {

                resp = await handleSaveBasicInfo()
            }
            else {
                resp = await handleUpdateBasicInfo()
            }
            // console.log("respcbsdjcj", resp)
            // if (resp) {
            //     if (currentOpenIndex < sectionOrder.length - 1) {
            //         const nextSection = sectionOrder[currentOpenIndex + 1];
            //         setIsTableVisible({
            //             [nextSection]: true
            //         });
            //     }
            // }
            // else {
            //     // alert("Somthing Went Wrong");
            // }
        }
        if (currentOpenIndex === 1) {
            const resp = await handleSaveAcademicDetails();

            // if (resp) {
            //     if (currentOpenIndex < sectionOrder.length - 1) {
            //         const nextSection = sectionOrder[currentOpenIndex + 1];
            //         setIsTableVisible({
            //             [nextSection]: true
            //         });
            //     }
            // }
            // else {
            //     // alert("Somthing Went Wrong");
            // }
        }
        if (currentOpenIndex === 2) {
            if (isTableVisible.uploadDocuments && !isDeclarationChecked) {
                displayToast("Please Check Declaration", 'danger');
                // alert();
            }
            else {
                const resp = await handleSaveDocuments();
                // if (resp) {
                //     const resp2 = await paymentgateway();
                //     if (currentOpenIndex < sectionOrder.length - 1) {
                //         const nextSection = sectionOrder[currentOpenIndex + 1];
                //         setIsTableVisible({
                //             [nextSection]: true
                //         });
                //     }
                // }
                // else {
                //     displayToast(resp.error, 'danger');
                //     // alert("Somthing Went Wrong");
                // }
            }

        }

    };
    const handleurlgenerateold = async () => {
        const finalobj = {
            student_mobile_number: phoneNumber
        }
        const url = 'students/provisional-admission/generate-form-link/';
        const res = Postdata(url, finalobj);
        if (res) {
            setIsModalOpen(true)
        }
    }
    const handleurlgenerate = async () => {
        const finalobj = {
            student_mobile_number: phoneNumber
        };
        const url = 'students/provisional-admission/generate-form-link/';
        const res = await Postdata(url, finalobj); // 👈 await is important

        if (res && res.student_found && res.student_auth_token && res.student_id) {
            const generatedLink = window.baseurl2+`AdmissionForm/?studentid=${res.student_id}`;
            // const generatedLink = `http://localhost:3000/AdmissionForm/?studentid=${res.student_id}`;

            console.log("Generated Form Link:", generatedLink);

            // If you're showing this in a modal:
            seturl(generatedLink); // state to store the URL
            // show modal
        } else {
            displayToast("Student not found or failed to generate form link.", 'danger');
            // alert();
        }
    };
    const sendform = async () => {
        setIsModalOpen(true);
        handleurlgenerate();
    }
    const getButtonLabelold = () => {
        const currentOpenIndex = sectionOrder.findIndex(section => isTableVisible[section]);
        const isLastStep = currentOpenIndex === sectionOrder.length - 1;
        return isLastStep ? "Submit" : "Next";
    };
    const getButtonLabel = () => {
        const currentOpenIndex = sectionOrder.findIndex(section => isTableVisible[section]);
        return currentOpenIndex === sectionOrder.length - 1 ? "Submit" : "Next";
    };


    const isFromLink = studentIdfromlink;
    useEffect(() => {
        getcountry();
        getcountry(1);
        getcountry(2);
        getMasterData();
        getAcademicDetailsMaster();

    }, [])
    useEffect(() => {
        if (sentmodal) {
            const timer = setTimeout(() => {
                // console.log("300ms passed");
                setsentmodal(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [sentmodal]);
    useEffect(() => {
        const fetchData = async () => {
            console.log("student_id---", studentIdfromlink);
            if (studentIdfromlink) {
                const url2 = `students/students-basic-details/${studentIdfromlink}/`;
                const response = await getDatalink(url2, tokenfromlink);
                console.log("responsefromlink--", response,);

                if (response) {
                    const { addresses = [], contact_numbers = [], ...studentBasicData } = response;
                    console.log("studentBasicData", studentBasicData)
                    setPhoneNumber(studentBasicData.primary_contact_number)
                    // Safety checks
                    const privilegeId = studentBasicData.privilege_category?.id ?? '';
                    const blood_id = studentBasicData.blood_group ?? '';
                    const categoryId = studentBasicData.category?.id ?? '';
                    const courseId = response.specialization?.id ?? '';
                    const coursefees = response.specialization?.fees ?? '';
                    const middlename = response?.middle_name === null || "null" || "Null" ? "" : response.middle_name
                    // console.log("courseId-----", courseId);
                    // console.log("coursefees-----", coursefees);

                    studentBasicData.privilege_category = privilegeId;
                    studentBasicData.blood_group = blood_id;
                    studentBasicData.category = categoryId;
                    studentBasicData.course_id = courseId;
                    studentBasicData.middle_name = middlename;
                    // studentBasicData.specialization.id=spe
                    setCourseFees(coursefees);
                    setspecialization_id(courseId);
                    setStudentBasicForm(studentBasicData);
                    setStudentId(studentBasicData.user_id);
                    setStudentBasicFormMobileNumber(contact_numbers);

                    const transformedAddresses = addresses?.map(addr => ({
                        address_type: addr.address_type,
                        address: addr.address,
                        city_id: addr.city.id,
                        state_id: addr.state.id,
                        country_id: addr.country.id,
                        pincode: addr.pincode,
                        status: addr.status
                    }));
                    console.log("transformedAddresses--", transformedAddresses)
                    getcountry(addresses[0]?.country.id, 1)
                    getState(addresses[0]?.country.id, 1)
                    getCity(addresses[0]?.country.id, addresses[0].state.id, 1)

                    getcountry(addresses[1]?.country.id, 2)
                    getState(addresses[1]?.country.id, 2)
                    getCity(addresses[1]?.country.id, addresses[1].state.id, 2)
                    setStudentBasicFormAddress(transformedAddresses);

                    // let transformedAddresses = addresses.map((addr) => ({
                    //     address_type: addr.address_type,
                    //     address: addr.address,
                    //     city_id: addr.city?.id ?? '',
                    //     state_id: addr.state?.id ?? '',
                    //     country_id: addr.country?.id ?? '',
                    //     pincode: addr.pincode,
                    //     status: addr.status,
                    // }));

                    // // Add a second empty address if not present
                    // if (transformedAddresses.length === 1) {
                    //     transformedAddresses.push({
                    //         address_type: "Permanent",
                    //         address: '',
                    //         city_id: '',
                    //         state_id: '',
                    //         country_id: '',
                    //         pincode: '',
                    //         status: true
                    //     });
                    // }

                    // setStudentBasicFormAddress(transformedAddresses);

                    // // Get State/City data only if they exist
                    // if (transformedAddresses[0].country_id && transformedAddresses[0].state_id) {
                    //     getState(transformedAddresses[0].country_id);
                    //     getCity(transformedAddresses[0].country_id, transformedAddresses[0].state_id);
                    // }
                    // if (transformedAddresses[1].country_id && transformedAddresses[1].state_id) {
                    //     getState(transformedAddresses[1].country_id);
                    //     getCity(transformedAddresses[1].country_id, transformedAddresses[1].state_id);
                    // }


                    //   setIsTableVisible({ academicDetails: true });
                } else {
                    // alert("Link is invalid or expired.");
                    displayToast("Link is invalid or expired.", 'danger');
                }
                console.log("studentBasicFormAddress----", studentBasicFormAddress)

            }
        };

        fetchData();
    }, [studentIdfromlink]);

    return (
        <>
            {lastsubmit ? <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={loader}></img> </div> : (
                <div className="main-form-container">
                    <div className="mfc-ip">
                        <img src={AdmissionFormlogo} alt="logo" style={{ width: '350px' }} />
                        <p className="pa-f">Provisional Admission Form - BITE</p>
                    </div>

                    {/* Mobile Number and OTP */}
                    <div className="mb-s">
                        <p>Verify your registered mobile number</p>
                        <div className=" vmm">
                            <div className='vmm-l' >
                                <div>
                                    <label className='form-labell'>Phone Number</label> <span className='astrisk'>*</span>
                                    <div className="input-group" style={{ border: "1px solid #222F3E33", borderRadius: "6px", width: '100%' }}>

                                        <select className="form-select code-select" style={{ backgroundColor: '#F9F9F9', border: 'none', padding: '10px', borderRadius: '6px 0 0 6px', width: '40px' }} disabled={isOtpVerified || isFromLink ? true : false}>
                                            <option value="+91">+91</option>
                                            {/* <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+61">+61</option> */}
                                        </select>
                                        <input
                                            type="text"
                                            className="form-control code-select"
                                            placeholder="Enter Mobile Number"
                                            value={phoneNumber}
                                            onChange={handleChangeVerifyMobileNo}
                                            maxLength="10"
                                            style={{ border: 'none', padding: '10px', borderRadius: '0 6px 6px 0', width: 'calc(100% - 80px)' }}
                                            disabled={isOtpVerified || isFromLink ? true : false}
                                        />
                                    </div>
                                </div>
                                {/* {
                            isOtpVerified === false ?
                                timerRunning === false ?
                                    <button className={`get-otp-btn ${phoneNumber.length === 10 ? 'enabled' : 'disabled'}`} disabled={phoneNumber.length !== 10} onClick={Getotp} style={{ width: '30%', marginBottom: "5px" }}>Get OTP</button>
                                    : <p
                                        style={{
                                            marginTop: '20px',
                                            fontSize: '14px',
                                            textAlign: 'left',
                                            color: '#4D5765'
                                        }}
                                    >
                                        Didn't receive an OTP?{' '}<br />
                                        <span
                                            onClick={handleResendOtp}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <span style={{ color: "#222F3E4D" }}>Resend OTP {countdown} sec</span>
                                        </span>
                                    </p>
                                : ""
                        } */}
                                {
                                    isOtpVerified === false && (
                                        timerRunning ? (
                                            <p
                                                style={{
                                                    marginTop: '20px',
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                    color: '#4D5765'
                                                }}
                                            >
                                                Didn't receive an OTP?{' '}
                                                <br />
                                                <span style={{ color: "#222F3E4D" }}>
                                                    Resend OTP {countdown} sec
                                                </span>
                                            </p>
                                        ) : getotpdisp ? (
                                            <p
                                                style={{
                                                    marginTop: '20px',
                                                    fontSize: '14px',
                                                    textAlign: 'left',
                                                    color: '#4D5765'
                                                }}
                                            >
                                                Didn't receive an OTP?{' '}
                                                <br />
                                                <span
                                                    onClick={Getotp}
                                                    style={{ cursor: 'pointer', color: '#7F56DA', textDecoration: 'underline' }}
                                                >
                                                    Resend OTP
                                                </span>
                                            </p>
                                        ) : (
                                            <button
                                                className={`get-otp-btn ${phoneNumber.length === 10 && !isOtpButtonDisabled ? 'enabled' : 'disabled'}`}
                                                disabled={phoneNumber.length !== 10 || isOtpButtonDisabled}
                                                onClick={Getotp}
                                                // style={{ width: '30%', marginBottom: "5px", }}
                                                style={{
                                                    width: '30%',
                                                    marginBottom: '5px',
                                                    display: isFromLink ? 'none' : 'block'
                                                }}
                                            >
                                                Get OTP
                                            </button>
                                        )
                                    )
                                }
                                {isOtpVerified || isFromLink ?
                                    <div style={{ marginBottom: "15px", display: 'flex', alignItems: 'center' }}>
                                        <img src={checked} style={{ width: '20px', height: '20px', marginRight: '5px' }}></img>
                                        <span>Verified</span>
                                    </div>
                                    : ''
                                }
                            </div>
                            {
                                getotpdisp &&

                                <div className='otpsec' >
                                    <div>
                                        <label className='form-labell'>Enter OTP</label> <span className='astrisk'>*</span>
                                        <div className="otp-input-container" style={{ marginBottom: '0' }}>
                                            {otp.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    value={digit}
                                                    ref={(el) => otpInputs.current[index] = el}
                                                    onChange={(e) => handleOtpChange(e, index)}
                                                    maxLength="1"
                                                    className="otp-input"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        className={`get-otp-btn ${isOtpFilled ? 'enabled' : 'disabled'}`}
                                        disabled={!isOtpFilled}
                                        onClick={handleSubmitVerifyOtp}
                                        style={{ padding: '10px', backgroundColor: isOtpFilled ? '#7F56DA' : '#d3d3d3', color: 'white', border: 'none', borderRadius: '6px', cursor: isOtpFilled ? 'pointer' : 'not-allowed', marginBottom: '1px' }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            }
                            {isOtpVerified && (
                                <div style={{ marginTop: '20px' }}>
                                    <p style={{ fontWeight: 'bold', color: '#7F56DA' }}>Share this link to fill the details.</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={url} // or a generated token link
                                            readOnly
                                        // style={{ width: '70%' }}
                                        />
                                        <button
                                            className="btn btn-light"
                                            onClick={() => {
                                                sendform();
                                                // navigator.clipboard.writeText(`https://yourdomain.com/AdmissionForm/${studentId}`);

                                            }}
                                        >
                                            <img src={vaadinarrowforward}></img>
                                        </button>
                                        <button
                                            className="btn btn-light"
                                            onClick={() => {
                                                navigator.clipboard.writeText(url);
                                                // alert('Url is copied')
                                                displayToast('Url is Copied', 'success')
                                            }}

                                        >
                                            <img src={copy} style={{ width: '20px' }}></img>
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>



                    {/* Collapsible Sections */}
                    <div className="stu-pro" style={{ padding: '0px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'white' }}>
                        {/* Basic Details */}
                        <div style={isTableVisible.basicDetails === true ? { background: '#f9f9f9', padding: "16px 10px", border: "2px solid #7F56DA", borderRadius: '8px' } : { background: '#f9f9f9', padding: "16px 10px" }} >
                            <div className="row" style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                                <div className="col-md-3">
                                    <p style={{ fontSize: "25px", fontWeight: '600', color: '#222F3E', textAlign: 'left' }}>Basic Details</p>
                                </div>
                                <div className="col-md-1" style={{ textAlign: 'right' }}>
                                    <img
                                        src={arrowup}
                                        // onClick={() => toggleSectionVisibility('basicDetails')}
                                        style={{
                                            transform: isTableVisible.basicDetails ? "rotate(180deg)" : "rotate(0deg)",
                                            transition: "transform 0.3s ease",
                                            cursor: 'pointer'
                                        }}
                                        alt="Toggle arrow"
                                    />
                                </div>
                            </div>
                            {isTableVisible.basicDetails && (
                                <div style={{ transition: "max-height 0.5s ease", padding: "0 10px" }}>

                                    <div>
                                        <h4 className='fm-pr-hd'>PERSONAL DETAILS</h4>
                                    </div>
                                    <div className="">
                                        <div className='row' style={{ justifyContent: 'space-between' }}>
                                            <div className="col-md-3">
                                                <label className='form-labell'>Salutation</label>
                                                <select className='fm-modal form-control form-select' value={studentBasicForm.salutation} name='salutation' onChange={handleBasicInfoChange} style={{ marginTop: "3px" }}>
                                                    <option value="">Select Salutation</option>
                                                    {
                                                        salutations && salutations.map((val, ind) => {
                                                            return (
                                                                <option value={val} key={ind}>{val}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <label className='form-labell'>First Name<span className='astrisk'>*</span></label>
                                                <input type="text" className='fm-modal form-control' placeholder="Enter First Name" value={studentBasicForm.first_name} name='first_name' onChange={handleBasicInfoChange} />
                                            </div>
                                            <div className="col-md-3">
                                                <label className='form-labell'>Middle Name</label>
                                                <input type="text" className='fm-modal form-control' placeholder="Enter Middle Name" value={studentBasicForm.middle_name === null ? "" : studentBasicForm.middle_name} name='middle_name' onChange={handleBasicInfoChange} style={{ marginTop: "3px" }} />
                                            </div>
                                            <div className="col-md-3">
                                                <label className='form-labell'>Last Name<span className='astrisk'>*</span></label>
                                                <input type="text" className='fm-modal form-control' placeholder="Enter Last Name" value={studentBasicForm.last_name} name='last_name' onChange={handleBasicInfoChange} />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row" style={{ justifyContent: 'space-between' }}>
                                        <div className="col-md-3">
                                            <label className='form-labell'>Gender<span className='astrisk'>*</span></label>
                                            <select className='fm-modal form-control form-select' value={studentBasicForm.gender} name='gender' onChange={handleBasicInfoChange}>
                                                <option value="">Select Gender</option>
                                                {
                                                    genders && genders.map((val, ind) => {
                                                        return (
                                                            <option value={val} key={ind}>{val}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <div>
                                                <label className='form-labell'>Date of Birth<span className='astrisk'>*</span></label>
                                            </div>
                                            {/* <input type="date" className='fm-modal form-control' value={studentBasicForm.date_of_birth} name='date_of_birth' onChange={handleBasicInfoChange} /> */}
                                            {isIOS ? (
                                                <DatePicker
                                                    selected={studentBasicForm.date_of_birth ? new Date(studentBasicForm.date_of_birth) : null}
                                                    onChange={(date) => {
                                                        const formatted = date?.toISOString().split("T")[0]; // "YYYY-MM-DD"
                                                        handleBasicInfoChange({ target: { name: "date_of_birth", value: formatted } });
                                                    }}
                                                    className="fm-modal form-control cus-date"
                                                    placeholderText="Select Date of Birth"
                                                    dateFormat="dd-MM-yyyy"
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    maxDate={new Date()}
                                                />
                                            ) : (
                                                <input
                                                    type="date"
                                                    className="fm-modal form-control"
                                                    value={studentBasicForm.date_of_birth}
                                                    name="date_of_birth"
                                                    onChange={handleBasicInfoChange}
                                                    max={new Date().toISOString().split("T")[0]}
                                                />
                                            )}
                                        </div>
                                        <div className="col-md-3">
                                            <label className='form-labell'>Nationality<span className='astrisk'>*</span></label>
                                            {/* <select className='fm-modal form-control form-select' value={studentBasicForm.nationality} name='nationality' onChange={handleBasicInfoChange}>
                                        <option value="">Select Nationality</option>
                                        {
                                            countrydata && countrydata.map((val, ind) => {
                                                return (
                                                    <option value={val.id} key={ind}>{val.name}</option>
                                                )
                                            })
                                        }
                                    </select> */}
                                            <input type="text" className='fm-modal form-control' value={studentBasicForm.nationality} name='nationality' onChange={handleBasicInfoChange} placeholder='Enter Nationality' />
                                        </div>
                                        <div className="col-md-3">
                                            <label className='form-labell'>Blood Group</label>
                                            <select className='fm-modal form-control form-select' value={studentBasicForm.blood_group} name='blood_group' onChange={handleBasicInfoChange} style={{ marginTop: '3px' }}>
                                                <option value="">Select Blood Group</option>
                                                {
                                                    bloodGroups && bloodGroups.map((val, ind) => {
                                                        return (
                                                            <option value={val} key={ind}>{val}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row" style={{ justifyContent: 'space-between' }}>
                                        <div className="col-md-3">
                                            <label className='form-labell'>Privilage Category</label>
                                            <select className='fm-modal form-control form-select' value={studentBasicForm.privilege_category} name='privilege_category' onChange={handleBasicInfoChange}
                                                style={{ marginTop: '3px' }}>
                                                <option value="">Select Privilage Category</option>
                                                {
                                                    studentPrivilegeCategories && studentPrivilegeCategories.map((val, ind) => {
                                                        return (
                                                            <option value={val.id} key={ind}>{val.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label className='form-labell'>Cast Category<span className='astrisk'>*</span></label>
                                            <select className='fm-modal form-control form-select' value={studentBasicForm.category} name='category' onChange={handleBasicInfoChange}>
                                                <option value="">Select Cast Category</option>
                                                {
                                                    studentCategories && studentCategories.map((val, ind) => {
                                                        return (
                                                            <option value={val.id} key={ind}>{val.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className='form-labell'>Email<span className='astrisk'>*</span></label>
                                            <input type="email" className='fm-modal form-control' placeholder="Enter Email" value={studentBasicForm.email} name='email' onChange={handleBasicInfoChange} />
                                        </div>
                                    </div>
                                    <div className="row" >
                                        <div className="col-md-3">
                                            <label className='form-labell'>Father's Name<span className='astrisk'>*</span></label>
                                            <input type="text" className='fm-modal form-control' placeholder="Enter Father's Name" value={studentBasicForm.father_name} name='father_name' onChange={handleBasicInfoChange} />
                                        </div>
                                        <div className="col-md-3">
                                            <label className='form-labell'>Mother's Name<span className='astrisk'>*</span></label>
                                            <input type="text" className='fm-modal form-control' placeholder="Enter Mother's Name" value={studentBasicForm.mother_name} name='mother_name' onChange={handleBasicInfoChange} />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className='fm-pr-hd'>ADD STUDENT PICTURE</h4>
                                    </div>



                                    <div className="row" style={{ overflowX: "auto" }}>
                                        <div className="col-md-12" style={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                                            {/* <img src={studentBasicForm?.profile_picture?.length === 0 ? (capturedPhoto || imagePlaceholder) : studentBasicForm.profile_picture} style={{ width: '100px', height: '100px' }}></img> */}
                                            {/* <img
                                        src={
                                            studentBasicForm.profile_picture instanceof File
                                                ? URL.createObjectURL(studentBasicForm.profile_picture)
                                                : (studentBasicForm.profile_picture || imagePlaceholder)
                                        }
                                        style={{ width: '100px', height: '100px' }}
                                    /> */}
                                            {/* <img
                                        src={
                                            studentBasicForm.profile_picture instanceof File
                                                ? URL.createObjectURL(studentBasicForm.profile_picture)
                                                : (typeof studentBasicForm.profile_picture === "string" && studentBasicForm.profile_picture.startsWith("http"))
                                                    ? studentBasicForm.profile_picture
                                                    : imagePlaceholder
                                        }
                                        style={{ width: '100px', height: '100px' }} /> */}
                                            <img
                                                src={getProfileImageSrc(studentBasicForm.profile_picture)}
                                                alt="student profile"
                                                onError={(e) => e.target.src = imagePlaceholder}
                                                style={{ width: '100px', height: '100px' }}
                                            />

                                            <div>
                                                <button className='add-btn' onClick={() => setShowCamera(true)}><span style={{ marginRight: "5px" }}>
                                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.39841 1.85273C5.61686 0.780916 6.57086 0.0224609 7.66314 0.0224609H10.337C11.4292 0.0224609 12.3824 0.780916 12.6017 1.85273C12.6259 1.97076 12.689 2.07722 12.781 2.15498C12.8731 2.23275 12.9886 2.2773 13.109 2.28146H13.136C14.2839 2.33219 15.1659 2.47292 15.9022 2.95646C16.3661 3.26082 16.7654 3.65192 17.0763 4.10928C17.4633 4.6771 17.6335 5.33001 17.7153 6.11873C17.7955 6.89028 17.7955 7.85655 17.7955 9.08055V9.1501C17.7955 10.3741 17.7955 11.3412 17.7153 12.1119C17.6335 12.9006 17.4633 13.5536 17.0763 14.1222C16.7637 14.5792 16.3649 14.9708 15.9022 15.275C15.327 15.6522 14.6668 15.8191 13.8666 15.8985C13.0828 15.977 12.1001 15.977 10.8516 15.977H7.1485C5.89995 15.977 4.91732 15.977 4.1335 15.8985C3.33332 15.8191 2.67304 15.653 2.09786 15.275C1.63513 14.9706 1.23631 14.5787 0.923772 14.1214C0.536772 13.5536 0.36659 12.9006 0.284772 12.1119C0.20459 11.3412 0.20459 10.3741 0.20459 9.1501V9.08055C0.20459 7.85655 0.20459 6.89028 0.284772 6.11873C0.36659 5.33001 0.536772 4.6771 0.923772 4.10928C1.23631 3.65197 1.63513 3.26009 2.09786 2.95564C2.83423 2.47292 3.71623 2.33219 4.86414 2.28228L4.87804 2.28146H4.89114C5.01154 2.2773 5.12704 2.23275 5.21905 2.15498C5.31106 2.07722 5.37424 1.97076 5.39841 1.85273ZM7.66314 1.24973C7.1395 1.24973 6.70014 1.61219 6.60114 2.09737C6.44159 2.88282 5.7445 3.50137 4.90586 3.50873C3.80295 3.55782 3.21223 3.69282 2.77041 3.98246C2.44268 4.1984 2.16007 4.47601 1.93832 4.79982C1.7125 5.13119 1.57668 5.55582 1.50468 6.24555C1.43268 6.94592 1.43186 7.84919 1.43186 9.11573C1.43186 10.3823 1.43186 11.2847 1.5055 11.9851C1.57668 12.6748 1.7125 13.0995 1.93914 13.4316C2.15841 13.754 2.44068 14.0322 2.77123 14.249C3.11241 14.4724 3.54932 14.6074 4.25541 14.6777C4.9705 14.7489 5.89177 14.7497 7.18204 14.7497H10.818C12.1075 14.7497 13.0288 14.7497 13.7447 14.6777C14.4508 14.6074 14.8877 14.4732 15.2289 14.249C15.5594 14.0322 15.8425 13.754 16.0618 13.4308C16.2876 13.0995 16.4234 12.6748 16.4954 11.9851C16.5674 11.2847 16.5682 10.3815 16.5682 9.11573C16.5682 7.85001 16.5682 6.94592 16.4946 6.24555C16.4234 5.55582 16.2876 5.13119 16.061 4.79982C15.8393 4.47571 15.5567 4.19782 15.2289 3.98164C14.7887 3.69283 14.198 3.55782 13.0934 3.50873C12.2556 3.50055 11.5585 2.88364 11.399 2.09737C11.3466 1.85541 11.2123 1.63894 11.0188 1.4845C10.8254 1.33007 10.5845 1.24715 10.337 1.24973H7.66314ZM9.00004 6.97701C8.51181 6.97701 8.04356 7.17096 7.69833 7.5162C7.35309 7.86143 7.15914 8.32968 7.15914 8.81792C7.15914 9.30616 7.35309 9.7744 7.69833 10.1196C8.04356 10.4649 8.51181 10.6588 9.00004 10.6588C9.48828 10.6588 9.95653 10.4649 10.3018 10.1196C10.647 9.7744 10.841 9.30616 10.841 8.81792C10.841 8.32968 10.647 7.86143 10.3018 7.5162C9.95653 7.17096 9.48828 6.97701 9.00004 6.97701ZM5.93186 8.81792C5.93186 8.00418 6.25512 7.22378 6.83051 6.64838C7.40591 6.07299 8.18631 5.74973 9.00004 5.74973C9.81378 5.74973 10.5942 6.07299 11.1696 6.64838C11.745 7.22378 12.0682 8.00418 12.0682 8.81792C12.0682 9.63165 11.745 10.4121 11.1696 10.9874C10.5942 11.5628 9.81378 11.8861 9.00004 11.8861C8.18631 11.8861 7.40591 11.5628 6.83051 10.9874C6.25512 10.4121 5.93186 9.63165 5.93186 8.81792ZM13.2955 6.36337C13.2955 6.20062 13.3602 6.04454 13.4752 5.92946C13.5903 5.81438 13.7464 5.74973 13.9091 5.74973H14.7273C14.8901 5.74973 15.0461 5.81438 15.1612 5.92946C15.2763 6.04454 15.341 6.20062 15.341 6.36337C15.341 6.52612 15.2763 6.6822 15.1612 6.79728C15.0461 6.91236 14.8901 6.97701 14.7273 6.97701H13.9091C13.7464 6.97701 13.5903 6.91236 13.4752 6.79728C13.3602 6.6822 13.2955 6.52612 13.2955 6.36337Z" fill="white" />
                                                    </svg>

                                                </span>Capture Image</button>

                                            </div>
                                            <div className="file-upload-container cus-cont">
                                                {/* File Upload Button */}
                                                <div className="upload-btn-container d-flex flex-row gap-2 align-items-center">
                                                    <label htmlFor="file-upload" className="upload-btn">
                                                        <input
                                                            type="file"
                                                            id="file-upload"
                                                            className="file-upload-input"
                                                            name='profile_picture'
                                                            onChange={handleBasicInfoChange}
                                                            accept=".png, .jpg, .jpeg"
                                                        />
                                                        <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_747_3180)">
                                                                <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                                                <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_747_3180">
                                                                    <rect width="16" height="16" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        Upload File
                                                    </label>

                                                    {studentBasicForm.file_name && (
                                                        <div className="ms-3 imgfileName">
                                                            <div className="me-3">{studentBasicForm.file_name}    <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => setStudentBasicForm({ ...studentBasicForm, "profile_picture": "", "file_name": "No file Uploaded" })}>
                                                                &times;
                                                            </span></div>

                                                        </div>
                                                    )}
                                                </div>

                                                {/* Display File Name or Placeholder Text */}
                                                {/* <div className="ms-3">{'No file Uploaded'}</div> */}
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        <h4 className='fm-pr-hd'>CONTACT DETAILS</h4>
                                    </div>
                                    {studentBasicFormMobileNumber && studentBasicFormMobileNumber.map((val, index) => {
                                        return (
                                            <div className="row" key={index}>
                                                <div className="col-md-4">
                                                    <div className=" mb-3" style={{ border: "1px solid #222F3E33", borderRadius: "6px", display: 'flex' }}>
                                                        {/* Replace dropdown with select */}
                                                        <select className="form-select code-select"
                                                            onChange={(e) => { handleContactChange(e, index) }}
                                                            value={val.country_code}
                                                            name='country_code'
                                                            style={{
                                                                backgroundColor: '#F9F9F9',
                                                                border: 'none',
                                                                padding: '10px',
                                                                borderRadius: '6px 0 0 6px',
                                                                width: '80px', // Adjust the width for the country code
                                                                marginTop: '3px'
                                                            }}>
                                                            <option value="+91">+91</option>
                                                            <option value="+1">+1</option>
                                                            <option value="+44">+44</option>
                                                            <option value="+61">+61</option>
                                                            {/* Add other country codes as needed */}
                                                        </select>
                                                        <input
                                                            type="text"
                                                            className="form-control code-select"
                                                            aria-label="Text input with dropdown button"
                                                            placeholder="Enter Mobile Number"
                                                            onChange={(e) => { handleContactChange(e, index) }}
                                                            value={val.number}
                                                            name='number'
                                                            style={{
                                                                border: 'none',
                                                                padding: '10px',
                                                                borderRadius: '0 6px 6px 0',
                                                                width: 'calc(100% - 80px)', // Adjust width to take full remaining space
                                                            }}
                                                            // value={phoneNumber}
                                                            // onChange={handleChange}
                                                            maxLength="10"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <select className='fm-modal form-control form-select'
                                                        onChange={(e) => { handleContactChange(e, index) }}
                                                        value={val.contact_type}
                                                        name='contact_type'
                                                    >
                                                        <option value="">Select </option>
                                                        {
                                                            contactNumberTypes && contactNumberTypes.map((val, ind) => {
                                                                return (
                                                                    <option value={val} key={ind}>{val}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className="col-md-5 input-group2" >
                                                    {/* <label >
                                                <input
                                                    onChange={(e) => { handleContactChange(e, index) }}
                                                    className='me-2'
                                                    type="radio"
                                                    checked={val.is_primary}
                                                    name={`is_primary_${index}`} // 👈 key change here
                                                />

                                                Primary
                                            </label> */}
                                                    {index === 0 && (
                                                        <label>
                                                            <input
                                                                onChange={(e) => { handleContactChange(e, index) }}
                                                                className='me-2'
                                                                type="radio"
                                                                checked={val.is_primary}
                                                                name="is_primary"
                                                            />
                                                            Primary
                                                        </label>
                                                    )}

                                                    {/* Checkbox for Available on WhatsApp? */}
                                                    <label className="whatsapp-checkbox ">
                                                        <input
                                                            onChange={(e) => { handleContactChange(e, index) }}
                                                            name='is_available_on_whatsapp'
                                                            type="checkbox"
                                                            className='me-2'
                                                            checked={val.is_available_on_whatsapp}
                                                        // checked={whatsappStatus}
                                                        // onChange={handleWhatsappChange}
                                                        />
                                                        Available on WhatsApp?
                                                    </label>
                                                    {index !== 0 && (
                                                        <p className='Removebtn' onClick={() => handleRemoveContact(index)}><img src={deletered}></img>Remove</p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <div onClick={addContactRow} style={{ cursor: 'pointer' }}>
                                        <h4 className='fm-pr-hd'>  <svg width="10" height="10" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="#7F56DA" />
                                        </svg> Add More</h4>
                                    </div>
                                    <div className="col-md-3">
                                        <label className='form-labell'>Course<span className='astrisk'>*</span></label>
                                        <select className='fm-modal form-control form-select' value={studentBasicForm.course_id} name='course_id' onChange={handleBasicInfoChange}>
                                            <option value="">Select Course</option>
                                            {
                                                courses && courses.map((val, ind) => {
                                                    return (
                                                        <option value={val.id} key={ind}>{val.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        <div style={{ height: '29px', background: '#F4F4F4', borderRadius: '8px', padding: '10px', display: 'inline-flex', marginTop: '5px' }}>
                                            <p style={{ fontSize: '12px', fontWeight: '500' }}>Course Fee: ₹{CourseFees}/-</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className='fm-pr-hd'>CORRESPONDENCE ADDRESS</h4>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className='form-labell'>Address<span className='astrisk'>*</span></label>
                                            <input type="text" className='fm-modal form-control' placeholder="Enter Address " value={studentBasicFormAddress[0]?.address} name='address' onChange={(e) => handleAddressChange(e, 1)}
                                                maxLength={100} />
                                        </div>
                                    </div>
                                    <div className="row">

                                        {/* <div className="col-md-3">
                                            <label className='form-labell'>Country<span className='astrisk'>*</span></label>
                                            <select className='fm-modal form-control form-select' value={studentBasicFormAddress[0]?.country_id} name='country_id' onChange={(e) => handleAddressChange(e, 1)}>
                                                <option value="">Select Country</option>
                                                {
                                                    correspondenceCountry && correspondenceCountry.map((val, ind) => {
                                                        return (
                                                            <option value={val.id} key={ind}>{val.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                         <div className="col-md-3">
                                            <label className='form-labell'>State<span className='astrisk'>*</span></label>
                                            <select className='fm-modal form-control form-select' value={studentBasicFormAddress[0]?.state_id} name='state_id' onChange={(e) => handleAddressChange(e, 1)}>
                                                <option value="">Select State</option>
                                                {
                                                    correspondenceState && correspondenceState.map((val, ind) => {
                                                        return (
                                                            <option value={val.id} key={ind}>{val.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label className='form-labell'>City<span className='astrisk'>*</span></label>
                                            <select className='fm-modal form-control form-select' value={studentBasicFormAddress[0]?.city_id} name='city_id' onChange={(e) => handleAddressChange(e, 1)} >
                                                <option value="">Select City</option>
                                                {
                                                    correspondenceCity && correspondenceCity.map((val, ind) => {
                                                        return (
                                                            <option value={val.id} key={ind}>{val.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>  */}
                                        <div className="col-md-3">
                                            <label className='form-labell'>Country<span className='astrisk'>*</span></label>
                                            {/* <Select
                                                classNamePrefix="react-select"
                                                options={correspondenceCountry?.map(country => ({
                                                    value: country.id,
                                                    label: country.name
                                                }))}
                                                value={
                                                    correspondenceCountry?.find(item => item.id === studentBasicFormAddress[0]?.country_id)
                                                        ? {
                                                            value: studentBasicFormAddress[0]?.country_id,
                                                            label: correspondenceCountry.find(item => item.id === studentBasicFormAddress[0]?.country_id)?.name
                                                        }
                                                        : null
                                                }
                                                onChange={(selectedOption) => {
                                                    handleAddressChange({
                                                        target: {
                                                            name: 'country_id',
                                                            value: selectedOption?.value
                                                        }
                                                    }, 1);
                                                }}
                                                placeholder="Select Country"
                                                isClearable
                                            /> */}
                                            <Select
                                                options={correspondenceCountry?.map(c => ({ value: c.id, label: c.name }))}
                                                value={correspondenceCountry?.find(c => c.id === studentBasicFormAddress[0]?.country_id) ? {
                                                    value: studentBasicFormAddress[0]?.country_id,
                                                    label: correspondenceCountry.find(c => c.id === studentBasicFormAddress[0]?.country_id)?.name
                                                } : null}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label className='form-labell'>State<span className='astrisk'>*</span></label>
                                            <Select
                                                classNamePrefix="react-select"
                                                options={correspondenceState?.map(state => ({
                                                    value: state.id,
                                                    label: state.name
                                                }))}
                                                value={correspondenceState?.find(item => item.id === studentBasicFormAddress[0]?.state_id) ? {
                                                    value: studentBasicFormAddress[0]?.state_id,
                                                    label: correspondenceState.find(item => item.id === studentBasicFormAddress[0]?.state_id)?.name
                                                } : null}
                                                onChange={(selectedOption) => {
                                                    handleAddressChange({
                                                        target: {
                                                            name: 'state_id',
                                                            value: selectedOption?.value
                                                        }
                                                    }, 1);
                                                }}
                                                placeholder="Select State"
                                                isClearable
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label className='form-labell'>City<span className='astrisk'>*</span></label>
                                            <Select
                                                classNamePrefix="react-select"
                                                options={correspondenceCity?.map(city => ({
                                                    value: city.id,
                                                    label: city.name
                                                }))}
                                                value={correspondenceCity?.find(item => item.id === studentBasicFormAddress[0]?.city_id) ? {
                                                    value: studentBasicFormAddress[0]?.city_id,
                                                    label: correspondenceCity.find(item => item.id === studentBasicFormAddress[0]?.city_id)?.name
                                                } : null}
                                                onChange={(selectedOption) => {
                                                    handleAddressChange({
                                                        target: {
                                                            name: 'city_id',
                                                            value: selectedOption?.value
                                                        }
                                                    }, 1);
                                                }}
                                                placeholder="Select City"
                                                isClearable
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <label className='form-labell'>Pin Code<span className='astrisk'>*</span></label>
                                            <input type="number" className='fm-modal form-control' placeholder="Enter Pin Code " value={studentBasicFormAddress[0]?.pincode} name='pincode'
                                                // onChange={(e) => handleAddressChange(e, 1)}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (/^\d{0,6}$/.test(val)) {
                                                        handleAddressChange(e, 1);
                                                    }
                                                }}
                                            />
                                        </div>



                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <h4 className='fm-pr-hd'>PERMANENT ADDRESS</h4>
                                        <p>Same as Correspondence Address <input type='Checkbox' id="sameAddress" onChange={handleAddressSame}></input></p>
                                    </div>
                                    <fieldset id="correspondenceAddress">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label className='form-labell'>Address<span className='astrisk'>*</span></label>
                                                <input type="text" className='fm-modal form-control' value={studentBasicFormAddress[1]?.address} placeholder="Enter Address " name='address' onChange={(e) => handleAddressChange(e, 2)}
                                                    isDisabled={isSameAddressChecked}
                                                    maxLength={100} />
                                            </div>
                                        </div>
                                        <div className="row">

                                            {/* <div className="col-md-3">
                                                <label className='form-labell'>Country<span className='astrisk'>*</span></label>
                                                <select className='fm-modal form-control form-select' value={studentBasicFormAddress[1]?.country_id} name='country_id' onChange={(e) => handleAddressChange(e, 2)}>
                                                    <option value="">Select Country</option>
                                                    {
                                                        permanentCountry && permanentCountry.map((val, ind) => {
                                                            return (
                                                                <option value={val.id} key={ind}>{val.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <label className='form-labell'>State<span className='astrisk'>*</span></label>
                                                <select className='fm-modal form-control form-select' value={studentBasicFormAddress[1]?.state_id} name='state_id' onChange={(e) => handleAddressChange(e, 2)}>
                                                    <option value="">Select State</option>
                                                    {
                                                        permanentState && permanentState.map((val, ind) => {
                                                            return (
                                                                <option value={val.id} key={ind}>{val.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-3">
                                                <label className='form-labell'>City<span className='astrisk'>*</span></label>
                                                <select className='fm-modal form-control form-select' value={studentBasicFormAddress[1]?.city_id} name='city_id' onChange={(e) => handleAddressChange(e, 2)} >
                                                    <option value="">Select City</option>
                                                    {
                                                        permanentCity && permanentCity.map((val, ind) => {
                                                            return (
                                                                <option value={val.id} key={ind}>{val.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div> */}
                                            <div className="col-md-3">
                                                <label className='form-labell'>Country<span className='astrisk'>*</span></label>
                                                {/* <Select
                                                    classNamePrefix="react-select"
                                                    options={permanentCountry?.map(val => ({ value: val.id, label: val.name }))}
                                                    value={
                                                        permanentCountry?.find(c => c.id === studentBasicFormAddress[1]?.country_id)
                                                            ? {
                                                                value: studentBasicFormAddress[1]?.country_id,
                                                                label: permanentCountry.find(c => c.id === studentBasicFormAddress[1]?.country_id)?.name
                                                            }
                                                            : null
                                                    }
                                                    onChange={(selectedOption) =>
                                                        handleAddressChange({
                                                            target: { name: 'country_id', value: selectedOption?.value }
                                                        }, 2)
                                                    }
                                                    isDisabled={isSameAddressChecked}
                                                    placeholder="Select Country"
                                                    isClearable
                                                /> */}
                                                <Select
                                                    options={permanentCountry?.map(c => ({ value: c.id, label: c.name }))}
                                                    isDisabled={isSameAddressChecked}
                                                    value={permanentCountry?.find(c => c.id === studentBasicFormAddress[1]?.country_id) ? {
                                                        value: studentBasicFormAddress[1]?.country_id,
                                                        label: permanentCountry.find(c => c.id === studentBasicFormAddress[1]?.country_id)?.name
                                                    } : null}
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <label className='form-labell'>State<span className='astrisk'>*</span></label>
                                                <Select
                                                    classNamePrefix="react-select"
                                                    options={permanentState?.map(val => ({ value: val.id, label: val.name }))}
                                                    value={
                                                        permanentState?.find(s => s.id === studentBasicFormAddress[1]?.state_id)
                                                            ? {
                                                                value: studentBasicFormAddress[1]?.state_id,
                                                                label: permanentState.find(s => s.id === studentBasicFormAddress[1]?.state_id)?.name
                                                            }
                                                            : null
                                                    }
                                                    onChange={(selectedOption) =>
                                                        handleAddressChange({
                                                            target: { name: 'state_id', value: selectedOption?.value }
                                                        }, 2)
                                                    }
                                                    isDisabled={isSameAddressChecked}
                                                    placeholder="Select State"
                                                    isClearable
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <label className='form-labell'>City<span className='astrisk'>*</span></label>
                                                <Select
                                                    classNamePrefix="react-select"
                                                    options={permanentCity?.map(val => ({ value: val.id, label: val.name }))}
                                                    value={
                                                        permanentCity?.find(c => c.id === studentBasicFormAddress[1]?.city_id)
                                                            ? {
                                                                value: studentBasicFormAddress[1]?.city_id,
                                                                label: permanentCity.find(c => c.id === studentBasicFormAddress[1]?.city_id)?.name
                                                            }
                                                            : null
                                                    }
                                                    onChange={(selectedOption) =>
                                                        handleAddressChange({
                                                            target: { name: 'city_id', value: selectedOption?.value }
                                                        }, 2)
                                                    }
                                                    placeholder="Select City"
                                                    isDisabled={isSameAddressChecked}
                                                    isClearable
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <label className='form-labell'>Pin Code<span className='astrisk'>*</span></label>
                                                <input type="number" className='fm-modal form-control' value={studentBasicFormAddress[1]?.pincode} placeholder="Enter Pin Code " name='pincode'
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        if (/^\d{0,6}$/.test(val)) {
                                                            handleAddressChange(e, 2);
                                                        }
                                                    }} />
                                            </div>



                                        </div>
                                    </fieldset>

                                </div>
                            )}
                        </div>

                        {/* Repeat the above structure for other sections like Contact Details, Academic Details, etc. */}
                        <div style={isTableVisible.academicDetails === true ? { background: '#f9f9f9', padding: "16px 10px", border: "2px solid #7F56DA", borderRadius: '8px' } : { background: '#f9f9f9', padding: "16px 10px" }}>
                            <div className="row" style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                                <div className="col-md-3">
                                    <p style={{ fontSize: "25px", fontWeight: '600', color: '#222F3E', textAlign: 'left' }}>Academic Details</p>
                                </div>
                                <div className="col-md-1" style={{ textAlign: 'right' }}>
                                    <img
                                        src={arrowup}
                                        // onClick={() => toggleSectionVisibility('academicDetails')}
                                        style={{
                                            transform: isTableVisible.academicDetails ? "rotate(180deg)" : "rotate(0deg)",
                                            transition: "transform 0.3s ease",
                                            cursor: 'pointer'
                                        }}
                                        alt="Toggle arrow"
                                    />
                                </div>
                            </div>
                            {isTableVisible.academicDetails && (
                                <div style={{ transition: "max-height 0.5s ease", padding: "0 10px" }}>
                                    <form className="">
                                        <div>
                                            <h4 className='fm-pr-hd'>PREVIOUS EDUCATIONAL DETAILS</h4>
                                        </div>
                                        {acadmicDetails && acadmicDetails.map((val, index) => {
                                            return (<>
                                                <div className="row" >
                                                    <div className="col-md-4">
                                                        <label className='form-labell'>Qualification</label>
                                                        <select className='fm-modal form-control form-select' value={val.qualification_type} onChange={(e) => { handleAcademicChange(e, index) }} name='qualification_type' style={{ marginTop: "3px" }}>
                                                            <option value="">Select </option>

                                                            {qualificationType && qualificationType.map((value, index) => {
                                                                // <option value={value} key={index}>{value}</option>
                                                                let displayValue = value;
                                                                if (value === 'HSC') displayValue = 'HSC (Intermediate)';
                                                                if (value === 'SSC') displayValue = 'SSC (HighSchool)';

                                                                return (
                                                                    <option value={value} key={index}>{displayValue}</option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className='form-labell'>Course/Program<span className='astrisk'>*</span><small style={{ fontWeight: '10px' }}> (for eg: Highschool/Intermediate/BSC(IT))</small></label>
                                                        <input type="text" className='fm-modal form-control' value={val.course_name} onChange={(e) => { handleAcademicChange(e, index) }} name='course_name' placeholder="Enter Course/Program" />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label className='form-labell'>Name of the Institution<span className='astrisk'>*</span></label>
                                                        <input type="text" className='fm-modal form-control' onChange={(e) => { handleAcademicChange(e, index) }} name='college' value={val.college} placeholder="Enter Name of the Institution" />
                                                    </div>
                                                </div>
                                                <div className="row" >
                                                    <div className="col-md-6">
                                                        <label className='form-labell'>Board/University<span className='astrisk'>*</span></label>
                                                        <input type="text" className='fm-modal form-control' value={val.board} onChange={(e) => { handleAcademicChange(e, index) }} name='board' placeholder="Enter Board/University" />
                                                    </div>
                                                    {/* <div className="col-md-6">
                                                <label className='form-labell'>Subjects Taken<span className='astrisk'>*</span></label>
                                                <Select
                                                    id='Subjects'
                                                    isMulti
                                                    name="subjects"
                                                    options={options}
                                                    value={selectedSubjects[index]}
                                                    onChange={(e) => handleChangesubject(e, index)}
                                                    closeMenuOnSelect={false}
                                                    // components={{ MultiValueRemove: customRemoveIcon }}
                                                    placeholder="Select Subjects"
                                                    // hideSelectedOptions={true} 
                                                    components={{
                                                        ValueContainer: CustomValueContainer, // Prevent rendering of selected tags inside the input
                                                    }}

                                                />
                                                <div className="selected-tags mt-3">
                                                    {selectedSubjects[index].map((subject, index) => (
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
                                                    <div className="col-md-6">
                                                        <label className='form-labell'>Subjects <small style={{ fontWeight: '10px' }}> (for eg: Hindi, English, Math)</small> <span className='astrisk'>*</span></label>
                                                        <input type="text" className='fm-modal form-control' value={val.qualifying_subjects} onChange={(e) => { handleAcademicChange(e, index) }} name="qualifying_subjects" placeholder="Enter Subjects" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {/* <div className="col-md-2">
                                                <label className='form-labell'>Year of Admission</label>
                                                <select className='fm-modal form-control form-select' value={val.year_of_admission} onChange={(e) => { handleAcademicChange(e, index) }} name='year_of_admission'>
                                                    <option value="">Select </option>

                                                    {Array.from({ length: (2025 - 1957 + 1) }, (_, i) => 1957 + i).map((year) => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <label className='form-labell'>Year of Passing</label>
                                                <select className='fm-modal form-control form-select' value={val.year_of_passing} onChange={(e) => { handleAcademicChange(e, index) }} name='year_of_passing'>
                                                    <option value="">Select </option>
                                                    {Array.from({ length: (2025 - 1957 + 1) }, (_, i) => 1957 + i).map((year) => (
                                                        <option key={year} value={year}>{year}</option>
                                                    ))}
                                                </select>
                                            </div> */}
                                                    <div className="col-md-2">
                                                        <label className='form-labell'>Year of Admission</label>
                                                        <select
                                                            className='fm-modal form-control form-select'
                                                            value={val.year_of_admission}
                                                            onChange={(e) => handleAcademicChange(e, index)}
                                                            name='year_of_admission'
                                                        >
                                                            <option value="">Select</option>
                                                            {Array.from({ length: 2025 - 1957 + 1 }, (_, i) => 2025 - i).map((year) => (
                                                                <option key={year} value={year}>{year}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <label className='form-labell'>Year of Passing</label>
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
                                                    <div className="col-md-2">
                                                        <label className='form-labell'>Percentage/Grade<span className='astrisk'>*</span></label>
                                                        <input type="text" className='fm-modal form-control' value={val.percentage} name='percentage' placeholder="Enter Percentage/Grade"
                                                            onChange={(e) => {
                                                                const input = e.target.value;
                                                                if (input.length <= 6) {
                                                                    handleAcademicChange(e, index);
                                                                }
                                                            }} />
                                                    </div>
                                                </div>

                                                <div className="col-md-5 input-group2" >
                                                    {index !== 0 && (
                                                        <p className='Removebtn pt-3' onClick={() => removeAcademicRow(index)}><img src={deletered}></img>Remove</p>
                                                    )}
                                                </div>
                                            </>
                                            )
                                        })}

                                        <div onClick={addMoreAcademicRow} style={{ cursor: 'pointer' }}>
                                            <h4 className='fm-pr-hd'>  <svg width="10" height="10" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="#7F56DA" />
                                            </svg> Add More</h4>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                        <div style={isTableVisible.uploadDocuments === true ? { background: '#f9f9f9', padding: "16px 10px", border: "2px solid #7F56DA", borderRadius: '8px' } : { background: '#f9f9f9', padding: "16px 10px" }}>
                            <div className="row" style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                                <div className="col-md-3">
                                    <p style={{ fontSize: "25px", fontWeight: '600', color: '#222F3E', textAlign: 'left' }}>Upload Documents</p>
                                </div>
                                <div className="col-md-1" style={{ textAlign: 'right' }}>
                                    <img
                                        src={arrowup}
                                        // onClick={() => toggleSectionVisibility('uploadDocuments')}
                                        style={{
                                            transform: isTableVisible.uploadDocuments ? "rotate(180deg)" : "rotate(0deg)",
                                            transition: "transform 0.3s ease",
                                            cursor: 'pointer'
                                        }}
                                        alt="Toggle arrow"
                                    />
                                </div>
                            </div>
                            {isTableVisible.uploadDocuments && (
                                <div style={{ transition: "max-height 0.5s ease", padding: "0 10px" }}>
                                    <div>
                                        <h4 className='fm-pr-hd'>ACADEMIC DOCUMENTS</h4>
                                    </div>

                                    {/* High School File Upload */}
                                    <div>
                                        <label className='form-labell'><strong>Self-attested copy of the high school mark sheet</strong><span className='astrisk'>*</span></label>
                                        <div className="file-upload-container cus-cont">
                                            <div className="upload-btn-container">
                                                <input
                                                    type="file"
                                                    id="high-school-upload"
                                                    className="file-upload-input"
                                                    accept=".pdf,image/*"
                                                    onChange={(e) => handleFileChange(e, 'highSchool')}
                                                />
                                                <label htmlFor="high-school-upload" className="upload-btn">
                                                    <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_747_3180)">
                                                            <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                                            <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_747_3180">
                                                                <rect width="16" height="16" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Upload File
                                                </label>
                                            </div>
                                            {highSchoolFile && (
                                                <div className="ms-3">
                                                    <div className="me-3">{highSchoolFile}    <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove('highSchool')}>
                                                        &times;
                                                    </span></div>

                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Intermediate File Upload */}
                                    <div>
                                        <label className='form-labell'><strong>Self-attested copy of the Intermediate mark sheet</strong><span className='astrisk'>*</span></label>
                                        <div className="file-upload-container cus-cont">
                                            <div className="upload-btn-container">
                                                <input
                                                    type="file"
                                                    accept=".pdf,image/*"
                                                    id="intermediate-upload"
                                                    className="file-upload-input"
                                                    onChange={(e) => handleFileChange(e, 'intermediate')}
                                                />
                                                <label htmlFor="intermediate-upload" className="upload-btn">
                                                    <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_747_3180)">
                                                            <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                                            <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_747_3180">
                                                                <rect width="16" height="16" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Upload File
                                                </label>
                                            </div>
                                            {intermediateFile && (
                                                <div className="ms-3">
                                                    <div className="me-3">{intermediateFile} <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove('intermediate')}>
                                                        &times;
                                                    </span></div>

                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Graduation File Upload */}
                                    <div>
                                        <label className='form-labell'><strong>Original character certificate issued by the last attended educational institution.</strong></label>
                                        <div className="file-upload-container cus-cont">
                                            <div className="upload-btn-container">
                                                <input
                                                    type="file"
                                                    accept=".pdf,image/*"
                                                    id="graduation-upload"
                                                    className="file-upload-input"
                                                    onChange={(e) => handleFileChange(e, 'character')}
                                                />
                                                <label htmlFor="graduation-upload" className="upload-btn">
                                                    <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_747_3180)">
                                                            <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                                            <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_747_3180">
                                                                <rect width="16" height="16" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Upload File
                                                </label>
                                            </div>
                                            {characterFile && (
                                                <div className="ms-3">
                                                    <div className="me-3">{characterFile}  <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove('character')}>
                                                        &times;
                                                    </span></div>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className='form-labell'><strong>Original Migration Certificate.</strong></label>
                                        <div className="file-upload-container cus-cont">
                                            <div className="upload-btn-container">
                                                <input
                                                    type="file"
                                                    accept=".pdf,image/*"
                                                    id="migration-upload"
                                                    className="file-upload-input"
                                                    onChange={(e) => handleFileChange(e, 'migration')}
                                                />
                                                <label htmlFor="migration-upload" className="upload-btn">
                                                    <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_747_3180)">
                                                            <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                                            <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_747_3180">
                                                                <rect width="16" height="16" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Upload File
                                                </label>
                                            </div>
                                            {migrationfile && (
                                                <div className="ms-3">
                                                    <div className="me-3">{migrationfile}  <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove('migration')}>
                                                        &times;
                                                    </span></div>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className='form-labell'><strong>Certificate of being a member of Scheduled Caste / Scheduled Tribe / Other Backward Class/ EWS/ Others (if applicable)</strong></label>
                                        <div className="file-upload-container cus-cont">
                                            <div className="upload-btn-container">
                                                <input
                                                    type="file"
                                                    accept=".pdf,image/*"
                                                    id="scst-upload"
                                                    className="file-upload-input"
                                                    onChange={(e) => handleFileChange(e, 'scst')}
                                                />
                                                <label htmlFor="scst-upload" className="upload-btn">
                                                    <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_747_3180)">
                                                            <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                                            <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_747_3180">
                                                                <rect width="16" height="16" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Upload File
                                                </label>
                                            </div>
                                            {scstFile && (
                                                <div className="ms-3">
                                                    <div className="me-3">{scstFile}  <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove('scst')}>
                                                        &times;
                                                    </span></div>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className='form-labell'><strong>Self-attested copy of Aadhaar card.</strong><span className='astrisk'>*</span></label>
                                        <div className="file-upload-container cus-cont">
                                            <div className="upload-btn-container">
                                                <input
                                                    type="file"
                                                    accept=".pdf,image/*"
                                                    id="aadhar-upload"
                                                    className="file-upload-input"
                                                    onChange={(e) => handleFileChange(e, 'aadhar')}
                                                />
                                                <label htmlFor="aadhar-upload" className="upload-btn">
                                                    <svg style={{ marginRight: '5px' }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_747_3180)">
                                                            <path d="M14.75 9.77051V14.1143C14.75 14.4589 14.4696 14.7393 14.125 14.7393H1.875C1.53038 14.7393 1.25 14.4589 1.25 14.1143V9.77051H0V14.1143C0 15.1481 0.841125 15.9893 1.875 15.9893H14.125C15.1589 15.9893 16 15.1481 16 14.1143V9.77051H14.75Z" fill="#7F56DA" />
                                                            <path d="M8.00009 0.0107422L4.11621 3.89462L5.00009 4.77849L7.37509 2.40349V12.1446H8.62509V2.40349L11.0001 4.77849L11.884 3.89462L8.00009 0.0107422Z" fill="#7F56DA" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_747_3180">
                                                                <rect width="16" height="16" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    Upload File
                                                </label>
                                            </div>
                                            {aadharfile && (
                                                <div className="ms-3">
                                                    <div className="me-3">{aadharfile}  <span className="remove-tag" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleFileRemove('aadhar')}>
                                                        &times;
                                                    </span></div>

                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: '10px', padding: '16px 10px', borderRadius: '8px' }}>
                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="col-md-12" style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="checkbox" style={{ marginRight: '10px' }}
                                    checked={isDeclarationChecked}
                                    onChange={(e) => setIsDeclarationChecked(e.target.checked)}
                                />
                                <p style={{ fontSize: '14px', color: '#222F3E', lineHeight: '1.5', textAlign: 'left', color: '#6B778C' }}>
                                    Admission to the institute is subject to the availability of seats, physical verification of original documents, and the sole discretion of the management. The institution reserves the right to accept or reject any application without prior notice. Submission of an application does not guarantee admission. Candidates must fulfill all eligibility criteria and provide authentic documents during the verification process. Any false information or misrepresentation may lead to cancellation of admission. The management's decision regarding admissions shall be final and binding.
                                </p>
                            </div>
                        </div>

                        {/* CAPTCHA */}


                        {/* Action Buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center' }}>
                            <button
                                type="button"
                                onClick={handlePreviousSection}
                                style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
                            >
                                <img src={/* your back arrow icon */ next} alt="Back" style={{ transform: "rotate(180deg)" }} />
                                Back
                            </button>

                            {/* <div className="row">
                        <div className="col-md-6">
                            <div style={{ textAlign: 'center' }}>
                                <div className="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
                            </div>
                        </div>
                    </div> */}
                            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                {/* <p style={{ cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: 'red', margin: 0 }} onClick={handleSaveDraft}><img src={savedraft}></img>Save to Draft</p> */}

                                <button
                                    type="button"
                                    onClick={() => { handleNextSection() }}
                                    style={{ display: 'flex', alignItems: 'center', gap: "10px" }}
                                    disabled={upyes}

                                >
                                    {getButtonLabel()} <img src={next} alt="next" />
                                </button>

                            </div>
                        </div>
                    </div>

                    {showCamera && (
                        <div className="camera-modal">
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                            />
                            <button onClick={capture}>Take Photo</button> &nbsp;
                            <button onClick={() => setShowCamera(false)}>Cancel</button>
                        </div>
                    )}
                    {isModalOpen ? <ShareLinkModal setsharemobno={setsharemobno} handleChangesharelink={handleChangesharelink} handlesharelink={handlesharelink} setIsModalOpen={setIsModalOpen} /> : ''}
                    {sentmodal ? <FormLinkSentModal /> : ''}



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
                    {/* Provisional Admission Modal */}
                    {provisional_admission_confirmed && (
                        <div className="modal-overlay">
                            <div className="modal-content mc-cus">
                                {/* <h3>Provisional Admission</h3> */}
                                <p>
                                    You have successfully registered for provisional admission. Your application is currently under review.
                                    You will receive an email notification once your admission is confirmed.
                                </p>
                                {/* <button onClick={() => {
                            setprovisional_admission_confirmed(false);
                            window.location.href = "https://bite.sortstring.com";
                        }}>
                            OK
                        </button> */}
                            </div>
                        </div>
                    )}

                    {/* Permanent Admission Modal */}
                    {permanent_admission_confirmed && (
                        <div className="modal-overlay">
                            <div className="modal-content mc-cus" >
                                {/* <h3>Admission Confirmed</h3> */}
                                <p>
                                    Your admission has been confirmed. Please check your email and log in to the student application for further details.
                                </p>
                                {/* <button onClick={() => {
                            setpermanent_admission_confirmed(false);
                            window.location.href = "https://bite.sortstring.com";
                        }}>
                            OK
                        </button> */}
                            </div>
                        </div>
                    )}
                </div>
            )
            }
        </>
    );
};
