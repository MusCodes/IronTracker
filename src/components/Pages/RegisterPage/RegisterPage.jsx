import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import '../LoginPage/LoginPage.css'

function RegisterPage() {
  const history = useHistory();

  return (
    <div className='top-Button'>
    <RegisterForm />
  
    <div className="login-button-wrapper">
      <Button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          history.push('/login');
        }}
      >
        Login
      </Button>
    </div>
  </div>
  );
}

export default RegisterPage;
