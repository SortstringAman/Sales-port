import { useEffect } from 'react';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import useAutoFocus from '../../Utils/autoFocus';
import Select from 'react-select';

export const AddCourse = ({
    isOpen,
    orgform,
    handleChange,
    onClose,
    handleSubmit,
    handleUpdate,
    Updatebtn,
    masterdata,
    dnparentdata2,
}) => {
    const nameInputRef = useAutoFocus(isOpen);

    useEffect(() => {
        const duration = parseInt(orgform.duration);
        const mode = orgform.mode?.toLowerCase();

        const modeMap = {
            annual: 12,
            semester: 6,
            trimester: 4,
            quarter: 3,
        };

        let count = '';

        if (!isNaN(duration) && duration > 0 && modeMap[mode]) {
            count = Math.ceil(duration / modeMap[mode]);
        }

        if (count && count.toString() !== orgform.mode_count) {
            handleChange({
                target: {
                    name: 'mode_count',
                    value: count.toString(),
                },
            });
        }
    }, [orgform.duration, orgform.mode]);

    if (!isOpen) return null;

    // Institution Options
    const institutionOptions = dnparentdata2?.map(item => ({
        value: item.id,
        label: item.name,
    })) || [];

    // Level Options
    const levelOptions = masterdata.master?.level?.map(item => ({
        value: item,
        label: item,
    })) || [];

    // Mode Options
    const modeOptions = masterdata.master?.mode?.map(item => ({
        value: item,
        label: item,
    })) || [];

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ position: 'relative', width: '40%' }}>
                <div className="modal-header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h2 className="text-primary">{Updatebtn ? 'Update Course' : 'Add Course'}</h2>
                    <button className="close-btn" onClick={onClose}><img src={close} alt="close" /></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        {/* Institution Select */}
                        <div className="col-md-12">
                            <label className="form-labell">Institution <span className="astrisk">*</span></label>
                            <Select
                                options={institutionOptions}
                                value={institutionOptions.find(opt => opt.value === orgform.organization_id) || null}
                                onChange={(selected) => handleChange({ target: { name: 'organization_id', value: selected?.value || '' } })}
                                placeholder="Select Institution"
                                classNamePrefix="react-select"
                                autoFocus
                                styles={{
                                    control: (base) => ({ ...base, minHeight: '38px', height: '30px' }),
                                    valueContainer: (base) => ({ ...base, height: '30px', padding: '0 6px', fontSize: '14px' }),
                                    option: (base, state) => ({
                                        ...base,
                                        fontSize: '14px',
                                        backgroundColor: state.isSelected ? '#ddd' : state.isFocused ? '#f0f0f0' : 'white',
                                        color: 'black',
                                    }),
                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                }} />
                        </div>
                        {/* Course Name */}
                        <div className="col-md-12">
                            <label className="form-labell">Course Name <span className="astrisk">*</span></label>
                            <input
                                type="text"
                                className="fm-modal form-control"
                                placeholder="Enter Course Name"
                                name="name"
                                value={orgform.name}
                                onChange={handleChange}

                            />
                        </div>
                        {/* Alias */}
                        <div className="col-md-12">
                            <label className="form-labell">Alias <span className="astrisk">*</span></label>
                            <input
                                type="text"
                                className="fm-modal form-control"
                                placeholder="Enter Alias"
                                name="alias"
                                value={orgform.alias}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Level */}
                        <div className="col-md-12">
                            <label className="form-labell">Level <span className="astrisk">*</span></label>
                            <Select
                                autoFocus={false}
                                options={levelOptions}
                                value={levelOptions.find(opt => opt.value === orgform.level) || null}
                                onChange={(selected) => handleChange({ target: { name: 'level', value: selected?.value || '' } })}
                                placeholder="Select Level"
                                classNamePrefix="react-select"
                                styles={{
                                    control: (base) => ({ ...base, minHeight: '38px', height: '30px' }),
                                    valueContainer: (base) => ({ ...base, height: '30px', padding: '0 6px', fontSize: '14px' }),
                                    option: (base, state) => ({
                                        ...base,
                                        fontSize: '14px',
                                        backgroundColor: state.isSelected ? '#ddd' : state.isFocused ? '#f0f0f0' : 'white',
                                        color: 'black',
                                    }),
                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                }} />
                        </div>

                        {/* Duration */}
                        <div className="col-md-12">
                            <label className="form-labell">Course Duration (in months)<span className="astrisk">*</span></label>
                            <input
                                type="text"
                                className="fm-modal form-control"
                                placeholder="e.g., 12"
                                name="duration"
                                value={orgform.duration}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Mode */}
                        <div className="col-md-12">
                            <label className="form-labell">Mode <span className="astrisk">*</span></label>
                            <Select
                                options={modeOptions}
                                value={modeOptions.find(opt => opt.value === orgform.mode) || null}
                                onChange={(selected) => handleChange({ target: { name: 'mode', value: selected?.value || '' } })}
                                placeholder="Select Mode"
                                classNamePrefix="react-select"
                                styles={{
                                    control: (base) => ({ ...base, minHeight: '38px', height: '30px' }),
                                    valueContainer: (base) => ({ ...base, height: '30px', padding: '0 6px', fontSize: '14px' }),
                                    option: (base, state) => ({
                                        ...base,
                                        fontSize: '14px',
                                        backgroundColor: state.isSelected ? '#ddd' : state.isFocused ? '#f0f0f0' : 'white',
                                        color: 'black',
                                    }),
                                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                                }} />
                        </div>
                    </div>
                    {/* Submit / Update Button */}
                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-end">
                            <button
                                className="add-btn"
                                onClick={Updatebtn ? handleUpdate : handleSubmit}
                                style={{
                                    minWidth: "150px",
                                    width: "100%",
                                    maxWidth: "180px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}>
                                {Updatebtn ? "Update Course" : "Add Course"}
                                <img src={next} className="ms-2" alt="next" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
