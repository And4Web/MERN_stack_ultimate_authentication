import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {Link, useNavigate} from "react-router-dom";

import {authenticate, isAuth} from '../misc/helpers';

function SigninForm() {
  let [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit",    
  });
  let [success, setSuccess] = useState(false);
  let [name, setName] = useState('');

  let navigate = useNavigate();

  let { email, password, buttonText } = values;
  // console.log(values);
  let handleChange = name => event => {
    // console.log(event.target)
    setValues({...values, [name]: event.target.value})
  };

  let handleSubmit = event => {
    event.preventDefault();
    setValues({...values, buttonText: 'Submitting'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/signin`,
      data: {email, password }
    }).then(response => {
      // console.log('SIGNIN SUCCESS: ', response);
      // save the response (user, token) in localstorage/cookie
      authenticate(response, ()=>{
        setValues({...values, email: '', password: '', buttonText: "Submitted"});
        setSuccess(true);     
        setName(response.data.user.name);
        // toast.success(`Hey, ${response.data.user.name}, welcome back!`);
        (isAuth() && isAuth().role === "admin")? navigate("/admin"): navigate(`/profile/${response.data.user.name}`);

      })
     
      // if(isAuth()){
      //   setTimeout(()=>{
      //     navigate('/');       
      //   }, 5000)
      // } 
    }).catch(err => {
      // console.log("SIGNIN ERROR: ", err.response.data);
      setValues({...values, email: '', password: '', buttonText: 'Submit'});
      toast.error(err.response.data.error);
    })
  };

  const formComponent = () => (
    <form>
      <div className="d-flex justify-content-center">
        <div className="form-group w-100">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="form-group w-100">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
      </div>
      <Link to="/auth/password/forgot" style={{ cursor: "pointer"}}>Forgot Password?</Link>
      <div className="my-3 d-flex justify-content-center">
        <button onClick={handleSubmit} className="btn btn-primary w-75 ">
          {buttonText}
        </button>
      </div>
      
    </form>
  )

  const onSuccess = () => (
    <div className="text-center">
      <h3>
        Welcome back, {name}.
      </h3>
      <p>You are being redirected to the Home page...</p>
    </div>
  )

  return (
    <>
    <ToastContainer/>
      {success? onSuccess(): formComponent() }
    </>
  );
}

export default SigninForm;
