import React, { useState } from "react";

function SignupForm() {
  let [values, setValues] = useState({
    name: "anand",
    email: "and@gmail.com",
    password: "askdjfaj",
    buttonText: "Submit",
  });
  let { name, email, password, buttonText } = values;
  // console.log(values);
  const handleChange = (name = (event) => {
    //todo
  });
  const handleSubmit = (event) => {
    //todo
  };

  return (
    <form>
      <div className="d-flex justify-content-center">
        <div className="form-group w-100">
          <label className="text-muted">Name</label>
          <input
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

export default SignupForm;
