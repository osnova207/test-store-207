import * as Yup from "yup";

export const validationSchema = {
    email: Yup.string()
        .email('Неверно указан адрес электронной почты')
        .required('Необходимо заполнить'),
    password: Yup.string()
        .min(3, 'Пароль слишком короткий')
        .required('Необходимо заполнить'),
};

