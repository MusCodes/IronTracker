import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import './LoginPage.css'
//import { Button } from 'react-bootstrap';



function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <div className="login-box mx-auto mt-5">
  <div className="login-key">
    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
  </div>
  <div className="login-form shadow">
    <form onSubmit={login}>
      {errors.loginMessage && (
        <div className="alert alert-danger" role="alert">
          {errors.loginMessage}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="username" className="form-control-label">Userame:</label>
        <input
          type="text"
          className="form-control"
          name="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-control-label">Password:</label>
        <input
          type="password"
          className="form-control"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="login-button">
        <input className="btn btn-outline-primary btn-block" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  </div>
</div>

  
  
  );
}

export default LoginForm;
