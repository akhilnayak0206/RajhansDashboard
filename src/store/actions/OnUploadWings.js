import types from '../action_types/index';

//this whole is  unnecessary do auth from screen for smoother transition
const OnUploadWings = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let wingA = firebase.firestore().collection('wingA');
    let totalWingA = [];
    let wingB = firebase.firestore().collection('wingB');
    let totalWingB = [];
    let wingC = firebase.firestore().collection('wingC');
    let totalWingC = [];
    let wingD = firebase.firestore().collection('wingD');
    let totalWingD = [];
    let wingE = firebase.firestore().collection('wingE');
    let totalWingE = [];

    let promiseWingA = () =>
      wingA
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          snapshot.forEach(doc => {
            const { Receipt, ...pushData } = doc.data();
            totalWingA.push({ ...pushData });
          });
          return totalWingA;
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

    let promiseWingB = () =>
      wingB
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents B.');
            return;
          }
          snapshot.forEach(doc => {
            const { Receipt, ...pushData } = doc.data();
            totalWingB.push({ ...pushData });
          });
          return totalWingB;
        })
        .catch(err => {
          console.log('Error getting B documents', err);
        });

    let promiseWingC = () =>
      wingC
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching C documents.');
            return;
          }
          snapshot.forEach(doc => {
            const { Receipt, ...pushData } = doc.data();
            totalWingC.push({ ...pushData });
          });
          return totalWingC;
        })
        .catch(err => {
          console.log('Error getting documents C', err);
        });

    let promiseWingD = () =>
      wingD
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching D documents.');
            return;
          }
          snapshot.forEach(doc => {
            const { Receipt, ...pushData } = doc.data();
            totalWingD.push({ ...pushData });
          });
          return totalWingD;
        })
        .catch(err => {
          console.log('Error getting documents D', err);
        });

    let promiseWingE = () =>
      wingE
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          snapshot.forEach(doc => {
            const { Receipt, ...pushData } = doc.data();
            totalWingE.push({ ...pushData });
          });
          return totalWingE;
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

    Promise.all([
      promiseWingA(),
      promiseWingB(),
      promiseWingC(),
      promiseWingD(),
      promiseWingE()
    ]).then(values => {
      console.log(values.flat());
      //   firebase.firestore().collection('');
      dispatch({
        type: types.ON_SET_UPLOAD,
        payload: values.flat()
      });
    });
  };
};

export default OnUploadWings;
