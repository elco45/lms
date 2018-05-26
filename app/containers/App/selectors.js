import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('user')
);

const makeSelectSignUpError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('signUpError')
);

const makeSelectSignInError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('signInError')
);

const makeSelectLoggedIn = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loggedIn')
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

export {
  makeSelectCurrentUser,
  makeSelectLocation,
  makeSelectLoggedIn,
  makeSelectSignUpError,
  makeSelectSignInError,
};
