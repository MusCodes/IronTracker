import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import '../LoginPage/LoginPage.css'

function RegisterPage() {
  const history = useHistory();

  return (
    <body className='ART'> <div className='d-flex flex-column justify-content-center align-items-center h-100'>
      <RegisterForm />
      <div className='Exercise-Login-Button'>

           <div className="login-button-wrapper mt-3">
        <Button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </div>
      </div>

   
    </div>


    </body>
  
  );
}

export default RegisterPage;
