import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OnAuth } from '../../store/actions/actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {
  Switch,
  Card,
  Icon,
  Avatar,
  Input,
  Button,
  Skeleton,
  notification
} from 'antd';
import { NavLink } from 'react-router-dom';
import firebase from '../../config/fbConfig';
import '../../styles/Account.css';

const { Meta } = Card;
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingSign: false,
      btnSignOut: false,
      btnVerify: false,
      btnReset: false,
      email: '',
      name: ''
    };
  }

  onSignOut = () => {
    this.setState({
      btnSignOut: true
    });
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.props.OnAuth({ type: 'logout' });
        notification['success']({
          message: 'Jai Mata Di',
          description: "Thank You for using Rajhans App's Dashboard."
        });
      })
      .catch(error => {
        // An error happened.
        notification['error']({
          message: 'Unable to Logout',
          description: 'Please refresh and Logout again'
        });
        //console.log("error in logout: ",error)
        this.setState({
          btnSignOut: false
        });
      });
  };

  verifyUser = () => {
    this.setState({ btnVerify: true });
    var user = firebase.auth().currentUser;

    user
      .sendEmailVerification()
      .then(() => {
        // Email sent.
        this.setState({ btnVerify: false }, () =>
          notification['success']({
            message: 'Jai Mata Di',
            description: 'Email Verification has been sent.'
          })
        );
      })
      .catch(error => {
        // An error happened.
        this.setState({ btnVerify: false }, () =>
          notification['error']({
            message: 'Error',
            description: 'Please let the admin know about this error.'
          })
        );
      });
  };

  resetPassword = () => {
    this.setState({ btnReset: true });
    var user = firebase.auth();

    user
      .sendPasswordResetEmail(
        firebase.auth().currentUser && firebase.auth().currentUser.email
      )
      .then(() => {
        // Email sent.
        this.setState({ btnReset: false }, () =>
          notification['success']({
            message: 'Jai Mata Di',
            description: 'Reset Password mail has been sent.'
          })
        );
      })
      .catch(error => {
        // An error happened.
        this.setState({ btnReset: false }, () =>
          notification['error']({
            message: 'Error',
            description: 'Please let the admin know about this error.'
          })
        );
      });
  };

  componentDidMount() {
    this.props.OnAuth({
      type: 'email_data'
    });
  }

  render() {
    return (
      <div>
        <h1 className='headingAccount'>Account Settings</h1>
        <div className='mainDivAccount'>
          <Card className='cardBothAccount'>
            <Skeleton loading={this.state.loading} active={true}>
              <h3>Email</h3>
              <Input
                placeholder='Email is being Loaded'
                value={
                  firebase.auth().currentUser &&
                  firebase.auth().currentUser.email
                }
                disabled
              />
              <h3>Name</h3>
              <Input
                placeholder='Name is being Loaded'
                value={this.props.auth.dataEmail.Name}
                disabled
              />
              {firebase.auth().currentUser &&
              firebase.auth().currentUser.emailVerified ? (
                <div style={{ textAlign: 'center', marginTop: '5px' }}>
                  <Button
                    type='danger'
                    onClick={() => this.resetPassword()}
                    disabled={this.state.btnReset}
                  >
                    Reset Password
                  </Button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', marginTop: '5px' }}>
                  <Button
                    type='danger'
                    onClick={() => this.verifyUser()}
                    disabled={this.state.btnVerify}
                  >
                    Verify Email
                  </Button>
                </div>
              )}
            </Skeleton>
          </Card>
          <Card className='cardBothAccount'>
            <Skeleton loading={this.state.loadingSign} paragraph={{ rows: 3 }}>
              <h3 style={{ textAlign: 'center' }}>Jai Mitra Mandal</h3>
              <p style={{ color: 'rgba(0,0,0,0.5)' }}>
                This website is made by Akhil Nayak if you have any doubt or
                suggestion you can contact me by emailing me to nnewn3@gmail.com
              </p>
              <div className='textCenterAccount'>
                <Button
                  type='danger'
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
  connect(mapStateToProps, {
    OnAuth
  })
)(Account);
