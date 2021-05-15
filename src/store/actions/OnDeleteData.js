import types from '../action_types/index';

const OnDeleteData = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const { collection, doc } = data;
    // eslint-disable-next-line
    let deleteDoc = await firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .delete();
    let ipAddress;
    let geoIpData = await fetch('https://geoip-db.com/json');
    ipAddress = await geoIpData.json();

    let ipApi = await fetch(
      `http://ipinfo.io/${ipAddress.IPv4}?token=69e9221c22cb9d`
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
          userData,
        });
    } else {
      addDoc = await firebase
        .firestore()
        .collection('deleteReset')
        .add({
          ...data,
          userEmail:
            firebase.auth().currentUser && firebase.auth().currentUser.email,
          userData: `Couldn't add the data. API Error`,
        });
    }
    if (addDoc.id) {
      dispatch({
        type: types.ON_DELETE_COLLECTION,
        payload: {
          result: 1,
          message: 'Data Deleted Successfully',
          collection: collection,
        },
      });
    }
  };
};

export default OnDeleteData;
