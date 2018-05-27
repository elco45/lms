import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavbarBrand, NavbarNav, Collapse,
  NavItem, NavLink } from 'mdbreact';
import { withRouter } from 'react-router-dom';
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

  checkActive(path) {
    const { location } = this.props;
    if (location.pathname === path) {
      return true;
    }
    return false;
  }

  renderUserNavItem(navChange) {
    const { user, loggedIn, signIn, signInWithProvider, signOut, signUp, signUpError, signInError, syncing, loading } = this.props;
    return (
      <NavbarNav right key="uN">
        {
          loggedIn && user ? (
            <CurrentUser navChange={navChange} user={user} signOut={signOut} />
          ) : (
            <SignIn
              navChange={navChange}
              signIn={signIn}
              signInWithProvider={signInWithProvider}
              signUp={signUp}
              signUpError={signUpError}
              signInError={signInError}
              syncing={syncing}
              loading={loading}
            />
          )
        }
      </NavbarNav>
    );
  }

  renderMobileUserNavItem(navChange) {
    const { user, loggedIn, signIn, signInWithProvider, signOut } = this.props;
    return (
      loggedIn && user ? (
        <NavItem onClick={signOut}>
          <NavLink style={{ color: navChange ? '#392349' : '#fff' }} to="#">Logout</NavLink>
        </NavItem>
      ) : (
        <SignIn navChange={navChange} signIn={signIn} signInWithProvider={signInWithProvider} />
      )
    );
  }

  renderCollapseNavItems(navChange) {
    return (
      <Collapse isOpen={this.state.collapse} navbar key="cN">
        <NavbarNav left>
          <NavItem active={this.checkActive('/cursos')}>
            <NavLink style={{ color: navChange ? '#392349' : '#fff' }} to="/cursos">Cursos</NavLink>
          </NavItem>
          <NavItem active={this.checkActive('/proyectos')}>
            <NavLink style={{ color: navChange ? '#392349' : '#fff' }} to="#">Proyectos</NavLink>
          </NavItem>
        </NavbarNav>
      </Collapse>
    );
  }

  renderMobileCollapseNavItems(isMobile, navChange) {
    if (isMobile) {
      return (
        <Collapse style={{ marginTop: 16, borderTop: '1px solid gray' }} isOpen={this.state.collapse} navbar key="cN">
          <NavbarNav left>
            <div style={{ marginLeft: 16 }}>
              <NavItem>
                <NavLink style={{ color: navChange ? '#392349' : '#fff' }} to="/cursos">Cursos</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{ color: navChange ? '#392349' : '#fff' }} to="#">Proyectos</NavLink>
              </NavItem>
              <hr style={{ color: 'gray', margin: 0 }} />
              {this.renderMobileUserNavItem(navChange)}
            </div>
          </NavbarNav>
        </Collapse>
      );
    }
    return null;
  }

  renderNavItems(isMobile, navChange) {
    if (isMobile) {
      return (
        <button onClick={this.onClick}>
          <i className="fa fa-bars fa-1x" style={{ color: '#3F2272' }} />
        </button>
      );
    }
    return [
      this.renderCollapseNavItems(navChange),
      this.renderUserNavItem(navChange),
    ];
  }

  render() {
    const { screenWidth, breakpoints, location, history } = this.props;
    const { brandHoverAnimation } = this.state;
    const isMobile = screenWidth <= breakpoints.mobile;
    const navChange = location.pathname !== '/' || isMobile;

    return (
      <Navbar
        color={navChange ? 'white' : 'transparent'}
        fixed="top"
        dark
        expand="md"
        scrolling
      >
        <div className="container">
          <NavbarBrand // eslint-disable-line
            onClick={() => history.push('/')}
            onMouseOver={this.onHoverBrand}
            className={brandHoverAnimation ? 'animated rubberBand' : null}
            style={{ color: navChange ? '#392349' : '#fff' }}
          >
            Academy
          </NavbarBrand>
          {this.renderNavItems(isMobile, navChange)}
        </div>
        {this.renderMobileCollapseNavItems(isMobile, navChange)}
      </Navbar>
    );
  }
}

GlobalNav.propTypes = {
  user: PropTypes.object,
  signUpError: PropTypes.object,
  signInError: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signInWithProvider: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  breakpoints: PropTypes.any.isRequired,
  screenWidth: PropTypes.number,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(GlobalNav);
