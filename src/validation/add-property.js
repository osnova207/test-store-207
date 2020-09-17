import * as Yup from "yup";

export const validationSchema = {
    name: Yup.string()
        .min(3, 'Название слишком короткое')
        .required('Необходимо заполнить'),
    type: Yup.string()
        .required('Необходимо выбрать'),
};

