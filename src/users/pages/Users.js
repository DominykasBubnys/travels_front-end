import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import UsersList from "../components/UsersList";

const Users = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(()=>{
    const getUsersFromDB = async () => {
      
      try{
        setIsLoading(true);

        const response = await fetch("http://localhost:5000/users");
        const responseData = await response.json();
        if(!response.ok){
          throw new Error(response.message);
        }

        setLoadedUsers(responseData.users);
        setIsLoading(false);

      }catch(err){
        setIsLoading(false);
        console.log("error'as fronte");
        setIsError(err);
      }

    }

    getUsersFromDB();
  },[]);


  const errorHandler = () => {
    setIsError(null);
  }

  return <React.Fragment>
    {/* <ErrorModal error={isError} onClear={errorHandler} /> */}
    { isLoading && <div className="center">
      <LoadingSpinner asOverlay />
    </div>}
    { !isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
  </React.Fragment>
}


export default Users;