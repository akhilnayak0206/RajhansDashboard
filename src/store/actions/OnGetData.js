import types from '../action_types/index';

//this whole is  unnecessary do auth from screen for smoother transition
const OnGetData = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    // const firestore = getFirestore();
    let dataRef = firebase.firestore().collection(data.collection);
    // eslint-disable-next-line
    let query = dataRef
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return dispatch({
            type: types.ON_GET_COLLECTION,
            payload: {
              collectionData: [],
              message: 'No matching documents.',
              collection: data.collection
            }
          });
        }
        let collectionData = [];
        // console.log(snapshot);
        snapshot.forEach(doc => {
          let data = { ...doc.data(), doc: doc.id };
          collectionData.push(data);
        });
        dispatch({
          type: types.ON_GET_COLLECTION,
          payload: {
            collectionData,
            message: 'Documents Found',
            collection: data.collection
          }
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  };
};

export default OnGetData;
