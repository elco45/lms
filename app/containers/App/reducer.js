import { fromJS } from 'immutable';
import {
  LOGIN_REQUEST, LOGIN_PROVIDER_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  PASS_RESET_REQUEST, PASS_RESET_SUCCESS, PASS_RESET_FAILURE,
  SYNC_USER, SYNC,
} from './constants';

const initialState = fromJS({
  loading: false,
  loadingPassReset: false,
  loggedIn: false,
  user: null,
  syncing: false,
  signUpError: null,
  signInError: null,
  passResetError: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return state
        .set('loading', true)
        .set('signUpError', null);
    case LOGIN_REQUEST:
      return state
        .set('loading', true)
        .set('signInError', null);
    case LOGIN_PROVIDER_REQUEST:
    case LOGOUT_REQUEST:
      return state
        .set('loading', true);
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return state
      .set('loading', false)
      .set('loggedIn', true);
    case SIGNUP_FAILURE:
      return state
        .set('loading', false)
        .set('signUpError', action.error);
    case LOGIN_FAILURE:
      return state
        .set('loading', false)
        .set('signInError', action.error);
    case LOGOUT_FAILURE:
      return state
        .set('loading', false);
    case PASS_RESET_REQUEST:
      return state
        .set('loadingPassReset', true)
        .set('passResetError', null);
    case PASS_RESET_SUCCESS:
      return state
        .set('loadingPassReset', false);
    case PASS_RESET_FAILURE:
      return state
        .set('loadingPassReset', false)
        .set('passResetError', action.error);
    case SYNC:
      return state
        .set('syncing', true);
    case SYNC_USER:
      return state
        .set('loggedIn', action.user != null)
        .set('syncing', false)
        .set('user', action.user);
    default:
      return state;
  }
}

export default appReducer;
