import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import * as productsActions from "../actions/products";
import ApiService from "../services/ApiService";

const apiService = new ApiService();

const ProductsList = ({ dispatch, history}) => {

    const [activeSort, setActiveSort] = useState('');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        apiService.getAllProducts()
            .then(res => setProducts(res))
            .catch(() => {})
    }, []);


    const setSort = (type) => {
        setActiveSort(type);
        switch (type) {
            case 'name_up':
                return dispatch(productsActions.toSortProductsByName(true));
            case 'name_down':
                return dispatch(productsActions.toSortProductsByName(false));
            case 'price_up':
                return dispatch(productsActions.toSortProductsByPrice(true));
            case 'price_down':
                return dispatch(productsActions.toSortProductsByPrice(false));
            case 'date_up':
                return dispatch(productsActions.toSortProductsByDate(true));
            case 'date_down':
                return dispatch(productsActions.toSortProductsByDate(false));
            default:
                return null;
        }
    };

    const productsRows = products.map((product) => {
        const {id, name, price, date} = product;
        return (
            <tr key={id}>
                <td><Link to={`/products-list/${id}`}>{name}</Link></td>
                <td>{price} $</td>
                <td>{date}</td>
                <td>
                    <button
                        className='ProductsList__table__change-button button button-sm'
                        onClick={() => history.push(`/change-product/${id}`)}>Редактировать
                    </button>
                    <button
                        className='ProductsList__table__change-button button button-sm'
                        onClick={() => dispatch(productsActions.toDeleteProduct({id}))}>Удалить
                    </button>
                </td>
            </tr>
        )
    });

    return (
        <div className='ProductsList'>
            <Link to='/add-product' className='ProductsList__add-button button'>Добавить товар</Link>
            <div className='ProductsList__table-wrapper'>
                <table className="ProductsList__table">
                    <thead>
                    <tr>
                        <th onClick={() => setSort(activeSort === "name_up" ? "name_down" : "name_up")}>
                            {activeSort === "name_up" && <i className="material-icons">vertical_align_top</i> }
                            {activeSort === "name_down" && <i className="material-icons">vertical_align_bottom</i> }
                            Перечень товаров
                        </th>
                        <th onClick={() => setSort(activeSort === "price_up" ? "price_down" : "price_up")}>
                            {activeSort === "price_up" && <i className="material-icons">vertical_align_top</i> }
                            {activeSort === "price_down" && <i className="material-icons">vertical_align_bottom</i> }
                            Стоимость
                        </th>
                        <th onClick={() => setSort(activeSort === "date_up" ? "date_down" : "date_up")}>
                            {activeSort === "date_up" && <i className="material-icons">vertical_align_top</i> }
                            {activeSort === "date_down" && <i className="material-icons">vertical_align_bottom</i> }
                            Дата изменения
                        </th>
                        <th>Управление</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productsRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const mapStateToProps = (state) => {
    const { products } = state;
    return {
        products
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
