import React from "react";
import Layout from "./components/layout/layout";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Activate from "./components/misc/Activate";
import Private from "./components/layout/Private";
import Admin from "./components/layout/Admin";
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
      </Routes>
    </Layout>
  );
}

export default App;
