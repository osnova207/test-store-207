import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as propertiesActions from '../actions/properties';
import * as Yup from "yup";
import {validationSchema} from "../validation/add-property";
import {Field, Form, Formik} from "formik";
import * as cn from "classnames";
import {formErrorCheck, showNotification} from "../utils/utils";
import {AppConfig} from "../AppConfig";

const AddProperty = ({ properties, dispatch,  history }) => {

    const onSave = (values) => {
        const propertyCheck = properties.find((property) => property.name.toLowerCase() === values.name.toLowerCase());
        if (propertyCheck) {
            showNotification(AppConfig.notifications.propertyAlreadyExist);
        } else {
            values.id = (properties.length) ? (+properties.reduce((acc, cur) => acc.id > cur.id ? acc : cur).id + 1 + '') : '1';
            dispatch(propertiesActions.toAddProperty({...values}));
            showNotification(AppConfig.notifications.propertySuccessfullyAdded);
            history.push('/properties-list/');
        }
    };

    return (
        <div className='AddProperty'>
            <Formik
                initialValues={
                    {
                        name: '',
                        type: ''
                    }}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(false);
                    onSave(values);
                }}>
                {({errors, touched, handleSubmit, values}) => (
                    <Form className='AddProperty__form'
                          onSubmit={handleSubmit}>
                        <div className='AddProperty__buttons'>
                            <button
                                type='button'
                                className="AddProperty__buttons__button button"
                                onClick={() => history.push('/properties-list/')}>Отменить
                            </button>
                            <button
                                type='submit'
                                disabled={formErrorCheck(errors, touched, 'name') ||
                                formErrorCheck(errors, touched, 'type')}
                                className="AddProperty__buttons__button button">Сохранить
                            </button>
                        </div>
                        <div className='AddProperty__title'>
                            Добавление свойства
                        </div>

                        <label htmlFor="name"
                               className='AddProperty__form__label required'>Название свойства</label>
                        <Field
                            id='name'
                            name="name"
                            placeholder='Цвет авто'
                            className={cn('AddProperty__form__input', {'error-input': formErrorCheck(errors, touched, 'name')})}/>
                        {formErrorCheck(errors, touched, 'name') ? (
                            <div className='error-hint'>{errors.name}</div>) : null}

                        <label htmlFor="type"
                               className='AddProperty__form__label required'>Укажите тип свойства</label>

                        <div className="AddProperty__form__values">
                            <div className="AddProperty__form__value">
                                <Field
                                    className='custom-checkbox'
                                    id='dropdown'
                                    type='radio'
                                    name='type'
                                    value='select'/>
                                <label
                                    htmlFor='dropdown'>
                                    Dropdown
                                </label>
                            </div>
                            <div className="AddProperty__form__value">
                                <Field
                                    className='custom-checkbox'
                                    id='string'
                                    type='radio'
                                    name='type'
                                    value='string'/>
                                <label
                                    htmlFor='string'>
                                    String
                                </label>
                            </div>
                            <div className="AddProperty__form__value">

                                <Field
                                    className='custom-checkbox'
                                    id='number'
                                    type='radio'
                                    name='type'
                                    value='number'/>
                                <label
                                    htmlFor='number'>
                                    Number
                                </label>
                            </div>
                        </div>

                        {formErrorCheck(errors, touched, 'type') ? (
                            <div className='error-hint'>{errors.type}</div>) : null}
                    </Form>
                )}
            </Formik>
        </div>
    )
};

const mapStateToProps = (state) => {
    const { properties } = state;
    return {
        properties
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddProperty));
