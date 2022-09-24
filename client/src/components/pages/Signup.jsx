import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Signup() {
  return (
    <div>
      <ToastContainer/>
      <h1>Sign up</h1>
    </div>
  )
}

export default Signup