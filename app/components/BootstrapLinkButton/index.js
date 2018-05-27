import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'mdbreact';
import { withRouter } from 'react-router-dom';

const BootstrapLinkButton = ({ children, color, outline, to, history }) => (
  <Button
    outline={outline}
    color={color}
    onClick={() => history.push(to)}
  >
    {children}
  </Button>
);

BootstrapLinkButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  outline: PropTypes.bool,
  to: PropTypes.string,
  history: PropTypes.object,
};

BootstrapLinkButton.defaultProps = {
  color: 'primary',
  outline: false,
  to: '/',
};

export default withRouter(BootstrapLinkButton);
