import React, { PropTypes } from 'react';

const CurrentUser = ({ user, signOut }) => (
  <div className="CurrentUser">
    <img
      className="CurrentUser--photo"
      src={user.photoURL}
      alt={user.displayName}
    />
    <div className="CurrentUser--identification">
      <h3 className="CurrentUser--displayName">{ user.displayName }</h3>
      <p className="CurrentUser--email">{ user.email }</p>
      <button
        className="CurrentUser--signout"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  </div>
);

CurrentUser.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }),
  signOut: PropTypes.func.isRequired,
};

export default CurrentUser;
