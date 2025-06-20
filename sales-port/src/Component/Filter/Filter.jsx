import React, { useEffect, useState } from 'react';
import close from '../../assets/icons/close.svg';
import '../../assets/css/SearchBar.css';
import { GetData } from '../../API/GlobalApi';
import arrowclockwise from '../../assets/icons/arrow-clockwise.svg';

const initialStaticFilterOptions = {
  "Course/Program": [],
  "Academic Group": [],
  "Class": [],
  "Admission Status": [],
  "Cast Category": []
};

export const Filter = ({ setfiltermodal, setStudentsdata, setCurrentPage, setTotalCount, setFilterQueryString }) => {
  const [selectedTab, setSelectedTab] = useState("Institute Name");
  const [orgs, setOrgs] = useState([]);
  const [dynamicOptions, setDynamicOptions] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [courseIdMap, setCourseIdMap] = useState({});
  const [academicIdMap, setAcademicIdMap] = useState({});
  const [castCategoryMap, setCastCategoryMap] = useState({});
  const [booleanStatus, setBooleanStatus] = useState({
    fees_payment_status: "",
    provisional_fees_status: "",
    registration_status: ""
  });

  const admissionStatusMap = {
    "Provisional Admission Confirmed": "provisional_fees_status",
    "Admission Confirmed": "registration_status",
    "Fees Paid": "fees_payment_status",
  };

  useEffect(() => {
    const savedSelections = sessionStorage.getItem("filterSelections");
    if (savedSelections) setSelectedValues(JSON.parse(savedSelections));

    const savedBooleanStatus = sessionStorage.getItem("booleanSelections");
    if (savedBooleanStatus) setBooleanStatus(JSON.parse(savedBooleanStatus));

    getorgdata();
    getcastcategory();
  }, []);

  useEffect(() => {
    if (selectedValues["Institute Name"]) getcoursedata(selectedValues["Institute Name"]);
  }, [orgs]);

  useEffect(() => {
    if (selectedValues["Course/Program"]) getacademicdata(selectedValues["Course/Program"]);
  }, [courseIdMap]);

  useEffect(() => {
    if (selectedValues["Academic Group"]) getclassdata(selectedValues["Academic Group"]);
  }, [academicIdMap]);

  useEffect(() => {
    sessionStorage.setItem("filterSelections", JSON.stringify(selectedValues));
  }, [selectedValues]);

  useEffect(() => {
    sessionStorage.setItem("booleanSelections", JSON.stringify(booleanStatus));
  }, [booleanStatus]);

  const getSelectedFiltersCount = () => {
    const filterKeys = Object.keys(selectedValues).filter(key => selectedValues[key]);
    const booleanKeys = Object.keys(booleanStatus).filter(key => booleanStatus[key] === "true");
    return filterKeys.length + booleanKeys.length;
  };

  const getSelectedFiltersDisplay = () => {
    const display = [];

    Object.entries(selectedValues).forEach(([key, value]) => {
      if (value) display.push(`${key}: ${value}`);
    });

    Object.entries(booleanStatus).forEach(([key, value]) => {
      if (value === "true") {
        const label = Object.entries(admissionStatusMap).find(([_, v]) => v === key)?.[0] || key;
        display.push(`${label}: ✅`);
      }
    });

    return display;
  };

  const getorgdata = async () => {
    const res = await GetData("administration/organizations/");
    if (res) {
      const institutes = res?.map(org => ({
        name: org.organization_name || org.name,
        id: org.id
      }));
      setOrgs(institutes);
      setDynamicOptions(prev => ({
        ...prev,
        "Institute Name": institutes?.map(i => i.name)
      }));
    }
  };

  const getcastcategory = async () => {
    const res = await GetData('students/student-onboarding-basic-details/get-master-data/');
    const categories = res?.master?.student_categories;
    if (categories && Array.isArray(categories)) {
      const categoryNames = categories?.map(cat => cat.name);
      const idMap = Object.fromEntries(categories?.map(cat => [cat.name, cat.id]));
      setCastCategoryMap(idMap);
      setDynamicOptions(prev => {
        const updated = { ...prev, "Cast Category": categoryNames };
        if (selectedValues["Cast Category"] && categoryNames.includes(selectedValues["Cast Category"])) {
          setSelectedValues(prev => ({ ...prev }));
        }
        return updated;
      });
    }
  };

  const getcoursedata = async (orgName) => {
    const org = orgs.find(o => o.name === orgName);
    if (org) {
      const res = await GetData(`students/get-course-list-by-organization/?organization_id=${org.id}`);
      if (res && Array.isArray(res)) {
        const courses = res?.map(r => {
          const name = r.course_specialization?.trim() || r.course?.name?.trim() || "Unnamed Course";
          return { name, id: r.id };
        });
        const nameList = courses?.map(c => c.name);
        const idMap = Object.fromEntries(courses?.map(c => [c.name, c.id]));
        setCourseIdMap(idMap);
        setDynamicOptions(prev => ({
          ...prev,
          "Course/Program": nameList,
          "Academic Group": [],
          "Class": []
        }));
      }
    }
  };

  const getacademicdata = async (courseName) => {
    const specializationId = courseIdMap[courseName];
    if (specializationId) {
      const res = await GetData(`students/get-academic-groups-by-specialization/?specialization_id=${specializationId}`);
      if (res && Array.isArray(res)) {
        const groups = res?.map(r => ({ name: r.name, id: r.id }));
        const nameList = groups?.map(g => g.name);
        const idMap = Object.fromEntries(groups?.map(g => [g.name, g.id]));
        setAcademicIdMap(idMap);
        setDynamicOptions(prev => ({
          ...prev,
          "Academic Group": nameList,
          "Class": []
        }));
      }
    }
  };

  const getclassdata = async (groupName) => {
    const academicId = academicIdMap[groupName];
    if (academicId) {
      const res = await GetData(`students/get-least-academic-groups-by-academic-group/?academic_group_id=${academicId}`);
      if (res && Array.isArray(res)) {
        const classList = res?.map(r => r.name);
        setDynamicOptions(prev => ({
          ...prev,
          "Class": classList
        }));
      }
    }
  };

  const handleSelection = (tab, option) => {
    setSelectedValues(prev => ({ ...prev, [tab]: option }));
    if (tab === "Institute Name") getcoursedata(option);
    if (tab === "Course/Program") getacademicdata(option);
    if (tab === "Academic Group") getclassdata(option);
  };

  const handleSubmit = async () => {
    const {
      "Institute Name": organization_name,
      "Course/Program": combined_course_specialization,
      "Academic Group": academic_group_name,
      "Class": least_academic_group_name,
      "Cast Category": category__name
    } = selectedValues;

    const queryParams = new URLSearchParams({
      ...(organization_name && { organization_name }),
      ...(combined_course_specialization && { combined_course_specialization }),
      ...(academic_group_name && { academic_group_name }),
      ...(least_academic_group_name && { least_academic_group_name }),
      ...(category__name && { category__name }),
      ...booleanStatus
    });

    const finalUrl = `students/get-students/?${queryParams.toString()}`;
    console.log("Final Filter URL:", finalUrl);

    try {
      const res = await GetData(finalUrl);
      if (res) {
        setStudentsdata(res.results || []);
        setTotalCount(res.count || 0);
        setCurrentPage(0);
        setFilterQueryString(queryParams.toString());
        setfiltermodal(false);
      }
    } catch (err) {
      console.error("Failed to fetch filtered students:", err);
    }
  };

  const handleReset = () => {
    setSelectedValues({});
    setDynamicOptions({});
    setBooleanStatus({
      fees_payment_status: "",
      provisional_fees_status: "",
      registration_status: ""
    });
    sessionStorage.removeItem("filterSelections");
    sessionStorage.removeItem("booleanSelections");
    getorgdata();
    getcastcategory();
  };

  const allFilterOptions = {
    "Institute Name": dynamicOptions["Institute Name"] || [],
    ...initialStaticFilterOptions,
    ...dynamicOptions
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '1000px', padding: '20px', background: '#F9FAFC', borderRadius: '10px', width: '50%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-primary">Advance Filter</h2>
          <button className="close-btn" onClick={() => setfiltermodal(false)}>
            <img src={close} alt="Close" style={{ padding: "4px", background: '#F2F3F4', borderRadius: '50%' }} />
          </button>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ width: '30%', paddingRight: '10px', overflowY: 'scroll' }}>
            {Object.keys(allFilterOptions)?.map(tab => (
              <div
                key={tab}
                onClick={() => setSelectedTab(tab)}
                style={{
                  padding: '8px 10px',
                  background: selectedTab === tab ? '#F2EDFF' : 'transparent',
                  color: selectedTab === tab ? '#7F56DA' : '#000',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginBottom: '5px'
                }}
              >
                {tab}
              </div>
            ))}
          </div>

          <div style={{
            flexGrow: 1,
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '10px',
            paddingLeft: '10px',
            height: '100%',
            width: '70%',
            flexDirection: 'column',
            overflowY: "auto"
          }}>
            {selectedTab === "Admission Status" ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                {Object.entries(admissionStatusMap)?.map(([label, key]) => (
                  <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={booleanStatus[key] === "true"}
                      onChange={(e) =>
                        setBooleanStatus(prev => ({
                          ...prev,
                          [key]: e.target.checked ? "true" : ""
                        }))
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            ) : (
              allFilterOptions[selectedTab]?.map(option => (
                <label key={option} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', margin: 0, whiteSpace: 'nowrap' }}>
                  <input
                    type="radio"
                    name={selectedTab}
                    value={option}
                    checked={selectedValues[selectedTab] === option}
                    onChange={() => handleSelection(selectedTab, option)}
                  />
                  {option}
                </label>
              ))
            )}
          </div>
        </div>



        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <button className='btn' onClick={handleReset} style={{ color: 'red', cursor: 'pointer' }}>
            Reset Filters <img src={arrowclockwise} alt="reset" />
          </button>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            {getSelectedFiltersCount() > 0 && (
              <div style={{background: '#fff', padding: '10px', }}>
                <strong>Selected Filters ({getSelectedFiltersCount()})</strong>
              </div>
            )}
            <button className='btn btn-primary' onClick={handleSubmit} style={{ background: '#7F56DA', borderColor: '#7F56DA' }}>
              Submit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
