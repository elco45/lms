import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'mdbreact';

const SignInProvider = ({ signInWithProvider }) => (
  <div className="col-12">
    <p>Conéctate con: </p>
    <Button onClick={() => signInWithProvider('google')} color="red" style={{ borderRadius: 50 }}>
      <i className="fa fa-google-plus" />
    </Button>
    <Button onClick={() => signInWithProvider('facebook')} color="blue" style={{ borderRadius: 50 }}>
      <i className="fa fa-facebook" />
    </Button>
  </div>
);

SignInProvider.propTypes = {
  signInWithProvider: PropTypes.func,
};

export default SignInProvider;
