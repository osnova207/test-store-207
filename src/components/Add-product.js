import React, {Component} from "react";
import {connect} from "react-redux";
import * as productsActions from '../actions/products';
import {Formik, Field, Form, FieldArray} from "formik";
import {validationSchema} from "../validation/add-product";
import * as Yup from "yup";
import * as cn from "classnames";
import {
    formErrorCheck,
    fieldArrayFormErrorCheck,
    fieldArraySelectFormErrorCheck,
    formatDate,
    showNotification
} from '../utils/utils'
import { withRouter } from "react-router-dom";
import { AppConfig } from "../AppConfig";

class AddProduct extends Component {

    constructor(props) {
        super(props);
        if (this.props.id) {
            this.changeProduct = this.props.products.find((product) => product.id === this.props.id)
        }

        this.state = {
            changeProduct: this.changeProduct || {},
        }
    }

    onSave (values) {
        const { name, price, description, image, customProperties } = values;
        const { dispatch, products, id } = this.props;
        const currentDate = formatDate(new Date());

        if (id) {
            dispatch(productsActions.toChangeProduct({id, name, price, description, image, date: currentDate, customProperties}));
            showNotification(AppConfig.notifications.productSuccessfullyUpdate);
        } else {
            values.id = (products.length) ? (+products.reduce((acc, cur) => acc.id > cur.id ? acc : cur).id + 1 + '') : '1';
            dispatch(productsActions.toAddProduct({...values, date: currentDate}));
            showNotification(AppConfig.notifications.productSuccessfullyAdded);
        }
        this.props.history.push('/products-list/');
    };

