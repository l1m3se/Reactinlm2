import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../store/actions/authActions'


class RegistrationForm extends Component {

    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        dateofbirth: '',
        addressline: '',
        zipcode: '',
        city: '',
        country: '',

        submitted: false
    }


    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()

        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            dateofbirth: this.state.dateofbirth,
            addressline: this.state.addressline,
            zipcode: this.state.zipcode,
            city: this.state.city,
            country: this.state.country,
        }

        const { firstname, lastname, email, password, addressline, zipcode, city, country } = this.state
        this.setState({ submitted: true })
        if (firstname.length > 0 && lastname.length > 0 && email.length > 0 && password.length > 0 && addressline.length > 0 && zipcode.length > 0 && city.length > 0 && country.length > 0) {
            this.props.register(user)
        }
        
    }





    render() {

        const { firstname, lastname, email, password, dateofbirth, addressline, zipcode, city, country, submitted } = this.state

        return (
            <div className="row mt-4 justify-content-center">
                <div className="col-8">
                    <form noValidate onSubmit={this.handleSubmit}>
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
                            <div className={"form-group col-md-6" + (submitted && !email ? " has-error" : "")}>
                                <label htmlFor="email">Email</label>
                                <input type="email" className={"form-control" + (submitted && !email ? " is-invalid" : "")} id="email" placeholder="Email" value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                <div className="invalid-feedback">Email måste fyllas i</div>
                                }
                            </div>
                            <div className={"form-group col-md-6" + (submitted && !password ? " has-error" : "")}>
                                <label htmlFor="password">Lösenord</label>
                                <input type="password" className={"form-control" + (submitted && !password ? " is-invalid" : "")} id="password" placeholder="Lösenord" value={password} onChange={this.handleChange} />
                                {submitted && !password &&
                                <div className="invalid-feedback">Lösenord måste fyllas i</div>
                                }
                            </div>
                        </div>
                        <div className="form-row">
                        <div className={"form-group col-md-4" + (submitted && !dateofbirth ? " has-error" : "")}>
                            <label htmlFor="dateofbirth">Födelsedatum</label>
                            <input type="text" className={"form-control" + (submitted && !dateofbirth ? " is-invalid" : "")} id="dateofbirth" placeholder="19870102" value={dateofbirth} onChange={this.handleChange} />
                            {submitted && !dateofbirth &&
                                <div className="invalid-feedback">Födelsedatum måste fyllas i</div>
                                }
                        </div>
                        <div className={"form-group col-md-8" + (submitted && !addressline ? " has-error" : "")}>
                            <label htmlFor="addressline">Adress</label>
                            <input type="text" className={"form-control" + (submitted && !addressline ? " is-invalid" : "")} id="addressline" placeholder="1234 Gatan" value={addressline} onChange={this.handleChange} />
                            {submitted && !addressline &&
                                <div className="invalid-feedback">Address måste fyllas i</div>
                                }
                        </div>
                        </div>
                        <div className="form-row">
                            <div className={"form-group col-md-3" + (submitted && !zipcode ? " has-error" : "")}>
                                <label htmlFor="zipcode">Postnummer</label>
                                <input type="text" className={"form-control" + (submitted && !zipcode ? " is-invalid" : "")} id="zipcode" placeholder="12345" value={zipcode} onChange={this.handleChange} />
                                {submitted && !zipcode &&
                                <div className="invalid-feedback">Postnummer måste fyllas i</div>
                                }
                            </div>
                            <div className={"form-group col-md-5" + (submitted && !city ? " has-error" : "")}>
                                <label htmlFor="city">Stad</label>
                                <input type="text" className={"form-control" + (submitted && !city ? " is-invalid" : "")} id="city" placeholder="Hittepåköping" value={city} onChange={this.handleChange} />
                                {submitted && !city &&
                                <div className="invalid-feedback">Stad måste fyllas i</div>
                                }
                            </div>
                            <div className={"form-group col-md-4" + (submitted && !country ? " has-error" : "")}>
                                <label htmlFor="country">Land</label>
                                <select id="country" className={"form-control" + (submitted && !country ? " is-invalid" : "")} value={country} onChange={this.handleChange}>
                                    <option >Välj land</option>
                                    <option value="Sverige">Sverige</option>
                                    <option value="Norge">Norge</option>
                                    <option value="Finland">Finland</option>
                                    <option value="Danmark">Danmark</option>
                                </select>
                                {submitted && !country &&
                                <div className="invalid-feedback">Land måste fyllas i</div>
                                }
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark">Registrera</button>
                    </form>
                </div>
            </div>
        )


    }
}


const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        authSuccess: state.auth.authSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (credentials) => dispatch(register(credentials))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)