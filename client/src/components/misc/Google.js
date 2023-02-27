import React from "react";
import axios from "axios";
import { authenticate, isAuth } from "./helpers";
import { GoogleLogin } from "@leecheuk/react-google-login";

const Google = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="pt-5">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}
        render={renderProps => (
          <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-primary "> <i className="fa-brands fa-google"></i> Login with Google </button>
        )}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      
    </div>
  );
};

export default Google;


// library used ===> https://www.npmjs.com/package/@leecheuk/react-google-login