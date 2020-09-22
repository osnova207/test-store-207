import React from "react";
import * as PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {Formik, Field, Form} from "formik";
import moment from 'moment';
import * as Yup from "yup";
import {validationSchema} from "../../validation/add-product";
import * as cn from "classnames";
import {formErrorCheck} from '../../utils/utils'
import AddProductProperties from "./Add-product-properties";

const AddProduct = ({show, onAdd, onClose, products, properties, id}) => {

    const changeProduct = id ? products.find(item => item.id === id) : {};

    const onSave = (values) => {
        const {name, price, description, image, customProperties} = values;
        const currentDate = moment(new Date()).format("DD-MM-YYYY HH-mm");

        if (id) {
            onAdd({id, name, price, description, image, date: currentDate, customProperties});
        } else {
            values.id = (products.length) ? (products.reduce((acc, cur) => acc.id > cur.id ? acc : cur).id + 1) : 1;
            onAdd({...values, date: currentDate});
        }
    };

    return (
        <Modal
            show={show}
            centered={true}
            onHide={() => onClose()}
            className="AddProduct"
        >
            <Modal.Header className="AddProduct__header">
                <div className="AddProduct__title">
                    Добавление товара
                </div>
                <div className="AddProduct__cancel button" onClick={() => onClose()}>
                    Отменить
                </div>
            </Modal.Header>
            <Modal.Body className="AddProduct__body">
                <Formik
                    initialValues={
                        {
                            name: changeProduct.name || '',
                            price: changeProduct.price || '',
                            image: changeProduct.image || '',
                            description: changeProduct.description || '',
                            customProperties: changeProduct.customProperties || []
                        }
                    }
                    validationSchema={Yup.object().shape(validationSchema)}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(false);
                        onSave(values)
                    }}
                >
                    {({errors, touched, handleSubmit, handleChange, values}) => (
                        <Form className='AddProduct__form'>
                            <label htmlFor="name"
                                   className='AddProduct__label required'>Название товара</label>
                            <Field
                                id='name'
                                name="name"
                                placeholder='Mercedes-benz W222 s63 AMG'
                                className={cn('AddProduct__input', {'error-input': formErrorCheck(errors, touched, 'name')})}/>
                            {formErrorCheck(errors, touched, 'name') ? (
                                <div className='error-hint'>{errors.name}</div>) : null}

                            <label htmlFor="price"
                                   className='AddProduct__label required'>Стоимость товара, $</label>
                            <Field
                                id="price"
                                name='price'
                                placeholder='112 500'
                                className={cn('AddProduct__input', {'error-input': formErrorCheck(errors, touched, 'price')})}/>
                            {formErrorCheck(errors, touched, 'price') ? (
                                <div className='error-hint'>{errors.price}</div>) : null}

                            <label htmlFor="image"
                                   className='AddProduct__label required'>Изображение</label>
                            <Field
                                id="image"
                                name='image'
                                placeholder='URL картинки'
                                className={cn('AddProduct__input', {'error-input': formErrorCheck(errors, touched, 'image')})}/>
                            {formErrorCheck(errors, touched, 'image') ? (
                                <div className='error-hint'>{errors.image}</div>) : null}

                            <label htmlFor="description"
                                   className='AddProduct__label required'>Описание</label>
                            <Field
                                as='textarea'
                                id="description"
                                name='description'
                                placeholder='Введите описание'
                                className={cn('AddProduct__input textarea', {'error-input': formErrorCheck(errors, touched, 'description')})}/>
                            {formErrorCheck(errors, touched, 'description') ? (
                                <div className='error-hint'>{errors.description}</div>) : null}

                            <AddProductProperties
                                properties={properties}
                                values={values}
                                errors={errors}
                                touched={touched}
                            />

                            <button className='AddProduct__submit button'
                                    disabled={
                                        formErrorCheck(errors, touched, 'name') ||
                                        formErrorCheck(errors, touched, 'price') ||
                                        formErrorCheck(errors, touched, 'image') ||
                                        formErrorCheck(errors, touched, 'description') ||
                                        formErrorCheck(errors, touched, 'customProperties')}
                                    type='submit'
                            >
                                Сохранить
                            </button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
};

AddProduct.defaultProps = {
    show: false,
    id: 0,
    products: [],
    properties: []
};

AddProduct.propTypes = {
    id: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    products: PropTypes.array,
    properties: PropTypes.array
};

export default AddProduct;