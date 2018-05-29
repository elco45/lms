import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withBreakpoints } from 'react-breakpoints';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  login,
  loginWithProvider,
  logout,
  signUp,
  passReset,
} from './actions';
import {
  makeSelectCurrentUser,
  makeSelectLoggedIn,
  makeSelectSignUpError,
  makeSelectSignInError,
  makeSelectPassResetError,
  makeSelectSync,
  makeSelectLoading,
  makeSelectLoadingPassReset } from './selectors';
import reducer from './reducer';
import saga from './saga';

import GlobalNav from '../../components/GlobalNav';

import HomePage from '../HomePage/Loadable';
import CoursesPage from '../CoursesPage';
import NotFoundPage from '../NotFoundPage/Loadable';

export class App extends React.PureComponent {
  render() {
    const {
      user, loggedIn, signIn, signInWithProvider, signOut, createUser, sendPassReset, breakpoints,
      screenWidth, signUpError, signInError, passResetError, syncing, loading, loadingPassReset,
    } = this.props;
    return (
      <div>
        <GlobalNav
          user={user}
          loggedIn={loggedIn}
          signIn={signIn}
          signInWithProvider={signInWithProvider}
          signOut={signOut}
          signUp={createUser}
          sendPassReset={sendPassReset}
          signUpError={signUpError}
          signInError={signInError}
          passResetError={passResetError}
          breakpoints={breakpoints}
          screenWidth={screenWidth}
          syncing={syncing}
          loading={loading}
          loadingPassReset={loadingPassReset}
        />
        {/* <div style={{ marginTop: location.pathname !== '/' ? 62 : null }}> */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/cursos" component={CoursesPage} />
          <Route component={NotFoundPage} />
        </Switch>
        {/* </div> */}
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  signUpError: PropTypes.object,
  signInError: PropTypes.object,
  passResetError: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  sendPassReset: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  breakpoints: PropTypes.any.isRequired,
  screenWidth: PropTypes.number,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  loadingPassReset: PropTypes.bool,
};

const mapDispatchToProps = {
  signIn: login,
  signInWithProvider: loginWithProvider,
  signOut: logout,
  createUser: signUp,
  sendPassReset: passReset,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loggedIn: makeSelectLoggedIn(),
  signUpError: makeSelectSignUpError(),
  signInError: makeSelectSignInError(),
  passResetError: makeSelectPassResetError(),
  syncing: makeSelectSync(),
  loading: makeSelectLoading(),
  loadingPassReset: makeSelectLoadingPassReset(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect,
  withBreakpoints,
)(App));
