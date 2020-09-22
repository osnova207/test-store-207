import * as Yup from "yup";

export const validationSchema = {
    email: Yup.string()
        .email('Неверно введен адрес электронной почты')
        .required('Необходимо заполнить'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Необходимо заполнить'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Необходимо заполнить')
};

