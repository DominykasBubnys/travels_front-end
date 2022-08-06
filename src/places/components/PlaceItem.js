import './PlaceItem.css'
import Card from '../../shared/UIElements/Card'
import Button from '../../shared/FormElements/Button'
import Modal from '../../shared/UIElements/Modal'
import React, { Fragment, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Map from '../../shared/UIElements/Map'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import { AuthContext } from '../../shared/context/auth-context'

const PlaceItem = (props) => {
  const Auth = useContext(AuthContext)
  const history = useHistory()
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [reaction, setReaction] = useState(props.isLikedByYou)
  const [likesAmount, setLikesAmount] = useState(props.likes)
  const openMapHandler = () => setShowMap(true)

  const closeMapHandler = () => setShowMap(false)

  const showDeleteWarningHandler = () => {
    setConfirmModal(true)
  }

  const cancelDeleteHandler = () => {
    setConfirmModal(false)
  }

  const confirmDeleteHandler = async () => {
    setConfirmModal(false)
    setIsLoading(true)

    try {
      const sendRequest = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/delete-place/${props.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (!sendRequest.ok) throw new Error('Cannot delete this place')

      props.onDelete(props.id)
    } catch (err) {
      setIsError('Cannot delete place with provided ID')
    }
    setIsLoading(false)
  }

  const closeErrorModal = () => {
    setIsError(null)
  }

  // const reactionHandler = async () => {
  //   try {
  //     const sendRequest = await fetch(
  //       `${process.env.REACT_APP_BACKEND_URL}/liked-place/${props.id}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           reactedUserId: Auth.userId
  //         })
  //       }
  //     )

  //     if (!sendRequest.ok) throw new Error('You already liked this place')
  //     const responseData = await sendRequest.json()
  //     setLikesAmount(responseData.place.likes)
  //     setReaction(!reaction)
  //   } catch (err) {
  //     setIsLoading(false)
  //     setIsError(err.message || 'Failed to like this place')
  //   }
  //   setIsLoading(false)
  // }

  // const detailsButtonHandler = () => {
  //   history.push(`/place/${props.id}`)
  // }

  return (
    <Fragment>
      <ErrorModal error={isError} onClear={closeErrorModal} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__model-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map props={props} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      />

      <li className="place-item-container ">
        {isloading && <LoadingSpinner asOverlay />}

        {!isloading && (
          <Card>
            <div className="place-item">
              <div className="place-item__image">
                <img src={props.image} alt={props.title} />
              </div>

              <div className="place-item__info">
                <h1>{props.title}</h1>
                <h2>{props.address}</h2>
                <h3 style={{ color: 'white', marginBottom: '2rem' }}>
                  {likesAmount} {likesAmount > 1 ? 'visitors' : 'visitor'} liked
                  this place!
                </h3>
                {/* <Button onClick={detailsButtonHandler}>DETAILS</Button> */}
              </div>
            </div>

            <div className="place-item__actions">
              <Button inverse onClick={openMapHandler}>
                SHOW COORDINATES
              </Button>

              {/* {Auth.isLoggedIn && !reaction && (
                <Button inverse onClick={reactionHandler}>
                  LIKE [{likesAmount}]
                </Button>
              )}
              {Auth.isLoggedIn && reaction && (
                <Button inverse onClick={reactionHandler}>
                  DISLIKE [{likesAmount}]
                </Button>
              )} */}

              {props.showControllers && (
                <React.Fragment>
                  <Button to={`/places/${props.id}`}>EDIT</Button>
                  <Button onClick={showDeleteWarningHandler} danger>
                    DELETE
                  </Button>
                </React.Fragment>
              )}
            </div>
          </Card>
        )}
      </li>
    </Fragment>
  )
}

export default PlaceItem
