import * as Yup from 'yup';

export const VendorSchema = Yup.object().shape({
  poNumber: Yup.string().required('PO Number is required'),
  dateOfReceiving: Yup.string().required('Receiving Date is required'),
  billNo: Yup.string().required('Bill Number is required'),
  storeIn: Yup.string().required('Store In is required'),

  vendorName: Yup.string().required('Vendor Name is required'),
  vendorType: Yup.string().required('Vendor Type is required'),
  contactPerson: Yup.string().required('Contact Person is required'),
  contactNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit contact number')
    .required('Contact Number is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  billingAddress: Yup.string().required('Billing Address is required'),
  shippingAddress: Yup.string().required('Shipping Address is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string()
    .matches(/^\d{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required'),
  bankName: Yup.string().required('Bank Name is required'),
  accountNumber: Yup.string()
    .matches(/^\d{9,18}$/, 'Account Number must be between 9 and 18 digits')
    .required('Account Number is required'),
  ifsc: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Enter a valid IFSC code')
    .required('IFSC Code is required'),
  paymentTerms: Yup.string().required('Payment Terms is required'),
  gst: Yup.string()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, 'Enter a valid GST number')
    .required('GST is required'),
  pan: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Enter a valid PAN number')
    .required('PAN is required'),

file: Yup.mixed()
  .required('File is required')
  .test('fileExists', 'A file must be uploaded', value => value instanceof File),

});
