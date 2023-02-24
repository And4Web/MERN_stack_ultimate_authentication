import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Forgot() {
  let [values, setValues] = useState({
    email: "",
    buttonText: "Request Password reset link",
  });

  let navigate = useNavigate();

  let { email, buttonText } = values;
  // console.log(values);
  let handleChange = (name) => (event) => {
    // console.log(event.target)
    setValues({ ...values, [name]: event.target.value });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log("FORGOT PASSWORD: ", response);
        // save the response (user, token) in localstorage/cookie
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Requested" });
      })
      .catch((err) => {
        // console.log("SIGNIN ERROR: ", err.response.data);
        setValues({ ...values, buttonText: "Request Password reset link" });
        toast.error(err.response.data.error);
      });
  };

  const formComponent = () => {
    return (
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

        <div className="my-3 d-flex justify-content-center">
          <button onClick={handleSubmit} className="btn btn-primary w-75 ">
            {buttonText}
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
    <ToastContainer/>
      <div className="text-center">
        <h3>Forgot Password? </h3>
        {formComponent()}
      </div>
    </>
  );
}

export default Forgot;
