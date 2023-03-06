import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Button } from 'react-bootstrap';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterPage/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
    <body>
    <div class="wrapper">
      <h1 class="pancakes-text" >IronTracker</h1>
      <p class="pancakes-textP">Ready to take your fitness game to the next level? Look no further than IronTracker - the ultimate workout tracker app. From tracking your sets and reps to creating customized workout plans, IronTracker has everything you need to achieve your fitness goals. Whether you want to build muscle, burn fat, or improve overall fitness, IronTracker is your one-stop-shop for all things fitness. </p>
      {/* <img src="https://i.ibb.co/BZKH5jm/fitness.png" alt="fitness"  width="400" height="500" /> */}
      <img id="mario" src="https://i.kym-cdn.com/photos/images/original/000/904/984/472.gif" alt="fitness"  />
      <Button onClick={onLogin} class="btn btn-primary" id="getStarted">Get Started!</Button>

      
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
    </div>
  </body>
      <section>
        <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
      </section>

    </>
  );
}
          

export default LandingPage;
