import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProductCard from "./components/Product-card";
import StartPage from "./components/StartPage";
import Header from "./components/Header";
import {connect} from "react-redux";
import Database from "./database/Database";
import * as actions from "./actions/actions";
import ProductsContainer from "./components/containers/Products-container";
import PropertiesContainer from "./components/containers/Properties-container";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LoginContainer from "./components/containers/Login-container";
import * as firebase from "firebase";
import RegistrationContainer from "./components/containers/Registration-container";
import AuthRoute from "./components/Auth-route";

const App = ({ dispatch }) => {

    const database = new Database();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            dispatch(actions.setLogIn(user.email))
        } else {
            dispatch(actions.setLogOut())
        }
    });

    database.products.on('value', (snapshot => {
        dispatch(actions.updateProducts(snapshot.val()));
    }));

    database.properties.on('value', (snapshot => {
        dispatch(actions.updateProperties(snapshot.val()));
    }));

    return (
        <div className="App">
            <div className="App__content">
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    draggable
                    pauseOnHover
                />
                <Router>
                    <Header/>
                    <Switch>
                        <Route path="/" component={StartPage} exact/>
                        <Route path="/login" component={LoginContainer} exact/>
                        <Route path="/registration" component={RegistrationContainer}/>
                        <AuthRoute path="/products-list/" component={ProductsContainer} exact/>
                        <AuthRoute path="/products-list/:id" component={ProductCard} />
                        <AuthRoute path="/properties-list/" component={PropertiesContainer} exact />
                        <Route render={() => <div className="PageNotFount">Страница не найдена...</div>}/>
                    </Switch>
                </Router>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {

    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
