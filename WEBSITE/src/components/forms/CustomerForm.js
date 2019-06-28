import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { newCustomer } from '../../store/actions/customerActions'

class NewCustomerForm extends Component {
    constructor(props) {
        super(props)



        this.state = {
            firstname: '',
            lastname: '',
            company: '',
            addressline: '',
            zipcode: '',
            city: '',
            country: '',

            email: '',
            phone: '',

            case_title: '',
            case_description: '',
            case_author: '',
            case_status: '',

            submitted: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(e) { this.setState({ [e.target.id]: e.target.value }) }
    onSubmit(e) {
        e.preventDefault()
        this.setState({ submitted: true })

        let currentUser = JSON.parse(localStorage.getItem('currentUser'))

        const customer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            company: this.state.company,
            addressline: this.state.addressline,
            zipcode: this.state.zipcode,
            city: this.state.city,
            country: this.state.country,
            email: this.state.email,
            phone: this.state.phone,

            case_title: this.state.case_title,
            case_description: this.state.case_description,
            // Den som registrerar ärendet = currentUser (dvs den som är inloggad)
            case_author: currentUser.firstname + ' ' + currentUser.lastname,
            // Statusen vid registrering böir automatiskt "Ej påbörjad" //
            case_status: 'Ej påbörjad'
        }

        const { firstname, lastname, company, addressline, zipcode, city, country, email, phone, case_title, case_description } = this.state
        if (firstname.length > 0 && lastname.length > 0 && company.length > 0 && addressline.length > 0 && zipcode.length > 0 && city.length > 0 && country.length > 0 && email.length > 0 && phone.length > 0 && case_title.length > 0 && case_description.length > 0) {
            this.props.newCustomer(customer)
        }

    }


    render() {
        const { firstname, lastname, company, addressline, zipcode, city, country, email, phone, case_title, case_description, submitted } = this.state
        return (
            <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <h2 className="font-weight-light text-center">Vänligen registrera kund och ärende.</h2>

                    <form className="mt-4" onSubmit={this.onSubmit}>
                        <div className="form-row">
                            <div className={"form-group col-md-6" + (submitted && !firstname ? " has-error" : "")}>
                                <label htmlFor="firstname">Förnamn</label>
                                <input type="text" className={"form-control" + (submitted && !firstname ? " is-invalid" : "")} id="firstname" placeholder="Förnamn" value={firstname} onChange={this.handleChange} />
                                {submitted && !firstname &&
                                    <div className="invalid-feedback">Förnamn måste fyllas i</div>
                                }
                            </div>
                            <div className={"form-group col-md-6" + (submitted && !lastname ? " has-error" : "")}>
                                <label htmlFor="lastname">Efternamn</label>
                                <input type="text" className={"form-control" + (submitted && !lastname ? " is-invalid" : "")} id="lastname" placeholder="Efternamn" value={lastname} onChange={this.handleChange} />
                                {submitted && !lastname &&
                                    <div className="invalid-feedback">Efternamn måste fyllas i</div>
                                }
                            </div>
                        </div>
                        <div className="form-row">
                            <div className={"form-group col-md-6" + (submitted && !company ? " has-error" : "")}>
                                <label htmlFor="company">Företag</label>
                                <input type="text" className={"form-control" + (submitted && !company ? " is-invalid" : "")} id="company" placeholder="Företag" value={company} onChange={this.handleChange} />
                                {submitted && !company &&
                                    <div className="invalid-feedback">Företagsnamn måste fyllas i</div>
                                }
                            </div>
                            <div className={"form-group col-md-6" + (submitted && !addressline ? " has-error" : "")}>
                                <label htmlFor="addressline">Adress</label>
                                <input type="text" className={"form-control" + (submitted && !addressline ? " is-invalid" : "")} id="addressline" placeholder="Adress" value={addressline} onChange={this.handleChange} />
                                {submitted && !addressline &&
                                    <div className="invalid-feedback">Adress måste fyllas i</div>
                                }
                            </div>
                        </div>
                        <div className="form-row">
                            <div className={"form-group col-md-2" + (submitted && !zipcode ? " has-error" : "")}>
                                <label htmlFor="zipcode">Postnummer</label>
                                <input type="text" className={"form-control" + (submitted && !zipcode ? " is-invalid" : "")} id="zipcode" placeholder="12345" value={zipcode} onChange={this.handleChange} />
                                {submitted && !zipcode &&
                                    <div className="invalid-feedback">Postnummer måste fyllas i</div>
                                }
                            </div>
                            <div className={"form-group col-md-5" + (submitted && !city ? " has-error" : "")}>
                                <label htmlFor="city">Stad</label>
                                <input type="text" className={"form-control" + (submitted && !city ? " is-invalid" : "")} id="city" placeholder="Stad" value={city} onChange={this.handleChange} />
                                {submitted && !city &&
                                    <div className="invalid-feedback">Stad måste fyllas i</div>
                                }
                            </div>
                            <div className={"form-group col-md-5" + (submitted && !country ? " has-error" : "")}>
                                <label htmlFor="country">Land</label>
                                <input type="text" className={"form-control" + (submitted && !country ? " is-invalid" : "")} id="country" placeholder="Grönland" value={country} onChange={this.handleChange} />
                                {submitted && !country &&
                                    <div className="invalid-feedback">Land måste fyllas i</div>
                                }
                            </div>
                        </div>
                        <div className="form-row">
                            <div className={"form-group col-md-6" + (submitted && !email ? " has-error" : "")}>
                                <label htmlFor="email">Email</label>
                                <input type="email" className={"form-control" + (submitted && !email ? " is-invalid" : "")} id="email" placeholder="Email" value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                    <div className="invalid-feedback">Email måste fyllas i</div>
                                }
                            </div>
                            <div className={"form-group col-md-6" + (submitted && !phone ? " has-error" : "")}>
                                <label htmlFor="phone">Telefonnummer</label>
                                <input type="text" className={"form-control" + (submitted && !phone ? " is-invalid" : "")} id="phone" placeholder="0701234567" value={phone} onChange={this.handleChange} />
                                {submitted && !phone &&
                                    <div className="invalid-feedback">Telefonnummer måste fyllas i</div>
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <h4 className="font-weight-light text-center pt-3">Beskriv ditt ärende</h4>
                        </div>
                        <div className={"form-group" + (submitted && !case_title ? " has-error" : "")}>
                            <label htmlFor="case_title">Rubrik</label>
                            <input type="text" className={"form-control" + (submitted && !case_title ? " is-invalid" : "")} id="case_title" placeholder="Lorem ipsum..." value={case_title} onChange={this.handleChange} />
                            {submitted && !case_title &&
                                <div className="invalid-feedback">En kortfattad rubrik som beskriver ärendet</div>
                            }
                        </div>
                        <div className={"form-group" + (submitted && !case_description ? " has-error" : "")}>
                            <label htmlFor="case_description">Ärende</label>
                            <textarea rows="6" type="text" className={"form-control" + (submitted && !case_description ? " is-invalid" : "")} id="case_description" placeholder="Lorem ipsum..." value={case_description} onChange={this.handleChange} />
                            {submitted && !case_description &&
                                <div className="invalid-feedback">Du måste beskriva ärendet så detaljerat det går</div>
                            }
                        </div>
                        <button type="submit" className="btn btn-dark">Registrera ärende</button>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

NewCustomerForm.propTypes = {
    newCustomer: PropTypes.func.isRequired
}

export default connect(null, { newCustomer })(NewCustomerForm)