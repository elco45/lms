import firebase from 'firebase/app';
import 'firebase/auth';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from 'containers/App/constants';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  syncUser,
} from 'containers/App/actions';

import { reduxSagaFirebase } from '../../firebase';
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

function* loginSaga() {
  try {
    const data = yield call(reduxSagaFirebase.auth.signInWithPopup, googleAuthProvider);
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

    if (user) yield put(syncUser(user));
    else yield put(syncUser(null));
  }
}

export default function* loginRootSaga() {
  yield fork(syncUserSaga);
  yield [
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(LOGOUT_REQUEST, logoutSaga),
  ];
}
