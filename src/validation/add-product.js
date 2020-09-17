import * as Yup from "yup";

export const validationSchema = {
    name: Yup.string()
        .min(3, 'Название слишком короткое')
        .required('Необходимо заполнить!'),
    price: Yup.number()
        .typeError('Значене должно быть числовым!')
        .required('Необходимо заполнить!'),
    image: Yup.string()
        .required('Необходимо заполнить!'),
    description: Yup.string()
        .required('Необходимо заполнить!'),
    customProperties: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string()
                    .required('Выберите из списка!'),
                value: Yup.array().of(
                    Yup.string()
                        .required('Необходимо заполнить!'))
            })
        )
};

