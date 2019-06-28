import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import http from 'axios'
import authHeader from '../helpers/authHeader'


class Account extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            user: {},
        }
    }

    render() {
        const { user } = this.state
        let currentUser = localStorage.getItem('currentUser')
        if (!currentUser) return <Redirect to='/' />
        return (
            <div className="container my-4">
                <div className="row justify-content-center text-center">
                    <h2 className="font-weight-light">Välkommen till din sida <span className="">{user.firstname}</span>.</h2>
                </div>
                <div className="row mt-4 justify-content-center">
                    <div className="col-md-8">
                        <div className="d-flex justify-content-between">
                            <h4 className="font-weight-light">Användaruppgifter</h4>
                            <Link to="/update" className="btn btn-dark btn-sm mb-2 text-white"><i className="fas fa-user-cog"></i>  Ändra uppgifter</Link>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{user.firstname} {user.lastname}</li>
                            <li className="list-group-item">{user.addressline}</li>
                            <li className="list-group-item">{user.zipcode} {user.city}</li>
                            <li className="list-group-item">{user.country}</li>
                            <li className="list-group-item">{user.email}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser) {
            http.get('http://localhost:3001/api/users/' + currentUser.id, {
                headers: authHeader()
            })
                .then(res => this.setState({ user: res.data }))
                .catch(() => {
                    //catch error, remove currentUser and reload page //
                    localStorage.clear()
                    window.location.reload(true)
                })
        }



    }

}

export default Account