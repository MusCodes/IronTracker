import React from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import Nav from '../../Shared/Nav/Nav';
//import { useHistory } from 'react-router-dom';


function UserPage() {
  //const history=useHistory();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      {/* <button onClick={ () =>history.push("/template") }> Form</button> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
