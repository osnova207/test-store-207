import { createSelector } from 'reselect';

const getProductsPage = state => state.productsPage;
const getProductsPerPage = state => state.productsPerPage;
const getProducts = state => state.products;
const getPropertiesPage = state => state.propertiesPage;
const getPropertiesPerPage = state => state.propertiesPerPage;
const getProperties = state => state.properties;

export const getPageProductsList = createSelector(
    getProductsPage,
    getProductsPerPage,
    getProducts,
    (page, perPage, products) => {
        return products.filter((product, idx) => idx >= (page - 1) * perPage && idx < page * perPage)
    }
);

export const getPagePropertiesList = createSelector(
    getPropertiesPage,
    getPropertiesPerPage,
    getProperties,
    (page, perPage, properties) => {
        return properties.filter((property, idx) => idx >= (page - 1) * perPage && idx < page * perPage)
    }
);
