import types from '../action_types/index';

const OnDeleteData = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const { collection, doc } = data;
    // eslint-disable-next-line
    let deleteDoc = await firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .delete();
    let ipApi = await fetch(
      'http://api.ipapi.com/api/check?access_key=4cf1fc28782aa031778b0af65638fdf2'
    );
    let userData = await ipApi.json();
    let addDoc;
    if (userData) {
      addDoc = await firebase
        .firestore()
        .collection('deleteReset')
        .add({
          ...data,
          userEmail:
            firebase.auth().currentUser && firebase.auth().currentUser.email,
          userData
        });
    } else {
      addDoc = await firebase
        .firestore()
        .collection('deleteReset')
        .add({
          ...data,
          userEmail:
            firebase.auth().currentUser && firebase.auth().currentUser.email,
          userData: `Couldn't add the data. API Error`
        });
    }
    if (addDoc.id) {
      dispatch({
        type: types.ON_DELETE_COLLECTION,
        payload: {
          result: 1,
          message: 'Data Deleted Successfully',
          collection: collection
        }
      });
    }
  };
};

export default OnDeleteData;
