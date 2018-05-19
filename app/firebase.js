import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import ReduxSagaFirebase from 'redux-saga-firebase';

const myFirebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAcWmMVKBOvRGgSn1bLg8ohNhevTuBErAw',
  authDomain: 'redux-hot-take.firebaseapp.com',
  databaseURL: 'https://redux-hot-take.firebaseio.com',
  projectId: 'redux-hot-take',
  storageBucket: '',
  messagingSenderId: '120720859866',
});

export const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);
