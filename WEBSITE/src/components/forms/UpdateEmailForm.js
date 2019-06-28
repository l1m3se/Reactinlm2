import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateEmail } from '../../store/actions/updateActions'


class UpdateEmailForm extends Component {

    state = {
        email: '',

        submitted: false
    }


    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()

        const user = {
            email: this.state.email,
        }

        const { email } = this.state
        this.setState({ submitted: true })
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (email.length > 0) {
            this.props.updateEmail(user, currentUser.id)
        }
        
    }





    render() {

        const { email, submitted } = this.state

        return (
            <div className="col-6">
                                    <form noValidate onSubmit={this.handleSubmit}>
                    <div className="form-row">
                            <div className={"form-group col-md-12" + (submitted && !email ? " has-error" : "")}>
                                <label htmlFor="email">Email</label>
                                <input type="email" className={"form-control" + (submitted && !email ? " is-invalid" : "")} id="email" placeholder="Email" value={email} onChange={this.handleChange} />
                                {submitted && !email &&
                                <div className="invalid-feedback">Email måste fyllas i</div>
                                }
                            </div>
                            </div>
                        <button type="submit" className="btn btn-dark">Updatera email</button>
                    </form>
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
        updateEmail: (credentials, id) => dispatch(updateEmail(credentials, id))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmailForm)