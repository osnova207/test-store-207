import React from "react";
import ReactDom from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from "redux";
import reducer from "./reducers/reducer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/styles.scss';
import * as firebase from 'firebase';

const store = createStore(reducer);

const config = {
    apiKey: "AIzaSyBpDHJHL3GUpHNCOlGmSjGYtI1N-cAuS7c",
    authDomain: "test-store-207.firebaseapp.com",
    databaseURL: "https://test-store-207.firebaseio.com",
    projectId: "test-store-207",
    storageBucket: "test-store-207.appspot.com",
    messagingSenderId: "317363076755",
    appId: "1:317363076755:web:c211eca407fcd959bfd766"
};

firebase.initializeApp(config);

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));


