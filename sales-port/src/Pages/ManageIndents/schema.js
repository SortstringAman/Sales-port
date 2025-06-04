import * as Yup from 'yup';

export const IndentSchema = Yup.object().shape({
  department: Yup.string().required('Department is required'),
  priority: Yup.string().required('Priority is required'),
  indentDate: Yup.string().required('Indent Date is required'),
  storelocation: Yup.string().required('Store Location is required'),
  file: Yup.mixed().required('Document is required'),

  // Validate stock items (rows)
itemDetails: Yup.array().of(
    Yup.object().shape({
      item: Yup.object()
        .required('Item is required')
        .typeError('Item is required'),
      currentQuantity: Yup.number()
        .typeError('Current Quantity must be a number')
        .required('Current Quantity is required'),
      requestQuantity: Yup.number()
        .typeError('Receive Quantity must be a number')
        .required('Receive Quantity is required')
        .moreThan(0, 'Receive Quantity must be more than 0'),
      expectDeliveryDate: Yup.string().required('Expected Delivery Date is required'),
      suggestVendor: Yup.object()
        .required('Vendor is required')
        .typeError('Vendor is required'),
      remark: Yup.string().nullable(), // optional
    })
  ),
});
