import { useEffect, useContext, useState, useId } from 'react'
import './UserDetails.css'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import { useHistory, useParams } from 'react-router-dom'
import Avatar from '../../shared/UIElements/Avatar'
import { AuthContext } from '../../shared/context/auth-context'
import React from 'react'
import Button from '../../shared/FormElements/Button'
import Modal from '../../shared/UIElements/Modal'

const UserDetails = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [fetchedData, setFetchedData] = useState({})
  const [showMessageModal, setShowMessageModal] = useState(false)
  const history = useHistory()
  const Auth = useContext(AuthContext);
  const UserId = Auth.userId


  useEffect(() => {
    const LoadUser = async () => {
      setIsLoading(true)
      try {
        const request = await fetch(
          `http://localhost:8000/api/users/${UserId}`
        )
        if (!request.ok) throw new Error('Failed to get user with provided id')
        const responseData = await request.json()

        if(!responseData.status)throw new Error(`Failed to load ${responseData.user.id} details`)

        console.log("request of the user: ", responseData);

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
    history.push(`/${fetchedData.id}/places`)
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
            <img src={fetchedData.image} alt="user"/>
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
