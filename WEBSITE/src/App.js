import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/views/Header'
import Main from './components/views/Main'
import Footer from './components/views/Footer'
import { history } from './components/helpers/history'
import { alertActions } from './store/actions/alertActions'



class App extends React.Component {

  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="bg-light main-height">
        <Header></Header>
        <div className="row justify-content-center mt-4">
        <div className="col-sm-8">
          {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
        </div>
        </div>
        <Main />
        <Footer />
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}


export default connect(mapStateToProps)(App)
