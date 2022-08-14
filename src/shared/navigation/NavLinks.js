import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../context/auth-context";
import './NavLinks.css';

const NavLinks = props => {

  const User = useContext(AuthContext);

  return <ul className="nav-links">
    <li className='hover_change-color'>
      <NavLink to="/users" exact>ALL USERS</NavLink>
    </li>
    
    {
      User.isLoggedIn && 
        <React.Fragment>
        <li className='hover_change-color'>
          <NavLink to={`/${User.userId}/places`}>MY PLACES</NavLink>
        </li>
        <li className='hover_change-color'>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>  
        </React.Fragment>
    }
    
    <li className='auth-logo'>
      {!User.isLoggedIn ? 
        <NavLink to="/auth">
          <img src='login_logo.png' alt="login"/>
        </NavLink> : 
        
        <NavLink to="/logout">
          <img src='logout_logo.png' alt="logout"/>
        </NavLink>
      }
    </li>
  </ul>
};

export default NavLinks;