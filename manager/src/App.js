import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
//Redux Thunk is a middleware, so we need to import a helper 
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import reducers from './store/reducers';
import LoginForm from './components/LoginForm';
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
// import { reduxFirestore, firestoreReducer } from 'redux-firestore' <- needed if using firestore

class App extends Component {

  componentWillMount() {
    // Initialize firebase instance
    const firebaseConfig = {
    apiKey: 'AIzaSyApG_cFfPMVohPERLEJXTLiCse-yeRYmIc',
    authDomain: 'manager-72e95.firebaseapp.com',
    databaseURL: 'https://manager-72e95.firebaseio.com',
    projectId: 'manager-72e95',
    storageBucket: 'manager-72e95.appspot.com',
    messagingSenderId: '459108289418',
    appId: '1:459108289418:web:5a66e01bcb0c27ef'
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize other services on firebase instance
    // firebase.firestore() // <- needed if using firestore
    // firebase.functions() // <- needed if using httpsCallable
    firebase.firestore();
  }
  //A proposta de fazer authentication com redux
  //eh para salvar os estados no redux 
  //ao inves de ser no componente (implementando toda a parte logica)
  //e o componente ter apenas a função de mostrar e mandar os eventos para o redux
  //OBS: Call action creator when a user types or clicks a button
  render() {
    // react-redux-firebase config
    const rrfConfig = {
      userProfile: 'users',
      // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    };

    //Creating Store
    const initialState = {};
    const store = createStore(
      reducers,
      initialState,
      compose(
        applyMiddleware(ReduxThunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebase),
        reactReduxFirebase(firebase, rrfConfig)
      )
    );
    //where {} is the initial state
    //but i can choose to prepopulate
    //applyMiddleware is a store enhancer, 
    //adding an extra functionality to store

    return (
      //provide at least a default reducer
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}

export default App;
