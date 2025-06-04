import React, { useEffect, useState } from 'react';
import '../../assets/css/StudentShortDetails.css';
import edit from '../../assets/icons/editnew.svg';
import { AddSpecialization } from '../../Component/Modals/AddSpecialization';
import { AddClass } from '../../Component/Modals/AddClass';
import std from '../../assets/Images/unnaemmeduser.png'
export const FeeShortDetails = ({ navigate, openModaldept, closeModaldept, isModalOpendept, selectedOrgDetails, departmentdetails, deptform, handleChangedept, handleSubmitdept, handleEditdept, Updatebtn, handleupdatedept, handleCleardept, handleStatusUpdateClass, isModalOpen, orgform, handleSubmit, handleUpdate, handleChange, setorgform, orgs, courses, semesters, getOrganizations, getCourses, getSemesters, setCourses, setSemesters, dnparentdata, countrydata, handlelocationdata, statedata, citydata, setparentorgidsub, parentorgidsub, countryId, stateid, masterdata, dnparentdata2, coursedata, specdata, org, onClose, openModal }) => {


   
  console.log("fees short detail page==========>>>>", selectedOrgDetails);
  return (
    <>
      {/* <div className="col-md-12">
        <p style={{ background: '#F9F9F9', padding: '16px', borderRadius: '8px', textAlign: 'left', fontWeight: 500, color: "#222F3E" }}>
          FEE  SHORT DETAILS:
        </p>
      </div> */}

      <div className="row mb-5  " style={{ marginTop: "2.4rem" }}>
        <div className="col-md-12">
          <div className="stu-pro">

            <p style={{ background: '#F9F9F9', borderRadius: '8px', textAlign: 'left', fontWeight: 500, color: "#222F3E" }}>
              FEE  SHORT DETAILS:
            </p>
            <div className='stu-pro-inner mt-5'>
              <div style={{ display: 'flex', gap: "15px", flexDirection: "column", alignItems: 'start', justifyContent: 'space-between' }}>
                <div>
                 

                  <h4 className='fm-pr-hd' style={{ margin: 0, textTransform: 'uppercase' }}>{selectedOrgDetails?.name}</h4>
                </div>
               
              </div>
            </div>
            <div>
              <p className='sd-p'>Reg No</p>
              <p className='alg-l'>{selectedOrgDetails?.permanent_registration_number}</p>
            </div>
            <div>
              <p className='sd-p'>Course</p>
              <p className='alg-l'>{selectedOrgDetails?.course_details}</p>
            </div>

            <div>
              <p className='sd-p'>Email</p>
              <p className='alg-l'>{selectedOrgDetails?.email}</p>
            </div>

            <div>
              <p className='sd-p'>Contact Number</p>
              <p className='alg-l'>{selectedOrgDetails?.contact_number}</p>
            </div>

           
          </div>
        </div>
      </div>

      <div className="table-container p-0 mt-5" style={{ height: '380px', overflowY: 'scroll', paddingTop: "0" }}>
        <table className="student-table">
          <thead style={{ position: "sticky", top: 0, background: "#f9f9f9", zIndex: 1 }}>
            <tr>
              <th style={{ padding: "3px" }}>Payment Date</th>
              <th style={{ padding: "3px" }}>Particular</th>
              <th style={{ padding: "3px" }}>Debit</th>
              <th style={{ padding: "3x" }}>Credit</th>
              <th style={{ padding: "3px" }}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrgDetails?.ledger_data?.length > 0 ? (
              selectedOrgDetails.ledger_data?.map((txn, idx) => {
                const isCredit = txn.payment_type === "Credit";
                const amount = parseFloat(txn.amount) || 0;

                const debit = !isCredit ? amount : 0;
                const credit = isCredit ? amount : 0;
                const total = debit + credit;

                return (
                  <tr key={idx}>
                    <td style={{ padding: "3px" }}>{txn.created_at?.split(" ")[0] || "—"}</td>
                    <td style={{ padding: "3px" }}>{txn.fee_head || "—"}</td>
                    <td style={{ padding: "3px" }}>{debit.toFixed(2)}</td>
                    <td style={{ padding: "3px" }}>{credit.toFixed(2)}</td>
                    <td style={{ padding: "3px" }}>{total.toFixed(2)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
                  No ledger entries found.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* Add Specialization Modal */}
      {/* <AddSpecialization closeModaldept={closeModaldept} isModalOpendept={isModalOpendept} deptform={deptform} handleChangedept={handleChangedept} handleSubmitdept={handleSubmitdept} Updatebtn={Updatebtn} handleupdatedept={handleupdatedept} handleCleardept={handleCleardept} /> */}

      {/* Add Class Modal (moved inside) */}
      <AddClass isOpen={isModalOpen} dnparentdata={dnparentdata} countrydata={countrydata} handlelocationdata={handlelocationdata} statedata={statedata} citydata={citydata} handleChange={handleChange} orgform={orgform} handleSubmit={handleSubmit} Updatebtn={Updatebtn} handleUpdate={handleUpdate} setparentorgidsub={setparentorgidsub} parentorgidsub={parentorgidsub} countryId={countryId} stateid={stateid} masterdata={masterdata} dnparentdata2={dnparentdata2} coursedata={coursedata} specdata={specdata} setorgform={setorgform} orgs={orgs} courses={courses} semesters={semesters} getOrganizations={getOrganizations} getCourses={getCourses} getSemesters={getSemesters} setCourses={setCourses} setSemesters={setSemesters} org={org} onClose={onClose} selectedOrgDetails={selectedOrgDetails} />

    </>
  );
};
