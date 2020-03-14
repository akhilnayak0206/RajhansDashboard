import auth from './auth';
import getData from './getData';
import setData from './setData';
import addData from './addData';
import deleteData from './deleteData';
import totalData from './totalData';
import uploadWings from './uploadWings';
import download from './download';
import share from './share';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  getData,
  addData,
  deleteData,
  setData,
  totalData,
  uploadWings,
  download,
  share,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
