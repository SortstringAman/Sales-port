import * as Yup from 'yup';

export const PurchaseOrderSchema = Yup.object().shape({
  indentNumber: Yup.string().required('Indent number is required'),
  indentDate: Yup.date().required('Indent date is required').typeError('Invalid date'),
  requestedBy: Yup.string().required('Requested by is required'),
  poDate: Yup.date().required('PO date is required').typeError('Invalid date'),
  createdBy: Yup.string().required('Created by is required'),
  vendorName: Yup.string().required('Vendor name is required'),
  vendorContact: Yup.string()
    .required('Vendor contact is required')
    .matches(/^[0-9]{10,15}$/, 'Enter a valid contact number'),
  deliveryAddress: Yup.string().required('Delivery address is required'),
  billingAddress: Yup.string().required('Billing address is required'),
  deliveryDate: Yup.date().required('Delivery date is required').typeError('Invalid date'),
  paymentTerms: Yup.string().required('Payment terms are required'),

  itemName: Yup.string().nullable(),
  itemIndentNumber: Yup.string().nullable(),
  reqQuantity: Yup.number()
    .nullable()
    .typeError('Required quantity must be a number')
    .positive('Quantity must be greater than 0'),
  approvedQuantity: Yup.number()
    .nullable()
    .typeError('Approved quantity must be a number')
    .positive('Quantity must be greater than 0'),
  uom: Yup.string().nullable(),
  unitRate: Yup.number()
    .nullable()
    .typeError('Unit rate must be a number')
    .positive('Rate must be positive'),
  totalAmount: Yup.number()
    .nullable()
    .typeError('Total amount must be a number')
    .min(0, 'Total amount must be non-negative'),
  gst: Yup.number()
    .nullable()
    .typeError('GST must be a number')
    .min(0, 'GST cannot be negative'),

  itemRemarks: Yup.string().nullable(),

  subTotal: Yup.number()
    .required('Subtotal is required')
    .typeError('Subtotal must be a number')
    .min(0, 'Subtotal must be non-negative'),

  totalTax: Yup.number()
    .required('Total tax is required')
    .typeError('Total tax must be a number')
    .min(0, 'Total tax must be non-negative'),

  grandTotal: Yup.number()
    .required('Grand total is required')
    .typeError('Grand total must be a number')
    .min(0, 'Grand total must be non-negative'),

  currency: Yup.string().required('Currency is required'),

  gstCert: Yup.mixed()
    .nullable()
    .test('fileSize', 'GST Certificate must be less than 2MB', (value) => {
      if (!value) return true; // optional
      return value.size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Invalid file type for GST Certificate', (value) => {
      if (!value) return true;
      return ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type);
    }),

  panCard: Yup.mixed()
    .nullable()
    .test('fileSize', 'PAN Card must be less than 2MB', (value) => {
      if (!value) return true;
      return value.size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Invalid file type for PAN Card', (value) => {
      if (!value) return true;
      return ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type);
    }),

  term: Yup.string().nullable(),
});
