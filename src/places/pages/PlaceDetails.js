import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../shared/FormElements/Button'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import { useHistory } from 'react-router-dom'
import classes from './PlaceDetails.module.css'
import hotels_logo from "../../shared/assets/hotel_icon.png"
import PlaceHotelsList from '../components/PlaceHotelsList'
import PlaceCommentsList from '../components/PlaceCommentsList'

// Images
import like_logo from "../../shared/assets/like_logo.png"
import comment_logo from "../../shared/assets/comment_logo.png"



const PlaceDetails = () => {
  const history = useHistory()
  const pid = useParams().placeId
  const [isError, setIsError] = useState(null)
  const [loadedPlace, setLoadedPlace] = useState(null);
  const [showHotelsModel, setShowHotelsModel] = useState(false);
  const [showCommentsModel, setShowCommentsModel] = useState(false);
  const [isloading, setIsLoading] = useState(false)



  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setIsLoading(true)
        // setReactedUsersList(true)

        const request = await fetch(
          `http://localhost:8000/api/places/${pid}`
        )

        if (!request.ok) throw new Error('Cannot get data about this place')

        const responseData = await request.json()

        setLoadedPlace(responseData.place)

        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        setIsError(err.message || 'Cannot load place with given ID')
      }
    }

    loadPlaces()
  }, [])


  const onErrorClear = () => {
    setIsError(null)
    history.push('/')
  }

  const linkToAuthorPage = () => {
    console.log("author place obj: ", loadedPlace)
  }



  const viewHotelsHandler = async() => {
    setShowHotelsModel(!showHotelsModel)
    setShowCommentsModel(false);
  }

  const viewCommentsHandler = async() => {
    setShowCommentsModel(!showCommentsModel)
    setShowHotelsModel(false);
  }

  
  return (
    <React.Fragment>

      {isloading && <LoadingSpinner asOverlay />}
      <ErrorModal error={isError} onClear={onErrorClear} />

      {!isloading && loadedPlace && (
        <div className={classes.container}>
          <h1 className={classes.detailsTitle}>{loadedPlace.title}</h1>
          <div className={classes.address}>
            <p>{loadedPlace.address}</p>
          </div>
          <div className={classes.main_content}>
            <div className={classes.image}>
              <img src={loadedPlace.image} alt={loadedPlace.title}/>
            </div>

            <div className={classes.description}>
              <h1>Description</h1>
              <p>{loadedPlace.description}</p>
            </div>
          </div>
          
          <div className={classes.options_container}>
            
            <div className={classes.options_item}>
              <div className={classes.options_logo}>
                <img src={like_logo} alt="like" />
                <p>5</p>
              </div>

              <div className={classes.options_logo}>
                <img src={comment_logo} onClick={viewCommentsHandler} alt="comment" />
                <p>5</p>
              </div>

              <div className={classes.options_logo}>
                <img src={hotels_logo} style={{ borderRadius: 50 }} onClick={viewHotelsHandler} alt="hotels" />
              </div>
            </div>

            {showHotelsModel && <PlaceHotelsList />}
            {showCommentsModel && <PlaceCommentsList />}

            <div className={classes.properties}>
              <div>
                <Button onClick={() => history.push('/')}>Back</Button>
              </div>

              <div>
                <Button onClick={linkToAuthorPage}>Auth page</Button>
              </div>

            </div>
            
          </div>


        </div>
      )}
    </React.Fragment>
  )
}

export default PlaceDetails
