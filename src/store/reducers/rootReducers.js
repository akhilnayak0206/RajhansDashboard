import auth from "./auth";

import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
