import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/actions/authActions'


class Navigation extends Component {

    state = {
        _id: '',
        user: {},

    }


    userLogout() {
        this.props.logout()
    }


    render() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        localStorage.setItem('navName', this.props.name)
        
        const { name } = this.props;
        
        
        if (!currentUser) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <NavLink className="navbar-brand react-logo" to="/">
                            <i className="fab fa-react"></i>
                    </NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div id="navbarNotLoggedIn" className="collapse navbar-collapse">
                            <ul className="navbar-nav font-weight-light">
                                <li className="nav-item">
                                    <NavLink exact to="/" activeClassName="active" className="nav-link"> Hem</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/login" activeClassName="active" className="nav-link">Logga in</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/register" activeClassName="active" className="nav-link">Skapa konto</NavLink>
                                </li>

                            </ul>
                        </div>

                    </div>
                </nav>
            )

        } else {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <NavLink className="navbar-brand react-logo" exact to="/">
                            <i className="fab fa-react"></i>
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div id="navbarLoggedIn" className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto font-weight-light">
                                <li className="nav-item">
                                    <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/account" activeClassName="active" className="nav-link">Mitt konto</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/cases" activeClassName="active" className="nav-link">Ärenden</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/customer" activeClassName="active" className="nav-link">Kund och ärenderegistrering</NavLink>
                                </li>
                            </ul>
                            <ul className="navbar-nav font-weight-light">
                                <li className="nav-item">
                                    <NavLink exact to="/account" activeClassName="active" className="nav-link">{name ? name : currentUser.firstname + ' '  + currentUser.lastname}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <a onClick={() => this.userLogout()} className="nav-link"><i className="fas fa-sign-out-alt"></i>  Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </nav>
                
            )
        }

    }

}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        token: state.auth.token,
        currentUser: state.auth.user,
        name: state.update.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Navigation)