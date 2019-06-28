import actions from '../actions/actiontypes'

const initialState = {
    authSuccess: '',
    authError: '',
    token: '',
    user: {}
}

const authReducer = ( state = initialState, action) => {
    switch(action.type) {
        case actions.REGISTER_ERROR:
            console.log('REGISTER error')
            return {
                ...state,
                authError: 'Registration failed',
                authSuccess: null
            }

        case actions.REGISTER_FATAL_ERROR:
            console.log('REGISTER fatal error')
            return {
                ...state,
                authError: 'Registration fatal failed',
                authSuccess: null
            }

        case actions.REGISTER_SUCCESS:
            console.log('REGISTER success')
            return {
                ...state,
                authError: null,
                authSuccess: 'Registration was successful'

            }
        case actions.LOGIN_ERROR:
            console.log('login error')
            return {
                ...state,
                authError: 'Login failed',
                token: null
            }

        case actions.LOGIN_FATAL_ERROR:
            console.log('login fatal error')
            return {
                ...state,
                authError: 'Login fatal failed'
            }

        case actions.LOGIN_SUCCESS:
            console.log('login success')
            return {
                ...state,
                authError: null,
                token: action.payload,
                name: action.name,
            }

        case actions.LOGOUT_ERROR:
            console.log('logout error')
            return {
                ...state,
                authError: 'Logout failed'
            }

        case actions.LOGOUT_SUCCESS:
            console.log('logout success')
            return {
                ...state,
                authError: null,
                token: null
            }

        default:
            return state
    }
}

export default authReducer