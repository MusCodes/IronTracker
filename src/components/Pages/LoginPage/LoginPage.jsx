import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import '../LoginPage/LoginPage.css'

function LoginPage() {
  const history = useHistory();

  return (
    <div className='ART'>
 <div className='d-flex flex-column justify-content-center align-items-center h-100'>
    <LoginForm />
    <div className='Exercise-Login-Button'> 
         {/* <Button
        type="button"
        className="btn btn-primary btn-block"
        onClick={() => {
          history.push('/registration');
        }}
      >
        Register
      </Button> */}
     </div>
    <div className="register-button-wrapper mt-3">
 
    </div>
  </div>

    </div>
   
  );
}

export default LoginPage;
