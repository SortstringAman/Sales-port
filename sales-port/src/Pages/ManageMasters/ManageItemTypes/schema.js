import * as Yup from 'yup';

export const ItemtypesValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Item name is required')
    .max(100, 'Item name must be at most 100 characters'),
  
  description: Yup.string()
    .max(250, 'Description can be up to 250 characters'),
});
