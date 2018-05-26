import firebase from 'firebase/app';
import 'firebase/auth';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { SIGNUP_REQUEST, LOGIN_REQUEST, LOGIN_PROVIDER_REQUEST, LOGOUT_REQUEST } from 'containers/App/constants';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  signUpSuccess,
  signUpFailure,
  syncUser,
} from './actions';

import { reduxSagaFirebase } from '../../firebase';

function* signUpSaga(action) {
  try {
    const { email, username, password } = action.credential;

    const usernameExist = yield call(reduxSagaFirebase.database.read, `userXusername/${username.toLowerCase()}`);

    if (!usernameExist) {
      const response = yield call(reduxSagaFirebase.auth.createUserWithEmailAndPassword, email, password);
      const { uid } = response.user;
      yield call(reduxSagaFirebase.database.update, `users/${uid}`, {
        displayName: username,
        email,
        username,
      });
      yield call(reduxSagaFirebase.database.update, `userXusername/${username.toLowerCase()}`,
        uid,
      );
      yield call(reduxSagaFirebase.auth.sendEmailVerification, {});

      yield put(signUpSuccess(response));
    } else {
      const error = {
        code: 'auth/username-already-in-use',
        message: 'This username is already taken.',
      };
      yield put(signUpFailure(error));
    }
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* loginSaga(action) {
  try {
    const { username, password } = action.credential;

    const userId = yield call(reduxSagaFirebase.database.read, `userXusername/${username.toLowerCase()}`);

    if (userId) {
      const user = yield call(reduxSagaFirebase.database.read, `users/${userId}`);
      const { email } = user;

      yield call(reduxSagaFirebase.auth.signInWithEmailAndPassword, email, password);
      yield put(loginSuccess());
    } else {
      const error = {
        code: 'auth/username-does-not-exist',
        message: 'This username does not exist.',
      };
      yield put(loginFailure(error));
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* loginWithProviderSaga(action) {
  try {
    let authProvider = {};
    if (action.provider === 'facebook') {
      authProvider = new firebase.auth.FacebookAuthProvider();
    } else {
      authProvider = new firebase.auth.GoogleAuthProvider();
    }
    const data = yield call(reduxSagaFirebase.auth.signInWithPopup, authProvider);
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* logoutSaga() {
  try {
    const data = yield call(reduxSagaFirebase.auth.signOut);
    yield put(logoutSuccess(data));
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* syncUserSaga() {
  const channel = yield call(reduxSagaFirebase.auth.channel);

  while (true) {
    const { user } = yield take(channel);
    if (user) {
      const { displayName, email, photoURL, uid } = user;
      yield call(reduxSagaFirebase.database.patch, `users/${uid}`, {
        displayName,
        email,
        photoURL,
      });
      yield put(syncUser(user));
    } else {
      yield put(syncUser(null));
    }
  }
}

export default function* loginRootSaga() {
  yield fork(syncUserSaga);
  yield [
    takeEvery(SIGNUP_REQUEST, signUpSaga),
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(LOGIN_PROVIDER_REQUEST, loginWithProviderSaga),
    takeEvery(LOGOUT_REQUEST, logoutSaga),
  ];
}