    getValuesBlock = (values, index, errors, touched) => {

        const selectedPropertyType = values.customProperties[index].type ||
            this.props.properties.find(item => item.name === values.customProperties[index].name).type;

        switch (selectedPropertyType) {
            case 'string':
                values.customProperties[index].type = selectedPropertyType;
                return (
                    <>
                        <label htmlFor={`customProperties[${index}].value`}
                               className='AddProduct__form__label required'>{`Значение свойства ${index + 1}`}
                        </label>
                        <Field
                            id={`customProperties[${index}].value`}
                            name={`customProperties[${index}].value[0]`}
                            type={'text'}
                            value={values.customProperties[index].value[0]}
                            className={cn('AddProduct__form__input', {'error-input': fieldArraySelectFormErrorCheck(errors, touched, 'value', index, 0)})}
                        />
                        {fieldArraySelectFormErrorCheck(errors, touched, 'value', index, 0) ? (
                            <div className='error-hint'>{errors.customProperties[index].value[0]}</div>) : null}
                    </>
                );

            case 'number':
                values.customProperties[index].type = selectedPropertyType;
                return (
                    <>
                        <label htmlFor={`customProperties[${index}].value`}
                               className='AddProduct__form__label required'>{`Значение свойства ${index + 1}`}</label>
                        <Field
                            id={`customProperties[${index}].value`}
                            name={`customProperties[${index}].value[0]`}
                            value={values.customProperties[index].value[0]}
                            className={cn('AddProduct__form__input', {'error-input': fieldArraySelectFormErrorCheck(errors, touched, 'value', index, 0)})}/>
                        {fieldArraySelectFormErrorCheck(errors, touched, 'value', index, 0) ? (
                            <div className='error-hint'>{errors.customProperties[index].value[0]}</div>) : null}
                    </>
                );

            case 'select':
                values.customProperties[index].type = selectedPropertyType;
                return (
                    <FieldArray
                        name={`customProperties[${index}].value`}
                        render={({push, remove}) => (
                            <div className="select-values-block">
                                <div className='AddProduct__form__label required'>{`Значение свойства ${index + 1}`}</div>
                                {values.customProperties[index].value && values.customProperties[index].value.map((prop, idx) => (
                                    <div className="select-value" key={idx}>
                                        <Field
                                            name={`customProperties[${index}].value[${idx}]`}
                                            className={cn('AddProduct__form__input', {'error-input': fieldArraySelectFormErrorCheck(errors, touched, 'value', index, idx)})}
                                        >
                                        </Field>
                                        {fieldArraySelectFormErrorCheck(errors, touched, 'value', index, idx) ? (
                                            <div className='error-hint'>{errors.customProperties[index].value[idx]}</div>) : null}
                                        <button
                                            className="AddProduct__form__form-button delete"
                                            type="button"
                                            onClick={() => remove(index)}
                                        >
                                            -
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="AddProduct__form__form-button"
                                    type="button"
                                    onClick={() => {
                                        push('')
                                    }}>
                                    +
                                </button>
                            </div>
                        )}
                    />
                );

            default:
                return null;
        }
    };

    render () {

        const { changeProduct } = this.state;
        const { properties } = this.props;

        return (
            <div className='AddProduct'>
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
                        this.onSave(values)
                    }}
                >
                    {({ errors, touched, handleSubmit, handleChange, values }) => (
                        <Form className='AddProduct__form'>
                            <div className='AddProduct__buttons'>
                                <button
                                    type='button'
                                    className="AddProduct__buttons__button button"
                                    onClick={() => this.props.history.push('/products-list/')}>Отменить
                                </button>
                                <button
                                    disabled={
                                        formErrorCheck(errors, touched, 'name') ||
                                        formErrorCheck(errors, touched, 'price') ||
                                        formErrorCheck(errors, touched, 'image') ||
                                        formErrorCheck(errors, touched, 'description') ||
                                        formErrorCheck(errors, touched, 'customProperties')}
                                    type='submit'
                                    className="AddProduct__buttons__button button">Сохранить
                                </button>
                            </div>
                            <div className='AddProduct__title'>
                                Добавление товара
                            </div>
                            <label htmlFor="name"
                                   className='AddProduct__form__label required'>Название товара</label>
                            <Field
                                id='name'
                                name="name"
                                placeholder='Mercedes-benz W222 s63 AMG'
                                className={cn('AddProduct__form__input', {'error-input': formErrorCheck(errors, touched, 'name')})}/>
                            {formErrorCheck(errors, touched, 'name') ? (
                                <div className='error-hint'>{errors.name}</div>) : null}

                            <label htmlFor="price"
                                   className='AddProduct__form__label required'>Стоимость товара</label>
                            <Field
                                id="price"
                                name='price'
                                placeholder='112 500'
                                className={cn('AddProduct__form__input', {'error-input': formErrorCheck(errors, touched, 'price')})}/>
                            {formErrorCheck(errors, touched, 'price') ? (
                                <div className='error-hint'>{errors.price}</div>) : null}

                            <label htmlFor="image"
                                   className='AddProduct__form__label required'>Изображение</label>
                            <Field
                                id="image"
                                name='image'
                                placeholder='URL картинки'
                                className={cn('AddProduct__form__input', {'error-input': formErrorCheck(errors, touched, 'image')})}/>
                            {formErrorCheck(errors, touched, 'image') ? (
                                <div className='error-hint'>{errors.image}</div>) : null}

                            <label htmlFor="description"
                                   className='AddProduct__form__label required'>Описание</label>
                            <Field
                                as='textarea'
                                id="description"
                                name='description'
                                placeholder='Введите описание'
                                className={cn('AddProduct__form__input textarea', {'error-input': formErrorCheck(errors, touched, 'description')})}/>
                            {formErrorCheck(errors, touched, 'description') ? (
                                <div className='error-hint'>{errors.description}</div>) : null}

                            <FieldArray
                                name="customProperties"
                                render={({push, remove}) => (
                                    <div className="AddProduct__form__custom-properties">
                                        <div className='AddProduct__title sub-title'>
                                            Добавление товару свойств
                                            {values.customProperties && values.customProperties.length < properties.length &&
                                            <button
                                                className="AddProduct__form__form-button"
                                                type="button"
                                                onClick={() => {
                                                    push({
                                                        name: "",
                                                        value: [''],
                                                    })
                                                }}>
                                                +
                                            </button>}
                                        </div>

                                        {values.customProperties && values.customProperties.map((property, index) => (
                                            <div className="AddProduct__form__block" key={index}>

                                                <div className="AddProduct__form__block_left">
                                                    <label htmlFor={`customProperties[${index}].name`}
                                                           className='AddProduct__form__label required'>{`Свойство ${index + 1}`}</label>
                                                    <Field
                                                        id={`customProperties[${index}].name`}
                                                        component={'select'}
                                                        name={`customProperties[${index}].name`}
                                                        className={cn('AddProduct__form__input', {'error-input': fieldArrayFormErrorCheck(errors, touched, 'name', index)})}>
                                                        {(values.customProperties[index].name) ?
                                                            (<option label={values.customProperties[index].name}/>)
                                                            : (<option hidden value={'0'}>{'Выберите свойство'}</option>)}
                                                        {properties.map((option, idx) =>
                                                            (values.customProperties.find((item) => item.name === option.name) ?
                                                                null : <option key={idx}>{option.name}</option>))}
                                                    </Field>
                                                    {fieldArrayFormErrorCheck(errors, touched, 'name', index) ? (
                                                        <div className='error-hint'>{errors.customProperties[index].name}</div>) : null}

                                                    <button
                                                        className="AddProduct__form__form-button delete"
                                                        type="button"
                                                        onClick={() => remove(index)}>
                                                        -
                                                    </button>
                                                </div>

                                                <div className="AddProduct__form__block_right">
                                                    {values.customProperties[index].name && this.getValuesBlock(values, index, errors, touched)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { products, properties } = state;
    return {
        products,
        properties,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProduct));