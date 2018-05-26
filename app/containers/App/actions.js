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

export const login = (credential) => ({
  type: LOGIN_REQUEST,
  credential,
});

export const loginWithProvider = (provider) => ({
  type: LOGIN_PROVIDER_REQUEST,
  provider,
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

export const signUp = (credential) => ({
  type: SIGNUP_REQUEST,
  credential,
});

export const signUpSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signUpFailure = (error) => ({
  type: SIGNUP_FAILURE,
  error,
});

export const syncUser = (user) => ({
  type: SYNC_USER,
  user,
});
