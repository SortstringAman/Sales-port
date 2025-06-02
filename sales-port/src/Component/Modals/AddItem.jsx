import React from 'react';
import Select from 'react-select';
import close from '../../assets/icons/close.svg';
import next from '../../assets/icons/icon.svg';
import '../../assets/css/ManageItem.css'


const AddItem = ({ isOpen, onClose }) => {


    const handelCreateItem = ()=>{
        onClose()
    }
    if (!isOpen) return null;

    return (
        <div className="modal-overlay add-item">
            <div
                className="modal-content"
                style={{ position: 'relative', overflowY: 'auto', padding: '30px', maxHeight: '90vh' }}
            >
                <div
                    className="modal-header-content"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <h2 className="text-primary">Create Item</h2>
                    <button className="close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </button>
                </div>

                <div className="modal-body">

                    {/* Row 1 */}
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <label>Item Name<span className="astrisk">*</span></label>
                            <input type="text" className="form-control" placeholder="Enter item name" style={{ height: "50px" }} />
                        </div>
                        <div className="col-md-4">
                            <label>Item Category<span className="astrisk">*</span></label>
                            <Select
                                options={[{ label: "Stationery", value: "stationery" }, { label: "Furniture", value: "furniture" }]}
                                defaultValue={{ label: "Stationery", value: "stationery" }}
                                isDisabled
                            />
                        </div>
                        <div className="col-md-4">
                            <label>Unit of Measurement (UoM)<span className="astrisk">*</span></label>
                            <Select
                                options={[{ label: "Pieces", value: "pcs" }, { label: "Kilograms", value: "kg" }]}
                                defaultValue={{ label: "Pieces", value: "pcs" }}
                                isDisabled
                            />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <label>Item Type<span className="astrisk">*</span></label>
                            <Select
                                options={[{ label: "Consumable", value: "consumable" }, { label: "Non-consumable", value: "non-consumable" }]}
                                defaultValue={{ label: "Consumable", value: "consumable" }}
                                isDisabled
                            />
                        </div>
                        <div className="col-md-4">
                            <label>Min Stock Level</label>
                            <input type="number" className="form-control" placeholder="Enter opening stock" style={{ height: "50px" }} />
                        </div>
                        <div className="col-md-4">
                            <label>Reorder Level</label>
                            <input type="number" className="form-control" placeholder="Enter reorder level" style={{ height: "50px" }} />
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <label>SKU Code</label>
                            <input type="text" className="form-control" placeholder="Enter HSN / SKU code" style={{ height: "50px" }} />
                        </div>
                        <div className="col-md-4">
                            <label>Default Vendor</label>
                            <Select
                                options={[{ label: "Vendor A", value: "vendorA" }, { label: "Vendor B", value: "vendorB" }]}
                                defaultValue={{ label: "Vendor A", value: "vendorA" }}
                                isDisabled
                            />
                        </div>
                        <div className="col-md-4">
                            <label>Storage Condition</label>
                            <Select
                                options={[{ label: "Room Temp", value: "room" }, { label: "Refrigerated", value: "cold" }]}
                                defaultValue={{ label: "Room Temp", value: "room" }}
                                isDisabled
                            />
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <label>Brand / Manufacturer</label>
                            <input type="text" className="form-control" placeholder="Enter brand or manufacturer" style={{ height: "50px" }} />
                        </div>
                        <div className="col-md-4">
                            <label>Shelf Life (in days)</label>
                            <input type="number" className="form-control" placeholder="Enter shelf life in days" style={{ height: "50px" }} />
                        </div>

                    </div>

                    {/* Row 5 */}
                    <div className="row mt-5">
                        <div className="col-md-4 d-flex align-items-center">
                            <input type="checkbox" className="me-2" />
                            <label>Batch No Enabled</label>
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            <input type="checkbox" className="me-2" />
                            <label>Expiry Date Required</label>
                        </div>

                    </div>
                    <div className="row mt-4">
                        <div className="col-md-12">
                            <label>Item Description</label>
                            <textarea className="form-control" rows={5} placeholder="Enter optional remarks about item usage or quality"></textarea>
                        </div>
                    </div>
                    {/* Row 6 (Button Row) */}
                    <div className="row mt-4">
                        <div className="col-md-12 d-flex justify-content-end">
                            <button className="add-btn" style={{ minWidth: "150px", maxWidth: "180px" }} onClick={handelCreateItem}>
                                Create Item <img src={next} className="ms-2" alt="next" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddItem;
