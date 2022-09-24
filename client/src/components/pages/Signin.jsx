import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Signin() {
  return (
    <div>
      <ToastContainer/>
      <h1>Sign in</h1>
    </div>
  )
}

export default Signin