import React, { PropTypes } from 'react';
import SignIn from '../SignIn';
import CurrentUser from '../CurrentUser';

const GlobalNav = ({ user, loggedIn, signIn, signOut }) => (
  <div className="CurrentUser">
    <main className="Application">
      <div className="Application--sidebar">
        {
          loggedIn && user ? (
            <CurrentUser user={user} signOut={signOut} />
          ) : (
            <SignIn signIn={signIn} />
          )
        }
      </div>
    </main>
  </div>
);

GlobalNav.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default GlobalNav;
