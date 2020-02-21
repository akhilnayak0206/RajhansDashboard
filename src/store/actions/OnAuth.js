import types from '../action_types/index';

//this whole is  unnecessary do auth from screen for smoother transition
const OnAuth = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    switch (data.type) {
      case 'login':
        let cityRef = firebase
          .firestore()
          .collection('users')
          .doc(data.email);
        let getDoc = cityRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              console.log('Document data:', doc.data());
              dispatch({
                type: types.ON_SEND_LOGIN,
                payload: { dataLogin: doc.data(), messageLogin: 'Login action' }
              });
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
        break;
      // firebase
      // .auth()
      //     .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      //     .then(function() {
      //       return firebase.auth().signInWithEmailAndPassword(data.username, data.password)
      //       .then(() => {
      //         dispatch({
      //           type: types.ON_SEND_LOGIN,
      //           payload: {message:"Welcome!"}
      //         });
      //       })
      //       .catch(error => {
      //         // Handle Errors here.
      //         let errorCode = error.code;
      //         let errorMessage = error.message;
      //         console.log("Handle Error in OnAuth login", errorCode, errorMessage);
      //         dispatch({
      //           type: types.ON_SEND_LOGIN_ERROR,
      //           payload: {message:"Invalid email or password"}
      //         });
      //       });
      //     });
      case 'email_data':
        let dataRef = firebase
          .firestore()
          .collection('users')
          .doc(
            firebase.auth().currentUser && firebase.auth().currentUser.email
          );
        dataRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              dispatch({
                type: types.ON_EMAIL_DATA,
                payload: {
                  dataEmail: doc.data(),
                  messageEmail: 'Email data at account'
                }
              });
            }
          })
          .catch(err => {
            dispatch({
              type: types.ON_EMAIL_DATA,
              payload: {
                messageEmail: 'Email data at account invalid',
                errorEmail: true,
                errorObjEmail: err
              }
            });
          });
        break;
      case 'get_users':
        let usersData = firebase.firestore().collection('users');
        usersData
          .get()
          .then(snapshot => {
            let users = [];
            snapshot.forEach(doc => {
              users.push(doc.data());
            });
            dispatch({
              type: types.ON_GET_USERS,
              payload: {
                users,
                messageUsers: 'Users data successfully'
              }
            });
          })
          .catch(err => {
            dispatch({
              type: types.ON_GET_USERS,
              payload: {
                messageUsers: 'Email data invalid',
                errorUsers: true,
                errorObjUsers: err
              }
            });
          });
        break;
      //didn't use because unnecessary
      // case "logout":
      //   firebase
      //     .auth()
      //     .signOut()
      //     .then(function() {
      //       // Sign-out successful.
      //       dispatch({
      //         type: types.ON_SEND_LOGOUT,
      //         payload: {message:"Logging Out"}
      //       });
      //     })
      //     .catch(function(error) {
      //       // An error happened.
      //       console.log("Handle Error in OnAuth logout",error)
      //       dispatch({
      //         type: types.ON_SEND_LOGOUT_ERROR,
      //         payload: {message:"Error Logging Out"}
      //       });
      //     });
      // break;
    }
  };
};

export default OnAuth;
