import * as Yup from 'yup';

export const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .required('Category name is required')
    .max(50, 'Name must be under 50 characters'),

  description: Yup.string()
    .max(200, 'Description must be under 200 characters'),

  isActive: Yup.boolean()
    .required('Status is required'),
});