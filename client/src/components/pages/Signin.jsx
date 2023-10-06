import React from "react";
// import {Link, Navigate} from 'react-router-dom';
// import axios from 'axios';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import SigninForm from "../misc/SigninForm";

import Google from "../misc/Google";

function Signin() {
  return (
    <div className="col-md-6 offset-md-3">
      
        <ToastContainer />
        <h1 className="text-center"></h1>
        <Google/>
        <h4 className="text-center pt-5">Sign in with Email</h4>
        <SigninForm />
      
    </div>
  );
}

export default Signin;
