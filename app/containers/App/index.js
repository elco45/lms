import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';
import { withBreakpoints } from 'react-breakpoints';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  login,
  loginWithProvider,
  logout,
  signUp,
} from './actions';
import { makeSelectCurrentUser, makeSelectLoggedIn, makeSelectSignUpError } from './selectors';
import reducer from './reducer';
import saga from './saga';

import GlobalNav from '../../components/GlobalNav';

import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';

export class App extends React.PureComponent {
  render() {
    const {
      user, loggedIn, signIn, signInWithProvider, signOut, createUser, breakpoints, screenWidth, signUpError,
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
          signUpError={signUpError}
          breakpoints={breakpoints}
          screenWidth={screenWidth}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  signUpError: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  breakpoints: PropTypes.any.isRequired,
  screenWidth: PropTypes.number,
};

const mapDispatchToProps = {
  signIn: login,
  signInWithProvider: loginWithProvider,
  signOut: logout,
  createUser: signUp,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loggedIn: makeSelectLoggedIn(),
  signUpError: makeSelectSignUpError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withBreakpoints,
)(App);
