const initialState = {
    user: null,
    snackbar: {
        view: false,
        message: '',
        success:false
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER':
            return {
                ...state,
                user: action.payload,   
            }
        default:
            return state
    }
}

export default userReducer
