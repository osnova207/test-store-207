const initialState = [
    {
        id: '0',
        name: 'Цвет авто',
        type: 'string'
    },
    {
        id: '1',
        name: 'Трансмиссия',
        type: 'number'
    },
    {
        id: '2',
        name: 'Объем двигателя',
        type: 'select'
    }
];

const properties = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_PROPERTY':
            const allPropertiesList = state.slice();
            allPropertiesList.push(action.payload);
            return allPropertiesList;

        case 'DELETE_PROPERTY':
            const idxDelProperty = state.findIndex((item) => item.id === action.payload);
            const propertiesBefore = state.slice(0, idxDelProperty);
            const propertiesAfter = state.slice(idxDelProperty + 1);
            return [...propertiesBefore, ...propertiesAfter];

        case 'SORT_PROPERTIES_BY_NAME':
            if (action.payload) {
                return state.slice().sort((a, b) => (
                    (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1))
            } else {
                return state.slice().sort((a, b) => (
                    (b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : -1))
            }

        case 'SORT_PROPERTIES_BY_TYPE':
            if (action.payload) {
                return state.slice().sort((a, b) => (
                    (a.type.toLowerCase() > b.type.toLowerCase()) ? 1 : -1))
            } else {
                return state.slice().sort((a, b) => (
                    (b.type.toLowerCase() > a.type.toLowerCase()) ? 1 : -1))
            }

        default:
            return state;
    }
};

export default properties;