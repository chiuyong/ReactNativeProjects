import firebase from 'firebase';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL_SHORT_PASSWORD,
  LOGIN_USER_FAIL_WRONG_PASSWORD,
  RESET_AUTH_FIELDS,
  RESET_ERROR,
  LOADING_USER,
  RESET_LOADING
} from './types';

//ActionCreator is the index.js
//that creates actions below
//Action is a plain javascript object
//example of synchronous action below
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (password) => {
  return {
    type: PASSWORD_CHANGED,
    payload: password
  };
};

//Redux-Thunk is used to handle any type of 
//asynchronous action creator (makes AJAX request)
//With Redux-Thunk, action creator will return a function
//this function will be called with 'dispatch'
//to say when to feed the reducers
//So we have to manually dispatch in .then and .catch
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    //Assim que clicar no botao e acionar o metodo loginUser
    //eh gerado um spinner de loading enquanto o firebase processa dados
    loadingUser(dispatch);

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        loginUserSuccess(dispatch, user);
        resetError(dispatch);
        resetLoading(dispatch);
        resetAuthFields(dispatch);
      })
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            loginUserSuccess(dispatch, user);
            resetError(dispatch);
            resetLoading(dispatch);
            resetAuthFields(dispatch);
          })
          .catch(() => {
            verifyPassword(password, dispatch);
            resetLoading(dispatch);
          });
      });
  };
};

//Helper Method
const verifyPassword = (password, dispatch) => {
  if (password.length < 6) {
    loginUserFailShortPassword(dispatch);
    resetAuthFields(dispatch);
  } else {
    loginUserFailWrongPassword(dispatch);
    resetAuthFields(dispatch);
  }
};

//Helper Method para evitar ficar escrevendo
//todo esse codigo a cada login success
const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS, 
    payload: user
  });
};

const loginUserFailShortPassword = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL_SHORT_PASSWORD,
    payload: 'Your password must be at least 6 digits.'
  });
};

const loginUserFailWrongPassword = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL_WRONG_PASSWORD,
    payload: 'Authentication Failed.'
  });
};

const resetAuthFields = (dispatch) => {
  dispatch({
    type: RESET_AUTH_FIELDS,
    payload: ''
  });
};

const resetError = (dispatch) => {
  dispatch({
    type: RESET_ERROR,
    payload: ''
  });
};

const loadingUser = (dispatch) => {
  dispatch({
    type: LOADING_USER,
    payload: true
  });
};

const resetLoading = (dispatch) => {
  dispatch({
    type: RESET_LOADING,
    payload: false
  });
};
