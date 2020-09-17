import axios from 'axios';

export default class ApiService {

    _apiBase = 'https://test-store-207.firebaseio.com';

    getResource = async (url) => {
        const res = await axios.get(`${this._apiBase}${url}.json`);

        if (!res) {
            throw new Error(`Could not fetch ${this._apiBase}${url}` +
                `, received ${res.status}`)
        }
        return res.data;
    };

    getAllProducts = () => {
        return this.getResource(`/products`);
    };

    getAllProperties = () => {
        return this.getResource(`/properties`);
    };

    getProduct = (id) => {
        return this.getResource(`/products/${id}`);
    };
}