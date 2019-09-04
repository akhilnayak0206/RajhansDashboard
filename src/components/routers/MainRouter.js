import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "../../views/LoginPage";
import Dashboard from "../../views/Dashboard";
import PrivateRoute from './PrivateRouter';

class MainRouter extends Component {
    constructor(props){
        super(props);
        this.state={
            auth:true
        }
    }
  render() {
    return (
        <Switch>
        <Route exact path="/login" component={LoginPage} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <Redirect to="/login" />
      </Switch>
    )
  }
}

export default MainRouter

