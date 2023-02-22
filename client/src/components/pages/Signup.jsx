import React from 'react';
// import {Link, Navigate} from 'react-router-dom';
// import axios from 'axios';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SignupForm from '../misc/SignupForm';

function Signup() {
  
  return (
    <div className='col-md-6 offset-md-3'>
      <ToastContainer/>
      <h1 className='text-center'>Sign up</h1>
      <SignupForm />
    </div>
  )
}

export default Signup