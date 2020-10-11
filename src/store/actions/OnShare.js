import types from '../action_types/index';

import jwt from 'jsonwebtoken';

import secretSignKey from '../../secretToken';

const OnShare = (data) => {
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
            token: '',
            mail: false,
          },
        });
      } else {
        jwt.sign(
          {
            received: jsonData.Received,
            collected: jsonData.Collected,
            amount: jsonData.Amount,
            timestamp: jsonData.timestamp,
            flatNo: jsonData.Flatno,
          },
          secretSignKey,
          (err, token) => {
            if (token) {
              if (data.mail) {
                return dispatch({
                  type: types.ON_SHARE_RECEIPT,
                  payload: {
                    error: false,
                    message: 'Receipt Found',
                    description: 'Bhai Receipt share kar de',
                    collection: data.collection,
                    document: data.doc,
                    token,
                    mail: data.mail,
                    url: `mailto:${data.personal}?subject=Thank You for contributing in Navratri festival &body= Jai Mitra Mandal thanks ${jsonData.Received} for the contribution of Rs.${jsonData.Amount}.<br>Your Receipt link: https://jmmrajhans.firebaseapp.com/receipt/${token} <br>For more info about Navratri in Nav Rajhans: https://jmmrajhans.firebaseapp.com/home <br> Regards,<br>JMM<br>Nav Rajhans<br>Borivali West`,
                  },
                });
              } else if (Number(data.personal)) {
                return dispatch({
                  type: types.ON_SHARE_RECEIPT,
                  payload: {
                    error: false,
                    message: 'Receipt Found',
                    description: 'Bhai Receipt share kar de',
                    collection: data.collection,
                    document: data.doc,
                    token,
                    mail: data.mail,
                    url: `whatsapp://send?phone=91${Number(
                      data.personal
                    )}&text=Jai Mitra Mandal thanks ${
                      jsonData.Received
                    } for the contribution of Rs.${
                      jsonData.Amount
                    }.%0d%0aYour Receipt link: https://jmmrajhans.firebaseapp.com/receipt/${token} %0d%0aFor more info about Navratri in Nav Rajhans: https://jmmrajhans.firebaseapp.com/home `,
                  },
                });
              } else {
                return dispatch({
                  type: types.ON_SHARE_RECEIPT,
                  payload: {
                    error: false,
                    message: 'Receipt Found',
                    description: 'Bhai Receipt share kar de',
                    collection: data.collection,
                    document: data.doc,
                    token,
                    mail: data.mail,
                    url: `whatsapp://send?text=Jai Mitra Mandal thanks ${jsonData.Received} for the contribution of Rs.${jsonData.Amount}.%0d%0aYour Receipt link: https://jmmrajhans.firebaseapp.com/receipt/${token} %0d%0aFor more info about Navratri in Nav Rajhans: https://jmmrajhans.firebaseapp.com/home `,
                  },
                });
              }
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
          token: '',
          mail: false,
        },
      });
    }
  };
};

export default OnShare;
