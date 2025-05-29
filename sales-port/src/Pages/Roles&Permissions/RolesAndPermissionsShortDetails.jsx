import React from 'react';
import '../../assets/css/Roles.css';
import studentShortpic from '../../assets/Images/stushortpic.png';
import nexticon from '../../assets/icons/icon.svg';
import edit from '../../assets/icons/pencil-square.svg';
import { AddDepartment } from '../../Component/Modals/AddDepartment';
import pureye from '../../assets/icons/Vector (10).svg'

export const RolesAndPermissionsShortDetails = ({ navigate, openModaldept, closeModaldept, isModalOpendept, selectedOrgDetails, departmentdetails, deptform, handleChangedept, handleSubmitdept }) => {
    return (
        <div>
            <div className="col-md-12">
                <p style={{ background: '#F9F9F9', padding: '16px', borderRadius: '8px', textAlign: 'left', fontWeight: 500, color: "#222F3E" }}>PERMISSION(S) ON THE ROLE:</p>
            </div>
            <div className="row" >
                <div className="col-md-12" >
                    <div className="stu-pro">
                        <div className='stu-pro-inner'>
                            <div style={{ display: 'flex', flexDirection: "column", alignItems: 'start', justifyContent: 'space-between' }}>
                                <div >
                                    <h4 className='fm-pr-hd' style={{ margin: 0, textTransform: 'uppercase' }}>{selectedOrgDetails?.name}</h4>
                                </div>
                                <div>
                                    <p className='sd-p' >Organisation</p>
                                    <p style={{ fontSize: '14px', textAlign: 'left' }}>{selectedOrgDetails?.organization_name}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='sd-p'> Department</p>
                            <p className='alg-l'>{selectedOrgDetails?.department_name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 className='fm-pr-hd' style={{ margin: 0 }}>PERMISSIONS:</h4>
                        </div>
                        <div className='pm-div' style={{  marginTop: '20px', borderRadius: "8px" }}>
                            <div style={{ display: 'flex',padding: "10px", justifyContent: 'space-between', alignItems: 'center' }}>
                                <p className='sd-p' style={{ fontSize: '14px',margin:"0" }}>Modules</p>
                                <p className='sd-p' style={{ fontSize: '14px',margin:"0" }}>Sub Modules</p>
                                <p className='sd-p' style={{ fontSize: '14px',margin:"0"}}>Permissions</p>

                            </div>
                            <div style={{ display: 'flex',padding: "10px", justifyContent: "space-between", alignItems: 'center'}}>
                                <p className='n-p-t' style={{ fontSize: '14px' }}>Module 1</p>
                                <p className='n-p-t' style={{ fontSize: '14px' }}>Module 2</p>
                                <img src={pureye}></img>
                            </div>
                            <div style={{ display: 'flex',padding: "10px", justifyContent: "space-between", alignItems: 'center' }}>
                                <p className='n-p-t' style={{ fontSize: '14px' }}>Module 1</p>
                                <p className='n-p-t' style={{ fontSize: '14px' }}>Module 2</p>
                                <img src={pureye}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='row'>
                <div className="col-md-12">
                    <button className='add-btn' style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }} onClick={() => { navigate('/studentDashboard/StudentFullProfile/') }}>View Full Profile <img src={nexticon}></img></button>
                </div>
            </div> */}
            <AddDepartment closeModaldept={closeModaldept} isModalOpendept={isModalOpendept} deptform={deptform} handleChangedept={handleChangedept} handleSubmitdept={handleSubmitdept} />
        </div>

    )
}
