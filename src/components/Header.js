import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import * as firebase from "firebase";
import * as actions from "../actions/actions";
import * as cn from 'classnames';

class Header extends Component {

    state = {
        openBurger: false
    };

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize)
    }

    logOut = () => {
        firebase.auth().signOut()
            .then(() => {
                this.props.dispatch(actions.setLogOut());
                this.closeBurger();
            })
    };

    closeBurger = () => {
        if (this.state.openBurger) this.setState({openBurger: false})
    };

    onResize = () => {
        const width = window.innerWidth;
        if (width >= 768) this.closeBurger()
    };

    render() {
        const { openBurger } = this.state;
        const { isLogged, user, location } = this.props;
        return (
            <div className={cn("Header", {"opened": openBurger})}>
                <div className={cn("Header__home", {'active': location.pathname === '/'})}>
                    <Link to="/" onClick={this.closeBurger}>
                        <i className="material-icons">home</i>
                    </Link>
                </div>
                <div className="Header__buttons">
                    <Link to="/products-list/"
                          className={cn("Header__buttons__button", {'active': location.pathname === '/products-list/'})}
                          onClick={this.closeBurger}>
                        <i className="material-icons">view_list</i>
                        Список товаров
                    </Link>
                    <Link to="/properties-list/"
                          className={cn("Header__buttons__button", {'active': location.pathname === '/properties-list/'})}
                          onClick={this.closeBurger}>
                        <i className="material-icons">settings</i>
                        Список свойств
                    </Link>
                </div>
                <div className="Header__auth">
                    {!isLogged &&
                    <Link to="/login" className="Header__auth__button button"
                          onClick={this.closeBurger}>Авторизоваться</Link>}
                    {isLogged && <div className='Header__auth__user'>{user}</div>}
                    {isLogged &&
                    <Link to="/" className="Header__auth__button button" onClick={() => this.logOut()}>Выйти</Link>}
                </div>
                <div className={cn("Header__burger-button", {"opened": openBurger})}
                     onClick={() => this.setState({openBurger: !openBurger})}>
                    <div className="Header__burger-button_item"/>
                    <div className="Header__burger-button_item"/>
                    <div className="Header__burger-button_item"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {isLogged, user} = state;
    return {
        isLogged,
        user
    };
};

export default connect(mapStateToProps)(withRouter(Header));