import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {validationSchema} from "../../validation/registration";
import * as cn from "classnames";
import {formErrorCheck} from "../../utils/utils";
import {Link} from "react-router-dom";

const Registration = ({ onRegistration }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='Registration'>
            <p className='Registration__title'>Регистрация</p>
            <Formik
                initialValues={{email: '', password: '', confirmPassword: ''}}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(false);
                    onRegistration(values);
                }}>
                {({values, errors, touched, handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <label htmlFor="email"
                               className='Registration__label required'>E-mail:</label>
                        <Field
                            id='email'
                            name='email'
                            className={cn('Registration__input', {'error-input': formErrorCheck(errors, touched, 'email')})}/>
                        {formErrorCheck(errors, touched, 'email') ? (
                            <div className='error-hint'>{errors.email}</div>) : null}

                        <label htmlFor="password"
                               className='Registration__label required'>Пароль:</label>
                        <Field
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            className={cn('Registration__input', {'error-input': formErrorCheck(errors, touched, 'password')})}/>
                        <div className='password-show-icon' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword && values.password && <i className='material-icons'>visibility</i>}
                            {!showPassword && values.password && <i className='material-icons'>visibility_off</i>}
                        </div>
                        {formErrorCheck(errors, touched, 'password') ? (
                            <div className='error-hint'>{errors.password}</div>) : null}

                        <div className={cn({'hide': showPassword})}>
                            <label htmlFor="confirmPassword"
                                   className='Registration__label required'>Подтвердите пароль:</label>
                            <Field
                                id='confirmPassword'
                                name='confirmPassword'
                                type={showPassword ? 'text' : 'password'}
                                className={cn('Registration__input', {'error-input': formErrorCheck(errors, touched, 'confirmPassword')})}/>
                            {formErrorCheck(errors, touched, 'confirmPassword') ? (
                                <div className='error-hint'>{errors.confirmPassword}</div>) : null}
                        </div>

                        <button
                            disabled={formErrorCheck(errors, touched, 'email') ||
                                        formErrorCheck(errors, touched, 'password') ||
                                        (showPassword ? false : formErrorCheck(errors, touched, 'confirmPassword'))}
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