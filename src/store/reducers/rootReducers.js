import auth from './auth';
import wings from './wings';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  wings,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
