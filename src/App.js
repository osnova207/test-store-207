import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProductCard from "./components/Product-card";
import MainPage from "./components/MainPage";
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

const App = ({ dispatch }) => {

    const database = new Database();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) dispatch(actions.setLogIn(user.email));
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
                        <Route path="/" component={MainPage} exact/>
                        <Route path="/login" component={LoginContainer} exact/>
                        <Route path="/registration" component={RegistrationContainer}/>
                        <Route path="/products-list/" component={ProductsContainer} exact/>
                        <Route path="/products-list/:id"
                               render={({match}) => <ProductCard id={match.params.id}/>}/>
                        <Route path="/properties-list/" component={PropertiesContainer} exact/>
                        <Route render={() => <h1>Page not found...</h1>}/>
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
