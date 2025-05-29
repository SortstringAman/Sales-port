export const validateComponent = () => {
    const errors = [];

    // Query all elements with the required marker
    const formFields = document.querySelectorAll('[data-required="true"]');

    formFields.forEach((field) => {
        if (!field.value.trim()) {
            errors.push(field.name || 'Unnamed field');
            field.classList.add('input-error'); // Optional: add red border
        } else {
            field.classList.remove('input-error');
        }
    });

    return errors;
};
