const initialState = {
    isLogged: false,
    activeUser: '',
    usersList: [
        {
            login: 'Admin',
            password: '123456',
            email: 'Admin@mail.com'
        }
    ],
};

const users = (state = initialState, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {...state, isLogged: true, activeUser: action.payload};

        case 'ADD_NEW_USER':
            const allUsers = state.usersList.slice();
            allUsers.push(action.payload);
            return {...state, allUsers};

        case 'LOGOUT':
            return {...state, isLogged: false, activeUser: ''};

        default:
            return state;
    }
};

export default users;