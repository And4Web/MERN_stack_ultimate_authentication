import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { isAuth, signout } from "../misc/helpers";
// import { sign } from "jsonwebtoken";

function Layout({ children }) {
  let location = useLocation();
  let navigate = useNavigate();

  const isActive = (path) => {
    if (location.pathname === path) {
      return { color: "white", backgroundColor: "blue", outline: "none", cursor: "pointer" };
    }
  };

  const nav = () => (
    <ul className="nav nav-tabs bg-primary justify-content-center p-1">
      <li className="nav-item mx-1">
        <Link to="/" className="text-light nav-link" style={isActive("/")}>
        <i className="fa-solid fa-house px-2"></i>Home
        </Link>
      </li>
      {!isAuth() ? (
        <>
          <li className="nav-item mx-1">
            <Link
              to="/signin"
              className="text-light nav-link"
              style={isActive("/signin")}
            >
              <i className="fa-solid fa-right-to-bracket px-2"></i>Login
            </Link>
          </li>
          <li className="nav-item mx-1">
            <Link
              to="/signup"
              className="text-light nav-link"
              style={isActive("/signup")}
            >
              <i className="fa-solid fa-user-plus px-2"></i>Register
            </Link>
          </li>
        </>
      ) : (
        <>
        <li className="nav-item mx-1">
            <span
              onClick={()=>{
                navigate(`/profile/${isAuth().name}}`)
              }}
              className="text-light nav-link"
              style={isActive(`/profile/${isAuth().name}_${isAuth()._id}`)}
            >
              {isAuth().name}
              {/* {JSON.stringify(isAuth())} */}
            </span>
          </li>
          <li className="nav-item mx-1">
            <span
              onClick={()=>{
                signout(() => {
                  navigate("/")
                })
              }}
              className="text-light nav-link"
              style={{cursor: "pointer"}}
            >
              Sign out
            </span>
          </li>
        </>
      )}
    </ul>
  );
  const footer = () => {
    let date = new Date();
    let currentYear = date.getFullYear();
    return (
      <div className="bg-light d-flex justify-content-center align-item-center ">
        <p className="text-dark">
          &copy; UltimateAuth {currentYear}. All rights reserved.
        </p>
      </div>
    );
  };

  return (
    <Fragment>
      {nav()}
      {/* {JSON.stringify(location)} */}

      <div className="container">{children}</div>
      {footer()}
    </Fragment>
  );
}

export default Layout;
