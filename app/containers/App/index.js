import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  login,
  logout,
} from './actions';
import { makeSelectCurrentUser, makeSelectLoggedIn } from './selectors';
import reducer from './reducer';
import saga from './saga';

import GlobalNav from '../../components/GlobalNav';

import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';

export class App extends React.PureComponent {
  render() {
    const { user, loggedIn } = this.props;
    return (
      <div>
        <GlobalNav
          user={user}
          loggedIn={loggedIn}
          signIn={this.props.signIn}
          signOut={this.props.signOut}
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
  loggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  signIn: login,
  signOut: logout,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loggedIn: makeSelectLoggedIn(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
