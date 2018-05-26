import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import avatarProfileAlt from '../../images/icon-72x72.png';

const AvatarImage = Styled.img`
  height: 25px;
  width: 25px;
  margin-right: 5px;
`;

class CurrentUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    const { user, signOut, navChange } = this.props;

    return (
      <NavItem>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle style={{ color: navChange ? '#392349' : '#fff' }} nav caret>
            <AvatarImage
              className="rounded-circle"
              src={user.photoURL || avatarProfileAlt}
              alt={user.displayName}
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Mi cuenta</DropdownItem>
            <DropdownItem onClick={signOut}>Cerrar Sesión</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    );
  }
}

CurrentUser.propTypes = {
  navChange: PropTypes.bool,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }),
  signOut: PropTypes.func.isRequired,
};

export default CurrentUser;
