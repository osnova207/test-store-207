export const toAddProduct = (payload) => ({type: 'ADD_PRODUCT', payload});

export const toDeleteProduct = (payload) => ({type: 'DELETE_PRODUCT', payload});

export const toChangeProduct = (payload) => ({type: 'CHANGE_PRODUCT', payload});

export const toSortProductsByName = (payload) => ({type: 'SORT_PRODUCTS_BY_NAME', payload});

export const toSortProductsByPrice = (payload) => ({type: 'SORT_PRODUCTS_BY_PRICE', payload});

export const toSortProductsByDate = (payload) => ({type: 'SORT_PRODUCTS_BY_DATE', payload});