import {createSelector} from 'reselect';

const getProductsPage = state => state.productsPage;
const getProductsPerPage = state => state.productsPerPage;
const getProducts = state => state.products;
const getPropertiesPage = state => state.propertiesPage;
const getPropertiesPerPage = state => state.propertiesPerPage;
const getProperties = state => state.properties;
const getProductsSortType = state => state.productsSortType;
const getProductsSortDirectionUp = state => state.productsSortDirectionUp;
const getPropertiesSortType = state => state.propertiesSortType;
const getPropertiesSortDirectionUp = state => state.propertiesSortDirectionUp;
const getProductsSearchKey = state => state.productsSearchKey.toLowerCase();
const getPropertiesSearchKey = state => state.propertiesSearchKey.toLowerCase();

export const getSearchProducts = createSelector(
    [getProducts, getProductsSearchKey],
    (products, key) => {
        if (!key) return products;
        return products.filter(product => product.name.toLowerCase().indexOf(key) > -1 || product.price.indexOf(key) > -1)
    }
);

export const getSearchProperties = createSelector(
    [getProperties, getPropertiesSearchKey],
    (properties, key) => {
        if (!key) return properties;
        return properties.filter(property => property.name.toLowerCase().indexOf(key) > -1 || property.type.toLowerCase().indexOf(key) > -1)
    }
);

const getSortedProducts = createSelector(
    [getSearchProducts, getProductsSortType, getProductsSortDirectionUp],
    (products, type, direction) => {
        if (!type) return products;
        if (type === "price") {
            return products.sort((a, b) => (
                direction ? a[type].replace(/\s/g, "") - b[type].replace(/\s/g, "") : b[type].replace(/\s/g, "") - a[type].replace(/\s/g, "")
            ))
        } else {
            return products.sort((a, b) => (
                direction ? (a[type].toLowerCase() > b[type].toLowerCase() ? 1 : - 1) : (a[type].toLowerCase() < b[type].toLowerCase() ? 1 : - 1)
            ))
        }
    }
);

const getSortedProperties= createSelector(
    [getSearchProperties, getPropertiesSortType, getPropertiesSortDirectionUp],
    (products, type, direction) => {
        if (!type) return products;
        return products.sort((a, b) => (
            direction ? (a[type].toLowerCase() > b[type].toLowerCase() ? 1 : - 1) : (a[type].toLowerCase() < b[type].toLowerCase() ? 1 : - 1)
        ))
    }
);

export const getPageProductsList = createSelector(
    [getProductsPage, getProductsPerPage, getSortedProducts, getProductsSortType, getProductsSortDirectionUp],
    (page, perPage, products) => {
        return products.filter((product, idx) => idx >= (page - 1) * perPage && idx < page * perPage)
    }
);

export const getPagePropertiesList = createSelector(
    [getPropertiesPage, getPropertiesPerPage, getSortedProperties, getPropertiesSortType, getPropertiesSortDirectionUp],
    (page, perPage, properties) => {
        return properties.filter((property, idx) => idx >= (page - 1) * perPage && idx < page * perPage)
    }
);