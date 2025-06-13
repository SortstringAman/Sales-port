import * as Yup from 'yup';

export const locationInitialValues = {
  country: { name: '' },
  state: { name: '', country: null },
  city: { name: '', country: null, state: null }
};

export const locationValidationSchemas = {
  country: Yup.object({
    name: Yup.string().required('Country name is required'),
  }),
  state: Yup.object({
    name: Yup.string().required('State name is required'),
    country: Yup.object().required('Country is required'),
  }),
  city: Yup.object({
    name: Yup.string().required('City name is required'),
    country: Yup.object().required('Country is required'),
    state: Yup.object().required('State is required'),
  })
};
