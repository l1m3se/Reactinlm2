import actions from './actiontypes'
import http from 'axios'
import { alertActions } from './alertActions';
import { history } from '../../components/helpers/history'

const apiurl = 'http://localhost:3001/api'

//REGISTER
export const register = (credentials) => dispatch => {
    console.log(credentials)
    fetch(apiurl + '/users/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(res => {

            if (res.success) {
                dispatch({
                    type: actions.REGISTER_SUCCESS,
                })
                dispatch(alertActions.success(res['message']));
            } else {
                dispatch({
                    type: actions.REGISTER_ERROR
                })
                dispatch(alertActions.error(res['message']));
            }
        })
        .catch((error) => {
            dispatch({
                type: actions.REGISTER_FATAL_ERROR
            })
            dispatch(alertActions.error(error));
        })
}


//LOGIN
export const login = (credentials) => dispatch => {

    fetch(apiurl + '/users/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(res => {


            if (res.success) {
                localStorage.setItem('currentUser', JSON.stringify(res));
                localStorage.setItem('token', JSON.stringify(res['token']));
                history.push('/account')
                dispatch({
                    type: actions.LOGIN_SUCCESS,
                    payload: res.token,
                    name: res.firstname + ' ' +  res.lastname
                })

            } else {
                dispatch({
                    type: actions.LOGIN_ERROR
                })
                dispatch(alertActions.error(res['message']));
            }
        })
        .catch((error) => {
            dispatch({
                type: actions.LOGIN_FATAL_ERROR
            })
            dispatch(alertActions.error(error));
        })
}

// GET USER BY ID //
export const getUserById = (userData) => dispatch => {
    http.get(apiurl + '/users/', + userData, {
        headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + userData.token
        }
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                dispatch({
                    type: actions.LOGOUT_SUCCESS
                })
            } else {
                dispatch({
                    type: actions.LOGOUT_ERROR
                })
            }
        })
        .catch(() => {
            dispatch({
                type: actions.LOGOUT_ERROR
            })
        })
}

export const logout = () => dispatch => {

    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    dispatch({
        type: actions.LOGOUT_SUCCESS
    })
    dispatch(alertActions.success('You logged out!'))
    history.push('/')

}


