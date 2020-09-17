import React, { Component } from "react";
import {connect} from "react-redux";
import Login from "../components/Login";
import * as usersActions from "../actions/users";
import { showNotification } from "../utils/utils";
import { AppConfig }  from "../AppConfig";

class LoginPage extends Component {

    onLogIn = (values) => {
        const { usersList, dispatch, history } = this.props;
        const { login, password } = values;
        const currentUser = usersList.find((user) => user.login === login);

        if (!currentUser) {
            showNotification(AppConfig.notifications.userNotExist);
            return;
        } else if (currentUser && currentUser.password !== password) {
            showNotification(AppConfig.notifications.wrongPassword);
            return;
        }

        dispatch(usersActions.setLogIn(login));
        history.push('/');
    };

    render() {
        return (
            <div className='LoginPage-wrapper page-wrapper'>
                <div className='LoginPage page'>
                    <Login onLogIn={this.onLogIn} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { usersList } = state.users;
    return {
        usersList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);