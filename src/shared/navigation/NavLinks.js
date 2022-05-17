import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../context/auth-context";
import './NavLinks.css';

const NavLinks = props => {

  const User = useContext(AuthContext);

  return <ul className="nav-links">
    <li>
      <NavLink to="/users" exact>ALL USERS</NavLink>
    </li>
    
    {
      User.isLoggedIn && 
        <React.Fragment>
        <li>
          <NavLink to={`/${User.userId}/places`}>MY PLACES</NavLink>
        </li>
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>  
        </React.Fragment>
    }
    
    <li>
      {!User.isLoggedIn ? <NavLink to="/auth">AUTHENTICATE</NavLink> : <NavLink to="/logout">LOGOUT</NavLink>}
    </li>
  </ul>
};

export default NavLinks;