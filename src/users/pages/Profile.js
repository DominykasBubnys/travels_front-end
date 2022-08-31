import { useEffect, useContext, useState } from 'react'
import './Profile.css'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../shared/context/auth-context'
import React from 'react'
import Button from '../../shared/FormElements/Button'
import Modal from '../../shared/UIElements/Modal'

const Profile = () => {
  const history = useHistory()
  const Auth = useContext(AuthContext).authenticatedUser;


  const backButtonHandler = () => {
    history.push('/')
  }



  const browsePlacesButtonHandler = () => {
    history.push(`/${Auth.id}/places`)
  }

  return (
    <div className="details-container">
      <div className="user-details-info">
        <h1>{Auth.name}</h1>
        <h1>{Auth.email}</h1>
        <Button onClick={browsePlacesButtonHandler}>Browse places</Button>
      </div>

      <div className="user-details-image">
        <img src={Auth.image} alt="user"/>
      </div>

      <div className="user-details-contacts">
        <Button onClick={backButtonHandler}>Back</Button>
      </div>
    </div>
  )
}

export default Profile
