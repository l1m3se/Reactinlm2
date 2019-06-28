import actions from './actiontypes'
import authHeader from '../../components/helpers/authHeader'
import {alertActions} from '../actions/alertActions'

const apiUrl = 'http://localhost:3001/api'

export const fetchCustomers = () => dispatch => {
    fetch(`${apiUrl}/customers/all`, {
        method: 'GET',
        headers: authHeader()
    })
        .then(res => res.json())
        .then(customers => dispatch({
            type: actions.FETCH_CUSTOMERS,
            payload: customers
        }))
        .catch(() => {
            //401 clear local storage + reload page //
            localStorage.removeItem('currentUser')
            window.location.reload(true)
        } )

}

export const newCustomer = (customerData) => dispatch => {
    fetch(`${apiUrl}/customers/`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(customerData)
    })
        
        .then(res => res.json())
        .then(res => dispatch({
            type: actions.NEW_CUSTOMER,
            payload: res.data
        }))
        .then(() => dispatch(alertActions.success('Kundärende registrerat')))
        
}
