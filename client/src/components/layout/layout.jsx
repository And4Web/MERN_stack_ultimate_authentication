import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

function Layout({children}) {
  const nav = () => (
    <ul className='nav nav-tabs bg-primary justify-content-center'>
      <li className='nav-item'>
        <Link to="/" className='text-light nav-link'>Home</Link>
      </li>
      <li className='nav-item'>
        <Link to="/signin" className='text-light nav-link'>Sign in</Link>
      </li>
      <li className='nav-item'>
        <Link to="/signup" className='text-light nav-link'>Sign up</Link>
      </li>
    </ul>
  )
  const footer = () => (
    <div className="bg-primary d-flex justify-content-center align-item-center ">
      <p className="text-light ">&copy; UltimateAuth 2022. All rights reserved.</p>      
    </div>
  )
  return (
    <Fragment>
      {nav()}
      <div className='container'>
        {children}
      </div>
      {footer()}
    </Fragment>
  )
}

export default Layout;