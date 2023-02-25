import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

import {isAuth, getFromCookie, signout, updateUserMiddleware} from '../misc/helpers';

function Profile() {
  let [values, setValues] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
    buttonText: "Update",
  });

  const navigate = useNavigate();

  useEffect(()=>{
    loadProfile()
  },[])

  const token = getFromCookie('token');

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      
      const {name, email, role} = response.data.user;
      setValues({...values, name, email, role});
    })
    .catch(error=>{
      console.log("Profile page data fetch ERROR: ", error.response)
      if(error.response.status === 401){
        signout(()=>{
          navigate('/')
        })
      }
    })
  }

  let {role, name, email, password, buttonText } = values;

  let handleChange = (name) => (event) => {
 
    setValues({ ...values, [name]: event.target.value });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Updating" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/user/update`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { name, password},
    })
      .then((response) => {
        
         updateUserMiddleware(response, ()=>{
          setValues({
            ...values, buttonText: "Updated",
          });
          toast.success("Updated Profile successfully.");        
         })
      })
      .catch((err) => {
        console.log("UPDATE ERROR: ", err.response.data);
        setValues({
          ...values, buttonText: "Update",
        });
        toast.error(err.response.data.error);
      });
  };

  return (
    <>
      <h1>Profile page for authenticated users only: Update</h1>
      <form>
        {/* {JSON.stringify({...values})} */}
        <div className="d-flex justify-content-center">
          <div className="form-group w-100">
            <label className="text-muted">Name</label>
            <input
              value={name}
              name={name}
              onChange={handleChange("name")}
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="form-group w-100">
            <label className="text-muted">Email</label>
            <input
            disabled
              defaultValue={email}
              name={email}
              
              type="email"
              className="form-control"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="form-group w-100">
            <label className="text-muted">Role</label>
            <input
              disabled
              defaultValue={role}
              name={role}
              
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="form-group w-100">
            <label className="text-muted">Password</label>
            <input
              value={password}
              name={password}
              onChange={handleChange("password")}
              type="password"
              className="form-control"
            />
          </div>
        </div>

        <div className="my-3 d-flex justify-content-center">
          <button onClick={handleSubmit} className="btn btn-primary w-75 ">
            {buttonText}
          </button>
        </div>
      </form>
    </>
  );
}

export default Profile;
