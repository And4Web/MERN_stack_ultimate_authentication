import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/layout";
import Private from "./components/layout/Private";
import Admin from "./components/layout/Admin";

import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";

import Activate from "./components/misc/Activate";
import Forgot from "./components/misc/Forgot";
import Reset from "./components/misc/Reset";

import { ProfilePrivate, AuthPrivate, AdminPrivate } from "./components/misc/PrivateRoute";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/signin"
          element={<AuthPrivate Component={Signin} />}
        />
        <Route
          exact
          path="/signup"
          element={<AuthPrivate Component={Signup} />}
        />
        <Route exact path="/auth/activate/:token" element={<Activate />} />
        <Route
          exact
          path="/profile/:username"
          element={<ProfilePrivate Component={Profile} />}
        />
        <Route
          exact
          path="/private"
          element={<ProfilePrivate Component={Private} />}
        />
        <Route
          exact
          path="/admin"
          element={<AdminPrivate Component={Admin}/>}
        />
        <Route exact path="/auth/password/forgot" element={<Forgot/>}/>
        <Route exact path="/auth/password/reset/:token" element={<Reset/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
