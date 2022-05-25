import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../shared/FormElements/Button'
import Avatar from '../../shared/UIElements/Avatar'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import { useHistory } from 'react-router-dom'
import classes from './PlaceDetails.module.css'

const PlaceDetails = () => {
  const history = useHistory()
  const pid = useParams().placeId
  const [isError, setIsError] = useState(null)
  const [loadedPlace, setLoadedPlace] = useState(null)
  const [showReactions, setShowReactions] = useState(false)
  const [reactedUsersList, setReactedUsersList] = useState(null)
  const [isloading, setIsLoading] = useState(false)

  const getUsersByIds = async (ids) => {
    const usersArray = []

    try {
      for (let i = 0; i < ids.length; i++) {
        const reactedUserRequest = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/${ids[i]}`
        )
        if (!reactedUserRequest.ok)
          throw new Error('Cannot fetch users who likes this place')
        const reactedUsers = await reactedUserRequest.json()
        usersArray.push(reactedUsers.user)
      }
    } catch (err) {
      setIsError(err.message || 'Cannot fetch users who likes this place')
    }

    return usersArray
  }

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setIsLoading(true)
        setReactedUsersList(true)

        const request = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/place/${pid}`
        )

        if (!request.ok) throw new Error('Cannot get data about this place')

        const responseData = await request.json()

        setLoadedPlace(responseData.place)

        const reactedIds = await responseData.place.likedBy

        if (!reactedIds)
          throw new Error('Cannot fetch users ids who likes this place')

        const usersList = await getUsersByIds(reactedIds)

        setReactedUsersList(usersList)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setIsError(err.message || 'Cannot load place with given ID')
      }
    }

    loadPlaces()
  }, [])

  const changeReactionsHandler = () => {
    setShowReactions(!showReactions)
  }

  const onErrorClear = () => {
    setIsError(null)
    history.push('/')
  }

  const linkToAuthorPage = () => {
    history.push(`/user/${loadedPlace.creator}`)
  }

  const linkToReactedUserProfile = (uid) => {
    history.push(`/user/${uid}`)
  }

  return (
    <React.Fragment>
      {isloading && <LoadingSpinner asOverlay />}
      <ErrorModal error={isError} onClear={onErrorClear} />
      {!isloading && loadedPlace && (
        <div className={classes.container}>
          <h1 className={classes.detailsTitle}>{loadedPlace.title}</h1>

          <div className={classes.main_content}>
            <div className={classes.image}>
              <Avatar src={loadedPlace.image} />
            </div>

            <div className={classes.description}>
              <h1>Description</h1>
              <p>{loadedPlace.description}</p>
            </div>
          </div>

          <div className={classes.address}>
            <h1>Address</h1>
            <p>{loadedPlace.address}</p>
          </div>

          <div className={classes.extra}>
            <div>
              <Button onClick={() => history.push('/')}>Back</Button>
            </div>

            <div>
              <Button onClick={linkToAuthorPage}>Auth page</Button>
            </div>

            <div className={classes.reactionsContainer}>
              <Button onClick={changeReactionsHandler}>
                Likes: {loadedPlace.likedBy.length}
              </Button>

              {showReactions && reactedUsersList.length > 0 && (
                <div className={classes.reactions}>
                  {reactedUsersList.map((user) => (
                    <button
                      style={{ margin: '10px auto', border: 'none' }}
                      onClick={linkToReactedUserProfile.bind(null, user._id)}
                    >
                      {user.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default PlaceDetails
