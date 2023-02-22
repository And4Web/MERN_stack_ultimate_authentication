import React, {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

const Private = () => {
  let [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  let { name, email, password, buttonText } = values;
  
  let handleChange = name => event => {
    // console.log(event.target)
    setValues({...values, [name]: event.target.value})
  };
  
  let handleSubmit = event => {
    event.preventDefault();
    setValues({...values, buttonText: 'Submitting'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/signup`,
      data: {name, email, password, }
    }).then(response => {
      // console.log('SIGNUP SUCCESS: ', response);
      setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'});
      toast.success(response.data.message);
    }).catch(err => {
      // console.log("SIGNUP ERROR: ", err.response.data);
      setValues({...values, name: '', email: '', password: '', buttonText: 'Submit'});
      toast.error(err.response.data.error);
    })
  };

  return (
    <>
    <h1>Private Route for authenticated users only.</h1> 
    <form>
      {/* {JSON.stringify({...values})} */}
      <div className="d-flex justify-content-center">
        <div className="form-group w-100">
          <label className="text-muted">Name</label>
          <input
            value={name}
            name={name}
            onChange={handleChange('name')}
            type="text"
            className="form-control"
          />
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="form-group w-100">
          <label className="text-muted">Email</label>
          <input
            value={email}
            name={email}
            onChange={handleChange('email')}
            type="email"
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
            onChange={handleChange('password')}
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

export default Private;
