import types from '../action_types/index';

import jwt from 'jsonwebtoken';

import secretSignKey from '../../secretToken';

const OnShare = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    // eslint-disable-next-line
    let docRef = await firebase
      .firestore()
      .collection(data.collection)
      .doc(data.doc)
      .get();
    if (docRef.exists) {
      let jsonData = docRef.data();
      // eslint-disable-next-line
      if (jsonData.Amount == 0) {
        return dispatch({
          type: types.ON_SHARE_RECEIPT,
          payload: {
            error: true,
            message: 'No Amount added',
            description: 'Bhai Amount to daal de',
            collection: data.collection,
            document: data.doc,
            token: ''
          }
        });
      } else {
        jwt.sign(
          {
            received: jsonData.Received,
            collected: jsonData.Collected,
            amount: jsonData.Amount,
            timestamp: jsonData.timestamp,
            flatNo: jsonData.Flatno
          },
          secretSignKey,
          (err, token) => {
            if (token) {
              //   try {
              //     var decoded = jwt.verify(token, 'secretSignKey');
              //     console.log('went here decoded', decoded);
              //   } catch (err) {
              //     // err
              //     console.log('error verify', err);
              //   }
              return dispatch({
                type: types.ON_SHARE_RECEIPT,
                payload: {
                  error: false,
                  message: 'Receipt Found',
                  description: 'Bhai Receipt share kar de',
                  collection: data.collection,
                  document: data.doc,
                  token
                }
              });
            } else if (err) {
              console.log(err);
            } else {
              console.log('Avada Kedavra !!!, Unknown Error');
            }
          }
        );
      }
    } else {
      console.log(data.collection, data.doc);
      return dispatch({
        type: types.ON_SHARE_RECEIPT,
        payload: {
          error: true,
          message: 'No Receipt Found',
          collection: data.collection,
          document: data.doc,
          token: ''
        }
      });
    }
  };
};

export default OnShare;
