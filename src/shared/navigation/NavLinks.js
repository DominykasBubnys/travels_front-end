import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../context/auth-context";
import './NavLinks.css';

// importing images
import login_logo from "../assets/login_logo.png";
import logout_logo from "../assets/logout_logo.png";

const NavLinks = props => {

  const User = useContext(AuthContext);

  return <ul className="nav-links">

    <li className='hover_change-color side-menu'>
      <NavLink to="/new-trip" exact>PLAN YOUR TRIP!</NavLink>
    </li>


    <li className='hover_change-color'>
      <NavLink to="/users" exact>ALL USERS</NavLink>
    </li>
    
    {
      User.isLoggedIn && User.authenticatedUser &&
        <React.Fragment>
        <li className='hover_change-color'>
          <NavLink to={`/${User.authenticatedUser.id}/places`}>MY PLACES</NavLink>
        </li>
        <li className='hover_change-color'>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>  
        </React.Fragment>
    }

    <li className='hover_change-color side-menu'>
      <NavLink to="/profile" exact>PROFILE</NavLink>
    </li>

    <li className='hover_change-color side-menu'>
      <NavLink to="/forum" exact>FORUM</NavLink>
    </li>
    
    <li className='auth-logo'>
      {!User.isLoggedIn ? 
        <NavLink to="/auth">
          <img src={login_logo} alt="login"/>
        </NavLink> : 
        
        <NavLink to="/logout">
          <img src={logout_logo} alt="logout"/>
        </NavLink>
      }
    </li>
  </ul>
};

export default NavLinks;