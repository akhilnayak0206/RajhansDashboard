import auth from './auth';
import getData from './getData';
import addData from './addData';
import deleteData from './deleteData';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  getData,
  addData,
  deleteData,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
