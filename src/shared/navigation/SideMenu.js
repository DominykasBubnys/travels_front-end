import React from 'react'
import "./SideMenu.css"
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import { useContext } from 'react';
import {AuthContext} from "../context/auth-context";

const SideMenu = () => {

  const User = useContext(AuthContext);


  return (
    <div className='side-menu-container'>
      
      <li className='side-menu-nav'>
        <NavLink to="/new-trip" exact>
          <img src='plus_logo.png' alt='forum'/>
        </NavLink>
      </li>

      <li className='side-menu-nav'>
        <NavLink to="/forum" exact>
          <img src='forum_logo.png' alt='forum'/>
        </NavLink>
      </li>

      { User.isLoggedIn &&
        <li className='side-menu-nav'>
          <NavLink to={`/profile`} exact>
            <img src='auth_logo.png' alt='forum'/>
          </NavLink>
        </li>
      }

    </div>
  )
}

export default SideMenu