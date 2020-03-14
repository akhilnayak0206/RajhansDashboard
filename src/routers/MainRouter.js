import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LoginPage from '../views/LoginPage';
import Dashboard from '../views/Dashboard';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

class MainRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.firebase.auth.email
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.firebase.auth !== prevState.auth) {
      return { auth: nextProps.firebase.auth.email };
    } else return null; // Triggers no change in the state
  }

  render() {
    return (
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <PrivateRoute
          path='/dashboard'
          component={Dashboard}
          auth={this.state.auth}
        />
        <Redirect to='/login' />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  const { firebase } = state;
  return {
    firebase
  };
}

export default compose(connect(mapStateToProps))(MainRouter);
