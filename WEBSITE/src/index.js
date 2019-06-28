import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {history} from './components/helpers/history'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'




const initialState = {}
const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk)))

ReactDOM.render((
        <Provider store={ store }>
            <Router history={history}>
                <App />
            </Router>
        </Provider> 
), document.getElementById('root'));

serviceWorker.unregister();
