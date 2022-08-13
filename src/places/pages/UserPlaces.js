import { useParams } from 'react-router'
import PlaceList from '../components/PlaceList'
import React, { useState, useEffect } from 'react'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'

const UserPlaces = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(null)
  const [data, setData] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)

  const {userId} = useParams()

  const errorCloseHandler = () => {
    setIsError(null)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        let request
        if (userId){
          console.log("userID: ", userId)

          request = await fetch(
            `http://localhost:8000/places/user/${userId}`
          )
        }
          
        else request = await fetch('http://localhost:8000/places');

        if (!request.ok){

          throw new Error(
            'failed to load places from database' // not informative err message
          )
        }
        const responseData = await request.json();

        console.log("response: ", responseData.places)

        setData(responseData.places)
      } catch (err) {
        setData([])
        setIsError(
          err.message || 'fetching places fails.. We are working on this issue'
        )
      }
      setIsLoading(false)
    }

    loadData()
  }, [userId, isDeleted])

  const deletePlaceHandler = (deletedPlaceId) => {
    setData((prevPlaces) => {
      prevPlaces.filter((place) => place._id !== deletedPlaceId)
    })

    setIsDeleted(true)
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={isError} onClear={errorCloseHandler} />
      {!isLoading && data && (
        <PlaceList
          placesAuthId={userId}
          onDeletePlace={deletePlaceHandler}
          items={data}
        />
      )}
    </React.Fragment>
  )
}

export default UserPlaces
