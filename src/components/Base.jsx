import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Auth from '../modules/Auth.jsx';

const Base = ({ children }) => (
  <div>
    <AppBar
      title={
        <Link to="/" className="header_title">
          <span className="main_title">
            SportHub
          </span>
        </Link>
      }>

      {Auth.isUserAuthenticated() ? (
        <div className="sub_title">
          <Link to="/logout" className="sub_title">
            <span>Log out</span>
          </Link>
        </div>
      ) : (
        <div className="sub_title">
          <Link to="/login" className="sub_title">
            <span>Log in</span>
          </Link>
          <Link to="/signup" className="sub_title">
            <span>Sign up</span>
          </Link>
        </div>
      )}

    </AppBar>

    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
