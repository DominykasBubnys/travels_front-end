import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import UsersList from "../components/UsersList";
import { useHistory } from "react-router-dom";

const Users = () => {

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(()=>{
    const getUsersFromDB = async () => {
      
      try{
        setIsLoading(true);

        const response = await fetch(`http://localhost:8000/api/users`);

        if(!response.ok){
          throw new Error("Server side error");
        }

        const responseData = await response.json();

        setLoadedUsers(responseData.users);
        setIsLoading(false);

      }catch(err){
        setIsLoading(false);
        setIsError(`Cannot load users! (System error: ${err.message})` || "Cannot load Users.");
      }

    }

    getUsersFromDB();
  },[]);


  const errorHandler = () => {
    setIsError(null);
    history.push("/");
  }

  return <React.Fragment>
    <ErrorModal error={isError} onClear={errorHandler} />
    { isLoading && <div className="center">
      <LoadingSpinner asOverlay />
    </div>}
    { !isLoading && loadedUsers && <UsersList items={loadedUsers}/>}
  </React.Fragment>
}


export default Users;