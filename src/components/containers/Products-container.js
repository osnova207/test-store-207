import React, {useState} from "react";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import Database from "../../database/Database";
import ProductList from "../views/Products-list";
import Pagination from "../views/Pagination";
import AddProduct from "../views/Add-product";
import * as actions from "../../actions/actions";
import {getPageProductsList, getSearchProducts} from "../../selectors/selectors";

const ProductsContainer = (props) => {
    const {
        products,
        listPerPage,
        properties,
        productsPage,
        productsPerPage,
        sortType,
        sortDirection,
        searchKey,
        searchProducts,
        dispatch
    } = props;

    const database = new Database();
    const [changeProductId, setChangeProductId] = useState(0);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const toggleAddProductModal = () => setShowAddProductModal(!showAddProductModal);

    const onEditProduct = (id) => {
        setChangeProductId(id);
        toggleAddProductModal()
    };

    const onCloseAddProductModal = () => {
      toggleAddProductModal();
      setChangeProductId(0);
    };

    const addProduct = (values) => {
        database.product(values.id).set({...values})
            .then(() => {
                changeProductId ? toast.success('Товар успешно изменен') : toast.success('Товар успешно добавлен');
                onCloseAddProductModal();
            });
    };

    const deleteProduct = (id) => {
        database.product(id).remove()
            .then(() => toast.success('Товар успешно удален'));
    };

    const getPageCount = () => {
        return Math.ceil(searchProducts.length / productsPerPage);
    };

    const changePage = (id) => dispatch(actions.setProductsPage(id));

    const changePerPageCount = (value) => dispatch(actions.setProductsPerPage(value));

    const setSort = (key) => {
        if (sortType === key) {
            dispatch(actions.setProductsSortDirectionUp())
        } else {
            dispatch(actions.setProductsSortType(key))
        }
    };

    const onSearch = (key) => dispatch(actions.setProductsSearchKey(key));

    return (
        <div className="Products">
            <ProductList
                list={listPerPage}
                onAdd={toggleAddProductModal}
                onEdit={onEditProduct}
                onDelete={deleteProduct}
                onSetSort={setSort}
                sortType={sortType}
                sortDirection={sortDirection}
                onSearch={onSearch}
                searchKey={searchKey}
            />
            <Pagination
                pageCount={getPageCount()}
                perPage={productsPerPage}
                currentPage={productsPage}
                onChangePage={changePage}
                onChangePerPage={changePerPageCount}
            />
            <AddProduct
                show={showAddProductModal}
                onAdd={addProduct}
                onClose={onCloseAddProductModal}
                products={products}
                properties={properties}
                id={changeProductId}
            />
        </div>
    );
};

const mapStateToProps = (state) => {
    const { products, properties, productsPage, productsPerPage, productsSortType, productsSortDirectionUp, productsSearchKey } = state;
    return {
        products,
        properties,
        productsPage,
        productsPerPage,
        listPerPage: getPageProductsList(state),
        sortType: productsSortType,
        sortDirection: productsSortDirectionUp,
        searchKey: productsSearchKey,
        searchProducts: getSearchProducts(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);