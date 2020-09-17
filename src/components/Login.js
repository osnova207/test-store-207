import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import {validationSchema} from "../validation/login";
import {formErrorCheck} from '../utils/utils'
import * as cn from 'classnames';
import {Link} from "react-router-dom";

const Login = ({ onLogIn }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="Login-wrapper">
            <div className='Login'>
                <p className='Login__title'>Вход</p>
                <Formik
                    initialValues={{login: '', password: ''}}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(false);
                        onLogIn(values);
                    }}>
                    {({errors, touched, handleSubmit, values}) => (
                        <Form onSubmit={handleSubmit}>
                            <label htmlFor="login"
                                   className='Login__label required'>Логин:</label>
                            <Field
                                id='login'
                                name="login"
                                className={cn('Login__input', {'error-input': formErrorCheck(errors, touched, 'login' )})}/>
                            {formErrorCheck(errors, touched, 'login' ) ? (
                                <div className='error-hint'>{errors.login}</div>) : null}

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
        </div>
    )
};

Login.propTypes = {
    onLogIn: PropTypes.func.isRequired
};

export default Login;