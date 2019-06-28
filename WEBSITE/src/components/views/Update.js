import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import UpdateForm from '../forms/UpdateForm'
import UpdatePasswordForm from '../forms/UpdatePasswordForm'
import UpdateEmailForm from '../forms/UpdateEmailForm'


class Update extends Component {


    render() {

        let currentUser = localStorage.getItem('currentUser')
        if (!currentUser) return <Redirect to='/' />
        return (
        
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col text-center"><h2 className="font-weight-light">Uppdatera dina kontouppgifter</h2></div>
                </div>
                <UpdateForm />
                <div className="row mt-4 justify-content-center">
                    <div className="col text-center"><h2 className="font-weight-light">Uppdatera lösenord och email</h2></div>
                </div>
                <div className="row mt-4 justify-content-center">
                    <div className="col-8">
                        <div className="row">
                        <UpdateEmailForm />
                        <UpdatePasswordForm />
                        </div>

                    </div>

                </div>

            </div>
        )
    }

}

export default Update