import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../LoginPage/LoginPage.css'

function LoginPage() {
  const history = useHistory();

  return (
    <div className='top-Button'>
  <LoginForm />

  <div className="register-button-wrapper">
    <Button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        history.push('/registration');
      }}
    >
      Register
    </Button>
  </div>
</div>

  );
}

export default LoginPage;
