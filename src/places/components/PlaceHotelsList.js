import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import "./PlaceHotelsList.css";

const PlaceHotelsList = () => {

    const [isError, setIsError] = useState(null)
    const [loadedHotels, setLoadedHotels] = useState(null);
    const [isloading, setIsLoading] = useState(false)

    useEffect(()=>{


        const loadHotels = async () => {
          try {
            setIsLoading(true)
    
            const request = await fetch(
              `http://localhost:8000/api/hotels`
            )
    
            if (!request.ok) throw new Error('Cannot found any hotels near this place')
    
            const responseData = await request.json()
    
            console.log("Hotels list response: ", responseData)
    
            //setLoadedHotels(responseData.place)
    
            // const reactedIds = await responseData.place.likedBy
    
            // if (!reactedIds)
            //   throw new Error('Cannot fetch users ids who likes this place')
    
            // const usersList = await getUsersByIds(reactedIds)
    
            // setReactedUsersList(usersList)
            setIsLoading(false)
          } catch (err) {
            setIsLoading(false)
            setIsError(err.message || 'Cannot load hotels near this place')
          }
        }
    
        loadHotels()
    }, [])


    return <>
    
    {
        isloading ? <LoadingSpinner />
        :
        <div className='hotels-container'>
            hotels
        </div>
    }
    
    </>
}
    
export default PlaceHotelsList