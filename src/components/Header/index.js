import React from 'react';
import { Link } from 'react-router-dom';

import { USER_ID } from '../../helpers/utils';
import './style.scss';

const Header = (props) => {
  return (
    <div className='header'>
      <div className='icon-container'>
        <Link to='/'>
          <i className='fab fa-twitter icon'></i>
        </Link>
      </div>

      <div className='heading'>
        <h1>Twitter - Discover What's Happening!</h1>
      </div>
      {USER_ID ? (
        <p></p>
      ) : (
        <div className='extra-link'>
          <Link to='/flow/signup'>Register!</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
