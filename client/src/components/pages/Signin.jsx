import React from 'react';
// import {Link, Navigate} from 'react-router-dom';
// import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SigninForm from '../misc/SigninForm';

function Signin() {

  return (
    <div className='col-md-6 offset-md-3'>
      <ToastContainer/>
      <h1 className='text-center'>Sign in</h1>
      <SigninForm/>
    </div>
  )
}

export default Signin