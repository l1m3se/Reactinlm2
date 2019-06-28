import { combineReducers } from 'redux'
import authReducer from './authReducer'
import {alert} from './alertReducer'
import customerReducer from './customerReducer'
import updateReducer from './updateReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    update: updateReducer,
    customers: customerReducer,
    alert: alert
})

export default rootReducer