import React, { Component } from "react";
import { connect } from "react-redux";
import { OnAuth } from "../store/actions/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import firebase from '../config/fbConfig'

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.firebase.auth.uid
    };
  }
  
  render() {
    return (
      <div>
        <p>soething somehitng</p>
        {/* <button onClick={() => this.props.OnAuth("login")}> */}
        <button onClick={()=>firebase.auth().signInWithEmailAndPassword("nnewn3@gmail.com", "12345678")}>
          <p>hello</p>
        </button>
        <p>{JSON.stringify(this.state.data)}</p>
        <button onClick={() => this.props.OnAuth("logout")}>p
        </button>
      </div>
    );
  }

}

export default LoginPage

// function mapStateToProps(state) {
//   console.log("state",state.firebase.auth)
//   const { firebase } = state;
//   return {
//     firebase
//   };
// }

// export default compose(
//   connect(mapStateToProps,{
//     OnAuth
//   }),
// )(LoginPage);
