import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectCurrentUser, makeSelectLoggedIn } from '../../containers/App/selectors';
import reducer from '../../containers/App/reducer';
import saga from '../../containers/App/saga';
import EmailVerifyPage from '../../containers/EmailVerifyPage/Loadable';
import UserVerifyPage from '../../containers/UserVerifyPage/Loadable';

export class PageContainer extends React.PureComponent {
  verifyUser() {
    const { user, loggedIn, children, verifyUser } = this.props;
    if (verifyUser) {
      if (!user && !loggedIn) {
        return (<UserVerifyPage />);
      } else if (user && !user.emailVerified) {
        return (<EmailVerifyPage />);
      }
    }
    return (children);
  }

  render() {
    const { className, paddingOffset } = this.props;
    return (
      <div
        className={className || 'container'}
        style={{ marginTop: paddingOffset }}
      >
        {this.verifyUser()}
      </div>
    );
  }
}

PageContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  paddingOffset: PropTypes.number,
  verifyUser: PropTypes.bool,
  user: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
};

PageContainer.defaultProps = {
  paddingOffset: 0,
  verifyUser: false,
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loggedIn: makeSelectLoggedIn(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'pageContainer', reducer });
const withSaga = injectSaga({ key: 'pageContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PageContainer);
