import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, NavbarNav, Collapse,
  NavItem, NavLink } from 'mdbreact';
import SignIn from '../SignIn';
import CurrentUser from '../CurrentUser';

class GlobalNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false,
      brandHoverAnimation: false,
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onHoverBrand = this.onHoverBrand.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  onHoverBrand() {
    this.setState({ brandHoverAnimation: !this.state.brandHoverAnimation });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  renderUserNavItem() {
    const { user, loggedIn, signIn, signInWithProvider, signOut, signUp, signUpError } = this.props;
    return (
      <NavbarNav right key="uN">
        {
          loggedIn && user ? (
            <CurrentUser user={user} signOut={signOut} />
          ) : (
            <SignIn signIn={signIn} signInWithProvider={signInWithProvider} signUp={signUp} signUpError={signUpError} />
          )
        }
      </NavbarNav>
    );
  }

  renderMobileUserNavItem() {
    const { user, loggedIn, signIn, signInWithProvider, signOut } = this.props;
    return (
      loggedIn && user ? (
        <NavItem onClick={signOut}>
          <NavLink to="#">Logout</NavLink>
        </NavItem>
      ) : (
        <SignIn signIn={signIn} signInWithProvider={signInWithProvider} />
      )
    );
  }

  renderCollapseNavItems() {
    return (
      <Collapse isOpen={this.state.collapse} navbar key="cN">
        <NavbarNav left>
          <NavItem>
            <NavLink to="#">Cursos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="#">Proyectos</NavLink>
          </NavItem>
        </NavbarNav>
      </Collapse>
    );
  }

  renderMobileCollapseNavItems(isMobile) {
    if (isMobile) {
      return (
        <Collapse style={{ marginTop: 16, borderTop: '1px solid gray' }} isOpen={this.state.collapse} navbar key="cN">
          <NavbarNav left>
            <div style={{ marginLeft: 16 }}>
              <NavItem>
                <NavLink to="#">Cursos</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Proyectos</NavLink>
              </NavItem>
              <hr style={{ color: 'gray', margin: 0 }} />
              {this.renderMobileUserNavItem()}
            </div>
          </NavbarNav>
        </Collapse>
      );
    }
    return null;
  }

  renderNavItems(isMobile) {
    if (isMobile) {
      return (
        <button onClick={this.onClick}>
          <i className="fa fa-bars fa-1x" style={{ color: '#3F2272' }} />
        </button>
      );
    }
    return [
      this.renderCollapseNavItems(),
      this.renderUserNavItem(),
    ];
  }

  render() {
    const { screenWidth, breakpoints } = this.props;
    const { brandHoverAnimation } = this.state;
    const isMobile = screenWidth <= breakpoints.mobile;

    return (
      <Navbar color="transparent" fixed="top" dark expand="md" scrolling>
        <div className="container">
          <NavbarBrand // eslint-disable-line
            href="/"
            onMouseOver={this.onHoverBrand}
            className={brandHoverAnimation ? 'animated rubberBand' : null}
          >
            Academy
          </NavbarBrand>
          {this.renderNavItems(isMobile)}
        </div>
        {this.renderMobileCollapseNavItems(isMobile)}
      </Navbar>
    );
  }
}

GlobalNav.propTypes = {
  user: PropTypes.object,
  signUpError: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  breakpoints: PropTypes.any.isRequired,
  screenWidth: PropTypes.number,
};

export default GlobalNav;
