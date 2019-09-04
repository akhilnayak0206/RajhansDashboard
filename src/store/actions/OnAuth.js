import types from "../action_types/index";

const OnAuth = type => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("type", type);
    const firebase = getFirebase();
    switch (type) {
      case "login": 
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(function() {
            return firebase.auth().signInWithEmailAndPassword("nnewn3@gmail.com", "12345678")
            .then(() => {
              dispatch({
                type: types.ON_SEND_LOGIN,
                payload: {message:"Welcome!"}
              });
            })
            .catch(error => {
              // Handle Errors here.
              let errorCode = error.code;
              let errorMessage = error.message;
              console.log("Handle Error in OnAuth login", errorCode, errorMessage);
              dispatch({
                type: types.ON_SEND_LOGIN_ERROR,
                payload: {message:"Invalid email or password"}
              });
            });
          });
      break;
      case "logout": 
        firebase
          .auth()
          .signOut()
          .then(function() {
            // Sign-out successful.
            dispatch({
              type: types.ON_SEND_LOGOUT,
              payload: {message:"Logging Out"}
            });
          })
          .catch(function(error) {
            // An error happened.
            console.log("Handle Error in OnAuth logout",error)
            dispatch({
              type: types.ON_SEND_LOGOUT_ERROR,
              payload: {message:"Error Logging Out"}
            });
          });
      break;
    }
  };
};

export default OnAuth;
