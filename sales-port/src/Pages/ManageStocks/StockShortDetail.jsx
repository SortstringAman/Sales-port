

  const StockShortDetails = ({selectedStockDetails }) => {
    console.log("selectedStockDetails clcik",selectedStockDetails)
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
                    STOCK'S SHORT DETAILS:
                </p>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="stu-pro" style={{marginTop:'6px'}}>
                        <div className='stu-pro-inner'>
                            <div style={{ display: 'flex', gap: "15px", flexDirection: "column", alignItems: 'start', justifyContent: 'space-between' }}>
                                <div>
                                    <h4 className='fm-pr-hd' style={{
                                        margin: 0, marginBottom: "10px", fontWeight: '600', fontSize: "18px", textTransform: 'uppercase'
                                    }}>{selectedStockDetails?.transaction_no}</h4>
                                    <p className='sd-p'>
                                        {selectedStockDetails?.date || 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <p className='sd-p'>Bill No</p>
                                    <p className='alg-l'>{selectedStockDetails?.bill_details?.bill_no || 'N/A'}</p>
                                </div>


                                <div>
                                    <p className='sd-p'>Vendor Name</p>
                                    <p className='alg-l'>{selectedStockDetails?.bill_details?.vendor_name || 'N/A'}</p>
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
                            <p className='sd-p'>Billing Address</p>
                            <p className='alg-l'>{selectedStockDetails?.bill_details?.address || 'N/A'}</p>
                        </div>


                        <div>
                            <p className='sd-p'>Stock Location</p>
                            <p className='alg-l'>{selectedStockDetails?.bill_details?.stock_location || 'N/A'}</p>
                        </div>

                        <div>
                            <h4 className='fm-pr-hd mt-3' >STOCK'S DETAILS</h4>
                            <div>
                                <p className='sd-p'>Item Name</p>
                                <p className='alg-l'>{selectedStockDetails?.stock_details?.item_name || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='sd-p'>Item Group</p>
                                <p className='alg-l'>{selectedStockDetails?.stock_details?.item_group || 'N/A'}</p>
                            </div>
                            <div>
                                <p className='sd-p'>Quantity</p>
                                <p className='alg-l'>{selectedStockDetails?.stock_details?.quantity || 'N/A'}</p>
                            </div>

                            <div>
                                <p className='sd-p'>Expiry Date</p>
                                <p className='alg-l'>{selectedStockDetails?.stock_details?.expiry_date || 'N/A'}</p>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>

    );
};


export default StockShortDetails