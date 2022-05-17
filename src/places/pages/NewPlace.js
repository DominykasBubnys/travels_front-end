import React, {useContext, useState} from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../shared/hooks/form-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import './NewPlace.css';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/utils/Validators';



const NewPlace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const history = useHistory();

  const Auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      image: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const errorCloseModal = () => {
    setIsError(null);
    history.push("/")
  }

  const placeSubmitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);

    try{

      const kazkas = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          creator: Auth.userId,
          image: formState.inputs.image.value,
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          latitude: 123,
          longitude: 456,
        })
      })

      if(!kazkas.ok){
        throw new Error("failed to post new place");
      }

      setIsLoading(false);

      history.push("/");


    }catch(err){
      setIsError(err.message);
    }

  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={errorCloseModal} />
      {isLoading && <LoadingSpinner asOverlay/>}
      {!isLoading && <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          placeholder="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input 
          id="image"
          element="input"
          type="text"
          label="Image Url"
          placeholder="Image Url"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please provide image url."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          placeholder="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          placeholder="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>}
    </React.Fragment>
    
  );
};

export default NewPlace;
