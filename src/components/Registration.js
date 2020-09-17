import React from "react";
import PropTypes from 'prop-types';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {validationSchema} from "../validation/registration";
import * as cn from "classnames";
import {formErrorCheck} from "../utils/utils";
import {Link} from "react-router-dom";

const Registration = ({ onRegistration }) => {

    return (
        <div className='Registration'>
            <p className='Registration__title'>Регистрация</p>
            <Formik
                initialValues={{login: '', password: '', email: ''}}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(false);
                    onRegistration(values);
                }}>
                {({errors, touched, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <label htmlFor="login"
                               className='Registration__label required'>Логин</label>
                        <Field
                            id='login'
                            name="login"
                            className={cn('Registration__input', {'error-input': formErrorCheck(errors, touched, 'login')})}/>
                        {formErrorCheck(errors, touched, 'login') ? (
                            <div className='error-hint'>{errors.login}</div>) : null}

                        <label htmlFor="password"
                               className='Registration__label required'>Пароль</label>
                        <Field
                            id='password'
                            name='password'
                            className={cn('Registration__input', {'error-input': formErrorCheck(errors, touched, 'password')})}/>
                        {formErrorCheck(errors, touched, 'password') ? (
                            <div className='error-hint'>{errors.password}</div>) : null}

                        <label htmlFor="email"
                               className='Registration__label required'>E-mail</label>
                        <Field
                            id='email'
                            name='email'
                            className={cn('Registration__input', {'error-input': formErrorCheck(errors, touched, 'email')})}/>
                        {formErrorCheck(errors, touched, 'email') ? (
                            <div className='error-hint'>{errors.email}</div>) : null}
                        <button
                            disabled={formErrorCheck(errors, touched, 'login') ||
                            formErrorCheck(errors, touched, 'password') ||
                            formErrorCheck(errors, touched, 'email')}
                            type="submit"
                            className='Registration__submit button'>Зарегистрироваться
                        </button>
                    </Form>
                )}
            </Formik>
            <Link className='Registration__back' to='/login'>вернуться</Link>
        </div>
    )
};

Registration.propTypes = {
    onRegistration: PropTypes.func.isRequired
};

export default Registration;