import * as Yup from 'yup';

export const VendorSchema = Yup.object().shape({
  vendorName: Yup.string().required('Vendor Name is required'),
  vendorType: Yup.string().required('Vendor Type is required'),
  contactPerson: Yup.string().required('Contact Person is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  billingAddress: Yup.string().required('Billing Address is required'),
  shippingAddress: Yup.string().required('Shipping Address is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string().required('Pincode is required'),
  bankName: Yup.string().required('Bank Name is required'),
  accountNumber: Yup.string().required('Account Number is required'),
  ifsc: Yup.string().required('IFSC Code is required'),
  paymentTerms: Yup.string().required('Payment Terms is required'),
  gst: Yup.string().required('GST is required'),
  pan: Yup.string().required('PAN is required'),
});
