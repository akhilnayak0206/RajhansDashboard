import React, { Component } from "react";
import { connect } from "react-redux";
import { OnAuth } from "../store/actions/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: this.props.auth
    });
  }
  render() {
    return (
      <div>
        <p>soething somehitng</p>
        <button onClick={() => this.props.OnAuth()}>
          <p>hello</p>
        </button>
        <p>{JSON.stringify(this.state.data)}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("loginpage",state)
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
)(LoginPage);
