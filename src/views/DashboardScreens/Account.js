import React, { Component } from "react";
import { connect } from "react-redux";
import { OnAuth } from "../../store/actions/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  Switch,
  Card,
  Icon,
  Avatar,
  Input,
  Button,
  Skeleton,
  notification
} from "antd";
import { NavLink } from "react-router-dom";
import firebase from "../../config/fbConfig";
import "../../styles/Account.css";

const { Meta } = Card;
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingSign: false,
      btnSignOut: false,
      email: "",
      name: ""
    };
  }

  onSignOut = () => {
    this.setState({
      btnSignOut: true
    });
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        notification["success"]({
          message: "Jai Mata Di",
          description: "Thank You for using Rajhans App's Dashboard."
        });
      })
      .catch(function(error) {
        // An error happened.
        notification["error"]({
          message: "Unable to Logout",
          description: "Please refresh and Logout again"
        });
        //console.log("error in logout: ",error)
        this.setState({
          btnSignOut: false
        });
      });
  };

  componentDidMount() {
    this.props.OnAuth({
      type: "login_data",
      email: this.props.firebase.auth.email
    });
  }

  render() {
    console.log(this.props.auth.data.Name)
    return (
      <div>
        <h1 className="heading">Account Settings</h1>
        <div className="mainDiv">
          <Card className="cardBoth" style={{ margin: 5 }}>
            <Skeleton loading={this.state.loading} active={true}>
              <h3>Email</h3>
              <Input
                placeholder="Email is being Loaded"
                value={this.props.firebase.auth.email}
                disabled
              />
              <h3>Name</h3>
              <Input
                placeholder="Name is being Loaded"
                value={this.props.auth.data.Name}
                disabled
              />
            </Skeleton>
          </Card>
          <Card className="cardBoth" style={{ margin: 5 }}>
            <Skeleton loading={this.state.loadingSign} paragraph={{ rows: 3 }}>
              <h3 style={{ textAlign: "center" }}>Jai Mitra Mandal</h3>
              <p style={{ color: "rgba(0,0,0,0.5)" }}>
                This website is made by Akhil Nayak if you have any doubt or
                suggestion you can contact me by emailing me to nnewn3@gmail.com
              </p>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="danger"
                  onClick={() => this.onSignOut()}
                  disabled={this.state.btnSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </Skeleton>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { firebase, auth } = state;
  return {
    firebase,
    auth
  };
}

export default compose(
  connect(
    mapStateToProps,
    {
      OnAuth
    }
  )
)(Account);
