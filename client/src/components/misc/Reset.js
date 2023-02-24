import React, { useState, useEffect } from "react";
import axios from "axios";
import {jwt} from 'jsonwebtoken';
import { toast, ToastContainer } from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";


function Reset() {
  let [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Submit",    
  });

  let navigate = useNavigate();
  let params = useParams();

  useEffect(()=>{
    let token = params.token
    // let {name} = ;
    // jwt.decode(token)
    console.log("jwt: ", token)
  },[])

  let {newPassword, buttonText } = values;
  // console.log(values);
  let handleChange = name => event => {
    // console.log(event.target)
    setValues({...values, [name]: event.target.value})
  };

  let handleSubmit = event => {
    event.preventDefault();
    setValues({...values, buttonText: 'Submitting'});
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}/auth/reset-password`,
      data: { newPassword }
    }).then(response => {
      console.log('password reset SUCCESS: ', response);
      // save the response (user, token) in localstorage/cookie
          
      
    }).catch(err => {
      // console.log("SIGNIN ERROR: ", err.response.data);
      setValues({...values, newPassword: '', buttonText: 'Submit'});
      toast.error(err.response.data.error);
    })
  };

  const formComponent = () => (
    <form>

<div className="d-flex justify-content-center">
        <div className="form-group w-100">
          <label className="text-muted">Name</label>
          <input
            disabled            
            type="text"
            className="form-control"
            // value={name}
          />
        </div>
      </div>
      

      <div className="d-flex justify-content-center">
        <div className="form-group w-100">
          <label className="text-muted">New Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            value={newPassword}
          />
        </div>
      </div>
      
      <div className="my-3 d-flex justify-content-center">
        <button onClick={handleSubmit} className="btn btn-primary w-75 ">
          {buttonText}
        </button>
      </div>
      
    </form>
  )

  
  return (
    <>
    <ToastContainer/>
    <div className="text-center">
      <h3>
       Reset Password
      </h3>
     
    </div>
      {formComponent() }
    </>
  );
}

export default Reset;
