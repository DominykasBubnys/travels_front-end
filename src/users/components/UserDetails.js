import { useEffect, useContext, useState } from 'react'
import './UserDetails.css'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import { useHistory, useParams } from 'react-router-dom'
import Avatar from '../../shared/UIElements/Avatar'

import React from 'react'
import Button from '../../shared/FormElements/Button'
import Modal from '../../shared/UIElements/Modal'

const UserDetails = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [fetchedData, setFetchedData] = useState({})
  const [showMessageModal, setShowMessageModal] = useState(false)
  const history = useHistory()
  const UserId = useParams().uid

  useEffect(() => {
    const LoadUser = async () => {
      setIsLoading(true)
      try {
        const request = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/${UserId}`
        )
        if (!request.ok) throw new Error('Failed to get user with provided id')
        const responseData = await request.json()

        setFetchedData(responseData.user)
        setIsLoading(false)
      } catch (err) {
        setIsError(err.message || ' Cannot load particular user')
        console.log('error in UserDetails component: ', err)
      }
    }

    LoadUser()
  }, [])

  const clearErrorHandler = () => {
    setIsError(null)
    history.push('/')
  }

  const backButtonHandler = () => {
    history.push('/')
  }

  const messageButtonHandler = () => {
    setShowMessageModal(true)
  }

  const messageSubmitHandler = (event) => {
    event.preventDefault()
  }

  const browsePlacesButtonHandler = () => {
    history.push(`/${fetchedData._id}/places`)
  }

  return (
    <React.Fragment>
      {<ErrorModal error={isError} onClear={clearErrorHandler} />}
      {isLoading && <LoadingSpinner asOverlay />}

      <Modal
        show={showMessageModal}
        header={`Let ${fetchedData.name} know your thoughts`}
        onCancel={() => setShowMessageModal(false)}
      >
        <form className="message-form" onSubmit={messageSubmitHandler}>
          <textarea placeholder="Message" />
          <Button>Send</Button>
        </form>
      </Modal>

      {!isLoading && fetchedData && (
        <div className="details-container">
          <div className="user-details-info">
            <h1>{fetchedData.name}</h1>
            <h1>{fetchedData.email}</h1>
            <Button onClick={browsePlacesButtonHandler}>Browse places</Button>
          </div>

          <div className="user-details-image">
            <Avatar src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" />
          </div>

          <div className="user-details-contacts">
            <Button onClick={messageButtonHandler}>Message</Button>
            <Button onClick={backButtonHandler}>Back</Button>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default UserDetails
