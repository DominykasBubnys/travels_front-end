import { useParams } from "react-router";
import PlaceList from "../components/PlaceList";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import Footer from "../../shared/Footer/footer";


const UserPlaces = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [data, setData] = useState(null);
    const [isDeleted, setIsDeleted] = useState(false);
    
    const userId = useParams().userId;

    const errorCloseHandler = () => {
        setIsError(null);
    }


    useEffect(() => {
        const loadData = async () => {
            try {
                let request;
                if(userId) request = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user-places/${userId}`);
                else request = await fetch(`${process.env.REACT_APP_BACKEND_URL}`);
                if(!request.ok)throw new Error("failed to load this user places! please make sure user id exists");
                const responseData = await request.json();
                setData(responseData.places);

            } catch (err) {
                setData([]);
                setIsError(err.message || "Loading places fails.. We are working on this issue");
            }
            setIsLoading(false);
        }

        loadData();
    }, [userId, isDeleted]);

    const deletePlaceHandler = (deletedPlaceId) => {

        setData(prevPlaces => {
            prevPlaces.filter(place => place._id !== deletedPlaceId)
        });

        setIsDeleted(true);
    }

    return <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay/>}
        <ErrorModal error={isError} onClear={errorCloseHandler} />
        {!isLoading && data && <PlaceList userId={userId} onDeletePlace={deletePlaceHandler} userControllers={userId} items={data} />}
        <Footer />
    </React.Fragment>
        
}

export default UserPlaces;