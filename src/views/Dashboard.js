import React, { Component } from 'react'
import { connect } from "react-redux";
import { OnAuth } from "../store/actions/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Dashboard extends Component {
  render() {
    return (
      <div>
        Welcome!!
      </div>
    )
  }
}

function mapStateToProps(state) {
    console.log("dashboard",state)
    const { auth } = state;
    return {
      auth:auth
    };
  }
  
  export default compose(
    connect(mapStateToProps,{
      OnAuth
    }),
    firestoreConnect([
      {
        collection: "auth"
      }
    ])
  )(Dashboard);
