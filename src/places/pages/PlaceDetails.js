import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../shared/FormElements/Button'
import Avatar from '../../shared/UIElements/Avatar'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import { useHistory } from 'react-router-dom'
import classes from './PlaceDetails.module.css'

// Images
import like_logo from "../../shared/assets/like_logo.png"
import comment_logo from "../../shared/assets/comment_logo.png"



const PlaceDetails = () => {
  const history = useHistory()
  const pid = useParams().placeId
  const [isError, setIsError] = useState(null)
  const [loadedPlace, setLoadedPlace] = useState(null)
  // const [showReactions, setShowReactions] = useState(false)
  // const [reactedUsersList, setReactedUsersList] = useState(null)
  const [isloading, setIsLoading] = useState(false)

  // const getUsersByIds = async (ids) => {
  //   const usersArray = []

  //   try {
  //     for (let i = 0; i < ids.length; i++) {
  //       const reactedUserRequest = await fetch(
  //         `${process.env.REACT_APP_BACKEND_URL}/user/${ids[i]}`
  //       )
  //       if (!reactedUserRequest.ok)
  //         throw new Error('Cannot fetch users who likes this place')
  //       const reactedUsers = await reactedUserRequest.json()
  //       usersArray.push(reactedUsers.user)
  //     }
  //   } catch (err) {
  //     setIsError(err.message || 'Cannot fetch users who likes this place')
  //   }

  //   return usersArray
  // }

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setIsLoading(true)
        // setReactedUsersList(true)

        const request = await fetch(
          `http://localhost:8000/places/${pid}`
        )

        if (!request.ok) throw new Error('Cannot get data about this place')

        const responseData = await request.json()

        setLoadedPlace(responseData.place)

        // const reactedIds = await responseData.place.likedBy

        // if (!reactedIds)
        //   throw new Error('Cannot fetch users ids who likes this place')

        // const usersList = await getUsersByIds(reactedIds)

        // setReactedUsersList(usersList)
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setIsError(err.message || 'Cannot load place with given ID')
      }
    }

    loadPlaces()
  }, [])

  // const changeReactionsHandler = () => {
  //   setShowReactions(!showReactions)
  // }

  const onErrorClear = () => {
    setIsError(null)
    history.push('/')
  }

  const linkToAuthorPage = () => {
    history.push("/profile")//push(`/user/${loadedPlace.creator}`)
  }

  // const linkToReactedUserProfile = (uid) => {
  //   history.push(`/user/${uid}`)
  // }
  return (
    <React.Fragment>

      {isloading && <LoadingSpinner asOverlay />}
      <ErrorModal error={isError} onClear={onErrorClear} />

      {!isloading && loadedPlace && (
        <div className={classes.container}>
          <h1 className={classes.detailsTitle}>{loadedPlace.title}</h1>

          <div className={classes.main_content}>
            <div className={classes.image}>
              <img src={loadedPlace.image} alt={loadedPlace.title}/>
            </div>

            <div className={classes.description}>
              <h1>Description</h1>
              <p>{loadedPlace.description}</p>
            </div>
          </div>
          
          <div className={classes.reaction_container}>
            <div className={classes.reaction_logo}>
              <img src={like_logo} alt="like" />
              <p>5</p>
            </div>

            <div className={classes.reaction_logo}>
              <img src={comment_logo} alt="comment" />
              <p>5</p>
            </div>
          </div>

          {/* 

          <div className={classes.address}>
            <h1>Address</h1>
            <p>{loadedPlace.address}</p>
          </div>

          <div className={classes.scraped}>

          </div>

          <div className={classes.properties}>
            <div>
              <Button onClick={() => history.push('/')}>Back</Button>
            </div>

            <div>
              <Button onClick={linkToAuthorPage}>Auth page</Button>
            </div>

          </div> */}
        </div>
      )}
    </React.Fragment>
  )
}

export default PlaceDetails
