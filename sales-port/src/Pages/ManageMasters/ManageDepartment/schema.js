import * as Yup from 'yup';

export const DepartmentSchema = Yup.object().shape({
  name: Yup.string().required('Department name is required'),
  description: Yup.string().max(250, 'Description should be under 250 characters'),
});
