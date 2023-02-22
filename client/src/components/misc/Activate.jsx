import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import jwt from 'jsonwebtoken';

function Activate() { 
  let [values, setValues] = useState({
    name: "Anand",
    token: useParams().token,
    show: true,
  });

  useEffect(()=>{    
      let {name} = jwt.decode(token);
      setValues({...values, name, token});    
    // console.log(token);
  }, [])

  let { name, token} = values;
  // console.log(values);
  let handleSubmit = event => {
    event.preventDefault();
    setValues({...values});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/account-activation`,
      data: {name, token}
    }).then(response => {
      // console.log('ACTIVATION SUCCESS: ', response);
      // save the response (user, token) in localstorage/cookie
      setValues({...values, email: '', password: '', show: false});
      toast.success(`Hey, ${response.data.user.name}, welcome back!`);
    }).catch(err => {
      // console.log("SIGNIN ERROR: ", err.response.data);
      setValues({...values, email: '', password: '', buttonText: 'Submit'});
      toast.error(err.response.data.error);
    })
  };

  return (
    <div className='my-5 d-flex flex-column justify-content-center align-item-center'>
      <h3 className='container text-center'>Hey, {name}. Click the Activate button for account activation.</h3>
      <div className="my-5 w-25 m-auto">
        <button className="btn btn-outline-primary w-100" onClick={handleSubmit}>Activate</button>
      </div>
    </div>
  )
}

export default Activate;
