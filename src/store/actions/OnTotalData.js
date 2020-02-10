import types from '../action_types/index';

//this whole is  unnecessary do auth from screen for smoother transition
const OnTotalData = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    let wingA = firebase.firestore().collection('wingA');
    let totalWingA = 0;
    let wingB = firebase.firestore().collection('wingB');
    let totalWingB = 0;
    let wingC = firebase.firestore().collection('wingC');
    let totalWingC = 0;
    let wingD = firebase.firestore().collection('wingD');
    let totalWingD = 0;
    let wingE = firebase.firestore().collection('wingE');
    let totalWingE = 0;
    let wellWishers = firebase.firestore().collection('wellWishers');
    let totalWellWishers = 0;
    let expenses = firebase.firestore().collection('expenses');
    let totalExpenses = 0;

    let promiseWingA = () =>
      wingA
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          // console.log(snapshot);
          snapshot.forEach(doc => {
            // wingAData.push();
            totalWingA += Number(doc.data().Amount);
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
          // console.log(snapshot);
          snapshot.forEach(doc => {
            // wingAData.push();
            totalWingB += Number(doc.data().Amount);
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
          // console.log(snapshot);
          snapshot.forEach(doc => {
            // wingAData.push();
            totalWingC += Number(doc.data().Amount);
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
          // console.log(snapshot);
          snapshot.forEach(doc => {
            // wingAData.push();
            totalWingD += Number(doc.data().Amount);
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
          // console.log(snapshot);
          snapshot.forEach(doc => {
            // wingAData.push();
            totalWingE += Number(doc.data().Amount);
          });
          return totalWingE;
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

    let promiseWellWishers = () =>
      wellWishers
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents wellwishers total.');
            return;
          }
          snapshot.forEach(doc => {
            if (doc.data().Amount) {
              totalWellWishers += Number(doc.data().Amount);
            }
          });
          return totalWellWishers;
        })
        .catch(err => {
          console.log('Error getting wellwishers total', err);
        });

    let promiseExpenses = () =>
      expenses
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');
            return;
          }
          // console.log(snapshot);
          snapshot.forEach(doc => {
            if (doc.data().Amount) {
              totalExpenses += Number(doc.data().Amount);
            }
          });
          return totalExpenses;
        })
        .catch(err => {
          console.log('Error getting expenses total', err);
        });

    Promise.all([
      promiseWingA(),
      promiseWingB(),
      promiseWingC(),
      promiseWingD(),
      promiseWingE(),
      promiseWellWishers(),
      promiseExpenses()
    ]).then(values => {
      dispatch({
        type: types.ON_GET_TOTAL_DATA,
        payload: {
          totalExpenses,
          totalWellWishers,
          totalWingA,
          totalWingB,
          totalWingC,
          totalWingD,
          totalWingE,
          totalCollection:
            totalWellWishers +
            totalWingA +
            totalWingB +
            totalWingC +
            totalWingD +
            totalWingE,
          cashInHand:
            totalWellWishers +
            totalWingA +
            totalWingB +
            totalWingC +
            totalWingD +
            totalWingE -
            totalExpenses
        }
      });
    });
  };
};

export default OnTotalData;
