import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      false ? (
        <Component />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

function mapStateToProps(state) {
    console.log("private",state)
    const { } = state;
    return {
    };
  }
  
  export default compose(
    connect(mapStateToProps),
//     firestoreConnect([
//     ])
//  
 )(PrivateRoute);

