import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";



const initialState = {
    token: null,
    error: null,
    loading: false,
    username: null
}


const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        username: action.username,
        loading: false,
        error: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        response: action.response
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    });

}

const reducer = (state= initialState, action) =>{
    switch (action.type) {
        case actionTypes.AUTH_START:
           return authStart(state, action);

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);

        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        
        default:
            return state;
    }
};

export default reducer;