import types from "../action_types/index";

//this whole is  unnecessary do auth from screen for smoother transition
const OnAuth = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("type", data.type);
    console.log("type", data);
    const firebase = getFirebase();
    const firestore = getFirestore();
    switch (data.type) {
      case "login":
        let cityRef = firebase
          .firestore()
          .collection("users")
          .doc(data.email);
        let getDoc = cityRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log("No such document!");
            } else {
              console.log("Document data:", doc.data());
              dispatch({
                type: types.ON_SEND_LOGIN,
                payload: { data: doc.data(), message: "Login action" }
              });
            }
          })
          .catch(err => {
            console.log("Error getting document", err);
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
      case "login_data":
        let dataRef = firebase
          .firestore()
          .collection("users")
          .doc(data.email);
        dataRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log("No such document!");
            } else {
              console.log("Document data:", doc.data());
              dispatch({
                type: types.ON_SEND_LOGIN_DATA,
                payload: {
                  data: doc.data(),
                  message: "Login action at account"
                }
              });
            }
          })
          .catch(err => {
            console.log("Error getting document", err);
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
