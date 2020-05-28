import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Home from '../views/DashboardScreens/Home';
import Account from '../views/DashboardScreens/Account';
import BankBook from '../views/DashboardScreens/BankBook';
import Downloads from '../views/DashboardScreens/Downloads';
import ResetDatabase from '../views/DashboardScreens/ResetDatabase';
import ToDo from '../views/DashboardScreens/ToDo';
import AddEditExpense from '../views/DashboardScreens/AddEditData/AddEditExpense';
import AddEditUsers from '../views/DashboardScreens/AddEditData/AddEditUsers';
import AddEditWellWisher from '../views/DashboardScreens/AddEditData/AddEditWellWisher';
import AddEditWing from '../views/DashboardScreens/AddEditData/AddEditWing';
import { OnAuth } from '../store/actions/actions';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route {...rest} render={(props) => auth && <Component {...props} />} />
  );
};
const PrivateRouteAdmin = ({ component: Component, auth, admin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => auth && admin && <Component {...props} />}
    />
  );
};

class DashboardRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      admin: false,
    };
  }

  componentDidMount() {
    this.props.OnAuth({
      type: 'email_data',
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.dataEmail.adminVerified !== prevState.auth) {
      return {
        auth: nextProps.auth.dataEmail.adminVerified,
        admin: nextProps.auth.dataEmail.Admin,
      };
    } else return null; // Triggers no change in the state
  }

  render() {
    return (
      <Switch>
        <PrivateRoute
          path='/dashboard/home'
          component={Home}
          auth={this.state.auth}
        />
        <PrivateRoute
          path='/dashboard/wings'
          component={AddEditWing}
          auth={this.state.auth}
        />
        <PrivateRoute
          path='/dashboard/well-wishers'
          component={AddEditWellWisher}
          auth={this.state.auth}
        />
        <PrivateRoute
          path='/dashboard/expenses'
          component={AddEditExpense}
          auth={this.state.auth}
        />
        <PrivateRoute
          path='/dashboard/tasks'
          component={ToDo}
          auth={this.state.auth}
        />
        <PrivateRoute
          path='/dashboard/addeditusers'
          component={AddEditUsers}
          auth={this.state.auth}
        />
        <PrivateRoute
          path='/dashboard/downloads'
          component={Downloads}
          auth={this.state.auth}
        />
        <PrivateRoute
          path='/dashboard/bankbook'
          component={BankBook}
          auth={this.state.auth}
        />
        <PrivateRouteAdmin
          path='/dashboard/resetdatabase'
          component={ResetDatabase}
          auth={this.state.auth}
          admin={this.state.admin}
        />
        <Route exact path='/dashboard/account' component={Account} />
        <Redirect to='/dashboard/account' />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  const { firebase, auth } = state;
  return {
    firebase,
    auth,
  };
}

export default compose(connect(mapStateToProps, { OnAuth }))(DashboardRouter);
