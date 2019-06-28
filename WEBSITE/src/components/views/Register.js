import React, { Component } from 'react'
import RegistrationForm from '../forms/RegistrationForm'

class Register extends Component {


    render() {
        return (
            <div className="container my-4">
                <div className="row justify-content-center">
                    <h2 className="font-weight-light">Registrera användare</h2>
                </div>
                <RegistrationForm />
            </div>
        )
    }

}

export default Register