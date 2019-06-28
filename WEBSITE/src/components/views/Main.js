import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Account from './Account'
import Customer from './Customer'
import Update from './Update'
import Cases from './Cases'


class Main extends Component {



    render() {
        return(
            <main className="p-5">
                <Switch>
                    <Route exact path='/' component={ Home } />
                    <Route path='/login' component={ Login } />
                    <Route path='/register' component={ Register } />
                    <Route path='/customer' component={ Customer } />
                    <Route path='/account' component={ Account } />
                    <Route path='/update' component={ Update } />
                    <Route path='/cases' component={ Cases } />
                </Switch>
            </main>   
        )
    }

}

export default Main