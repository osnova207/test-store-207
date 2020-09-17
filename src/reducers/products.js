const initialState = [
    {
        id: '1',
        name: 'Mercedes',
        price: '20 000',
        description: 'good car',
        image: 'https://a.d-cd.net/9afb332s-960.jpg',
        date: '05.03.2020',
        customProperties: []
    },
    {
        id: '2',
        name: 'BMW',
        price: '50 000',
        description: 'Все БМВисты - вафлисты!',
        image: 'https://img-fotki.yandex.ru/get/2708/54617972.33/0_10df0d_d4edd0c3_orig.jpg',
        date: '02.03.2020',
        customProperties: []
    },
    {
        id: '3',
        name: 'Datsun',
        price: '3 000',
        description: 'какая-то япошка',
        image: 'https://cdn.bringatrailer.com/wp-content/uploads/2019/01/1971_datsun_240z_1547648596bc798a4a-2.jpg',
        date: '08.03.2020',
        customProperties: []
    }
];

const products = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_PRODUCT':
            const allProductsList = state.slice();
            allProductsList.push(action.payload);
            return allProductsList;

        case 'DELETE_PRODUCT':
            const idxDelProduct = state.findIndex((product) => product.id === action.payload.id);
            const productsBefore = state.slice(0, idxDelProduct);
            const productsAfter = state.slice(idxDelProduct + 1);
            return [...productsBefore, ...productsAfter];

        case 'CHANGE_PRODUCT':
            const idxChangeProduct = state.findIndex((item) => item.id === action.payload.id);
            const allProducts = state.slice();
            allProducts[idxChangeProduct] = action.payload;
            return allProducts;

        case 'SORT_PRODUCTS_BY_NAME':
            if (action.payload) {
                return state.slice().sort((a, b) => (
                    (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1))
            } else {
                return state.slice().sort((a, b) => (
                    (b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : -1))
            }

        case 'SORT_PRODUCTS_BY_PRICE':
           if (action.payload) {
               return state.slice().sort((a, b) => (
                   b.price.replace(/\s/g, "") - a.price.replace(/\s/g, "")))
           } else {
               return state.slice().sort((a, b) => (
                   a.price.replace(/\s/g, "") - b.price.replace(/\s/g, "")))
           }

        case 'SORT_PRODUCTS_BY_DATE':
            if (action.payload) {
                return state.slice().sort((a, b) => (
                    new Date(b.date) - new Date(a.date)))
            } else {
                return state.slice().sort((a, b) => (
                    new Date(a.date) - new Date(b.date)))
            }

        default:
            return state;
    }
};

export default products;