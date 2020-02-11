import types from '../action_types/index';

//this whole is  unnecessary do auth from screen for smoother transition
const OnSetData = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    try {
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
          .update(data.setData)
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
      } else {
        dispatch({
          type: types.ON_SET_COLLECTION,
          payload: {
            result: 0,
            message: 'No such flats',
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
          error: true
        }
      });
    }
  };
};

export default OnSetData;
