import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap'



function Nav() {
  
  
  const user = useSelector((store) => store.user);

  return (
    
    <div className="nav d-flex justify-content-between align-items-center">
    <img src="https://i.ibb.co/BZKH5jm/fitness.png" alt="fitness"  width="100" height="100" />

      
      <Link to="/home">
        <h2 className="nav-title">IronTracker</h2>
      </Link>
      <div> 
        {!user.id && (
          <Dropdown>
            <Dropdown.Toggle className="navLink" variant="secondary" id="dropdown-basic">
              DropDown
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/login">Login/Register</Dropdown.Item>
            
              <Dropdown.Item as={Link} to="/howto">HowTo?</Dropdown.Item>
              <Dropdown.Item as={Link} to="/main">Start Workout!</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
          
          <Dropdown>
    <Dropdown.Toggle className="navLink" variant="secondary" id="dropdown-basic">
      DropDown
    </Dropdown.Toggle>

    <Dropdown.Menu>
     
              <Dropdown.Item as={Link} to="/main">Start Workout!</Dropdown.Item>
              <Dropdown.Item as={Link} to="/howto">HowTo?</Dropdown.Item>
      <Dropdown.Item>
        <LogOutButton className="navLink" />
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
