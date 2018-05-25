import React from 'react';
import PropTypes from 'prop-types';

const NewMessage = ({ newMessage, auth, handleChange, handleSubmit }) => (
  <form
    className="NewMessage"
    onSubmit={(event) => handleSubmit(event, newMessage, auth.uid)}
  >
    <label
      htmlFor="test"
    >
      <input
        id="test"
        className="NewMessage--content"
        type="text"
        placeholder="What's on your mind?"
        value={newMessage}
        onChange={handleChange}
      />
      <input
        className="NewMessage--submit block"
        type="submit"
        value="Post"
        disabled={!newMessage.length}
      />
    </label>
  </form>
);

NewMessage.propTypes = {
  newMessage: PropTypes.string,
  auth: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default NewMessage;
