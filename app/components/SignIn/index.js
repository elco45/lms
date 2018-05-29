import React from 'react';
import PropTypes from 'prop-types';
import { NavItem, NavLink } from 'mdbreact';
import SignUpModal from './signupModal';
import SignInModal from './signinModal';
import PassResetModal from './passResetModal';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSignUp: false,
      modalSignIn: false,
      modalPassReset: false,
    };

    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.togglePassReset = this.togglePassReset.bind(this);
    this.togglePass = this.togglePass.bind(this);
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

  togglePassReset() {
    this.setState({
      modalSignIn: !this.state.modalSignIn,
      modalPassReset: !this.state.modalPassReset,
    });
  }

  togglePass() {
    this.setState({
      modalPassReset: !this.state.modalPassReset,
    });
  }

  toggle() {
    this.setState({
      modalSignUp: !this.state.modalSignUp,
      modalSignIn: !this.state.modalSignIn,
    });
  }

  renderSignUpModal() {
    const { signInWithProvider, signUp, signUpError, loading } = this.props;
    return (
      <SignUpModal
        key="msu"
        toggle={this.toggle}
        toggleSignUp={this.toggleSignUp}
        signInWithProvider={signInWithProvider}
        signUp={signUp}
        signUpError={signUpError}
        modalSignUp={this.state.modalSignUp}
        loading={loading}
      />
    );
  }

  renderSignInModal() {
    const { signInWithProvider, signIn, signInError, loading } = this.props;

    return (
      <SignInModal
        key="msi"
        toggle={this.toggle}
        togglePassReset={this.togglePassReset}
        toggleSignIn={this.toggleSignIn}
        signInWithProvider={signInWithProvider}
        signIn={signIn}
        signInError={signInError}
        modalSignIn={this.state.modalSignIn}
        loading={loading}
      />
    );
  }

  renderPassResetModal() {
    const { sendPassReset, passResetError, loadingPassReset } = this.props;

    return (
      <PassResetModal
        key="mpr"
        togglePassReset={this.togglePass}
        passReset={sendPassReset}
        passResetError={passResetError}
        loadingPassReset={loadingPassReset}
        modalPassReset={this.state.modalPassReset}
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

  renderAuthItems() {
    const { syncing } = this.props;
    if (!syncing) {
      return [
        this.renderSignIn(),
        this.renderSignUp(),
      ];
    }
    return (<i key="spin" className="fa fa-spinner fa-spin deep-purple-text"></i>);
  }

  render() {
    return [
      this.renderAuthItems(),
      this.renderSignUpModal(),
      this.renderSignInModal(),
      this.renderPassResetModal(),
    ];
  }
}

SignIn.propTypes = {
  navChange: PropTypes.bool,
  signIn: PropTypes.func,
  signInWithProvider: PropTypes.func,
  signUp: PropTypes.func,
  sendPassReset: PropTypes.func,
  signUpError: PropTypes.object,
  signInError: PropTypes.object,
  passResetError: PropTypes.object,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  loadingPassReset: PropTypes.bool,
};

export default SignIn;
