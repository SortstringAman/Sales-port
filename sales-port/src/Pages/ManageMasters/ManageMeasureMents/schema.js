import * as Yup from 'yup';

export const MeasurementSchema = Yup.object().shape({
  name: Yup.string()
    .required('Measurement name is required')
    .max(50, 'Name must be under 50 characters'),

  shortCode: Yup.string()
    .required('Short code is required')
    .max(10, 'Short code must be under 10 characters'),

  description: Yup.string()
    .max(200, 'Description must be under 200 characters'),
});
