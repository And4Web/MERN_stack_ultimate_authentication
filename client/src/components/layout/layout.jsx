import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

function Layout({children}) {
  const nav = () => (
    <ul className='nav nav-tabs bg-primary justify-content-center p-1'>
      <li className='nav-item mx-1'>
        <Link to="/" className='text-light nav-link'>Home</Link>
      </li>
      <li className='nav-item mx-1'>
        <Link to="/signin" className='text-light nav-link'>Login</Link>
      </li>
      <li className='nav-item mx-1'>
        <Link to="/signup" className='text-light nav-link'>Register</Link>
      </li>
    </ul>
  )
  const footer = () => {
    let date = new Date();
    let currentYear = date.getFullYear();
    return(
    <div className="bg-light d-flex justify-content-center align-item-center ">
      <p className="text-dark">&copy; UltimateAuth {currentYear}. All rights reserved.</p>      
    </div>
    )
  }
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