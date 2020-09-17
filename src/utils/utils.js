import {store} from "react-notifications-component";

export const showNotification = (notification) => {
    store.addNotification(notification);
};

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

export const formatDate = (date) => {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yyyy = date.getFullYear();

    return dd + '.' + mm + '.' + yyyy;
};

export const uniqueId = (notification) => {
    const id = Math.random()*1000;
    return {...notification, id}
};
