import React, {useState} from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {validationSchema} from "../../validation/login";
import * as cn from "classnames";
import {formErrorCheck} from "../../utils/utils";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ onLogIn }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='Login'>
            <p className='Login__title'>Вход</p>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(false);
                    onLogIn(values);
                }}>
                {({errors, touched, handleSubmit, values}) => (
                    <Form onSubmit={handleSubmit}>
                        <label htmlFor="email"
                               className='Login__label required'>E-mail:</label>
                        <Field
                            id='email'
                            name="email"
                            className={cn('Login__input', {'error-input': formErrorCheck(errors, touched, 'email' )})}/>
                        {formErrorCheck(errors, touched, 'email' ) ? (
                            <div className='error-hint'>{errors.email}</div>) : null}

                        <label htmlFor="password"
                               className='Login__label required'>Пароль:</label>
                        <Field
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            className={cn('Login__input', {'error-input': formErrorCheck(errors, touched, 'password' )})}/>
                        <div className='password-show-icon' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword && values.password && <i className='material-icons'>visibility</i>}
                        {!showPassword && values.password && <i className='material-icons'>visibility_off</i>}
                    </div>
                        {formErrorCheck(errors, touched, 'password' ) ? (
                            <div className='error-hint'>{errors.password}</div>) : null}
                        <button
                            disabled={formErrorCheck(errors, touched, 'login') ||
                            formErrorCheck(errors, touched, 'password')}
                            type="submit"
                            className='Login__submit button'>Войти</button>
                    </Form>
                )}
            </Formik>
            <Link className='Login__registration' to='/registration'>Зарегистрироваться</Link>
        </div>
    )
};

Login.propTypes = {
  onLogIn: PropTypes.func.isRequired
};

export default Login;