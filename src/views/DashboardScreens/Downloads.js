import React, { Component, Fragment, useEffect, useState } from 'react';
import {
  Upload,
  message,
  Button,
  Card,
  Input,
  Skeleton,
  InputNumber,
  Form,
  Switch,
  Radio,
  notification,
  Select,
  Popover,
  DatePicker,
  Modal,
  Popconfirm
} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';

import { OnAuth, OnGetData, OnUploadWings } from '../../store/actions/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import firebase from '../../config/fbConfig';
import { storage } from 'firebase';
import secretSignKey from '../../secretToken';
import jwt from 'jsonwebtoken';

// console.log(process.env.REACT_APP_SECRET_SIGN_KEY);
const Downloads = ({ OnUploadWings, auth, OnAuth }) => {
  const listRef = storage().ref();

  const [allFiles, setAllFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(true);

  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text'
    },
    onChange: info => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest: info => {
      listRef
        .child(info.file.name)
        .put(info.file)
        .then(function(snapshot) {
          console.log('Uploaded a blob or file!');
          info.onSuccess();
        });
    },
    showUploadList: false
  };

  useEffect(() => {
    // Create a reference under which you want to list

    // Find all the prefixes and items.
    listRef
      .listAll()
      .then(function(res) {
        res.prefixes.forEach(function(folderRef) {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log('lt', folderRef);
        });
        let items = [];
        res.items.forEach(function(itemRef) {
          // All the items under listRef.
          items.push(itemRef);
        });
        setAllFiles(items);
        setShowFiles(false);
      })
      .catch(function(error) {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  }, []);

  let downloadURL = itemRef => {
    listRef
      .child(itemRef.fullPath)
      .getDownloadURL()
      .then(function(url) {
        const win = window.open(url, '_blank');
        if (win != null) {
          win.focus();
        }
      })
      .catch(function(error) {
        // Handle any errors
        console.log('error while downloading', error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          marginBottom: 20
        }}
      >
        <Skeleton loading={showFiles} active>
          {allFiles &&
            allFiles.map((items, key) => (
              <Card
                size='small'
                title={items.name}
                style={{ borderRadius: 5, width: '100%', marginBottom: 10 }}
                key={key}
              >
                <Button type='primary' onClick={() => downloadURL(items)}>
                  Download
                </Button>
              </Card>
            ))}
        </Skeleton>
      </div>
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
          zIndex: 15,
          position: 'fixed',
          bottom: 62,
          right: 38
        }}
      >
        <Upload {...props}>
          <Button
            type='primary'
            shape='circle'
            size='large'
            style={{ marginTop: 10 }}
            onClick={() =>
              notification['warning']({
                message: 'Rename before Upload',
                description: 'Remember to rename file before uploading'
              })
            }
          >
            <FontAwesomeIcon icon={faPlus} size='lg' color='white' />
          </Button>
        </Upload>
      </div>
    </div>
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

// jwt.sign({ foo: 'bar' }, secretSignKey, (err, token) => {
//   console.log(err, 'error');
//   console.log(token);
// });
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
