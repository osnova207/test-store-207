const initialState = {
    isLogged: false,
    user: '',
    products: [],
    properties: []
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

        default:
            return state;
    }
};

export default reducer;