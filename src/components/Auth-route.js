import React from "react";
import {connect} from 'react-redux';
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({component: Component, isLogged, ...rest}) => {
    return (
        <Route
            render={(props) => isLogged ? <Component {...props}/> : <Redirect to='/login'/>}
            {...rest}
        />
    );
};

const mapStateToProps = (state) => {
    const { isLogged } = state.users;
    return {
        isLogged
    }
};

export default connect(mapStateToProps)(AuthRoute);
