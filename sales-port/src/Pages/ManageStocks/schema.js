import * as Yup from 'yup';

export const IssueStockSchema = Yup.object().shape({
  departmentName: Yup.string()
    .required('Department Name is required'),
  
  issuingTo: Yup.string()
    .required('Stock issuing to is required'),
  
  dateOfIssuing: Yup.date()
    .required('Date of Issuing is required')
    .typeError('Date of Issuing must be a valid date'),

  purpose: Yup.string()
    .nullable(),

  remark: Yup.string()
    .nullable(),

  rows: Yup.array().of(
    Yup.object().shape({
      item: Yup.object()
        .nullable()
        .required('Item is required'),
      quantity: Yup.number()
        .typeError('Quantity must be a number')
        .positive('Quantity must be positive')
        .required('Quantity is required'),
      batch: Yup.string()
        .nullable(),
      remark: Yup.string()
        .nullable(),
    })
  )
});
