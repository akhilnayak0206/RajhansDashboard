import types from '../action_types/index';

const OnAddData = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let addDoc = await firebase
      .firestore()
      .collection(data.collection)
      .add(data.newData);
    if (addDoc.id) {
      dispatch({
        type: types.ON_ADD_COLLECTION,
        payload: {
          result: 1,
          message: 'Data Added Successfully',
          collection: data.collection,
          addedData: data.newData,
        },
      });
    }
  };
};

export default OnAddData;
