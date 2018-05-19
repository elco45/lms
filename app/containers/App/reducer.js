import { fromJS } from 'immutable';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SYNC_USER,
} from './constants';

const initialState = fromJS({
  loading: false,
  loggedIn: false,
  user: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return state
        .set('loading', true);
    case LOGIN_SUCCESS:
      return state
      .set('loading', false)
      .set('loggedIn', true);
    case LOGIN_FAILURE:
      return state
        .set('loading', false);
    case LOGOUT_SUCCESS:
      return state
        .set('loading', false)
        .set('loggedIn', false);
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
