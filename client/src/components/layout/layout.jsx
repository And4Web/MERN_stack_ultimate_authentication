import React, {Fragment} from 'react';

function Layout({children}) {
  const nav = () => (
    <ul className='nav nav-tabs bg-primary justify-content-center'>
      <li className='nav-item'>
        <a href="/" className='text-light nav-link'>Home</a>
      </li>
      <li className='nav-item'>
        <a href="/" className='text-light nav-link'>Sign in</a>
      </li>
      <li className='nav-item'>
        <a href="/" className='text-light nav-link'>Sign up</a>
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