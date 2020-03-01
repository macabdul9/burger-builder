import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
    }
};

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
};

export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC55gU-elFR7iHZYHni0I04HJmLJqVKvU4';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC55gU-elFR7iHZYHni0I04HJmLJqVKvU4';
        }
        axios.post(url, authData)
        .then(response => {
            // console.log('auth.js', response);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));

        })
        .catch(error => {
            // console.log('auth.js ', error.response.data.error);
            dispatch(authFail(error.response.data.error));
        });
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        console.log('auth.js', token);
        if(token){
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            console.log('auth.js expirationTime', expirationDate, new Date());
            if(expirationDate < new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000));
            }
        
        }else{
            dispatch(logout());
        }
    }
}


