export const formErrorCheck = (errors, touched, formName) => {
    return !!(errors[formName] && touched[formName]);
};

    export const fieldArrayFormErrorCheck = (errors, touched, formName, index) => {
    return (
        typeof errors.customProperties === 'object' &&
        typeof errors.customProperties[index] === 'object' &&
        typeof errors.customProperties[index][formName] === 'string' &&
        typeof touched.customProperties === 'object' &&
        typeof touched.customProperties[index] === 'object' &&
        typeof touched.customProperties[index][formName] === 'boolean'
    )
};

export const fieldArraySelectFormErrorCheck = (errors, touched, formName, index, idx) => {
    return (
        typeof errors.customProperties === 'object' &&
        typeof errors.customProperties[index] === 'object' &&
        typeof errors.customProperties[index][formName] === 'object' &&
        typeof errors.customProperties[index][formName][idx] === 'string' &&
        typeof touched.customProperties === 'object' &&
        typeof touched.customProperties[index] === 'object' &&
        typeof touched.customProperties[index][formName] === 'object' &&
        typeof touched.customProperties[index][formName][idx] === 'boolean'
    )
};