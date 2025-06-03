// schemas/itemSchema.js
import * as Yup from 'yup';

export const itemValidationSchema = Yup.object().shape({
  itemName: Yup.string().required('Item name is required'),
  itemCategory: Yup.object().required('Item category is required'),
  uom: Yup.object().required('Unit of measurement is required'),
  itemType: Yup.object().required('Item type is required'),
  minStock: Yup.number().nullable().min(0, 'Must be a non-negative number'),
  reorderLevel: Yup.number().nullable().min(0, 'Must be a non-negative number'),
  sku: Yup.string(),
  defaultVendor: Yup.object().nullable(),
  storageCondition: Yup.object().nullable(),
  brand: Yup.string(),
  shelfLife: Yup.number().nullable().min(0, 'Must be a non-negative number'),
  batchEnabled: Yup.boolean(),
  expiryRequired: Yup.boolean(),
  description: Yup.string()
});
