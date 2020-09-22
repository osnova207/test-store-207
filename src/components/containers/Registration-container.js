import React from "react";
import Registration from "../views/Registration";
import * as firebase from "firebase";
import {toast} from "react-toastify";

const RegistrationContainer = ({ history }) => {

    const onRegistration = (values) => {
        firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                toast.success(`E-mail ${values.email} успешно зарегистрирован`);
                history.push('/');
            })
            .catch((err) => {
                if (err.code === "auth/email-already-in-use") toast.error('Указанный e-mail уже зарегистрирован')
            })
    };

    return (
        <Registration onRegistration={onRegistration}/>
    )
};

export default RegistrationContainer;
