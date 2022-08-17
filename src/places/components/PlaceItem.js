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


  console.log("active user: ", Auth);

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
        `http://localhost:8000/api/places/delete/${props.id}`,
      )

      if (!sendRequest.ok) throw new Error('Cannot delete this place')

      const requestData = await sendRequest.json();

      if(!requestData.status)throw new Error(requestData.message)

      props.onDelete(props.id)
      history.push(`/`)

    } catch (err) {
      setIsError('Cannot delete place with provided ID')
    }
    setIsLoading(false)
  }

  const closeErrorModal = () => {
    setIsError(null)
  }

  const reactionHandler = async () => {
    
  }

  const detailsButtonHandler = () => {
    history.push(`/place/${props.id}`)
  }


  return (
    <Fragment>
      <ErrorModal error={isError} onClear={closeErrorModal} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        isError={false}
        contentClass="place-item__model-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map lat={-51.000000} lon={-73.000000} />
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
                <Button onClick={detailsButtonHandler}>DETAILS</Button>
              </div>
            </div>

            <div className="place-item__actions">

              {/* {Auth.isLoggedIn && !reaction && (
                // <Button inverse onClick={reactionHandler}>
                //   LIKE [{likesAmount}]
                // </Button>
                <img src='like_logo.png' className='actions_logo' alt='like'/>
              )}
              {Auth.isLoggedIn && reaction && (
                // <Button inverse onClick={reactionHandler}>
                //   DISLIKE [{likesAmount}]
                // </Button>
                <img src='liked_logo.png' className='actions_logo' alt='like'/>

              )}

               */}
              

              { Auth.isLoggedIn && !props.showControllers ?

                <div className='actions-div'>
                  {!reaction && <img onClick={reactionHandler} src='like_logo.png' className='actions_logo' alt='like'/>}
                  {reaction && <img onClick={reactionHandler} src='liked_logo.png' className='actions_logo' alt='like'/>}
                  {<img src='comment_logo.png' className='actions_logo' alt='comment'/>}
                  <img onClick={openMapHandler} src='location_logo.png' className='actions_logo' alt='location'/>
                </div>

                :

                <Button inverse onClick={openMapHandler}>
                  VIEW ON MAP
                </Button>
              }

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
