import React, { Component } from 'react'
import LoginForm from '../forms/LoginForm'


class Login extends Component {


    render() {
        return(
            <div className="container my-4">
                <div className="row justify-content-center">
                    <div className="col text-center"><h2 className="font-weight-light">Logga in till ditt konto</h2></div>
                    </div>
                <LoginForm />
            </div>   
        )
    }

}

export default Login