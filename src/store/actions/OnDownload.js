import types from '../action_types/index';

const OnDownload = data => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { type } = data;
    switch (type) {
      case 'wellWishers':
        let dataWellWisherRef = firebase
          .firestore()
          .collection(type)
          .orderBy('timestamp');
        // eslint-disable-next-line
        let queryWellWisher = dataWellWisherRef
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              return dispatch({
                type: types.ON_GET_CSV,
                payload: {
                  wellWishers: [],
                  message: 'No Well Wishers found',
                  dataType: type,
                  dataExists: false,
                  error: false
                }
              });
            }
            let collectionData = [
              ['Received From', 'Collected By', 'Amount', 'Date']
            ];
            if (getState().auth.dataEmail.adminVerified) {
              collectionData = [
                [
                  'Received From',
                  'Collected By',
                  'Amount',
                  'Date',
                  'Secret Name'
                ]
              ];
              snapshot.forEach(doc => {
                let data = { ...doc.data() };
                let pushData = [
                  data.Received,
                  data.Collected,
                  data.Amount,
                  new Date(data.timestamp.seconds * 1000),
                  data.secretName
                ];
                collectionData.push(pushData);
              });
              return dispatch({
                type: types.ON_GET_CSV,
                payload: {
                  wellWishers: collectionData,
                  message: 'Well Wishers ready to Download',
                  dataType: type,
                  dataExists: true,
                  error: false
                }
              });
            } else {
              snapshot.forEach(doc => {
                let data = { ...doc.data() };
                let pushData = [
                  data.Received,
                  data.Collected,
                  data.Amount,
                  new Date(data.timestamp.seconds * 1000)
                ];
                collectionData.push(pushData);
              });
              return dispatch({
                type: types.ON_GET_CSV,
                payload: {
                  wellWishers: collectionData,
                  message: 'Well Wishers ready to Download',
                  dataType: type,
                  dataExists: true,
                  error: false
                }
              });
            }
          })
          .catch(err => {
            console.log('Error getting documents', err);
            return dispatch({
              type: types.ON_GET_CSV,
              payload: {
                wellWishers: [],
                message: 'Error while downloading Well Wishers',
                dataType: type,
                dataExists: false,
                error: true,
                errorData: err
              }
            });
          });
        break;
      case 'expenses':
        let dataExpensesRef = firebase
          .firestore()
          .collection(type)
          .orderBy('timestamp');
        // eslint-disable-next-line
        let queryExpenses = dataExpensesRef
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              return dispatch({
                type: types.ON_GET_CSV,
                payload: {
                  expenses: [],
                  message: 'No Expenses found',
                  dataType: type,
                  dataExists: false,
                  error: false
                }
              });
            }
            let collectionData = [
              ['Date', 'Title ', 'Collected', 'Amount', 'Description']
            ];
            snapshot.forEach(doc => {
              let data = { ...doc.data() };
              let pushData = [
                data.Title,
                data.Collected,
                data.Amount,
                new Date(data.timestamp.seconds * 1000),
                data.Description
              ];
              collectionData.push(pushData);
            });
            return dispatch({
              type: types.ON_GET_CSV,
              payload: {
                expenses: collectionData,
                message: 'Expenses ready to Download',
                dataType: type,
                dataExists: true,
                error: false
              }
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
            return dispatch({
              type: types.ON_GET_CSV,
              payload: {
                wellWishers: [],
                message: 'Error while downloading Expenses',
                dataType: type,
                dataExists: false,
                error: true,
                errorData: err
              }
            });
          });
        break;
      case 'wings':
        {
          let allWings = [
            ['Wing', 'Flat No.', 'Amount', 'Received From', 'Collected By']
          ];
          let wingA = firebase
            .firestore()
            .collection('wingA')
            .orderBy('Flatno');

          let wingB = firebase
            .firestore()
            .collection('wingB')
            .orderBy('Flatno');

          let wingC = firebase
            .firestore()
            .collection('wingC')
            .orderBy('Flatno');

          let wingD = firebase
            .firestore()
            .collection('wingD')
            .orderBy('Flatno');

          let wingE = firebase
            .firestore()
            .collection('wingE')
            .orderBy('Flatno');

          let wingAData = async () => {
            await wingA
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let data = { ...doc.data() };
                  let pushData = [
                    'A',
                    data.Flatno,
                    data.Amount,
                    data.Received,
                    data.Collected
                  ];
                  allWings.push(pushData);
                });
              })
              .catch(err => {
                console.log('Error getting documents', err);
                return dispatch({
                  type: types.ON_GET_CSV,
                  payload: {
                    allWings: [],
                    message: 'Error while downloading Wing A',
                    dataType: type,
                    dataExists: false,
                    error: true,
                    errorData: err
                  }
                });
              });
          };

          let wingBData = async () => {
            await wingB
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let data = { ...doc.data() };
                  let pushData = [
                    'B',
                    data.Flatno,
                    data.Amount,
                    data.Received,
                    data.Collected
                  ];
                  allWings.push(pushData);
                });
              })
              .catch(err => {
                console.log('Error getting documents', err);
                return dispatch({
                  type: types.ON_GET_CSV,
                  payload: {
                    allWings: [],
                    message: 'Error while downloading Wing B',
                    dataType: type,
                    dataExists: false,
                    error: true,
                    errorData: err
                  }
                });
              });
          };

          let wingCData = async () => {
            await wingC
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let data = { ...doc.data() };
                  let pushData = [
                    'C',
                    data.Flatno,
                    data.Amount,
                    data.Received,
                    data.Collected
                  ];
                  allWings.push(pushData);
                });
              })
              .catch(err => {
                console.log('Error getting documents', err);
                return dispatch({
                  type: types.ON_GET_CSV,
                  payload: {
                    allWings: [],
                    message: 'Error while downloading Wing C',
                    dataType: type,
                    dataExists: false,
                    error: true,
                    errorData: err
                  }
                });
              });
          };

          let wingDData = async () => {
            await wingD
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let data = { ...doc.data() };
                  let pushData = [
                    'D',
                    data.Flatno,
                    data.Amount,
                    data.Received,
                    data.Collected
                  ];
                  allWings.push(pushData);
                });
              })
              .catch(err => {
                console.log('Error getting documents', err);
                return dispatch({
                  type: types.ON_GET_CSV,
                  payload: {
                    allWings: [],
                    message: 'Error while downloading Wing D',
                    dataType: type,
                    dataExists: false,
                    error: true,
                    errorData: err
                  }
                });
              });
          };

          let wingEData = async () => {
            await wingE
              .get()
              .then(snapshot => {
                snapshot.forEach(doc => {
                  let data = { ...doc.data() };
                  let pushData = [
                    'E',
                    data.Flatno,
                    data.Amount,
                    data.Received,
                    data.Collected
                  ];
                  allWings.push(pushData);
                });
              })
              .catch(err => {
                console.log('Error getting documents', err);
                return dispatch({
                  type: types.ON_GET_CSV,
                  payload: {
                    allWings: [],
                    message: 'Error while downloading Wing E',
                    dataType: type,
                    dataExists: false,
                    error: true,
                    errorData: err
                  }
                });
              });
          };

          Promise.all([
            wingAData(),
            wingBData(),
            wingCData(),
            wingDData(),
            wingEData()
          ]).then(values => {
            return dispatch({
              type: types.ON_GET_CSV,
              payload: {
                allWings,
                message: 'Wings ready to Download',
                dataType: type,
                dataExists: true,
                error: false
              }
            });
          });
        }
        break;
      default:
        break;
    }
  };
};

export default OnDownload;
