import auth from './auth';
import collectionData from './collectionData';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  collectionData,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
