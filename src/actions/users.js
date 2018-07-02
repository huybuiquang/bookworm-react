// import * as types from '../types';
import api from '../api'
import {
    userLoggedIn
} from './auth';

// export const userSignedUp = (user) => ({
//     type: types.USER_SIGNED_UP,
//     user
// })

export const signup = (data) => dispatch => {
    return api.user.signup(data).then(user => {
        localStorage.setItem('bookwormJWT', user.token);
        dispatch(userLoggedIn(user))
    });
}