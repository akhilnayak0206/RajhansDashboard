import types from '../action_types/index';

//this whole is  unnecessary do auth from screen for smoother transition
const OnCollectionData = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    // const firestore = getFirestore();
    switch (data.type) {
      case 'GET':
        {
          let dataRef = firebase.firestore().collection(data.collection);
          let query = dataRef
            .get()
            .then(snapshot => {
              if (snapshot.empty) {
                console.log('No matching documents.');
                return;
              }
              let collection = [];
              // console.log(snapshot);
              snapshot.forEach(doc => {
                collection.push(doc.data());
              });
              dispatch({
                type: types.ON_GET_COLLECTION,
                payload: { collection }
              });
            })
            .catch(err => {
              console.log('Error getting documents', err);
            });
        }
        break;
      case 'SET':
        {
        }
        break;
      case 'SET':
        {
        }
        break;
      case 'DELETE':
        {
        }
        break;
    }
  };
};

export default OnCollectionData;
