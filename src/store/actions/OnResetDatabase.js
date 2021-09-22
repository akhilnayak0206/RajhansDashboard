import types from '../action_types/index';

const OnResetDatabase = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try{
      {
    const firebase = getFirebase();
    let ipAddress;
    let userData;
    let geoIpData = await fetch('https://geoip-db.com/json/');
    if (geoIpData) {
      ipAddress = await geoIpData.json();
    }

    // get ip address
    let ipApi = await fetch(
      `http://ipinfo.io/${ipAddress.IPv4}?token=69e9221c22cb9d`
    );

    if (ipApi) {
      userData = await ipApi.json();
    }

    // get all data
    let amountA = 0;
    let amountB = 0;
    let amountC = 0;
    let amountD = 0;
    let amountE = 0;
    let amountWell = 0;
    let amountExp = 0;

    const getDataWingA = async () => {
      await firebase
        .firestore()
        .collection('wingA')
        .get()
        .then((query) => {
          query.forEach((doc) => {
            if (isNaN(parseInt(doc.data()['Amount']))) {
            } else {
              amountA = amountA + parseInt(doc.data()['Amount']);
            }
          });

          return true;
        })
        .catch(function (error) {
          throw error;
        });
    };

    const getDataWingB = async () => {
      await firebase
        .firestore()
        .collection('wingB')
        .get()
        .then((query) => {
          query.forEach((doc) => {
            if (isNaN(parseInt(doc.data()['Amount']))) {
            } else {
              amountB = amountB + parseInt(doc.data()['Amount']);
            }
          });

          return true;
        })
        .catch(function (error) {
          throw error;
        });
    };

    const getDataWingC = async () => {
      await firebase
        .firestore()
        .collection('wingC')
        .get()
        .then((query) => {
          query.forEach((doc) => {
            if (isNaN(parseInt(doc.data()['Amount']))) {
            } else {
              amountC = amountC + parseInt(doc.data()['Amount']);
            }
          });

          return true;
        })
        .catch(function (error) {
          throw error;
        });
    };

    const getDataWingD = async () => {
      await firebase
        .firestore()
        .collection('wingD')
        .get()
        .then((query) => {
          query.forEach((doc) => {
            if (isNaN(parseInt(doc.data()['Amount']))) {
            } else {
              amountD = amountD + parseInt(doc.data()['Amount']);
            }
          });

          return true;
        })
        .catch(function (error) {
          throw error;
        });
    };

    const getDataWingE = async () => {
      await firebase
        .firestore()
        .collection('wingE')
        .get()
        .then((query) => {
          query.forEach((doc) => {
            if (isNaN(parseInt(doc.data()['Amount']))) {
            } else {
              amountE = amountE + parseInt(doc.data()['Amount']);
            }
          });

          return true;
        })
        .catch(function (error) {
          throw error;
        });
    };

    const getDataWellWishers = async () => {
      await firebase
        .firestore()
        .collection('wellWishers')
        .get()
        .then((query) => {
          query.forEach((doc) => {
            if (isNaN(parseInt(doc.data()['Amount']))) {
            } else {
              amountWell = amountWell + parseInt(doc.data()['Amount']);
            }
          });

          return true;
        })
        .catch(function (error) {
          throw error;
        });
    };

    const getDataExpenses = async () => {
      await firebase
        .firestore()
        .collection('expenses')
        .get()
        .then((query) => {
          query.forEach((doc) => {
            if (isNaN(parseInt(doc.data()['Amount']))) {
            } else {
              amountExp = amountExp + parseInt(doc.data()['Amount']);
            }
          });

          return true;
        })
        .catch(function (error) {
          throw error;
        });
    };

    // eslint-disable-next-line
    let checkIfAllDataIsFound = await Promise.all([
      getDataWingA(),
      getDataWingB(),
      getDataWingC(),
      getDataWingD(),
      getDataWingE(),
      getDataWellWishers(),
      getDataExpenses(),
    ]);

    // data to add
    let nameOfUserObject = await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.email).get();
    let dataToAddInReset = {
      Amount:
        Number(amountA) +
        Number(amountB) +
        Number(amountC) +
        Number(amountD) +
        Number(amountE) +
        Number(amountWell),
      Name: nameOfUserObject.Name,
      Type: 'Reset',
      Date: new Date(),
      expenses: amountExp,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userData,
      userEmail:
        firebase.auth().currentUser && firebase.auth().currentUser.email,
    };

    // add data inside reset database
    let dataAddedInDb = await firebase
      .firestore()
      .collection('deleteReset')
      .add(dataToAddInReset);

    // start deletion of data

    let wingName = ['wingA', 'wingB', 'wingC', 'wingD', 'wingE'];

    // dummy wing data
    let dummyWingData = {
      Amount: 0,
      Received: '',
      Collected: '',
      Receipt: [],
    };

    // delete all wing data
    wingName.map(async (wing) => {
      let wingArray = await firebase.firestore().collection(wing);

      await wingArray.get().then((query) => {
        query.forEach((doc) => {
          wingArray
            .doc(doc.id.toString())
            .update(dummyWingData)
            .then(() => {
              console.log(doc.id.toString());
            })
            .catch(() => {
              throw Error;
            });
        });
        return true;
      });
    });

    // delete  all wellwishers
    let docRefWellWisher = await firebase.firestore().collection('wellWishers');
    await docRefWellWisher.get().then((query) => {
      query.forEach((doc) => {
        // eslint-disable-next-line
        if (doc.data()['Collected'] != undefined) {
          firebase
            .firestore()
            .collection('wellWishers')
            .doc(doc.id.toString())
            .delete()
            .then(function () {
              console.log('well', doc.id.toString());
            })
            .catch(function (error) {
              throw Error;
            });
        }
      });
      return true;
    });

    // delete all expenses
    let docRefExpense = await firebase.firestore().collection('expenses');
    await docRefExpense.get().then((query) => {
      query.forEach((doc) => {
        // eslint-disable-next-line
        if (doc.data()['Collected'] != undefined) {
          firebase
            .firestore()
            .collection('expenses')
            .doc(doc.id.toString())
            .delete()
            .then(function () {
              console.log(doc.id.toString());
            })
            .catch(function (error) {
              throw error;
            });
        }
      });
    });

    // delete all todo
    let docRefToDo = await firebase.firestore().collection('toDo');
    await docRefToDo.get().then((query) => {
      query.forEach((doc) => {
        // eslint-disable-next-line
        if (doc.data()['Collected'] != undefined) {
          firebase
            .firestore()
            .collection('toDo')
            .doc(doc.id.toString())
            .delete()
            .then(function () {
              console.log(doc.id.toString());
            })
            .catch(function (error) {
              throw error;
            });
        }
      });
    });

    // if (userData) {
    // addDoc = await firebase
    //   .firestore()
    //   .collection('deleteReset')
    //   .add({
    //     ...data,
    //     userEmail:
    //       firebase.auth().currentUser && firebase.auth().currentUser.email,
    //     userData
    //   });
    // } else {
    // addDoc = await firebase
    //   .firestore()
    //   .collection('deleteReset')
    //   .add({
    //     ...data,
    //     userEmail:
    //       firebase.auth().currentUser && firebase.auth().currentUser.email,
    //     userData: `Couldn't add the data. API Error`
    //   });
    // }
    if (dataAddedInDb.id) {
      return dispatch({
        type: types.ON_RESET_COLLECTION,
        payload: {
          result: 1,
          message: 'Data Reset Successfully',
        },
      });
    } else {
      return dispatch({
        type: types.ON_RESET_COLLECTION,
        payload: {
          result: 0,
          message: 'Data Reset was not successfully',
        },
      });
    }
  }
    }
    catch(error){
      console.log(error)
      return dispatch({
        type: types.ON_RESET_COLLECTION,
        payload: {
          result: 0,
          message: 'Data Reset was not successfully',
        },
      });
    }
  };
};

export default OnResetDatabase;
