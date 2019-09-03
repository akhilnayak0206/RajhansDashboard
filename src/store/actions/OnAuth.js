import types from "../action_types/index";

const OnAuth = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make call
    const firestore = getFirestore();
    firestore
      .collection("users")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            dispatch({
              type: types.ON_AUTH,
              payload: doc.data()
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!", doc);
          }
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };
};

export default OnAuth;
