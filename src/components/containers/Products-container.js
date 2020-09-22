import React, {useState} from "react";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import Database from "../../database/Database";
import ProductList from "../views/Products-list";
import AddProduct from "../views/Add-product";

const ProductsContainer = ({ products, properties }) => {

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

    return (
        <div className="Products">
            <ProductList
                list={products}
                onAdd={toggleAddProductModal}
                onEdit={onEditProduct}
                onDelete={deleteProduct}
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
    const { products, properties } = state;
    return {
        products,
        properties,
    }
};

export default connect(mapStateToProps)(ProductsContainer);