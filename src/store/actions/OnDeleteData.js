import types from '../action_types/index';

const OnDeleteData = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const { collection, deleteDataID, deleteDataObj } = data;
    console.log(deleteDataID);
    let deleteDoc = await firebase
      .firestore()
      .collection(collection)
      .doc(deleteDataID)
      .delete();
    let addDoc = await firebase
      .firestore()
      .collection('deleteReset')
      .add(deleteDataObj);
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
