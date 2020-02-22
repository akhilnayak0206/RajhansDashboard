import React, { Component, Fragment } from 'react';
import { Button } from 'antd';

import { OnAuth, OnGetData, OnUploadWings } from '../../store/actions/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import firebase from '../../config/fbConfig';
import secretSignKey from '../../secretToken';
import jwt from 'jsonwebtoken';

const Downloads = ({ OnUploadWings, auth, OnAuth }) => {
  const reset = () => {
    jwt.sign({ foo: 'bar' }, secretSignKey, (err, token) => {
      console.log(err, 'error');
      console.log(token);
    });
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword('dumy@gmail.com', 'password')
    //   .then(a => {
    //     alert('ok');
    //     console.log(a);
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //   });
    // reset password
    // auth
    //   .sendPasswordResetEmail(emailAddress)
    //   .then(function() {
    //     // Email sent.
    //     alert('ok');
    //   })
    //   .catch(function(error) {
    //     // An error happened.
    //     alert(JSON.stringify(error));
    //   });
  };

  return (
    <Fragment>
      <p>Downloads</p>
      <p>{JSON.stringify(firebase.auth().currentUser.emailVerified)}</p>
      <Button onClick={() => reset()}></Button>
    </Fragment>
  );
};

const mapStateToProps = state => {
  const { firebase, auth, getData } = state;
  return {
    firebase,
    auth,
    getData
  };
};

export default compose(
  connect(mapStateToProps, {
    OnAuth,
    OnGetData,
    OnUploadWings
  })
)(Downloads);
