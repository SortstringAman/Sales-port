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
import edit from '../../assets/icons/editnew.svg';
// import { CourseShortDetails } from './CourseShortDetails.js';
import { useNavigate } from 'react-router-dom';
import { AddOrganisationModal } from '../../Component/Modals/AddOrganisationModal.jsx';
import { getData, getDataById, patchData, Postdata, Postdataform, PostdataWithJson, updateData, UpdateDataForm, UpdateDataFormWithJson } from '../../API/GlobalApi.js';
import { AddCourse } from '../../Component/Modals/AddCourse.jsx';
import { ClassShortDetails } from './ClassShortDetails.jsx';
import { AddClass } from '../../Component/Modals/AddClass.jsx';
import { Addfee } from '../../Component/Modals/AddFee.jsx';
import debounce from 'lodash.debounce';


export const ClassDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [isModalOpendept, setIsModalOpendept] = useState(false);
  const [classPage, setClassPage] = useState(0);
  const [classTotalCount, setClassTotalCount] = useState(0);
  const [classData, setClassData] = useState([]);
  const [submit, setsubmit] = useState(false);
  const [dnparentdata, setdnparentdata] = useState([]);
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
  const [coursedata, setcoursedata] = useState([]);
  const [specdata, setspecdata] = useState([]);
  const [filterQueryString, setFilterQueryString] = useState('');

  const [currentClassPage, setCurrentClassPage] = useState(0);

  const [orgform, setorgform] = useState({
    name: "",
    academic_group: null,
    intakelimit: null,
    courseid: null,
    specid: null

  })
  const [deptform, setdeptform] = useState({
    id: null,
    name: "",
    course_code: "",
    semester_fee: "",
    provisional_fee: "",
    intech_capacity: null
  })

  const [feeForm, setFeeform] = useState({
    provisional_fee: "",
    fees: "",
    intake_limit: ""
  });


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


  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [searchPage, setSearchPage] = useState(1);


  const handleSearchold = async (query) => {
    setSearchQuery(query);

    if (!query) {
      // No search — show original data
      const defaultFormatted = dnparentdata?.map((org) => ({
        id: org?.id,
        class_name: org?.name,
        academic_group: org?.name,
        specialization: org?.specialization?.name,
        specialization_id: org?.specialization?.id,
        course: org?.specialization?.course?.name,
        course_code: org?.course_code,
        status: org?.status,
        academic_group_id: org?.academic_group?.id,
        intake_limit: org?.intake_limit,
        alias: org?.specialization?.course?.alias,
        handleRowClick: handleRowClick,
      }));
      setFilteredData(defaultFormatted);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchURL = `academics/get-academic-groups-with-pagination/?search=${encodeURIComponent(query)}`;

    try {
      const response = await getData(searchURL);
      console.log("get data from new url", response);

      setClassTotalCount(response.count || 0);
      setClassPageCount(Math.ceil((response.count || 0) / 10));

      const results = response?.results || [];

      const queryLower = query.toLowerCase();

      const filteredResults = results.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(queryLower);
        const specializationMatch = item.specialization?.name?.toLowerCase().includes(queryLower);
        const courseMatch = item.specialization?.course?.name?.toLowerCase().includes(queryLower);
        const courseCodeMatch = item.course_code?.toLowerCase().includes(queryLower);

        return nameMatch || specializationMatch || courseMatch || courseCodeMatch;
      });

      const transformed = filteredResults?.map((org) => ({
        id: org.id,
        class_name: org.name,
        academic_group: org.name,
        specialization: org.specialization?.name || "",
        specialization_id: org.specialization?.id || null,
        course: org.specialization?.course?.name || "",
        course_code: org.course_code || "",
        status: org.status ?? false,
        academic_group_id: org.academic_group?.id || null,
        intake_limit: org.intake_limit ?? 0,
        alias: org.specialization?.course?.alias || "",
        handleRowClick: handleRowClick,
      }));

      setFilteredData(transformed);
      console.log("transformed data", transformed);
    } catch (error) {
      console.error("Search API failed", error);
      setFilteredData([]);
    }

    setIsSearching(false);
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
    // queryParams.set("page", '1');

    // const finalUrl = `students/get-student-payments/?${queryParams.toString()}`;
    const finalUrl = `academics/get-academic-groups-with-pagination/?${queryParams.toString()}`;

    try {
      const response = await getData(finalUrl);
      setdnparentdata(response.results || []);
      setClassPageCount(Math.ceil((response.count || 0) / 10));
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

  const isRequired = (val) => {
    if (val === null || val === undefined) return false;
    return String(val).trim() !== '';
  };


  const [allClassData, setAllClassData] = useState([]);

  const getmasterdata = async () => {
    const url = "academics/get-academic-groups/";
    const response = await getData(url);
    console.log("master data academic", response);

    if (response) {
      setmasterdata(response); // keep this if you use it elsewhere

      // Transform response into class-like structure for searching
      const formattedData = response?.map((org) => ({
        id: org?.id,
        class_name: org?.name,
        academic_group: org?.name, // Semester 1
        specialization: org?.specialization?.name, // e.g. Sociology
        course: org?.specialization?.course?.name, // e.g. Master of Arts
        course_code: org?.specialization?.course_code, // MA01
        status: org?.status,
        academic_group_id: org?.id,
        intake_limit: org?.intake_limit
      }));

      console.log("formatted data==", formattedData)
      setAllClassData(formattedData); // NEW state for global search
    }
  };

  const getcourse = async () => {
    const url = "academics/courses/";
    const response = await getData(url);
    console.log("get all courses", response)
    if (response) {
      setcoursedata(response.results);


    }
  }
  const getspec = async () => {
    const url = `academics/courses/${orgform.courseid}/specializations/`;
    const response = await getData(url);
    if (response) {
      setspecdata(response.results);

    }
  }
  const handleClassPageChange = ({ selected }) => {
    console.log("Page selected:", selected); // This will now correctly log the page number
    setCurrentClassPage(selected);
    getorgdata(selected); // Load data for the selected page
  };


  const [classPageCount, setClassPageCount] = useState(0);

  const getorgdata = async (page = 0, selectedId = null) => {
    const url = `academics/get-academic-groups-with-pagination/?page=${page + 1}`;
    const response = await getData(url);

    if (response && Array.isArray(response.results) && response.results.length > 0) {
      const groups = response.results;

      // Update states
      setClassData(groups);
      setClassTotalCount(response.count || 0);
      setdnparentdata(groups);
      setClassPageCount(Math.ceil((response.count || 0) / 10)); // assuming page size 10
      // Try to find the same org by ID (e.g., the one we just updated)
      let group = selectedId ? groups.find((g) => g.id === selectedId) : groups[0];

      // If not found, fallback to first item
      if (!group && groups.length > 0) {
        group = groups[0];
      }

      if (group) {
        setSelectedOrgDetails({
          id: group.id,
          class_name: group.name,
          academic_group: group.name,
          specialization: group.specialization?.name || "N/A",
          specialization_id: group.specialization?.id || null,
          course: group.specialization?.course?.alias || "N/A",
          course_id: group.specialization?.course?.id || null,
          course_name: group.specialization?.course?.name || "N/A",
          level: group.specialization?.course?.level || "N/A",
          mode: group.specialization?.course?.mode || "N/A",
          duration: group.specialization?.course?.duration || "N/A",
          mode_count: group.specialization?.course?.mode_count || 0,
          organization: group.specialization?.course?.organization?.name || "N/A",
          organization_id: group.specialization?.course?.organization?.id || null,
          status: group.status,
          provisional_fee: group.provisional_fee,
          fees: group.fees,
          intake_limit: group.intake_limit
        });

        // Fetch dept data for selected group
        if (group.id) {
          getdeptdata(group.id);
        }
      } else {
        console.warn("Selected group not found on current page.");
      }
    } else {
      console.warn("No academic groups found in response.");
      setClassData([]);
      setClassTotalCount(0);
      setdnparentdata([]);
    }
  };


  const pageSize = 10;

  // const classPageCount = Math.ceil(classTotalCount / pageSize);

  useEffect(() => {
    getorgdata(classPage);
  }, [classPage]);


  const getorgdata2 = async () => {
    const url = "administration/organizations/";
    const response = await getData(url);
    if (response) {
      setdnparentdata2(response);

    }

  }
  const getdeptdata = async (id) => {
    if (!id) {
      return;
    }
    setparentorgid(id);
    const url = `students/get-least-academic-groups-by-academic-group/?academic_group_id=${id}`;
    try {
      const response = await getData(url);

      if (response) {
        setdepartmentdetails(response);
      } else {
        displayToast('No department data found.', 'warning');
      }
    } catch (error) {
      console.error("Error fetching department data:", error);
      displayToast('Error fetching department data', 'danger');
    }
  };


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
      // Allow letters, digits, spaces, and special characters, but not starting with a digit
      if (/^\d/.test(value)) return; // Prevent input starting with a digit
      setorgform(prev => ({ ...prev, [name]: value })); // Allow all special characters

    } else if (name === 'intakelimit' || name === 'duration' || name === 'mode_count') {
      // Allow only digits for these fields
      const validNumber = value.replace(/\D/g, ''); // Remove non-digit characters
      setorgform(prev => ({ ...prev, [name]: validNumber }));

    } else {
      // Handle other fields as usual (no validation)
      setorgform(prev => ({ ...prev, [name]: value }));
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

    // if (!isRequired(orgform.academic_group) || !isRequired(orgform.academic_group)) return displayToast('Academic Group is Required', 'danger');
    if (!isRequired(orgform.name)) return displayToast(' Class is required', 'danger');
    if (!isRequired(orgform.intakelimit) || !isRequired(orgform.intakelimit)) return displayToast('Intake Limit is required', 'danger');

    const finalobj = {
      name: orgform.name,
      academic_group_id: selectedOrgDetails.id,
      intake_limit: orgform.intakelimit

    }

    console.log("final obkect after add", finalobj)
    const url = 'academics/least-academic-group/';
    const response = await PostdataWithJson(url, finalobj);
    console.log("respomse after creatig class", response)
    if (response && !response.error) {
      displayToast('Class Added successfully!', 'success');
      // getorgdata();
      console.log("selected org details", selectedOrgDetails)
      getdeptdata(selectedOrgDetails.id)
      closeModal();
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error Adding Class.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
  }
  const handleSubmitdept = async () => {
    const finalobj = {
      id: deptform.id,
      name: deptform.name,
      course_code: deptform.course_code,
      semester_fee: deptform.semester_fee,
      provisional_fee: deptform.provisional_fee,
      intech_capacity: parseInt(deptform.intech_capacity)
    }
    const url = `academics/courses/${parentorgid ? parentorgid : finalobj.id}/specializations/`;
    const response = PostdataWithJson(url, finalobj);
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

  const openFeeModal = () => {
    setIsFeeModalOpen(true);
  };

  const closeFeeModal = () => {
    setIsFeeModalOpen(false);
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




  const handleUpdateFee = async () => {
    if (!isRequired(feeForm.provisional_fee)) return displayToast('Provisional is required', 'danger');
    if (!isRequired(feeForm.fees)) return displayToast('Fee is required', 'danger');
    if (!isRequired(feeForm.intake_limit)) return displayToast('Intake limit is required', 'danger');

    const finalobj = {
      provisional_fee: feeForm.provisional_fee || 0,
      fees: feeForm.fees || 0,
      intake_limit: feeForm.intake_limit || 0,
      specialization_id: selectedOrgDetails?.specialization_id,
    };

    const url = `academics/update-academic-groups/${orgform.id}/`;
    const response = await UpdateDataFormWithJson(url, finalobj);

    if (response && !response.error) {
      displayToast('Fee updated successfully!', 'success');

      // Use current page and selected ID to reload data
      getorgdata(currentClassPage, selectedOrgDetails?.id);
      getdeptdata(selectedOrgDetails.id);
      closeFeeModal();
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error updating fee.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
    }
  };




  const handleRowClick = async (id, row) => {
    const org = row.original;

    console.log("after clickckckk pon edit fee", org)

    setSelectedOrgDetails({
      id: org.id, // class ID
      class_name: org.class_name || org.name,
      academic_group: org.academic_group || org.name,

      // Specialization info (flat values)
      specialization: org.specialization || "N/A",
      specialization_id: org.specialization_id || null,

      // Course info (flat values from flattened object)
      course: org.alias || "N/A",               // alias = short form
      course_id: org.course_id || null,
      course_name: org.course || "N/A",
      level: org.level || "N/A",
      mode: org.mode || "N/A",
      duration: org.duration || "N/A",
      mode_count: org.mode_count || 0,

      // Organization info
      organization: org.organization || "N/A",
      organization_id: org.organization_id || null,
      fees: org?.fees ? org.fees : "00",
      provisional_fee: org?.provisional_fee ? org.provisional_fee : "00",

      intake_limit: org?.intake_limit ? org.intake_limit : "00",


      status: org.status
    });


    try {
      const res = await getData(`students/get-least-academic-groups-by-academic-group/?academic_group_id=${org.id}`);

      if (res) {
        setdepartmentdetails(res); // Assuming 'departmentdetails' is your state variable
      }
    } catch (err) {
      console.error('Failed to load department/class data:', err);
    }
  };





  const [orgs, setOrgs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [org, setOrg] = useState([]);

  useEffect(() => {
    if (isModalOpen) {
      getOrganizations();
    }
  }, [isModalOpen]);

  const getOrganizations = async () => {
    const response = await getData('administration/organizations/');
    if (response) {
      const formatted = response?.map((org) => ({
        id: org.id,
        name: org.organization_name || org.name,
      }));
      setOrgs(formatted);
    }
  };

  const getCourses = async (orgId) => {
    const res = await getData(`students/get-course-list-by-organization/?organization_id=${orgId}`);
    if (res && Array.isArray(res)) {
      const formatted = res?.map((r) => {
        const name = r.course_specialization?.trim() || r.course?.name?.trim() || 'Unnamed Course';
        return { id: r.id, name };
      });
      setCourses(formatted);       // Update React state
      setSemesters([]);            // Reset semesters when org changes
      return formatted;            // ✅ Return the data for immediate use
    }
    return []; // In case of failure
  };


  const getSemesters = async (courseId) => {
    const res = await getData(`students/get-academic-groups-by-specialization/?specialization_id=${courseId}`);
    if (res && Array.isArray(res)) {
      const formatted = res?.map((s) => ({ id: s.id, name: s.name }));
      setSemesters(formatted);
    }
  };
  const handleEdit = async (row) => {
    const orgData = row.original;
    console.log("Clicked for edit class details=====", orgData);


    setorgform({
      id: orgData.id,
      name: orgData.class_name,
      academic_group: orgData.academic_group_id,
      intakelimit: orgData.intake_limit,
      courseid: orgData.course_id,
      specid: orgData.spec_id,
      // No need for organization in orgform, we will handle it separately
    });

    setparentorgidsub(orgData.id);
    openFeeModal();
    setUpdatebtn(true);

    try {
      const apiUrl = 'academics/least-academic-group';
      const academicGroupDetails = await getDataById(apiUrl, orgData.id);
      console.log("Academic group details ===", academicGroupDetails);

      if (academicGroupDetails) {
        const group = academicGroupDetails.academic_group;
        const specialization = group.specialization;
        const course = specialization.course;
        const organization = course.organization;

        // Extract IDs
        const courseId = course.id;
        const semesterId = group.id;

        // Update orgform state with values fetched
        setorgform(prev => ({
          ...prev,
          courseid: courseId,
          specid: semesterId, // Set specid (semesterId)
        }));

        // Set the organizations state with fetched data (only for display)
        setOrg([{
          id: organization.id,
          name: organization.name
        }]);

        // Set the courses state with the fetched course
        setCourses([{
          id: courseId,
          name: course.name
        }]);

        // Set the semesters state with the fetched semester
        setSemesters([{
          id: semesterId,
          name: group.name
        }]);

        console.log("Final data extracted:", {
          organizationName: organization.name,
          courseId,
          courseName: course.name,
          semesterId,
          semesterName: group.name,
        });
      }

    } catch (error) {
      console.error("Error in handleEdit:", error);
    }
  };



  const handleEditdept = (row) => {
    console.log("open for edit", row)
    setorgform(
      {
        id: row.id,
        name: row.name,
        intakelimit: parseInt(row.intake_limit)
      }
    )
    setUpdatebtn(true);
    openModal()
    // openModaldept();
  }
  const handleupdatedept = async () => {
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

    if (response) {
      closeModaldept();
      displayToast('Class Updated successfully!', 'success');
      setUpdatebtn(false);
      getdeptdata(parentorgid);
    }
  }
  const handleUpdate = async () => {
    const finalobj = {
      id: parseInt(orgform.id),
      name: orgform.name,
      academic_group_id: selectedOrgDetails.id,
      intake_limit: orgform.intakelimit,
    }

    const url = `academics/least-academic-group/${finalobj.id}/`
    const response = await updateData(url, finalobj);
    console.log("after updateing====>", response?.academic_group_id)
    if (!response.error) {

      // Use current page and selected ID to reload data
      getorgdata(currentClassPage, selectedOrgDetails.id);
      setUpdatebtn(false);
      closeModal();
    }

  }


  // const data2 = useMemo(() => {
  //   const source = searchQuery ? allClassData : dnparentdata;

  //   return source.map((org) => ({
  //     id: org?.id,
  //     class_name: org?.name,
  //     academic_group: org.academic_group?.name,
  //     specialization: org.academic_group?.specialization?.course?.name,
  //     course: org.academic_group?.specialization?.course?.alias,
  //     status: org?.status,
  //     academic_group_id: org.academic_group?.id,
  //     intake_limit: org.intake_limit
  //   }));
  // }, [allClassData, dnparentdata, searchQuery]);




  // const filteredData = useMemo(() => {
  //   if (!searchQuery) {
  //     return dnparentdata.map((org) => ({
  //       id: org?.id,
  //       class_name: org?.name,
  //       academic_group: org.academic_group?.name,
  //       specialization: org.academic_group?.specialization?.course?.name,
  //       course: org.academic_group?.specialization?.course?.alias,
  //       status: org?.status,
  //       academic_group_id: org.academic_group?.id,
  //       intake_limit: org.intake_limit
  //     }));
  //   }

  //   const lowerSearch = searchQuery.toLowerCase();
  //   return allClassData.filter((org) =>
  //     (org?.class_name || '').toLowerCase().includes(lowerSearch) ||
  //     (org?.academic_group || '').toLowerCase().includes(lowerSearch) ||
  //     (org?.course || '').toLowerCase().includes(lowerSearch) ||
  //     (org?.specialization || '').toLowerCase().includes(lowerSearch)
  //   );
  // }, [searchQuery, dnparentdata, allClassData]);

  console.log("filterde data==0", filteredData)

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
    row.original.status = newStatus;

    // Optionally, make an API call here to update the status on the backend
    const url = `academics/least-academic-group/${row.original.id}/`;
    const response = await patchData(url, { status: newStatus });

    if (response && !response.error) {
      displayToast('Status Updated successfully!', 'success');
      getorgdata();
    } else if (response && response.error) {
      const errorMsg = response.error?.[0] || 'Error Updating Status.';
      displayToast(errorMsg, 'danger');
    } else {
      displayToast('Unexpected error occurred.', 'danger');
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
    console.log("update status", updatedDepartmentDetails)
    // Set the updated department details with the toggled status
    setdepartmentdetails(updatedDepartmentDetails);

    const url = `academics/courses/${parentorgid}/specializations/${department.id}/`; // Update department URL
    const response = await patchData(url, { status: newStatus });

    if (response) {
      console.log("Updated Department Status:", response);
    } else {
      console.log("Failed to update department status.");
    }
  };








  const handleStatusUpdateClass = async (department) => {
    // Toggle status for the specific department
    const newStatus = !department.status;
    // Update the status locally
    console.log("department deatila", departmentdetails)
    const updatedDepartmentDetails = departmentdetails?.map(dept => {
      if (dept.id === department.id) {
        return { ...dept, status: newStatus }; // Toggle the status of the selected department
      }
      return dept;
    });
    console.log("update status", updatedDepartmentDetails)
    // // Set the updated department details with the toggled status
    // setdepartmentdetails(updatedDepartmentDetails);

    // const url = `academics/courses/${parentorgid}/specializations/${department.id}/`; // Update department URL
    // const response = await patchData(url, { status: newStatus });

    // if (response) {
    //   console.log("Updated Department Status:", response);
    // } else {
    //   console.log("Failed to update department status.");
    // }
  };

  const columns = useMemo(() => [
    {
      Header: <input type='checkbox' />,
      accessor: 'checkbox',
      Cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.isSelected}
          onChange={() => row.toggleRowSelected()}
          style={{ cursor: 'pointer' }}
        />
      )
    },
    {
      Header: 'Course Name (Specialization)',
      accessor: 'course',
      Cell: ({ row }) => {

        const course = row.original.course;
        const specializationRaw = row.original.specialization;
        const specialization = specializationRaw === '-' ? '' : specializationRaw;


        return (
          <div style={{ cursor: 'pointer' }}


          >
            <p style={{ margin: 0, color: '#222F3E', fontWeight: 500, textAlign: "left" }}>
              {course}{specialization ? ` (${specialization})` : ''}
            </p>
          </div>
        );
      }
    },
    {
      Header: 'Course code',
      accessor: 'course_code',
      Cell: ({ row }) => (
        <div >
          <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>  {row.original.course_code}</p>
        </div>
      )
    },

    {
      Header: 'Academic Group',
      accessor: 'academic_group',
      Cell: ({ row }) => (

        <div >

          <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>{row.original.academic_group}</p>
        </div>
      )
    },
    {
      Header: 'Provisional Fee',
      accessor: 'provisional_fee',
      Cell: ({ row }) => (
        <div >
          <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>  {row.original.provisional_fee}</p>
        </div>
      )
    },
    {
      Header: ' Fees',
      accessor: 'fees',
      Cell: ({ row }) => (
        <div >
          <p style={{ textAlign: 'left', color: '#222F3E', fontWeight: 500, margin: 0 }}>  {row.original.fees}</p>
        </div>
      )
    },
    {
      Header: 'Action',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-check form-switch custom-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={row.original.status}
              onChange={() => handleStatus(row)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {/* <img src={edit} alt="Edit" style={{ cursor: 'pointer' }} onClick={() => handleEdit(row)} /> */}

          <img src={edit} style={{ cursor: 'pointer' }} alt="Edit" onClick={() => handleEdit(row)}
            data-tooltip-id="admission-tip" data-tooltip-content="Edit" />
        </div>
      )
    }
  ], []);


  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    // Allow only digits and one optional decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFeeform(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  useEffect(() => {
    getorgdata();
    getcountry();
    getdeptdata();
    getmasterdata();
    getorgdata2();
    getcourse();


  }, [])
  useEffect(() => {
    getspec();
  }, [orgform.courseid])

  useEffect(() => {
    if (selectedOrgDetails) {
      setFeeform({
        provisional_fee: selectedOrgDetails.provisional_fee ?? "00",
        fees: selectedOrgDetails.fees ?? "00", // this is the field you're missing
        intake_limit: selectedOrgDetails.intake_limit ?? "00"
      });
    }
  }, [selectedOrgDetails]);



  const tableData = isSearching
    ? filteredData
    : dnparentdata?.map((org) => ({
      id: org?.id,
      class_name: org?.name,
      academic_group: org?.name,
      specialization: org?.specialization?.name,
      specialization_id: org?.specialization?.id,
      course: org?.specialization?.course?.name,
      course_code: org?.specialization?.course_code,
      status: org?.status,
      academic_group_id: org?.academic_group?.id,
      intake_limit: org?.intake_limit,
      alias: org?.specialization?.course?.alias,
      fees: org?.fees,
      provisional_fee: org?.provisional_fee,
      handleRowClick: () => handleRowClick(org.id, org), // ✅ Ensure it’s a callable function
    }));

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
            <h2 className='main-heading'>Classes({dnparentdata?.length})</h2>
          </div> */}

        <div className='row'>
          {/* <div className="col-md-12 d-flex justify-content-end">
            <button className='add-btn' onClick={() => openModal()}><span className='me-2'>
              <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
              </svg>
            </span>Add New Class</button>
          </div> */}
        </div>

        <div className="dashboard-cards row" style={{ padding: "20px" }} >
          {/* <ProfileStatus
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
            label="Academic Info"
            icon={profileicon2}
            percentage={80}
            iconColor="#0E9DED"
            bgColor="#0E9DED0D"
            circleColor="#0E9DED"
            numbers="08"
          /> */}
        </div>
        <div className='row'>
          <div className="col-md-9">
            <div className="row" style={{ alignItems: 'center' }}>
              <div className="col-md-6">
                <h2 className='main-heading'>Academic Group({classTotalCount})</h2>
              </div>
              <div className="col-md-6">
                <div style={{ display: "flex", justifyContent: 'end' }}>
                  <SearchBar data={dnparentdata} onSearch={handleSearch} ref={searchInputRef} placeholder="Search by  Course code, academic group ..." />
                  {/* <button
                    className="filter-btn"s
                    onClick={handleFilterClick}
                  >
                    <img src={filtericon}></img>
                  </button> */} 
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">

                {/* {tableData.length > 0 ? (
                  <Table
                    data={tableData}
                    columns={columns}
                    selectedOrgDetails={selectedOrgDetails}
                    handlePageChange={isSearching ? null : handleClassPageChange}
                    pageCounts={classPageCount}
                  />
                ) : (
                  <div className="no-data-message" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                    {isSearching ? 'No results found for your search.' : 'No data available.'}
                  </div>
                )} */}


                <Table
                  data={
                    isSearching
                      ? filteredData
                      : dnparentdata?.map((org) => ({
                        id: org?.id,
                        class_name: org?.name,
                        academic_group: org?.name,
                        specialization: org?.specialization?.name,
                        specialization_id: org?.specialization?.id,
                        course: org?.specialization?.course?.name,
                        course_code: org?.specialization?.course_code,
                        status: org?.status,
                        academic_group_id: org?.academic_group?.id,
                        intake_limit: org?.intake_limit,
                        alias: org?.specialization?.course?.alias,
                        fees: org?.fees,
                        provisional_fee: org?.provisional_fee,
                        handleRowClick: handleRowClick,
                      }))
                  }
                  columns={columns}
                  selectedOrgDetails={selectedOrgDetails}
                  handlePageChange={isSearching ? null : handleClassPageChange}
                  pageCounts={classPageCount}
                />



              </div>
            </div>
          </div>
          <div className="col-md-3">
            <ClassShortDetails navigate={navigate} openModaldept={openModaldept} closeModaldept={closeModaldept} isModalOpendept={isModalOpendept} selectedOrgDetails={selectedOrgDetails} departmentdetails={departmentdetails} deptform={deptform} handleChangedept={handleChangedept} handleSubmitdept={handleSubmitdept} handleEditdept={handleEditdept} Updatebtn={Updatebtn} handleupdatedept={handleupdatedept} handleCleardept={handleCleardept} handleStatusDept={handleStatusDept} isModalOpen={isModalOpen} orgform={orgform} handleSubmit={handleSubmit} handleUpdate={handleUpdate} handleChange={handleChange} setorgform={setorgform} orgs={orgs} courses={courses} semesters={semesters} getOrganizations={getOrganizations} getCourses={getCourses} getSemesters={getSemesters} setCourses={setCourses} setSemesters={setSemesters} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid} masterdata={masterdata} dnparentdata2={dnparentdata2} coursedata={coursedata} specdata={specdata} org={org} onClose={closeModal} openModal={openModal} handleStatusUpdateClass={handleStatusUpdateClass} />


          </div>
        </div>
      </div >

      <div>

        <Addfee isOpen={isFeeModalOpen} onClose={closeFeeModal} selectedOrgDetails={selectedOrgDetails} handleFeeChange={handleFeeChange} setFeeform={setFeeform} feeForm={feeForm} Updatebtn={Updatebtn} handleUpdateFee={handleUpdateFee}
        />
      </div>
      {/* <div>
        <AddClass isOpen={isModalOpen} onClose={closeModal} setsubmit={setsubmit} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleChange={handleChange} orgform={orgform} handleSubmit={handleSubmit} openModaldept={openModaldept} closeModaldept={closeModaldept}
          Updatebtn={Updatebtn} handleUpdate={handleUpdate} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid} masterdata={masterdata}
          dnparentdata2={dnparentdata2} coursedata={coursedata} specdata={specdata} setorgform={setorgform} orgs={orgs} courses={courses} semesters={semesters} getOrganizations={getOrganizations} getCourses={getCourses} getSemesters={getSemesters} setCourses={setCourses} setSemesters={setSemesters} org={org} />
      </div> */}
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


