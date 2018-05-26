/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { View, Mask } from 'mdbreact';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';

import testBackground from '../../images/testBackground.jpg';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <View style={{ background: `url(${testBackground})no-repeat center center`, backgroundSize: 'cover', height: '100vh' }}>
          <Mask overlay="indigo-slight" style={{ flexDirection: 'column' }} className="flex-center  text-white text-center">
            <h2>Bienvenido a Meowcademy</h2>
            <h5>Meow!</h5>
          </Mask>
        </View>
        <p>asdasd </p>
        <p>asdasd </p>
        <p>asdasd </p>
        <p>asdasd </p>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
