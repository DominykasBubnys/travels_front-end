import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import Input from '../../shared/FormElements/Input';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Button from '../../shared/FormElements/Button';
import Card from '../../shared/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/utils/Validators';
import { useForm } from '../../shared/hooks/form-hook';
import './NewPlace.css';
import { useHistory } from 'react-router-dom';


const UpdatePlace = () => {

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedPlace, setLoadedPlace] = useState(null);
  const [isError, setIsError] = useState(null);

  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const ClearErrorHandler = () => {
    setIsLoading(false);
    setIsError(null);
  }


  useEffect(() => {
    const loadPlace = async() => {

      setIsLoading(true);
      try { 
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/place/${placeId}`)

        if(!response.ok) throw new Error("Unexpected error in server");

        const responseData = await response.json();

        setLoadedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },

            description: {
              value: responseData.place.description,
              isValid: true,
            }
          },
          true
        )

        setIsLoading(false);
        
      } catch (err) {
        console.log("error in UpdatePlace component: ", err);
        setIsError(err.message || "Cannot load choosen place")
      } 
    }
    loadPlace();
  }, [placeId, setFormData])

  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/update-place/${placeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        })
      })

      if(!response.ok) throw new Error("Cannot update this place");

      setIsLoading(false);

      history.push("/")
    } catch (err) {
      setIsError(err.message || "Failed to update the place");
    }
    
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner  />
      </div>
    );
  }

  if (!loadedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={ClearErrorHandler} />
      { !isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={loadedPlace.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={loadedPlace.description}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>}
    </React.Fragment>
    
  );
};

export default UpdatePlace;
