import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function Reset() {
  let [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Submit",
  });

  let navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    let token = params.token;
    let { _id } = jwt.decode(token);
    
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/users`,
    })
      .then((response) => {
        let userData = response.data;
        
        userData.map((user) => {
          if (user._id === _id) {
            setValues({ ...values, name: user.name, token: token });
          }
        });
      })
      .catch((err) => {
        console.log("Error getting data from backend: ", err);
      });
  }, []);

  let { newPassword, token, buttonText } = values;
  
  let handleChange = (name) => (event) => {
    
    setValues({ ...values, [name]: event.target.value });
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, newPassword, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/auth/reset-password`,      
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("password reset SUCCESS: ", response);        
        toast.success(response.data.success);
        setTimeout(()=>{
          navigate("/signin")
        }, 3000)
      })
      .catch((err) => {
        console.log("RESET PASSWORD ERROR: ", err.response.data);
        setValues({ ...values, newPassword: "", buttonText: "Submit" });
        toast.error(err.response.data.error);
      });
  };

  const formComponent = () => {
    const { name } = values;
    return (
      <form>
        <div className="d-flex justify-content-center">
          <div className="form-group w-100">
            <label className="text-muted">Name</label>
            <input disabled type="text" className="form-control" value={name} />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="form-group w-100">
            <label className="text-muted">New Password</label>
            <input
              onChange={handleChange("newPassword")}
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
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="text-center">
        <h3>Reset Password</h3>
      </div>
      {formComponent()}
    </>
  );
}

export default Reset;
