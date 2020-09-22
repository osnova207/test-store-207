import React from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as firebase from "firebase";
import * as actions from "../actions/actions";
import * as cn from 'classnames';

const Header = ({ isLogged, user, dispatch, location }) => {

    const logOut = () => {
        firebase.auth().signOut()
            .then(() => dispatch(actions.setLogOut()))
    };

    return (
        <div className="Header">
            <div className={cn("Header__home", {'active': location.pathname === '/'})}>
                <Link to="/">
                    <i className="material-icons">home</i>
                </Link>
            </div>
            <div className="Header__buttons">
                <Link to="/products-list/" className={cn("Header__buttons__button", {'active': location.pathname === '/products-list/'})}>
                    <i className="material-icons">view_list</i>
                    Список товаров
                </Link>
                <Link to="/properties-list/" className={cn("Header__buttons__button", {'active': location.pathname === '/properties-list/'})}>
                    <i className="material-icons">settings</i>
                    Список свойств
                </Link>
            </div>
            <div className="header__auth">
                {!isLogged && <Link to="/login" className="Header__auth__button button">Авторизоваться</Link>}
                {isLogged && <div className='Header__auth__user'>{user}</div>}
                {isLogged && <Link to="/" className="Header__auth__button button" onClick={() => logOut()}>Выйти</Link>}
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const {isLogged, user} = state;
    return {
        isLogged,
        user
    };
};

export default connect(mapStateToProps)(withRouter(Header));