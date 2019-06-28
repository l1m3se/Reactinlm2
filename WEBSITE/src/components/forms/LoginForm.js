import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, getUserById } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {


    state = {
        email: '',
        password: '',
        submitted: false
    }

    // validateForm() {
    //     return this.state.email.length > 0 && this.state.password.length > 0;
    // }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({ submitted: true });
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.email.length > 0 && this.state.password.length > 0) {
            this.props.login(user)
        } else return


    }

    componentDidMount() {

    }


    render() {
        const { email, password, submitted } = this.state;
        const { token } = this.props;

        if (token) return <Redirect to='/' />
        return (
            <div className="row mt-4 justify-content-center">
                <div className="col-6">
                    <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                            <label htmlFor="email" id="email">E-postadress</label>
                            <input type="email" className={'form-control' + (submitted && !email ? ' is-invalid' : '')} id="email" aria-describedby="emailHelp" placeholder="Ange e-postadress" value={email} onChange={this.handleChange} required />
                            {submitted && !email &&
                                <div className="invalid-feedback">Email is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Lösenord</label>
                            <input type="password" className={'form-control' + (submitted && !password ? ' is-invalid' : '')} id="password" placeholder="Lösenord" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="invalid-feedback">Password is required</div>
                            }
                        </div>
                        <button type="submit" className="btn btn-dark" >Logga in</button>
                    </form>
                </div>
            </div>


        )


    }

}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        token: state.auth.token,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(login(credentials)),
        getUserById: (credentials) => dispatch(getUserById(credentials))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)