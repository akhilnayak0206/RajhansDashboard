import types from "../action_types/index";

const OnAuth = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
   
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword("nnewn3@gmail.com", "12345678")
      .then(() => {
        console.log("action");
        dispatch({
          type: types.ON_SEND_LOGIN,
          payload: {}
        });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
       console.log("error",errorCode,errorMessage)
      });
  };
};

export default OnAuth;
