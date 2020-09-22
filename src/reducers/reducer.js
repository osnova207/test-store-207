const initialState = {
    isLogged: false,
    user: '',
    products: [],
    properties: [],
    productsPage: 1,
    productsPerPage: 3,
    propertiesPage: 1,
    propertiesPerPage: 2,
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

        default:
            return state;
    }
};

export default reducer;