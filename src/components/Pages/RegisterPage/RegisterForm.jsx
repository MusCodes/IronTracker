import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <div className="login-box">
      <div className="login-key">
        <i className="fa fa-user-plus" aria-hidden="true"></i>
      </div>
      <div className="login-form shadow">
        <form onSubmit={registerUser}>
          <h2 className="login-title">Register User</h2>
          {errors.registrationMessage && (
            <div className="alert alert-danger" role="alert">
              {errors.registrationMessage}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username" className="form-control-label">
              Username:
            </label>
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
            <label htmlFor="password" className="form-control-label">
              Password:
            </label>
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
            <input
              className="btn btn-outline-primary btn-block"
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
        </form>
      </div>
     
    </div>
  );
}

export default RegisterForm;








