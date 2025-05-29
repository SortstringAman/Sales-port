import { useEffect, useRef, useState } from 'react'
import close from '../../../assets/icons/close.svg';
import search from '../../../assets/icons/iconamoon_search-light.svg';
import imagePlaceholder from '../../../assets/Images/image 17.png';
import add from '../../../assets/icons/add.svg';
import deletered from '../../../assets/icons/deletered.svg';
import previous from '../../../assets/icons/previous.svg';
import next from '../../../assets/icons/icon.svg';
import savedraft from '../../../assets/icons/savedraft.svg'
import { getData, Postdata, Postdataform, updateData, UpdateDataForm } from '../../../API/GlobalApi';
import { validateEmail } from '../../../Utils/ValidationService';
import Webcam from 'react-webcam';
import checked from '../../../assets/icons/checked.png';

export const BasicDetails = ({ onClose, currentStep, setCurrentStep, handlePrev, handleNext, steps, orgform, setorgform, getbasicmaster, isEditMode, basicdata, mainnamehead, registrationnumforhead }) => {
    const [studentId, setStudentId] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isOtpFilled, setIsOtpFilled] = useState(false);
    const [getotpdisp, setgetotpdisp] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [timerRunning, setTimerRunning] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
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
    const [permanentCountry, setPermanentCountry] = useState([])
    const [correspondenceCountry, setCorrespondenceCountry] = useState([])
    const [permanentState, setPermanentState] = useState([])
    const [correspondenceState, setCorrespondenceState] = useState([])
    const [permanentCity, setPermanentCity] = useState([])
    const [correspondenceCity, setCorrespondenceCity] = useState([])

    const [showCamera, setShowCamera] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const webcamRef = useRef(null);

    const [studentBasicForm, setStudentBasicForm] = useState({
        "registration_number": "",
        "course_id": "",
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
        "privilege_category_id": "",
        "category_id": 0,
        "aadhar_number": "",
        "email": "",
        "contact_numbers": [],
        "addresses": [],
        "profile_picture": ""
    })

    const [studentBasicFormMobileNumber, setStudentBasicFormMobileNumber] = useState([
        {
            "contact_type": "",
            "country_code": "91",
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
            "city_id": 0,
            "state_id": 0,
            "country_id": 0,
            "pincode": ""
        },
        {
            "address_type": "Permanent",
            "address": "",
            "address_line_2": "",
            "city_id": 0,
            "state_id": 0,
            "country_id": 0,
            "pincode": ""
        }
    ])
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    const [toastMessage, setToastMessage] = useState('');
    const displayToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
        // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setTimeout(() => setShowToast(false), 3000);
    };

    const fileInputRef = useRef(null);

    const videoConstraints = {
        width: 300,
        height: 300,
        facingMode: "environment" // use "user" for front camera
    };
    const getcountry = async (val = 0) => {
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

    const getStateold = async (countryId) => {
        const url = `administration/countries/${countryId}/states/`;
        const response = await getData(url);
        setStateData(response.state_list)
    }
    const getCityold = async (countryId, stateId) => {
        const url = `administration/countries/${countryId}/states/${stateId}/cities/`;
        const response = await getData(url);
        setCityData(response.city_list)
    }
    const getMasterData = async () => {
        const url = "students/student-onboarding-basic-details/get-master-data/";
        const response = await getData(url);
        console.log("response", response)
        setStudentPrivilegeCategories(response.master.student_privilege_categories)
        setStudentCategories(response.master.student_categories)
        setSalutations(response.master.salutation)
        setGenders(response.master.gender)
        setBloodGroups(response.master.blood_group)
        setContactNumberTypes(response.master.contact_number_types)
        setAddressTypes(response.master.address_types)
        setCourses(response.master.courses)

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
    const handleBasicInfoChange = (e) => {
        const { name, value } = e.target;
        if (name === "profile_picture") {
            setStudentBasicForm((prev) => ({ ...prev, [name]: e.target.files[0] }));
        }
        else {
            setStudentBasicForm((prev) => ({ ...prev, [name]: value }));
        }
    }
    const handleContactChange = (e, index) => {
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

    const addContactRow = () => {
        setStudentBasicFormMobileNumber([...studentBasicFormMobileNumber,
        {
            "contact_type": "",
            "country_code": "91",
            "area_code": "",
            "number": "",
            "is_primary": false,
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
                    is_primary: false,
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
    const handleAddressSameold = () => {

        if (document.getElementById("sameAddress").checked === true) {
            document.getElementById("correspondenceAddress").disabled = true;
            setStudentBasicFormAddress([studentBasicFormAddress[0], studentBasicFormAddress[0]])
        }
        else {
            document.getElementById("correspondenceAddress").disabled = false;
            setStudentBasicFormAddress([studentBasicFormAddress[0], {
                "address_type": "",
                "address": "",
                "address_line_2": "",
                "city_id": 0,
                "state_id": 0,
                "country_id": 0,
                "pincode": ""
            }])
        }
    }
    const handleAddressSame = () => {
        const isChecked = document.getElementById("sameAddress").checked;

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
    const submitEmployeeImage = async () => {
        const apiUrl = "staff/upload-file/";
        const token = localStorage.getItem('token');
        let formData = new FormData();

        if (studentBasicForm.profile_picture) {
            formData.append("file", studentBasicForm.profile_picture);
        } else if (capturedPhoto) {
            const blob = await fetch(capturedPhoto).then(res => res.blob());
            const file = new File([blob], "captured-photo.jpg", { type: "image/jpeg" });
            formData.append("file", file);
        } else {
            alert("Please upload or capture an image before submitting.");
            return null;
        }

        try {


            // const response = await fetch(apiUrl, {
            //     method: "POST",
            //     body: formData,
            //     headers: {
            //         ...(token && { 'Authorization': `Token ${token}` }),
            //     },
            // });
            const response = await Postdataform(apiUrl,formData)

            // if (!response.ok) throw new Error("Upload failed");

            // const result = await response.json();
            console.log("✅ Uploaded image URL:", response);
            return response.file_url; // Return URL instead of setting state

        } catch (error) {
            console.error("❌ Error uploading image:", error);
            return null;
        }
    };
    const handleSaveBasicInfo = async () => {
        if (!phoneNumber) {
            displayToast("Please verify your mobile number.", "danger");
            return false;
        }
        const url = "students/student-onboarding-basic-details/";
        try {
            let tempAddress = studentBasicFormAddress
            // tempAddress[0].address_type = "Current"
            // tempAddress[1].address_type = "Permanent"
            console.log("studentBasicForm", studentBasicForm.category_id > 0)
            if (studentBasicForm.first_name.length > 0 && studentBasicForm.gender.length > 0 && studentBasicForm.date_of_birth.length > 0
                && studentBasicForm.nationality.length > 0 && studentBasicForm.category_id > 0 && studentBasicForm.email.length > 0
                && studentBasicForm.father_name.length > 0 && studentBasicForm.mother_name.length > 0 && studentBasicFormMobileNumber[0].number.length === 10

                && studentBasicFormAddress[0].address.length > 0 && studentBasicFormAddress[1].address.length > 0
                && validateEmail(studentBasicForm.email)) {
                let basicInfoForm = {
                    ...studentBasicForm,
                    // registration_number: phoneNumber,
                    contact_numbers: [...studentBasicFormMobileNumber],
                    addresses: [tempAddress[0], tempAddress[1]]
                }
                // const formData = new FormData();
                // for (const key in basicInfoForm) {
                //     if (
                //         key === "contact_numbers" ||
                //         key === "addresses"
                //     ) {
                //         // Convert nested arrays to JSON strings
                //         formData.append(key, JSON.stringify(basicInfoForm[key]));
                //     } else if (key === "profile_picture") {
                //         // If it's a File (e.g., from input type="file")
                //         // formData.append('profile_picture', fileInput.files[0]);

                //         // If it's just a string (like base64 or URL), send as-is
                //         formData.append("profile_picture", basicInfoForm[key]);
                //     } else {
                //         formData.append(key, basicInfoForm[key]);
                //     }
                // }
                console.log('profilenotupdate', basicInfoForm.profile_picture)
                const otpverified = sessionStorage.getItem('otpverified')
                if (!otpverified) {
                    const imageResponse = await submitEmployeeImage()
                    if (imageResponse) {

                        basicInfoForm.profile_picture = imageResponse
                        const response = await Postdata(url, basicInfoForm)
                        console.log("responsevdfvfdvd", response)
                        if (response.student) {
                            setStudentId(response.user_id);
                            displayToast('Basic Info Added successfully!', 'success');
                            console.log("save successfully")
                            return true
                        }
                        else {
                            console.log("save error");
                            displayToast(response.error, 'danger');
                            return false
                        }
                    }
                    else {
                        // alert("Something Went Wrong!!");
                        displayToast("Something Went Wrong!!", 'danger');
                    }
                }
                else {
                    const url2 = `students/student-onboarding-basic-details/${studentId}/`;
                    // basicInfoForm.profile_picture = imageResponse
                    const response = await updateData(url2, basicInfoForm)
                    console.log("responsevdfvfdvd", response)
                    if (response.student) {
                        setStudentId(response.user_id);
                        displayToast('Basic Info Added successfully!', 'success');
                        console.log("save successfully");
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        return true
                    }
                    else {
                        console.log("save error");
                        displayToast(response.error, 'danger');
                        return false
                    }
                }


            }
            else {
                // alert("Please Fill All Required Fields!!");
                displayToast("Please Fill All Required Fields!!", 'danger');
            }
        }
        catch (error) {
            alert(error.message);
            displayToast(error.message, 'danger');
        }

    }
    const handleUpdateBasicInfo = async () => {
        const url = `students/student-onboarding-basic-details/${studentId}/`;
        let tempAddress = studentBasicFormAddress;
        console.log("tempAddress---", tempAddress)
        if (!phoneNumber && !isEditMode) {
            displayToast("Please verify your mobile number.", "danger");
            return false;
        }

        if (Array.isArray(tempAddress) && tempAddress.length >= 2) {
            tempAddress[0].address_type = "Current";
            tempAddress[1].address_type = "Permanent";
        } else {
            // Fallback to default structure if tempAddress is invalid
            tempAddress = [
                {
                    address_type: "Current",
                    address: "",
                    address_line_2: "",
                    city_id: 0,
                    state_id: 0,
                    country_id: 0,
                    pincode: ""
                },
                {
                    address_type: "Permanent",
                    address: "",
                    address_line_2: "",
                    city_id: 0,
                    state_id: 0,
                    country_id: 0,
                    pincode: ""
                }
            ];
            setStudentBasicFormAddress(tempAddress); // Ensure state is synced too
        }
        const contactValid = studentBasicFormMobileNumber.every(
            (c) => c.number?.length === 10 && c.contact_type?.length > 0
        );
        let basicInfoForm = {
            ...studentBasicForm,
            registration_number: phoneNumber,
            contact_numbers: [...studentBasicFormMobileNumber],
            addresses: [tempAddress[0], tempAddress[1]]
        }
        console.log('Hiii update', basicInfoForm)
        if (
            studentBasicForm.first_name.length > 0 &&
            studentBasicForm.gender.length > 0 &&
            studentBasicForm.date_of_birth.length > 0 &&
            studentBasicForm.nationality.length > 0 &&
            studentBasicForm.category_id > 0 &&
            studentBasicForm.email.length > 0 &&
            studentBasicForm.father_name.length > 0 &&
            studentBasicForm.mother_name.length > 0 &&
            studentBasicFormMobileNumber[0].number.length === 10 &&
            studentBasicFormAddress[0].address.length > 0 &&
            studentBasicFormAddress[1].address.length > 0
            && validateEmail(studentBasicForm.email)
            
        ) {
            if(!contactValid){
                displayToast("Select type of Contact.", "danger");
                return false;
            }
            if (
                studentBasicFormAddress[0].pincode?.length !== 6 ||
                studentBasicFormAddress[1].pincode?.length !== 6
            ) {
                displayToast("Pincode must be exactly 6 digits.", "danger");
                return false;
            }
            // studentBasicForm.profile_picture = "";
            if (typeof studentBasicForm.profile_picture === 'string') {
                studentBasicForm.profile_picture = studentBasicForm.profile_picture;
            }
            let basicInfoForm = {
                ...studentBasicForm,
                // registration_number: phoneNumber,
                contact_numbers: [...studentBasicFormMobileNumber],
                addresses: [tempAddress[0], tempAddress[1]]
            }
            console.log("basicInfoFormupdate---", basicInfoForm)
            // const formData = new FormData();
            // for (const key in basicInfoForm) {
            //     if (
            //         key === "contact_numbers" ||
            //         key === "addresses"
            //     ) {
            //         // Convert nested arrays to JSON strings
            //         formData.append(key, JSON.stringify(basicInfoForm[key]));
            //     } else if (key === "profile_picture") {
            //         // If it's a File (e.g., from input type="file")
            //         // formData.append('profile_picture', fileInput.files[0]);

            //         // If it's just a string (like base64 or URL), send as-is
            //         formData.append("profile_picture", basicInfoForm[key]);
            //     } else {
            //         formData.append(key, basicInfoForm[key]);
            //     }
            // }
            if (typeof basicInfoForm.profile_picture === 'string') {
                console.log('profileupdate', basicInfoForm.profile_picture);
                console.log('lastdata', basicInfoForm);
                const response = await updateData(url, basicInfoForm)
                console.log("responsevdfvfdvd", response)
                try {
                    console.log("response.student", response.student)
                    if (response.user_id) {
                        setStudentId(response.user_id);
                        displayToast('Basic Info Updated successfully!', 'success');
                        await new Promise(resolve => setTimeout(resolve, 200));
                        console.log("save successfully")
                        return true
                    }
                    else {
                        displayToast(response.error, 'danger');
                        console.log("save error")
                        return false
                    }
                }
                catch (e) {
                    displayToast(e.message, 'danger');
                    console.log("", e.message)
                    return false
                }
            }
            else {
                console.log('profileupdateelse', basicInfoForm.profile_picture)
                const imageResponse = await submitEmployeeImage();
                const otpverified = sessionStorage.getItem('otpverified')

                if (imageResponse) {
                    basicInfoForm.profile_picture = imageResponse
                    console.log("basicInfoFormelseeeeeeee", basicInfoForm)
                    const response = await updateData(url, basicInfoForm)
                    console.log("responsevdfvfdvd", response)
                    try {

                        console.log("response.student", response.student)
                        if (response.user_id) {
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            displayToast('Basic Info Updated successfully!', 'success');
                            setStudentId(response.user_id)
                            console.log("save successfully")
                            return true
                        }
                        else {
                            displayToast("save error", 'danger');
                            console.log("save error")
                            return false
                        }
                    }
                    catch (e) {
                        displayToast(e.message, 'danger');
                        console.log("", e.message)
                        return false
                    }
                }
                else {
                    displayToast("Something Went Wrong!!", 'danger');
                    // alert("Something Went Wrong!!");
                }
            }
        }
        else {
            displayToast("Please Fill All Required Fields!!", 'danger');
            // alert("Please Fill All Required Fields!!")
        }

    }

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedPhoto(imageSrc);
        setShowCamera(false); // close camera
    };
    const otpInputs = useRef([]);

    const handleChangeVerifyMobileNo = (e) => {
        const value = e.target.value;
        setPhoneNumber(value.replace(/\D/g, ''));
    };

    const Getotp = async () => {
        const data = { mobile: phoneNumber };
        const url = "students/student-admission/send-otp/";
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
                            return 60;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
            else if (response.error) {
                // alert(response.error);
                displayToast(response.error, 'danger');
            }
        }
    };
    const handleResendOtp = () => {
        if (!timerRunning) {
            setTimerRunning(true);
            setCountdown(15);
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
    const handleSaveDraft = async () => {
        let resp = null;
        if (studentId === 0) {

            resp = await handleSaveBasicInfo()
        }
        else {
            resp = await handleUpdateBasicInfo()
        }
    };
    const handleSubmitVerifyOtp = async () => {
        const url = "students/student-admission/verify-otp/";
        const data = { mobile: phoneNumber, otp: otp.join('') };
        const response = await Postdata(url, data);

        if (!response.error) {
            setIsOtpVerified(true);
            setgetotpdisp(false);

            if (response.student) {
                let { addresses, contact_numbers, ...studentBasicData } = response.student;

                if (studentBasicData.first_name.length > 0) {
                    setStudentId(studentBasicData.user_id);

                    const privilegeId = studentBasicData.privilege_category?.id ?? '';
                    const middle_name = studentBasicData.middle_name == (null || "null" || "Null") ? '' : studentBasicData.middle_name;
                    const categoryId = studentBasicData.category?.id ?? '';
                    const courseId = studentBasicData.specialization?.id ?? '';
                    const propic = studentBasicData?.profile_picture;
                    console.log("propic---", propic)
                    studentBasicData.privilege_category = privilegeId;
                    studentBasicData.middle_name = middle_name;
                    studentBasicData.category = categoryId;
                    studentBasicData.course_id = courseId;

                    const sanitizedContacts = contact_numbers?.map((num) => ({
                        contact_type: num.contact_type || "Mobile",
                        country_code: num.country_code || "+91",
                        area_code: num.area_code || "",
                        number: num.number || "",
                        is_primary: num.is_primary ?? false,
                        is_available_on_whatsapp: num.is_available_on_whatsapp || false,
                        status: num.status !== false
                    }));
                    setPhoneNumber(contact_numbers[0].number);
                    setIsOtpVerified(true);
                    getcountry(addresses[0]?.country_id, 1);
                    getState(addresses[0]?.country_id, 1);
                    getCity(addresses[0]?.country_id, addresses[0]?.state_id, 1);

                    getcountry(addresses[1]?.country_id, 2);
                    getState(addresses[1]?.country_id, 2);
                    getCity(addresses[1]?.country_id, addresses[1]?.state_id, 2);

                    const transformedAddresses = addresses?.map(addr => ({
                        address_type: addr.address_type,
                        address: addr.address,
                        city_id: addr.city_id,
                        state_id: addr.state_id,
                        country_id: addr.country_id,
                        pincode: addr.pincode,
                        status: addr.status
                    }));

                    setStudentBasicForm(studentBasicData);
                    setStudentBasicFormMobileNumber(sanitizedContacts);
                    setStudentBasicFormAddress(transformedAddresses);

                    // 🧠 Set to sessionStorage too
                    sessionStorage.setItem('studentBasicForm', JSON.stringify(studentBasicData));
                    sessionStorage.setItem('profilepic', JSON.stringify(propic));
                    sessionStorage.setItem('studentBasicFormMobileNumber', JSON.stringify(sanitizedContacts));
                    sessionStorage.setItem('studentBasicFormAddress', JSON.stringify(transformedAddresses));
                    sessionStorage.setItem('studentid', JSON.stringify(studentBasicData.user_id));
                    sessionStorage.setItem('topphoneNumber', JSON.stringify(phoneNumber));
                    sessionStorage.setItem('otpverified', JSON.stringify(true));
                    // Store dropdown-related states after setting them



                    // Also store dropdowns if already available

                    sessionStorage.setItem('studentPrivilegeCategories', JSON.stringify(studentPrivilegeCategories));
                    sessionStorage.setItem('studentCategories', JSON.stringify(studentCategories));
                    sessionStorage.setItem('salutations', JSON.stringify(salutations));
                    sessionStorage.setItem('genders', JSON.stringify(genders));
                    sessionStorage.setItem('bloodGroups', JSON.stringify(bloodGroups));
                    sessionStorage.setItem('contactNumberTypes', JSON.stringify(contactNumberTypes));
                    // sessionStorage.setItem('addressTypes', JSON.stringify(addressTypes));
                    sessionStorage.setItem('courses', JSON.stringify(courses));

                    sessionStorage.setItem('correspondenceCountry', JSON.stringify(correspondenceCountry));
                    sessionStorage.setItem('permanentCountry', JSON.stringify(permanentCountry));
                    sessionStorage.setItem('correspondenceState', JSON.stringify(correspondenceState));
                    sessionStorage.setItem('permanentState', JSON.stringify(permanentState));
                    sessionStorage.setItem('correspondenceCity', JSON.stringify(correspondenceCity));
                    sessionStorage.setItem('permanentCity', JSON.stringify(permanentCity));
                } else {
                    setStudentId(studentBasicData.user_id);
                }
            }
        } else {
            displayToast(response.error, 'danger');
        }
    };
    const handleSaveData = async () => {
        let resp = null;
        if (studentId === 0) {

            resp = await handleSaveBasicInfo()
        }
        else {
            resp = await handleUpdateBasicInfo()
        }
        console.log("respcbsdjcj", resp)
        if (resp) {
            return true
        }
        else {
            return false
        }
    }
    const getProfileImageSrc = (img) => {
        if (img instanceof File) {
            return URL.createObjectURL(img);
        }
        if (typeof img === 'string' && img.startsWith('http')) {
            return img;
        }
        if (typeof img === 'string') {
            // return `https://bgi.sortstring.com/media/${img}`;
            return window.baseurl+`media/${img}`;
        }
        else {
            return imagePlaceholder
        }
        // fallback image
    };

    useEffect(() => {
        // getcountry();
        getMasterData();
        getcountry();
        getcountry(1);
        getcountry(2);
        // console.log('basicdet',basicdata);
        // getAcademicDetailsMaster();

    }, [])
    // useEffect(() => {
    //     if (isEditMode && basicdata) {
    //         const { addresses, contact_numbers, ...rest } = basicdata;

    //         // Sanitize and default nulls
    //         const safe = (v) => v || '';
    //         setStudentId(basicdata.user_id);

    //         // Handle form fields
    //         const updatedForm = {
    //             ...rest,
    //             salutation: safe(rest.salutation),
    //             first_name: safe(rest.first_name),
    //             middle_name: safe(rest.middle_name === null ? '' : rest.middle_name),
    //             last_name: safe(rest.last_name),
    //             gender: safe(rest.gender),
    //             date_of_birth: safe(rest.date_of_birth),
    //             nationality: safe(rest.nationality),
    //             blood_group: safe(rest.blood_group),
    //             email: safe(rest.email),
    //             father_name: safe(rest.father_name),
    //             mother_name: safe(rest.mother_name),
    //             privilege_category_id: rest.privilege_category_id || "",
    //             category_id: rest.category_id || 0,
    //             profile_picture: safe(rest.profile_picture),
    //             registration_number: safe(rest.registration_number),
    //             // course_id: rest.specialization?.id || 0,
    //         };

    //         setStudentBasicForm(updatedForm);

    //         // Set contact numbers
    //         if (contact_numbers && Array.isArray(contact_numbers)) {
    //             const sanitizedContacts = contact_numbers.map((c) => ({
    //                 contact_type: c.contact_type || '',
    //                 country_code: c.country_code || '91',
    //                 area_code: c.area_code || '',
    //                 number: c.number || '',
    //                 is_primary: c.is_primary || false,
    //                 is_available_on_whatsapp: c.is_available_on_whatsapp || false,
    //                 status: c.status || false
    //             }));
    //             setStudentBasicFormMobileNumber(sanitizedContacts);
    //         }

    //         // Set addresses
    //         const transformedAddresses = (addresses || []).map((addr) => ({
    //             address_type: addr.address_type || '',
    //             address: addr.address || '',
    //             address_line_2: addr.address_line_2 || '',
    //             city_id: addr.city_id || 0,
    //             state_id: addr.state_id || 0,
    //             country_id: addr.country_id || 0,
    //             pincode: addr.pincode || '',
    //             status: addr.status || false
    //         }));
    //         getcountry(addresses[0]||[]?.country_id, 1);
    //         getState(addresses[0]||[]?.country_id, 1);
    //         getCity(addresses[0]||[]?.country_id, addresses[0]?.state_id, 1);

    //         getcountry(addresses[1]||[]?.country_id, 2);
    //         getState(addresses[1]||[]?.country_id, 2);
    //         getCity(addresses[1]||[]?.country_id, addresses[1]?.state_id, 2);

    //         setStudentBasicFormAddress(transformedAddresses);

    //         // Preload dependent dropdowns
    //         // if (Array.isArray(addresses) && addresses.length >= 2) {
    //         //     getState(addresses[0].country_id);
    //         //     getCity(addresses[0].country_id, addresses[0].state_id);
    //         // }
    //     }
    // }, [isEditMode, basicdata]);
    useEffect(() => {
        if (isEditMode && basicdata) {
            const { addresses, contact_numbers, ...rest } = basicdata;

            const safe = (v) => v || '';
            setStudentId(basicdata.user_id);

            const updatedForm = {
                ...rest,
                salutation: safe(rest.salutation),
                first_name: safe(rest.first_name),
                middle_name: safe(rest.middle_name === null ? '' : rest.middle_name),
                last_name: safe(rest.last_name),
                gender: safe(rest.gender),
                date_of_birth: safe(rest.date_of_birth),
                nationality: safe(rest.nationality),
                blood_group: safe(rest.blood_group),
                email: safe(rest.email),
                father_name: safe(rest.father_name),
                mother_name: safe(rest.mother_name),
                privilege_category_id: rest.privilege_category_id || "",
                category_id: rest.category_id || 0,
                profile_picture: safe(rest.profile_picture),
                registration_number: safe(rest.registration_number),
            };

            setStudentBasicForm(updatedForm);

            if (contact_numbers && Array.isArray(contact_numbers)) {
                const sanitizedContacts = contact_numbers?.map((c) => ({
                    contact_type: c.contact_type || '',
                    country_code: c.country_code || '91',
                    area_code: c.area_code || '',
                    number: c.number || '',
                    is_primary: c.is_primary || false,
                    is_available_on_whatsapp: c.is_available_on_whatsapp || false,
                    status: c.status || false
                }));
                setStudentBasicFormMobileNumber(sanitizedContacts);
            }

            // ✅ SAFELY check addresses
            if (addresses && Array.isArray(addresses) && addresses?.length >= 2) {
                const transformedAddresses = addresses?.map((addr) => ({
                    address_type: addr.address_type || '',
                    address: addr.address || '',
                    address_line_2: addr.address_line_2 || '',
                    city_id: addr.city_id || 0,
                    state_id: addr.state_id || 0,
                    country_id: addr.country_id || 0,
                    pincode: addr.pincode || '',
                    status: addr.status || false
                }));

                setStudentBasicFormAddress(transformedAddresses);

                // ✅ Now safely load dropdowns
                if (addresses[0]?.country_id) {
                    getcountry(addresses[0].country_id, 1);
                    getState(addresses[0].country_id, 1);
                    getCity(addresses[0].country_id, addresses[0].state_id, 1);
                }

                if (addresses[1]?.country_id) {
                    getcountry(addresses[1].country_id, 2);
                    getState(addresses[1].country_id, 2);
                    getCity(addresses[1].country_id, addresses[1].state_id, 2);
                }
            } else {
                console.warn("Addresses are missing or incomplete");
            }
        }
    }, [isEditMode, basicdata]);

    useEffect(() => {
        const stuid = sessionStorage.getItem('studentid');
        const savedForm = sessionStorage.getItem('studentBasicForm');
        const savedMobile = sessionStorage.getItem('studentBasicFormMobileNumber');
        const savedAddress = sessionStorage.getItem('studentBasicFormAddress');
        const propic = sessionStorage.getItem('profilepic');

        const savedStudentPrivilegeCategories = sessionStorage.getItem('studentPrivilegeCategories');
        const savedStudentCategories = sessionStorage.getItem('studentCategories');
        const savedSalutations = sessionStorage.getItem('salutations');
        const savedGenders = sessionStorage.getItem('genders');
        const savedBloodGroups = sessionStorage.getItem('bloodGroups');
        const savedContactNumberTypes = sessionStorage.getItem('contactNumberTypes');

        const savedCorrespondenceCountry = JSON.parse(sessionStorage.getItem('correspondenceCountry'));
        const savedPermanentCountry = JSON.parse(sessionStorage.getItem('permanentCountry'));
        const savedCorrespondenceState = JSON.parse(sessionStorage.getItem('correspondenceState'));
        const savedPermanentState = JSON.parse(sessionStorage.getItem('permanentState'));
        const savedCorrespondenceCity = JSON.parse(sessionStorage.getItem('correspondenceCity'));
        const savedPermanentCity = JSON.parse(sessionStorage.getItem('permanentCity'));

        const topphoneNumber = sessionStorage.getItem('topphoneNumber');
        const otpverified = sessionStorage.getItem('otpverified');

        if (stuid) setStudentId(JSON.parse(stuid));
        if (savedForm) setStudentBasicForm(JSON.parse(savedForm));
        if (savedMobile) setStudentBasicFormMobileNumber(JSON.parse(savedMobile));
        if (savedAddress) setStudentBasicFormAddress(JSON.parse(savedAddress));
        if (topphoneNumber) setPhoneNumber(JSON.parse(topphoneNumber));
        if (otpverified) setIsOtpVerified(JSON.parse(otpverified));

        if (savedStudentPrivilegeCategories) setStudentPrivilegeCategories(JSON.parse(savedStudentPrivilegeCategories));
        if (savedStudentCategories) setStudentCategories(JSON.parse(savedStudentCategories));
        if (savedSalutations) setSalutations(JSON.parse(savedSalutations));
        if (savedGenders) setGenders(JSON.parse(savedGenders));
        if (savedBloodGroups) setBloodGroups(JSON.parse(savedBloodGroups));
        if (savedContactNumberTypes) setContactNumberTypes(JSON.parse(savedContactNumberTypes));

        // ✅ Restore & fetch dropdown data
        if (Array.isArray(savedCorrespondenceCountry)) {
            setCorrespondenceCountry(savedCorrespondenceCountry);
            const corrAddr = JSON.parse(savedAddress)?.[0];
            if (corrAddr?.country_id) {
                getState(corrAddr.country_id, 1);
                getCity(corrAddr.country_id, corrAddr.state_id, 1);
            }
        }
        if (Array.isArray(savedPermanentCountry)) {
            setPermanentCountry(savedPermanentCountry);
            const permAddr = JSON.parse(savedAddress)?.[1];
            if (permAddr?.country_id) {
                getState(permAddr.country_id, 2);
                getCity(permAddr.country_id, permAddr.state_id, 2);
            }
        }

        if (Array.isArray(savedCorrespondenceState)) setCorrespondenceState(savedCorrespondenceState);
        if (Array.isArray(savedPermanentState)) setPermanentState(savedPermanentState);
        if (Array.isArray(savedCorrespondenceCity)) setCorrespondenceCity(savedCorrespondenceCity);
        if (Array.isArray(savedPermanentCity)) setPermanentCity(savedPermanentCity);

    }, []);

    return (
        <>
            <div className="col-md-10" style={{ height: "77vh", overflowY: 'scroll' }}>
                <div style={{ position: 'sticky', top: 0, background: "#fff",paddingBottom:"25px" }}>
                    <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2 className='text-primary'>{mainnamehead} {registrationnumforhead?`(${registrationnumforhead})`:''}</h2>
                        <button className="close-btn p-0" onClick={() => { onClose(); setCurrentStep(0); clearsessiondata() }}><img src={close} style={{padding:"4px",background:'#F2F3F4',borderRadius:'50%'}}></img></button>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-12" >
                            <label className=' form-labell'>Application Number <span className='astrisk'>*</span> </label>
                            <div style={{ position: 'relative' }}>
                                <input className='form-control fm-modal' type="text" placeholder="Enter Application Number"
                                />
                                <img src={search} className="searchicon" style={{ top: "12px" }} ></img>
                            </div>
                        </div>
                    </div> */}


                    {/* Mobile Number and OTP */}

                </div>
                {!isEditMode ? <div className="mb-s">
                    <p>Verify your registered mobile number</p>


                    <div className="d-flex align-items-center justify-content-between">
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'end', width: '55%' }}>
                            <div>
                                <label className='form-labell'>Phone Number</label><span className='astrisk'>*</span>
                                <div className="" style={{ border: "1px solid #222F3E33", borderRadius: "6px", width: '100%', display: 'flex' }}>

                                    <select className="form-select code-select" style={{ backgroundColor: '#F9F9F9', border: 'none', padding: '10px', borderRadius: '6px 0 0 6px', width: '60px' }} disabled={isOtpVerified ? true : false}>
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+61">+61</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="form-control code-select"
                                        placeholder="Enter Mobile Number"
                                        value={phoneNumber}
                                        onChange={handleChangeVerifyMobileNo}
                                        maxLength="10"
                                        style={{ border: 'none', padding: '10px', borderRadius: '0 6px 6px 0', width: 'calc(100% - 40px)' }}
                                        disabled={isOtpVerified ? true : false}
                                    />
                                </div>
                            </div>
                            {/* <button className={`get-otp-btn ${phoneNumber.length === 10 ? 'enabled' : 'disabled'}`} disabled={phoneNumber.length !== 10} onClick={Getotp} style={{ width: '30%', marginBottom: "5px" }}>Get OTP</button> */}
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
                                                <span style={{ color: "#222F3E4D" }}>Resend OTP {countdown}</span>
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
                                            className={`get-otp-btn ${phoneNumber.length === 10 ? 'enabled' : 'disabled'}`}
                                            disabled={phoneNumber.length !== 10}
                                            onClick={Getotp}
                                            style={{ width: '30%', marginBottom: "5px" }}
                                        >
                                            Get OTP
                                        </button>
                                    )
                                )
                            }
                            {isOtpVerified ?
                                <div style={{ marginBottom: "15px", display: 'flex', alignItems: 'center' }}>
                                    <img src={checked} style={{ width: '20px', height: '20px', marginRight: '5px' }}></img>
                                    <span>Verified</span>
                                </div>
                                : ''
                            }

                        </div>

                        {
                            getotpdisp &&

                            <div style={{ display: 'flex', gap: '20px', alignItems: 'end' }}>
                                <div>
                                    <label className='form-labell'>Enter OTP</label><span className='astrisk'>*</span>
                                    <div className="otp-input-container" style={{ marginBottom: '0' }}>
                                        {otp?.map((digit, index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                value={digit}
                                                ref={(el) => otpInputs.current[index] = el}
                                                onChange={(e) => handleOtpChange(e, index)}
                                                maxLength="1"
                                                className="otp-input"
                                                style={{ width: '35px', textAlign: 'center', margin: '0 5px', borderRadius: '6px', border: '1px solid #222F3E33', fontSize: '15px', color: '#222F3E' }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button
                                    className={`get-otp-btn ${isOtpFilled ? 'enabled' : 'disabled'}`}
                                    disabled={!isOtpFilled}
                                    onClick={handleSubmitVerifyOtp}
                                    style={{ width: '100%', padding: '10px', backgroundColor: isOtpFilled ? '#7F56DA' : '#d3d3d3', color: 'white', border: 'none', borderRadius: '6px', cursor: isOtpFilled ? 'pointer' : 'not-allowed', marginBottom: '1px' }}
                                >
                                    Submit
                                </button>
                            </div>
                        }
                    </div>
                </div> : ''}

                <div style={{ transition: "max-height 0.5s ease", padding: "0 10px" }}>

                    <div>
                        <h4 className='fm-pr-hd mt-0'>PERSONAL DETAILS</h4>
                    </div>
                    <div className="">
                        <div className='row' style={{ justifyContent: 'space-between' }}>
                            <div className="col-md-3">
                                <label className='form-labell'>Salutation</label>
                                <select className='fm-modal form-control form-select' value={studentBasicForm.salutation} name='salutation' onChange={handleBasicInfoChange}>
                                    <option value="">Select Salutation</option>
                                    {
                                        salutations && salutations?.map((val, ind) => {
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
                                <input type="text" className='fm-modal form-control' placeholder="Enter Middle Name"
                                    value={studentBasicForm.middle_name === null ||
                                        studentBasicForm.middle_name === "null" ||
                                        studentBasicForm.middle_name === "Null"
                                        ? ""
                                        : studentBasicForm.middle_name}
                                    name='middle_name' onChange={handleBasicInfoChange} />
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>Last Name <span className='astrisk'>*</span></label>
                                <input type="text" className='fm-modal form-control' placeholder="Enter Last Name" value={studentBasicForm.last_name} name='last_name' onChange={handleBasicInfoChange} />
                            </div>

                        </div>
                    </div>

                    <div className="row" style={{ justifyContent: 'space-between' }}>
                        <div className="col-md-3">
                            <label className='form-labell'>Gender<span className='astrisk'>*</span></label>
                            <select className='fm-modal form-control form-select' value={studentBasicForm.gender} name='gender' onChange={handleBasicInfoChange}>
                                <option value="0">Select Gender</option>
                                {
                                    genders && genders?.map((val, ind) => {
                                        return (
                                            <option value={val} key={ind}>{val}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>Date of Birth<span className='astrisk'>*</span></label>
                            <input type="date" className='fm-modal form-control' value={studentBasicForm.date_of_birth} name='date_of_birth' onChange={handleBasicInfoChange} />
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>Nationality<span className='astrisk'>*</span></label>
                            {/* <select className='fm-modal form-control form-select' value={studentBasicForm.nationality} name='nationality' onChange={handleBasicInfoChange}>
                                <option value="0">Select Nationality</option>
                                {
                                    countrydata && countrydata?.map((val, ind) => {
                                        return (
                                            <option value={val.id} key={ind}>{val.name}</option>
                                        )
                                    })
                                }
                            </select> */}
                            <input type="text" className='fm-modal form-control' value={studentBasicForm.nationality} name='nationality' onChange={handleBasicInfoChange} placeholder='Enter Nationality' />
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell' >Blood Group</label>
                            <select className='fm-modal form-control form-select' value={studentBasicForm.blood_group} name='blood_group' onChange={handleBasicInfoChange} style={{ marginTop: '3px' }}>
                                <option value="">Select Blood Group</option>
                                {
                                    bloodGroups && bloodGroups?.map((val, ind) => {
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
                            <select className='fm-modal form-control form-select' value={studentBasicForm.privilege_category_id} name='privilege_category_id' onChange={handleBasicInfoChange} style={{ marginTop: '3px' }}>
                                <option value="">Select Privilage Category</option>
                                {
                                    studentPrivilegeCategories && studentPrivilegeCategories?.map((val, ind) => {
                                        return (
                                            <option value={val.id} key={ind}>{val.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>Cast Category<span className='astrisk'>*</span></label>
                            <select className='fm-modal form-control form-select' value={studentBasicForm.category_id} name='category_id' onChange={handleBasicInfoChange}>
                                <option value="0">Select Cast Category</option>
                                {
                                    studentCategories && studentCategories?.map((val, ind) => {
                                        return (
                                            <option value={val.id} key={ind}>{val.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className='form-labell'>Email<span className='astrisk'>*</span></label>
                            <input type="email" className='fm-modal form-control' placeholder="Enter Email " value={studentBasicForm.email} name='email' onChange={handleBasicInfoChange} />
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



                    <div className="row">
                        <div className="col-md-12" style={{ display: 'flex', alignItems: 'center', gap: "20px" }}>
                            {/* <img
                                src={
                                    studentBasicForm.profile_picture instanceof File
                                        ? URL.createObjectURL(studentBasicForm.profile_picture)
                                        : (studentBasicForm.profile_picture || imagePlaceholder)
                                }
                                style={{ width: '100px', height: '100px' }}
                            /> */}
                            {/* {console.log("Profile Picture Value:", studentBasicForm.profile_picture)} */}
                            <img src={getProfileImageSrc(studentBasicForm.profile_picture)} alt="student profile" style={{ width: '100px', height: '100px' }}
                                onError={(e) => e.target.src = imagePlaceholder} />
                            <div>
                                <button className='add-btn' onClick={() => setShowCamera(true)}><span style={{ marginRight: "5px" }}>
                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.39841 1.85273C5.61686 0.780916 6.57086 0.0224609 7.66314 0.0224609H10.337C11.4292 0.0224609 12.3824 0.780916 12.6017 1.85273C12.6259 1.97076 12.689 2.07722 12.781 2.15498C12.8731 2.23275 12.9886 2.2773 13.109 2.28146H13.136C14.2839 2.33219 15.1659 2.47292 15.9022 2.95646C16.3661 3.26082 16.7654 3.65192 17.0763 4.10928C17.4633 4.6771 17.6335 5.33001 17.7153 6.11873C17.7955 6.89028 17.7955 7.85655 17.7955 9.08055V9.1501C17.7955 10.3741 17.7955 11.3412 17.7153 12.1119C17.6335 12.9006 17.4633 13.5536 17.0763 14.1222C16.7637 14.5792 16.3649 14.9708 15.9022 15.275C15.327 15.6522 14.6668 15.8191 13.8666 15.8985C13.0828 15.977 12.1001 15.977 10.8516 15.977H7.1485C5.89995 15.977 4.91732 15.977 4.1335 15.8985C3.33332 15.8191 2.67304 15.653 2.09786 15.275C1.63513 14.9706 1.23631 14.5787 0.923772 14.1214C0.536772 13.5536 0.36659 12.9006 0.284772 12.1119C0.20459 11.3412 0.20459 10.3741 0.20459 9.1501V9.08055C0.20459 7.85655 0.20459 6.89028 0.284772 6.11873C0.36659 5.33001 0.536772 4.6771 0.923772 4.10928C1.23631 3.65197 1.63513 3.26009 2.09786 2.95564C2.83423 2.47292 3.71623 2.33219 4.86414 2.28228L4.87804 2.28146H4.89114C5.01154 2.2773 5.12704 2.23275 5.21905 2.15498C5.31106 2.07722 5.37424 1.97076 5.39841 1.85273ZM7.66314 1.24973C7.1395 1.24973 6.70014 1.61219 6.60114 2.09737C6.44159 2.88282 5.7445 3.50137 4.90586 3.50873C3.80295 3.55782 3.21223 3.69282 2.77041 3.98246C2.44268 4.1984 2.16007 4.47601 1.93832 4.79982C1.7125 5.13119 1.57668 5.55582 1.50468 6.24555C1.43268 6.94592 1.43186 7.84919 1.43186 9.11573C1.43186 10.3823 1.43186 11.2847 1.5055 11.9851C1.57668 12.6748 1.7125 13.0995 1.93914 13.4316C2.15841 13.754 2.44068 14.0322 2.77123 14.249C3.11241 14.4724 3.54932 14.6074 4.25541 14.6777C4.9705 14.7489 5.89177 14.7497 7.18204 14.7497H10.818C12.1075 14.7497 13.0288 14.7497 13.7447 14.6777C14.4508 14.6074 14.8877 14.4732 15.2289 14.249C15.5594 14.0322 15.8425 13.754 16.0618 13.4308C16.2876 13.0995 16.4234 12.6748 16.4954 11.9851C16.5674 11.2847 16.5682 10.3815 16.5682 9.11573C16.5682 7.85001 16.5682 6.94592 16.4946 6.24555C16.4234 5.55582 16.2876 5.13119 16.061 4.79982C15.8393 4.47571 15.5567 4.19782 15.2289 3.98164C14.7887 3.69283 14.198 3.55782 13.0934 3.50873C12.2556 3.50055 11.5585 2.88364 11.399 2.09737C11.3466 1.85541 11.2123 1.63894 11.0188 1.4845C10.8254 1.33007 10.5845 1.24715 10.337 1.24973H7.66314ZM9.00004 6.97701C8.51181 6.97701 8.04356 7.17096 7.69833 7.5162C7.35309 7.86143 7.15914 8.32968 7.15914 8.81792C7.15914 9.30616 7.35309 9.7744 7.69833 10.1196C8.04356 10.4649 8.51181 10.6588 9.00004 10.6588C9.48828 10.6588 9.95653 10.4649 10.3018 10.1196C10.647 9.7744 10.841 9.30616 10.841 8.81792C10.841 8.32968 10.647 7.86143 10.3018 7.5162C9.95653 7.17096 9.48828 6.97701 9.00004 6.97701ZM5.93186 8.81792C5.93186 8.00418 6.25512 7.22378 6.83051 6.64838C7.40591 6.07299 8.18631 5.74973 9.00004 5.74973C9.81378 5.74973 10.5942 6.07299 11.1696 6.64838C11.745 7.22378 12.0682 8.00418 12.0682 8.81792C12.0682 9.63165 11.745 10.4121 11.1696 10.9874C10.5942 11.5628 9.81378 11.8861 9.00004 11.8861C8.18631 11.8861 7.40591 11.5628 6.83051 10.9874C6.25512 10.4121 5.93186 9.63165 5.93186 8.81792ZM13.2955 6.36337C13.2955 6.20062 13.3602 6.04454 13.4752 5.92946C13.5903 5.81438 13.7464 5.74973 13.9091 5.74973H14.7273C14.8901 5.74973 15.0461 5.81438 15.1612 5.92946C15.2763 6.04454 15.341 6.20062 15.341 6.36337C15.341 6.52612 15.2763 6.6822 15.1612 6.79728C15.0461 6.91236 14.8901 6.97701 14.7273 6.97701H13.9091C13.7464 6.97701 13.5903 6.91236 13.4752 6.79728C13.3602 6.6822 13.2955 6.52612 13.2955 6.36337Z" fill="white" />
                                    </svg>

                                </span>Capture Image</button>

                            </div>
                            <div className="file-upload-container">
                                {/* File Upload Button */}
                                <div className="upload-btn-container" >
                                    <label htmlFor="file-upload" className="upload-btn">
                                        <input
                                            type="file"
                                            id="file-upload"
                                            className="file-upload-input"
                                            name='profile_picture'
                                            onChange={handleBasicInfoChange}
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
                                </div>

                                {/* Display File Name or Placeholder Text */}
                                <div className="ms-3">{studentBasicForm ? studentBasicForm.profile_picture.name : 'No file Uploaded'}</div>
                            </div>
                        </div>

                    </div>

                    <div>
                        <h4 className='fm-pr-hd'>CONTACT DETAILS</h4>
                    </div>
                    {studentBasicFormMobileNumber && studentBasicFormMobileNumber?.map((val, index) => {
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
                                        <option value="0">Select </option>
                                        {
                                            contactNumberTypes && contactNumberTypes?.map((val, ind) => {
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
                                            name='is_primary'
                                        // checked={isPrimary}
                                        // onChange={handleRadioChange}
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
                    {/* <div className="col-md-3">
                        <label className='form-labell'>Course<span className='astrisk'>*</span></label>
                        <select className='fm-modal form-control form-select' value={studentBasicForm.course_id} name='course_id' onChange={handleBasicInfoChange}>
                            <option value="0">Select Course</option>
                            {
                                courses && courses.map((val, ind) => {
                                    return (
                                        <option value={val.id} key={ind}>{val.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div> */}
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

                        <div className="col-md-3">
                            <label className='form-labell'>Country<span className='astrisk'>*</span></label>
                            <select className='fm-modal form-control form-select' value={studentBasicFormAddress[0]?.country_id} name='country_id' onChange={(e) => handleAddressChange(e, 1)}>
                                <option value="0">Select Country</option>
                                {
                                    correspondenceCountry && correspondenceCountry?.map((val, ind) => {
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
                                <option value="0">Select State</option>
                                {
                                    correspondenceState && correspondenceState?.map((val, ind) => {
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
                                <option value="0">Select State</option>
                                {
                                    correspondenceCity && correspondenceCity?.map((val, ind) => {
                                        return (
                                            <option value={val.id} key={ind}>{val.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className='form-labell'>Pin Code<span className='astrisk'>*</span></label>
                            <input type="number" className='fm-modal form-control' placeholder="Enter Pin Code " value={studentBasicFormAddress[0]?.pincode} 
                            name='pincode' 
                            // onChange={(e) => handleAddressChange(e, 1)} 
                             onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d{0,6}$/.test(val)) {
                                    handleAddressChange(e, 1);
                                }
                            }} />
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
                                maxLength={100}/>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-3">
                                <label className='form-labell'>Country<span className='astrisk'>*</span></label>
                                <select className='fm-modal form-control form-select' value={studentBasicFormAddress[1]?.country_id} name='country_id' onChange={(e) => handleAddressChange(e, 2)}>
                                    <option value="0">Select Country</option>
                                    {
                                        permanentCountry && permanentCountry?.map((val, ind) => {
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
                                    <option value="0">Select State</option>
                                    {
                                        permanentState && permanentState?.map((val, ind) => {
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
                                    <option value="0">Select State</option>
                                    {
                                        permanentCity && permanentCity?.map((val, ind) => {
                                            return (
                                                <option value={val.id} key={ind}>{val.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className='form-labell'>Pin Code<span className='astrisk'>*</span></label>
                                <input type="number" className='fm-modal form-control' value={studentBasicFormAddress[1]?.pincode} placeholder="Enter Pin Code " name='pincode' 
                                // onChange={(e) => handleAddressChange(e, 2)} 
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^\d{0,6}$/.test(val)) {
                                        handleAddressChange(e, 2);
                                    }
                                }} 
                                />
                            </div>



                        </div>
                    </fieldset>

                </div>
            </div>
            <div className="form-actions" style={{ position: 'sticky', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: "flex", gap: '20px' }}>
                    <button type="button" onClick={() => { handlePrev() }} style={{ display: 'flex', alignItems: 'center', gap: "10px", background: "#222F3E4D" }}
                        disabled={currentStep === 0}><img src={previous}></img>Previous</button>
                    {/* <p style={{ cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: 'red', margin: 0 }} onClick={handleSaveDraft}><img src={savedraft}></img>Save to Draft</p> */}
                </div>
                <div>
                    <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: "10px" }} onClick={() => handleNext(handleSaveData)}
                        disabled={currentStep === steps.length - 1}>Next<img src={next}></img></button>
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
