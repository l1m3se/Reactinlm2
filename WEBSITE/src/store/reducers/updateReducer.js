import actions from '../actions/actiontypes'

const initialState = {
    authSuccess: '',
    authError: '',
}

const updateReducer = ( state = initialState, action) => {
    switch(action.type) {
        case actions.UPDATE_ERROR:
            return {
                ...state,
                authError: 'Update failed',
                authSuccess: null
            }
        case actions.UPDATE_FATAL_ERROR:
            return {
                ...state,
                authError: 'Update failed',
                authSuccess: null
            }
        case actions.UPDATE_SUCCESS:
            return {
                ...state,
                authError: 'Update successful',
                authSuccess: null,
                name: action.name
            }
        case actions.UPDATE_EMAIL_ERROR:
            return {
                ...state,
                authError: 'Update email failed',
                authSuccess: null
            }
        case actions.UPDATE_EMAIL_FATAL_ERROR:
            return {
                ...state,
                authError: 'Update email failed',
                authSuccess: null
            }
        case actions.UPDATE_EMAIL_SUCCESS:
            return {
                ...state,
                authError: 'Update email successful',
                authSuccess: null
            }
        case actions.UPDATE_PASSWORD_ERROR:
            return {
                ...state,
                authError: 'Update password failed',
                authSuccess: null
            }
        case actions.UPDATE_PASSWORD_FATAL_ERROR:
            return {
                ...state,
                authError: 'Update password failed',
                authSuccess: null
            }
        case actions.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                authError: 'Update password successful',
                authSuccess: null
            }

        default:
            return state
    }
}


export default updateReducer