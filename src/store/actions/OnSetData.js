import types from '../action_types/index';

//this whole is  unnecessary do auth from screen for smoother transition
const OnSetData = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    try {
      if (data.collection === 'wellWishers' || data.collection === 'expenses') {
        firebase
          .firestore()
          .collection(data.collection)
          .add(data.setData)
          .then(ref => {
            dispatch({
              type: types.ON_SET_COLLECTION,
              payload: {
                result: 1,
                message: 'Data set Successfully',
                collection: data.collection,
                document: ref.id,
                error: false
              }
            });
          });
      } else if (data.doc) {
        let docRef = await firebase
          .firestore()
          .collection(data.collection)
          .doc(data.doc)
          .get();
        if (docRef.exists) {
          firebase
            .firestore()
            .collection(data.collection)
            .doc(data.doc)
            .update({
              ...data.setData,
              Receipt: firebase.firestore.FieldValue.arrayUnion({
                ...data.setData
              })
            })
            .then(() => {
              dispatch({
                type: types.ON_SET_COLLECTION,
                payload: {
                  result: 1,
                  message: 'Data set Successfully',
                  collection: data.collection,
                  document: data.doc,
                  error: false
                }
              });
            });
        }
      } else {
        dispatch({
          type: types.ON_SET_COLLECTION,
          payload: {
            result: 0,
            message: 'Error on setting collection',
            collection: data.collection,
            document: data.doc,
            error: true
          }
        });
      }
    } catch (err) {
      dispatch({
        type: types.ON_SET_COLLECTION,
        payload: {
          result: 0,
          message: 'Error while sending request.',
          collection: data.collection,
          document: data.doc,
          error: true,
          errArray: err
        }
      });
    }
  };
};

export default OnSetData;
