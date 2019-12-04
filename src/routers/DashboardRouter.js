import React, { Component, PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import Home from "../views/DashboardScreens/Home";
import Account from "../views/DashboardScreens/Account";
import CashAtHand from "../views/DashboardScreens/CashAtHand";
import Downloads from "../views/DashboardScreens/Downloads";
import AddEditExpense from "../views/DashboardScreens/AddEditData/AddEditExpense";
import AddEditUsers from "../views/DashboardScreens/AddEditData/AddEditUsers";
import AddEditWellWisher from "../views/DashboardScreens/AddEditData/AddEditWellWisher";
import AddEditWing from "../views/DashboardScreens/AddEditData/AddEditWing";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
  <Route
    {...rest}
    render={props => ( auth ? <Component {...props} /> : <Redirect to="/login" />)}
  />
)};

class DashboardRouter extends PureComponent {

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
        <Route exact path="/dashboard/home" component={Home} />
        <Route exact path="/dashboard/wings" component={AddEditWing} />
        <Route exact path="/dashboard/well-wishers" component={AddEditWellWisher} />
        <Route exact path="/dashboard/expenses" component={AddEditExpense} />
        <Route exact path="/dashboard/addeditusers" component={AddEditUsers} />
        <Route exact path="/dashboard/downloads" component={Downloads} />
        <Route exact path="/dashboard/bankbook" component={CashAtHand} />
        <Route exact path="/dashboard/account" component={Account} />
        <Redirect to="/dashboard/home" />
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

export default compose(connect(mapStateToProps))(DashboardRouter);
