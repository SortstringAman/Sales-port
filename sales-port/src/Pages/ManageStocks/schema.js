import * as Yup from 'yup';

export const IssueStockSchema = Yup.object().shape({
  department_name: Yup.string()
    .required('Department is required'),

  issuingto: Yup.string()
    .required('Issuing To is required'),

  date_of_issuing: Yup.date()
    .required('Date of issuing is required')
    .typeError('Invalid date format'),

  stockDetails: Yup.array()
    .of(
      Yup.object().shape({
        item: Yup.string()
          .required('Item is required'),
        quantity: Yup.number()
          .typeError('Quantity must be a number')
          .positive('Quantity must be greater than 0')
          .required('Quantity is required'),
        batch: Yup.string().nullable(),
        expiry: Yup.string().nullable(),
        remark: Yup.string().nullable(),
      })
    )
    .min(1, 'At least one item is required'),

  purpose: Yup.string()
    .nullable()
    .max(500, 'Purpose must be at most 500 characters'),

  remark: Yup.string()
    .nullable()
    .max(500, 'Remark must be at most 500 characters'),
});





export const ReceiveStockSchema = Yup.object().shape({
  poNumber: Yup.string()
    .required('PO Number is required'),

  vendorName: Yup.string()
    .required('Vendor Name is required'),

  dateOfReceiving: Yup.date()
    .required('Date of Receiving is required')
    .typeError('Date must be a valid format'),

  billNo: Yup.string()
    .required('Bill No is required'),

  storeIn: Yup.string()
    .required('Store In is required'),

  file: Yup.mixed()
    .required('File is required'),

  stockItems: Yup.array()
    .of(
      Yup.object().shape({
        item: Yup.object()
          .nullable()
          .required('Item is required'),
        quantity: Yup.number()
          .typeError('Quantity must be a number')
          .positive('Quantity must be greater than 0')
          .required('Quantity is required'),
        batch: Yup.string().nullable(),
        expiry: Yup.date()
          .nullable()
          .typeError('Expiry must be a valid date'),
        remark: Yup.string().nullable(),
      })
    )
    .min(1, 'At least one item is required')
});
