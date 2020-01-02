import * as actionTypes from './actionTypes';
import axios from 'axios';



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authFail = (error, response) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        response: response
    }
}


export const authSuccess = (token, username) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        username: username
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const forgotPassword = () => {
    return {
        type: actionTypes.FORGOT_PASSWORD
    }
}



export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}




export const authLogin =  (username, password) => {
    return  async (dispatch)  => {
        dispatch(authStart())
        await axios.post('https://notemaster.herokuapp.com/api/auth/login/', {
            username:username,
            password:password
        }).then(res => {
            const token = res.data.key;
  
            const expirationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('user', username);

            dispatch(authSuccess(token, username));
            dispatch(checkAuthTimeout(3600));

        }).catch( (err)=> {
          
            
            dispatch(authFail(err, err.response))
        });
    }
};



export const authSignup = (firstname, lastname, username, email, password1, password2) => {
    return async(dispatch) => {
        dispatch(authStart())
        await axios.post('https://notemaster.herokuapp.com/api/auth/registration/', {
            username:username,
            email:email,
            first_name: firstname,
            last_name: lastname,
            password1:password1,
            password2: password2
            
        }).then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token', token);
            localStorage.setItem('user', username);
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(token, username));
            dispatch(checkAuthTimeout(3600))

        }).catch(err => {
            dispatch(authFail(err, err.response))
        })
    }
}



export const authCheckState = (username) =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === undefined){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date() ){
                dispatch(logout())
            }else {
                dispatch(authSuccess(token, username))
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }
        }
    }
}