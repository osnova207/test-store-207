import React from "react";
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";

const AuthRoute = ({component: Component, isLogged, ...rest}) => {
    return (
        <Route
            render={(props) => isLogged ? <Component {...props}/> : <Redirect to='/login'/>}
            {...rest}
        />
    );
};

const mapStateToProps = (state) => {
    const { isLogged } = state;
    return {
        isLogged
    }
};

export default connect(mapStateToProps)(AuthRoute);
