import { fromJS } from 'immutable';
import {
  LOGIN_REQUEST,
  LOGIN_PROVIDER_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SYNC_USER,
} from './constants';

const initialState = fromJS({
  loading: false,
  loggedIn: false,
  user: null,
  signUpError: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return state
        .set('loading', true)
        .set('signUpError', null);
    case LOGIN_REQUEST:
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
    case LOGOUT_FAILURE:
      return state
        .set('loading', false);
    case SYNC_USER:
      return state
        .set('loggedIn', action.user != null)
        .set('user', action.user);
    default:
      return state;
  }
}

export default appReducer;
