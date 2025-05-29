import React, { useState } from 'react';
import '../../assets/css/StudentShortDetails.css';
import edit from '../../assets/icons/editnew.svg';
import { AddSpecialization } from '../../Component/Modals/AddSpecialization';
import { AddClass } from '../../Component/Modals/AddClass';

export const ClassShortDetails = ({ navigate, openModaldept, closeModaldept, isModalOpendept, selectedOrgDetails, departmentdetails, deptform, handleChangedept, handleSubmitdept, handleEditdept, Updatebtn, handleupdatedept, handleCleardept, handleStatusUpdateClass, isModalOpen, orgform, handleSubmit, handleUpdate, handleChange, setorgform, orgs, courses, semesters, getOrganizations, getCourses, getSemesters, setCourses, setSemesters, dnparentdata, countrydata, handlelocationdata, statedata, citydata, setparentorgidsub, parentorgidsub, countryId, stateid, masterdata, dnparentdata2, coursedata, specdata, org, onClose,openModal}) => {


console.log("class short details",selectedOrgDetails)

  return (
    <div>
      <div className="col-md-12">
        <p style={{ background: '#F9F9F9', padding: '16px', borderRadius: '8px', textAlign: 'left', fontWeight: 500, color: "#222F3E" }}>
          ACADEMIC GROUP SHORT DETAILS:
        </p>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="stu-pro">
            <div className='stu-pro-inner'>
              <div style={{ display: 'flex', flexDirection: "column", alignItems: 'start', justifyContent: 'space-between' }}>
                <div>
                  {/* <p className='sd-p'>Course</p> */}
                  {/* <p style={{ fontSize: '14px', textAlign: 'left' }}>{selectedOrgDetails?.course}</p> */}

                  <h4 className='fm-pr-hd' style={{ margin: 0, textTransform: 'uppercase' }}>{selectedOrgDetails?.course}</h4>
                </div>
              </div>
            </div>
            <div>
              <p className='sd-p'>Specialization</p>
              <p className='alg-l'>{selectedOrgDetails?.specialization}</p>
            </div>
            <div>
              <p className='sd-p'>Academic Group</p>
              <p className='alg-l'>{selectedOrgDetails?.academic_group}</p>
            </div>
            <div>
              <p className='sd-p'>Intake</p>
              <p className='alg-l'>{selectedOrgDetails?.intake_limit}</p>
            </div>

            <div>
              <p className='sd-p'>Provisional Fee</p>
              <p className='alg-l'>{selectedOrgDetails?.provisional_fee}</p>
            </div>

            <div>
              <p className='sd-p'>Fees</p>
              <p className='alg-l'>{selectedOrgDetails?.fees}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department List */}
      <div className="row">
        <div className="col-md-12">
          <div className="stu-pro" style={{ height: '380px', overflowY: 'scroll', paddingTop: "0" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: "sticky", top: "0", background: "#f9f9f9", zIndex: "999", padding: "20px 0px" }}>
              <h4 className='fm-pr-hd' style={{ margin: 0 }}>Classes ({departmentdetails?.length})</h4>
              <button className='add-btn' style={{ display: 'flex', justifyContent: 'center', gap: '5px' }} onClick={() =>{openModal()}}>
                <svg width="12" height="12" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.4286 13.3537H12.5714V21.2108C12.5714 21.6276 12.4059 22.0273 12.1112 22.322C11.8165 22.6167 11.4168 22.7822 11 22.7822C10.5832 22.7822 10.1835 22.6167 9.88883 22.322C9.59413 22.0273 9.42857 21.6276 9.42857 21.2108V13.3537H1.57143C1.15466 13.3537 0.754961 13.1881 0.460261 12.8934C0.165561 12.5987 0 12.199 0 11.7822C0 11.3655 0.165561 10.9658 0.460261 10.6711C0.754961 10.3764 1.15466 10.2108 1.57143 10.2108H9.42857V2.35366C9.42857 1.93689 9.59413 1.53719 9.88883 1.24249C10.1835 0.947787 10.5832 0.782227 11 0.782227C11.4168 0.782227 11.8165 0.947787 12.1112 1.24249C12.4059 1.53719 12.5714 1.93689 12.5714 2.35366V10.2108H20.4286C20.8453 10.2108 21.245 10.3764 21.5397 10.6711C21.8344 10.9658 22 11.3655 22 11.7822C22 12.199 21.8344 12.5987 21.5397 12.8934C21.245 13.1881 20.8453 13.3537 20.4286 13.3537Z" fill="white" />
                </svg>
                Add
              </button>
            </div>

            {departmentdetails && departmentdetails?.map((val, ind) => (
              <div key={ind} style={{ padding: "10px", background: '#fff', marginTop: '20px', borderRadius: "8px" }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className='n-p-t' style={{ textTransform: "uppercase" }}>{val?.name}</p>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* <div className="form-check form-switch custom-switch">
                      <input className="form-check-input" type="checkbox" role="switch" checked={val.status} onChange={() => handleStatusUpdateClass(val)} />
                    </div> */}
                    <img src={edit} onClick={() => handleEditdept(val)} style={{ width: "20px", height: '20px', cursor: 'pointer' }} />
                  </div>
                </div>
                <div>
                  <p className='sd-p'>Intake Capacity: {val.intake_limit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Specialization Modal */}
      {/* <AddSpecialization closeModaldept={closeModaldept} isModalOpendept={isModalOpendept} deptform={deptform} handleChangedept={handleChangedept} handleSubmitdept={handleSubmitdept} Updatebtn={Updatebtn} handleupdatedept={handleupdatedept} handleCleardept={handleCleardept} /> */}

      {/* Add Class Modal (moved inside) */}
      <AddClass isOpen={isModalOpen} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleChange={handleChange} orgform={orgform} handleSubmit={handleSubmit} Updatebtn={Updatebtn} handleUpdate={handleUpdate} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid} masterdata={masterdata} dnparentdata2={dnparentdata2} coursedata={coursedata} specdata={specdata} setorgform={setorgform} orgs={orgs} courses={courses} semesters={semesters} getOrganizations={getOrganizations} getCourses={getCourses} getSemesters={getSemesters} setCourses={setCourses} setSemesters={setSemesters} org={org} onClose={onClose} selectedOrgDetails={selectedOrgDetails}/>

    </div>
  );
};
