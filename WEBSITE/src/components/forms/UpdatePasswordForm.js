import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePassword } from '../../store/actions/updateActions'


class UpdatePasswordForm extends Component {

    state = {
        password: '',

        submitted: false
    }


    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()

        const user = {
            password: this.state.password,
        }

        const { password } = this.state
        this.setState({ submitted: true })
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (password.length > 0) {
            this.props.updatePassword(user, currentUser.id)
        }

    }





    render() {

        const { password, submitted } = this.state

        return (
            <div className="col-6">
                                <form noValidate onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className={"form-group col-md-12" + (submitted && !password ? " has-error" : "")}>
                            <label htmlFor="password">Lösenord</label>
                            <input type="password" className={"form-control" + (submitted && !password ? " is-invalid" : "")} id="password" placeholder="Lösenord" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="invalid-feedback">Lösenord måste fyllas i</div>
                            }
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark">Updatera lösenord</button>
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
        updatePassword: (credentials, id) => dispatch(updatePassword(credentials, id))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordForm)