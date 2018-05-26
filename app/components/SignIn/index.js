import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'mdbreact';
import SignUpModal from './signupModal';
import SignInModal from './signinModal';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSignUp: false,
      modalSignIn: false,
    };

    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggleSignUp() {
    this.setState({
      modalSignUp: !this.state.modalSignUp,
    });
  }

  toggleSignIn() {
    this.setState({
      modalSignIn: !this.state.modalSignIn,
    });
  }

  toggle() {
    this.setState({
      modalSignUp: !this.state.modalSignUp,
      modalSignIn: !this.state.modalSignIn,
    });
  }

  renderSignUpModal() {
    const { signInWithProvider, signUp, signUpError } = this.props;
    return (
      <SignUpModal
        key="msu"
        toggle={this.toggle}
        toggleSignUp={this.toggleSignUp}
        signInWithProvider={signInWithProvider}
        signUp={signUp}
        signUpError={signUpError}
        modalSignUp={this.state.modalSignUp}
      />
    );
  }

  renderSignInModal() {
    const { signInWithProvider, signIn, signInError } = this.props;

    return (
      <SignInModal
        key="msi"
        toggle={this.toggle}
        toggleSignIn={this.toggleSignIn}
        signInWithProvider={signInWithProvider}
        signIn={signIn}
        signInError={signInError}
        modalSignIn={this.state.modalSignIn}
      />
    );
  }

  renderSignUp() {
    const { navChange } = this.props;
    return (
      <NavItem key="su">
        <NavLink
          style={{ color: navChange ? '#392349' : '#fff' }}
          onClick={this.toggleSignUp}
          to="#"
        >
          Crear Cuenta
        </NavLink>
      </NavItem>
    );
  }

  renderSignIn() {
    const { navChange } = this.props;
    return (
      <NavItem key="si">
        <NavLink
          style={{ color: navChange ? '#392349' : '#fff' }}
          onClick={this.toggleSignIn}
          to="#"
        >
          Entrar
        </NavLink>
      </NavItem>
    );
  }

  render() {
    return [
      this.renderSignIn(),
      this.renderSignUp(),
      this.renderSignUpModal(),
      this.renderSignInModal(),
    ];
  }
}

SignIn.propTypes = {
  navChange: PropTypes.bool,
  signIn: PropTypes.func,
  signInWithProvider: PropTypes.func,
  signUp: PropTypes.func,
  signUpError: PropTypes.object,
  signInError: PropTypes.object,
};

export default SignIn;
