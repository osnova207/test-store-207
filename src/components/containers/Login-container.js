import React from "react";
import Login from "../views/Login";
import * as firebase from "firebase";
import {toast} from "react-toastify";

const LoginContainer = ({ history }) => {

    const logIn = (values) => {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                toast.success('Добро пожаловать!');
                history.push('/');
            })
            .catch(error => {
                authErrors(error.code);
            })
    };

    const authErrors = (error) => {
        switch (error) {
            case "auth/wrong-password":
                return toast.error('Неверно указан пароль');

            case "auth/user-not-found":
                return toast.error('Указанного пользователя не существует');

            case "auth/too-many-requests":
                return toast.error('Слишком много запросов. Повторите попытку позже');

            default:
                return null;
        }
    };

    return (
        <Login onLogIn={logIn} />
    )
};

export default LoginContainer;