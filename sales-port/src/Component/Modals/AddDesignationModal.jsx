import React from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';

export const AddDesignationModal = ({ isOpen, handleChangedept, deptform, handleSubmitdept, dnparentdata, departmentfromorg, reporttofromorg, onClose, handleSubmit, departmentidfromorg, parentidfromorg, handleUpdate, Updatebtn, handleCleardept }) => {

    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ position: 'relative', width: '40%' }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className='text-primary'>{Updatebtn ? 'Update Designation' : 'Add Designation'}</h2>
                    <button className="close-btn" onClick={onClose}><img src={close}></img></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12">
                            <label className='form-labell'>Designation <span className='astrisk'>*</span></label>
                            <input type="text" className='fm-modal form-control' placeholder="Enter Designation" name='name' value={deptform.name} onChange={handleChangedept} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label className='form-labell'>Organisation</label><span className='astrisk'>*</span>
                        <select className='fm-modal form-control form-select' onChange={handleChangedept} name='parentorgidog' value={parentidfromorg} disabled={Updatebtn ? true : false}>
                            <option value=''>Select Organisation</option>
                            {dnparentdata && dnparentdata?.map((val, ind) => {
                                // console.log("val--", val)
                                return (<>
                                    <option key={ind} value={val.organization_id}
                                    >{val.organization_name}</option>
                                </>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className='form-labell'>Department</label>
                        <select className='fm-modal form-control form-select' value={departmentidfromorg} onChange={handleChangedept} name='department' disabled={Updatebtn ? true : false}>
                            <option value=''>Select Department</option>
                            {departmentfromorg && departmentfromorg?.map((val, ind) => {
                                return (<>
                                    <option key={ind} value={val.id}
                                    >{val.name}</option>
                                </>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className='form-labell'>Report To</label><span className='astrisk'>*</span>
                        <select className='fm-modal form-control form-select' name='reporttoid'
                            onChange={handleChangedept} value={deptform.reporttoid}>
                            <option value=''>Select Report To</option>
                            {dnparentdata && dnparentdata?.map((val, ind) => {
                                if (val.report_to_name && val.report_to_id) {
                                    return (
                                        <option key={ind} value={val.report_to_id}>
                                            {val.report_to_name}
                                        </option>
                                    );
                                }
                                return null;
                            })}
                        </select>
                    </div>
                    <div className="row mt-4">
                        {Updatebtn === false ? <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className='add-btn' onClick={handleSubmit} style={{ width: "40%", display: 'flex', justifyContent: 'center' }}><span>
                            </span>Add Organisation<img src={next} className='ms-2'></img></button>
                        </div> : <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
                            <button className='add-btn' onClick={handleUpdate} style={{ width: "40%", display: 'flex', justifyContent: 'center' }}><span>
                            </span>Update Designation<img src={next} className='ms-2'></img></button>
                        </div>}

                    </div>
                </div>
            </div>
        </div>
    )
}
