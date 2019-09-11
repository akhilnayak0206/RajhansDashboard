import React, { Component, PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import Home from "../views/DashboardScreens/Home";
import Account from "../views/DashboardScreens/Account";
import CashAtHand from "../views/DashboardScreens/CashAtHand";
import Downloads from "../views/DashboardScreens/Downloads";

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
        <Route exact path="/dashboard/downloads" component={Downloads} />
        <Route exact path="/dashboard/cashathand" component={CashAtHand} />
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
