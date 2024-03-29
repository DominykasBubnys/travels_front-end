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
import PlaceCommentList from "./PlaceCommentsList"

import like_logo from "../../shared/assets/like_logo.png"
import liked_logo from "../../shared/assets/liked_logo.png"
import comment_logo from "../../shared/assets/comment_logo.png";
import location_logo from "../../shared/assets/location_logo.png";
import { postReaction } from '../utils/PostReaction'


const PlaceItem = (props) => {
  const Auth = useContext(AuthContext).authenticatedUser;
  const history = useHistory()
  const [showMap, setShowMap] = useState(false)
  const [showConfirmModal, setConfirmModal] = useState(false)
  const [showCommentsModal, setCommentsModal] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [reaction, setReaction] = useState(props.isLikedByYou)
  const [likesAmount, setLikesAmount] = useState(props.likes)

  const openMapHandler = () => setShowMap(true)

  const openCommentsHandler = () => setCommentsModal(true)


  const closeMapHandler = () => setShowMap(false)

  const closeCommentsHandler = () => setCommentsModal(false)


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
    
    const reactionRequest = await postReaction('add', props.id, Auth.id);

    console.log('reactionRequest: ', reactionRequest)
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

      <Modal
        show={showCommentsModal}
        onCancel={closeCommentsHandler}
        header="Comments"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <PlaceCommentList pid={props.id} version={'small'}/>
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

              { Auth && !props.showControllers ?

                <div className='actions-div'>
                  {!reaction && <img onClick={reactionHandler} src={like_logo} className='actions_logo' alt='like'/>}
                  {reaction && <img onClick={reactionHandler} src={liked_logo} className='actions_logo' alt='like'/>}
                  {<img src={comment_logo} onClick={openCommentsHandler} className='actions_logo' alt='comment'/>}
                  <img onClick={openMapHandler} src={location_logo} className='actions_logo' alt='location'/>
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
