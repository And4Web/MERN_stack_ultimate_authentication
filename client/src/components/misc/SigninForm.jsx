import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SigninForm() {
  let [values, setValues] = useState({
    email: "and@gmail.com",
    password: "askdjfaj",
    buttonText: "Submit",
  });

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
      console.log('SIGNIN SUCCESS: ', response);
      // save the response (user, token) in localstorage/cookie
      setValues({...values, email: '', password: ''});
      toast.success(`Hey, ${response.data.user.name}, welcome back!`);
    }).catch(err => {
      console.log("SIGNIN ERROR: ", err.response.data);
      setValues({...values, email: '', password: '', buttonText: 'Submit'});
      toast.error(err.response.data.error);
    })
  };

  return (
    <form>
      <div className="d-flex justify-content-center">
        <div className="form-group w-100">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
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
}

export default SigninForm;
