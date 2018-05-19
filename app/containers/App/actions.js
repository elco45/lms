import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SYNC_USER,
} from './constants';

export const login = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (credential) => ({
  type: LOGIN_SUCCESS,
  credential,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  error,
});

export const syncUser = (user) => ({
  type: SYNC_USER,
  user,
});
