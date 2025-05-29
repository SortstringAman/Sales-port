// src/utils/validators.js

export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  export const validatePhoneNumber = (number) => {
    return /^\d{10}$/.test(number);
  };
  
  export const validateRequired = (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  };
  
  export const validateMinLength = (value, min) => {
    return value.length >= min;
  };
  
  export const validateMaxLength = (value, max) => {
    return value.length <= max;
  };
  
  // More rules can be added...
  