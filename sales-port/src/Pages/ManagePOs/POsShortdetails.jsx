

const POsShortDetails = ({ selectedStockDetails }) => {
    console.log("selected POS Details clcik", selectedStockDetails)
    return (
        <div>
            <div className="col-md-12">
                <p style={{
                    background: '#F9F9F9',
                    padding: '16px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    fontWeight: 500,
                    color: "#222F3E"
                }}>
                    PO DETAILS:
                </p>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro">
                        <div className='stu-pro-inner'>
                            <div style={{ display: 'flex', gap: "15px", flexDirection: "column", alignItems: 'start', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 className='fm-pr-hd' style={{
                                        margin: 0, marginBottom: "10px", fontWeight: '600', fontSize: "18px", textTransform: 'uppercase'
                                    }}>{selectedStockDetails?.po_no}</h4>
                                    <p className='alg-l' style={{ color: '#222F3E', fontWeight: 'bold' }}>
                                        {selectedStockDetails?.date || 'N/A'}
                                    </p>
                                </div>



                                <div>
                                    <p className='sd-p'>Vendor Name</p>
                                    <p className='alg-l'>{selectedStockDetails?.vendor_name || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        {/* 
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <div>
                                <p className='sd-p'>Contact Person</p>
                                <p className='alg-l'>{selectedStockDetails.contact_person_name || 'N/A'}</p>
                            </div>

                        </div> */}

                        {/* <div>
                            <p className='sd-p'>Contact Numbers</p>
                            {selectedStockDetails.contacts?.map((contact, i) => (
                                <p className='alg-l' key={i}>
                                    {contact.contact_type}: {contact.number}
                                    {/* /{contact.is_available_on_whatsapp ? ' (WhatsApp)' : ''} 
                                </p>
                            )) || 'N/A'}
                        </div> */}

                        <div>
                            <p className='sd-p'>PO Value</p>
                            <p className='alg-l'>{selectedStockDetails?.po_value || 'N/A'}</p>
                        </div>


                        <div>
                            <p className='sd-p'>Deleivery Date</p>
                            <p className='alg-l'>{selectedStockDetails?.date || 'N/A'}</p>
                        </div>


                        <h4 className='fm-pr-hd mt-3' style={{ fontWeight: 'bold' }} >PO DETAILS</h4>
                        {selectedStockDetails?.po_details?.map((item, index) => (
                            <div
                                key={index} className="mt-2"
                                style={{ background: "white", borderRadius: "8px", padding: "12px" }} >
                                <div className="row">
                                    <div className="col-md-12 d-flex justify-content-between">
                                        <h4 className="fm-pr-hd mt-0 mb-0" style={{ fontWeight: "bold" }}>
                                            {item.product_name}
                                        </h4>
                                        <h4 className="fm-pr-hd mt-0 mb-0" style={{ fontWeight: "bold" }}>
                                            {item.quantity}
                                        </h4>
                                    </div>
                                    <div className="col-md-12 d-flex justify-content-between">
                                        <p className="alg-l">Rate</p>
                                        <div>
                                            <p className="pos-content">{item.rate}</p>
                                            <p className="pos-content">{item.base_amount}</p>
                                            <p className="pos-content" style={{ fontWeight: "bold" }}>
                                                {item.total_amount}
                                            </p>
                                            <p className="pos-content-gst" style={{ fontSize: "10px" }}>
                                                @{item.gst} GST Applicable
                                            </p>
                                        </div>
                                    </div>
                                    <p className="pos-content-copy">
                                        {item.note || "Packaging Quality Should be As Per the Standard Discussed During The Meeting"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};


export default POsShortDetails