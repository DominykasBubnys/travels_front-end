import React from 'react'
import { AuthContext } from '../../shared/context/auth-context'
import { useContext } from 'react'

const Profile = () => {

    const Author = useContext(AuthContext);
    console.log("AUhtor: ", Author);

  return (
    <div>Profile</div>
  )
}

export default Profile