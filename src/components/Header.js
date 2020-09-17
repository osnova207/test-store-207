import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as usersActions from '../actions/users';

const Header = ({ isLogged, activeUser, dispatch, state }) => {

        return (
            <div className="Header">
                <div className="Header__home">
                    <Link to="/">
                        <i className="material-icons">home</i>
                    </Link>
                </div>
                <div className="Header__buttons">
                    <Link to="/products-list/" className="Header__buttons__button">
                        <i className="material-icons">view_list</i>
                        Список товаров
                    </Link>
                    <Link to="/properties-list/" className="Header__buttons__button">
                        <i className="material-icons">settings</i>
                        Список свойств
                    </Link>
                </div>
                <div className="header__auth">
                    {/*{!isLogged && <Link to="/login" className="Header__auth__button">Авторизоваться</Link>}*/}
                    {isLogged && <div className='Header__auth__user'>Добро пожаловать,&nbsp;<b>{activeUser}</b></div>}
                    {isLogged && <Link to="/" className="Header__auth__button button" onClick={() => dispatch(usersActions.setLogOut())}>Выйти</Link>}
                </div>
                <div onClick={() => console.log(state)}>Show state</div>
            </div>
        )
};

const mapStateToProps = (state) => {
    const  { isLogged, activeUser } = state.users;
    return {
        isLogged,
        activeUser,
        state
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);