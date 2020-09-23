const initialState = {
    isLogged: false,
    user: '',
    products: [],
    properties: [],
    productsPage: 1,
    productsPerPage: 10,
    propertiesPage: 1,
    propertiesPerPage: 10,
    productsSortType: '',
    productsSortDirectionUp: true,
    propertiesSortType: '',
    propertiesSortDirectionUp: true,
    productsSearchKey: '',
    propertiesSearchKey: ''
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case "SET_LOG_IN":
            return {...state, isLogged: true, user: action.payload };

        case "SET_LOG_OUT":
            return {...state, isLogged: false, user: '' };

        case "UPDATE_PRODUCTS":
            const products = action.payload ? Object.values(action.payload) : [];
            return {...state, products };

        case "UPDATE_PROPERTIES":
            const properties = action.payload ? Object.values(action.payload) : [];
            return {...state, properties };

        case "SET_PRODUCTS_PAGE":
            return {...state, productsPage: action.payload };

        case "SET_PROPERTIES_PAGE":
            return {...state, propertiesPage: action.payload };

        case "SET_PRODUCTS_PER_PAGE":
            return {...state, productsPerPage: action.payload };

        case "SET_PROPERTIES_PER_PAGE":
            return {...state, propertiesPerPage: action.payload };

        case "SET_PRODUCTS_SORT_TYPE":
            return {...state, productsSortType: action.payload, productsSortDirectionUp: true };

        case "SET_PRODUCTS_SORT_DIRECTION_UP":
            return {...state, productsSortDirectionUp: !state.productsSortDirectionUp };

        case "SET_PROPERTIES_SORT_TYPE":
            return {...state, propertiesSortType: action.payload, propertiesSortDirectionUp: true };

        case "SET_PROPERTIES_SORT_DIRECTION_UP":
            return {...state, propertiesSortDirectionUp: !state.propertiesSortDirectionUp };

        case "SET_PRODUCTS_SEARCH_KEY":
            return {...state, productsSearchKey: action.payload };

        case "SET_PROPERTIES_SEARCH_KEY":
            return {...state, propertiesSearchKey: action.payload };

        default:
            return state;
    }
};

export default reducer;