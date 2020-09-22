import React, {useState} from "react";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import Database from "../../database/Database";
import ProductList from "../views/Products-list";
import Pagination from "../views/Pagination";
import AddProduct from "../views/Add-product";
import * as actions from "../../actions/actions";
import {getPageProductsList} from "../../selectors/selectors";

const ProductsContainer = ({ products, listPerPage, properties, productsPage, productsPerPage, dispatch}) => {

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
        return Math.ceil(products.length / productsPerPage);
    };

    const changePage = (id) => {
        dispatch(actions.setProductsPage(id))
    };

    return (
        <div className="Products">
            <ProductList
                list={listPerPage}
                onAdd={toggleAddProductModal}
                onEdit={onEditProduct}
                onDelete={deleteProduct}
            />
            <Pagination
                pageCount={getPageCount()}
                currentPage={productsPage}
                onChangePage={changePage}
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
    const { products, properties, productsPage, productsPerPage} = state;
    return {
        products,
        properties,
        productsPage,
        productsPerPage,
        listPerPage: getPageProductsList(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);