import React, { Component } from 'react'
import { connect } from "react-redux";
import { OnAuth } from "../store/actions/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.OnAuth("logout")}>p
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
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