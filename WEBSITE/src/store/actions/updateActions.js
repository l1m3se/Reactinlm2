import actions from './actiontypes'
import { alertActions } from './alertActions';
import authHeader from '../../components/helpers/authHeader'

const apiurl = 'http://localhost:3001/api'

//UPDATE USER
export const update = (credentials, id) => dispatch => {
    fetch(apiurl + '/users/' + id, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(res => {

            if (res.success) {
                localStorage.setItem('currentUser', JSON.stringify(res));
                dispatch({
                    type: actions.UPDATE_SUCCESS,
                    name: res.firstname + ' ' +  res.lastname
                })
                dispatch(alertActions.success(res['message']));
            } else {
                dispatch({
                    type: actions.UPDATE_ERROR
                })
                dispatch(alertActions.error(res['message']));
            }
        })
        .catch((error) => {
            dispatch({
                type: actions.UPDATE_FATAL_ERROR
            })
            dispatch(alertActions.error(error));
        })
}

//UPDATE USER PASSWORD
export const updatePassword = (credentials, id) => dispatch => {
    fetch(apiurl + '/users/updatepass/' + id, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(res => {

            if (res.success) {
                dispatch({
                    type: actions.UPDATE_PASSWORD_SUCCESS
                })
                dispatch(alertActions.success(res['message']));
            } else {
                dispatch({
                    type: actions.UPDATE_PASSWORD_ERROR
                })
                dispatch(alertActions.error(res['message']));
            }
        })
        .catch((error) => {
            dispatch({
                type: actions.UPDATE_PASSWORD_FATAL_ERROR
            })
            dispatch(alertActions.error(error));
        })
}

//UPDATE USER EMAIL
export const updateEmail = (credentials, id) => dispatch => {
    fetch(apiurl + '/users/updateemail/' + id, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(res => {

            if (res.success) {
                dispatch({
                    type: actions.UPDATE_EMAIL_SUCCESS
                })
                dispatch(alertActions.success(res['message']));
            } else {
                dispatch({
                    type: actions.UPDATE_EMAIL_ERROR
                })
                dispatch(alertActions.error(res['message']));
            }
        })
        .catch((error) => {
            dispatch({
                type: actions.UPDATE_EMAIL_FATAL_ERROR
            })
            dispatch(alertActions.error(error));
        })
}