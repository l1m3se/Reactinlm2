import actions from '../actions/actiontypes'

const initialState = {
    customers: [],
    customer: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            }

        case actions.FETCH_CUSTOMERS_ERROR:
            return {
                ...state,
                customers: action.payload
            }

        case actions.NEW_CUSTOMER:
            return {
                ...state,
                customer: action.payload
            }

        default:
            return state
    }
}