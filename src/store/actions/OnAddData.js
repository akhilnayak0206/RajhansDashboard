import types from '../action_types/index';

//this whole is  unnecessary do auth from screen for smoother transition
const OnAddData = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    // const firestore = getFirestore();
    // switch (data.collection) {
    //   case 'wellWishers':
    // {
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
          collection: data.collection
        }
      });
    }
    // }
    // break;
    // }
  };
};

export default OnAddData;
