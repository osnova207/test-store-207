import * as firebase from "firebase";

export default class Database {
    _productsUrl = '/products';
    _propertiesUrl = '/properties';
    _productUrl = '/products/product';
    _propertyUrl = '/properties/property';

    getDatabase = (url) => {
        return firebase.database().ref(url);
    };

    products = this.getDatabase(this._productsUrl);
    properties = this.getDatabase(this._propertiesUrl);

    product = (url) => {
        return firebase.database().ref(`${this._productUrl}${url}`);
    };

    property = (url) => {
        return firebase.database().ref(`${this._propertyUrl}${url}`);
    };
}
