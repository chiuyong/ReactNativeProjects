import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';


export default combineReducers({
  auth: AuthReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
});
