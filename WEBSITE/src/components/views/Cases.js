import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import http from 'axios'
import { fetchCustomers } from '../../store/actions/customerActions'
import authHeader from '../helpers/authHeader'


class CustomerList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.props.fetchCustomers();
    }


    deleteCustomer(id) {
        fetch('http://localhost:3001/api/customers/' + id, { method: 'DELETE', headers: authHeader() })
            .then(() => this.props.fetchCustomers())
    }

    getCustomer(id) {
        http.get('http://localhost:3001/api/customers/' + id, {
            headers: authHeader()
        })
            .then(res =>
                this.setState({ user: res.data })
            )
    }

    render() {
        let currentUser = localStorage.getItem('currentUser')
        const { user } = this.state
        // Rendera lista enbart om currentUser är true. Annars tom <div> för att undvika krash.
        if (currentUser) {
            const customerList = this.props.customers.map(customer => (
                <tr key={customer._id}>
                    <th><button type="button" className="btn btn-link font-weight-bold text-dark button-custom" data-toggle="modal" data-target="#modal" onClick={() => this.getCustomer(customer._id)}>{customer._id}</button></th>
                    <td>{customer.firstname}</td>
                    <td>{customer.lastname}</td>
                    <td>{customer.addressline}</td>
                    <td><button className="btn btn-link text-dark button-custom" onClick={() => this.deleteCustomer(customer._id)}><i className="fas fa-trash"></i></button></td>
                </tr>
            ))

            return (
                <div className="container my-4">

                    {/* <!-- Modal (visa detaljerad info om kund) --> */}
                    <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalCenter" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title font-weight-light text-uppercase" id="modalCenter">{user.case_title}</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <h5 className="">Kundinformation</h5>
                                    <ul className="list-group">
                                        <li className="list-group-item p-0 border-0"><small className="font-weight-bold">Kundnummer:</small></li>
                                        <li className="list-group-item p-0 pb-2 border-0">{user._id}</li>
                                        <li className="list-group-item p-0 border-0"><small className="font-weight-bold">Namn:</small></li>
                                        <li className="list-group-item p-0 pb-2 border-0">{user.firstname} {user.lastname}</li>
                                        <li className="list-group-item p-0 border-0"><small className="font-weight-bold">Företag/adress:</small></li>
                                        <li className="list-group-item p-0 pb-2 border-0">{user.company} | {user.addressline}</li>
                                        <li className="list-group-item p-0 border-0"><small className="font-weight-bold">Postnummer/stad:</small></li>
                                        <li className="list-group-item p-0 pb-2 border-0">{user.zipcode} {user.city}</li>
                                        <li className="list-group-item p-0 border-0"><small className="font-weight-bold">Land:</small></li>
                                        <li className="list-group-item p-0 pb-2 border-0">{user.country}</li>
                                        <li className="list-group-item p-0 border-0"><small className="font-weight-bold">Email:</small></li>
                                        <li className="list-group-item p-0 pb-2 border-0">{user.email}</li>
                                        <li className="list-group-item p-0 border-0"><small className="font-weight-bold">Telefonnummer:</small></li>
                                        <li className="list-group-item p-0 pb-2 border-0">{user.phone}</li>
                                        <li className="list-group-item p-0 border-0"><small className="font-weight-bold">Ärende:</small></li>
                                        <li className="list-group-item p-0 pb-2 border-0">{user.case_description}</li>
                                        <li className="list-group-item p-0 border-0"><small className="font-weight-bold">Ärendet registrerat av:</small></li>
                                        <li className="list-group-item p-0 pb-2 border-0">{user.case_author}</li>
                                    </ul>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <span>Status: {user.case_status}</span>
                                    <button type="button" className="btn btn-sm btn-dark" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-5">
                        <h3 className="font-weight-light text-center">Registrerade kunder</h3>
                        <h5 className="font-weight-light mt-5">Klicka på respektive kundnummer för att visa mer detaljerad information</h5>
                        <table className="table table-responsive-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#Kundnummer</th>
                                    <th scope="col">Förnamn</th>
                                    <th scope="col">Efternamn</th>
                                    <th scope="col">Adress</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerList}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        } else {
            return (
                <div></div>
            )

        }

    }

}

CustomerList.propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired,
    newCustomer: PropTypes.object
}

const mapStateToProps = state => ({
    customers: state.customers.customers,
    newCustomer: state.customers.customer
})

export default connect(mapStateToProps, { fetchCustomers })(CustomerList)