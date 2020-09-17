import * as Yup from "yup";

export const validationSchema = {
    login: Yup.string()
        .min(3, 'Логин слишком короткий')
        .required('Необходимо заполнить'),
    password: Yup.string()
        .min(3, 'Пароль слишком короткий')
        .required('Необходимо заполнить'),
    email: Yup.string()
        .min(3, 'E-mail слишком короткий')
        .required('Необходимо заполнить')
        .email('Неверно введен адрес электронной почты'),
};

