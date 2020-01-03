import types from '../action_types/index';

//this whole is  unnecessary do auth from screen for smoother transition
const OnWings = data => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    // const firestore = getFirestore();
    switch (data.type) {
      case 'GET':
        {
          let dataRef = firebase.firestore().collection(data.wing);
          let query = dataRef
            .get()
            .then(snapshot => {
              if (snapshot.empty) {
                console.log('No matching documents.');
                return;
              }
              let wing = [];
              // console.log(snapshot);
              snapshot.forEach(doc => {
                wing.push(doc.data());
              });
              dispatch({
                type: types.ON_GET_WING,
                payload: { wing }
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
    }
  };
};

export default OnWings;
