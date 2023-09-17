import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "./helpers";

export const ProfilePrivate = (props) => {
  let { Component } = props;
  let navigate = useNavigate();
  useEffect(() => {
    if (!isAuth()) {
      navigate("/signin");
    }
  }, [isAuth]);
  return (
    <>
      <Component />
    </>
  );
};

export const AuthPrivate = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth()) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <>
      <Component />
    </>
  );
};

export const AdminPrivate = ({Component}) => {
  const navigate = useNavigate();
  let condition = () => {
    // console.log("from inside the function, user role: ", isAuth().role);
    return (isAuth() === "undefined") || !isAuth() || (isAuth() && isAuth().role !== "admin")
  }
  useEffect(()=>{
    if(condition()){
      navigate('/');
    }
  }, [condition])
  // console.log("let condition: ", isAuth() && isAuth().role !== "admin");
  // console.log("isAdmin: " , condition());
  return(
    <>
      <Component/>
    </>
  )
}