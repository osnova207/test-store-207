import React, {Component} from "react";
import {connect} from "react-redux";
import * as usersActions from "../actions/users";
import { showNotification } from "../utils/utils";
import { AppConfig } from "../AppConfig";
import Registration from "../components/Registration";
import { uniqueId } from "../utils/utils";

class RegistrationPage extends Component {

    onRegistration = (values) => {
        const { usersList, dispatch, history } = this.props;
        const { login } = values;

        const checkLogin = usersList.find((user) => user.login === login);

        if (checkLogin) {
            showNotification(uniqueId(AppConfig.notifications.userAlreadyExist));
            return;
        }

        dispatch(usersActions.toAddNewUser(values));
        dispatch(usersActions.setLogIn(login));
        history.push('/');
        showNotification({
            ...AppConfig.notifications.successfullyRegister,
            title: `Уважаемый ${login}!`
        });
    };

    render() {
        return (
            <div className="RegistrationPage-wrapper page-wrapper">
                <div className="RegistrationPage page">
                    <Registration onRegistration={this.onRegistration}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
