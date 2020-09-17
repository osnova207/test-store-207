import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProductsList from "./components/Products-list";
import PropertyList from "./components/Property-list";
import AddProduct from "./components/Add-product";
import ProductCard from "./components/Product-card";
import AddProperty from "./components/Add-property";
import AuthRoute from "./components/Auth-route";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import ReactNotification from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';
import RegisterPage from "./pages/RegistrationPage";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import {connect} from "react-redux";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({loading: false}), 2000);
    }

    render() {
        const { loading } = this.state;
        const { isLogged } = this.props;
        return (
            <div className="App">
                <div className="App_content">
                    <ReactNotification />
                    {loading &&  <Preloader />}
                    {!loading &&
                        <Router>
                            {
                                // isLogged
                             <Header />}
                            <Switch>
                                <Route path="/" component={MainPage} exact/>
                                {!isLogged && <Route path="/login" component={LoginPage} exact/>}
                                <Route path="/registration" component={RegisterPage}/>
                                <Route path="/products-list/" component={ProductsList} exact/>
                                <Route path="/products-list/:id"
                                       render={({ match }) => <ProductCard id={match.params.id}/>}/>
                                <Route path="/add-product" component={AddProduct} exact/>
                                <Route path="/change-product/:id" exact
                                       render={({match}) => <AddProduct id={match.params.id}/>}/>
                                <Route path="/properties-list/" component={PropertyList} exact/>
                                <Route path="/add-property" component={AddProperty} exact/>
                                <Route render={() => <h1>Page not found...</h1>}/>
                            </Switch>
                    </Router>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { isLogged } = state.users;
    return {
        isLogged,
    }
};

export default connect(mapStateToProps)(App);
