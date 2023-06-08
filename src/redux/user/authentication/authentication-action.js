import axios from "axios";
import { AUTHENTICATION_REQUEST, AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE } from '../../../constants/redux-constant'
import { SERVER_URL } from "../../../constants/server-url";

const authenticationRequest = () => {
    return {
        type: AUTHENTICATION_REQUEST
    }
}

const authenticationSuccess = (user) => {
    return {
        type: AUTHENTICATION_SUCCESS,
        payload: user,
    }
}

const authenticationFailure = (err) => {
    return {
        type: AUTHENTICATION_FAILURE,
        payload: err
    }
}

export const authenticationAction = () => {

    return async (dispatch) => {
        dispatch(authenticationRequest());
        if (localStorage.getItem('user') != undefined || localStorage.getItem('user') != null) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user.token) {
                var body = {
                    token: user.token
                };
                axios.post(SERVER_URL + '/users/checkToken', body)
                    .then(res => {
                        dispatch(authenticationSuccess({isAuth:true}));
                    })
                    .catch(err => {
                        dispatch(authenticationFailure({isAuth:false}));
                    })
            }
            else
                dispatch(authenticationFailure({isAuth:false}));
        }
        else
            dispatch(authenticationFailure({isAuth:false}));
    }
}