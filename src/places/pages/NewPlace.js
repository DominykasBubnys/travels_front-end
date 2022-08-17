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
import Card from '../../shared/UIElements/Card';



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
    setIsLoading(false);
  }

  const placeSubmitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);

    try{

      const Req = await fetch(`http://127.0.0.1:8000/api/places/new`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "accept" : "application/json"
        },
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          image: formState.inputs.image.value,
          address: formState.inputs.address.value,
          likes: 0,
          author_id: Auth.userId,
        })
      })

      if(!Req.ok){
        throw new Error("failed to post new place");
      }

      const reqBody = await Req.json();

      if(!reqBody.status) throw new Error(reqBody.message[0])

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
      
      {!isLoading && 

<Card>
<form className="place-form" onSubmit={placeSubmitHandler}>
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
        <Button type="submit" >
          {/* disabled={!formState.isValid}> */}
          ADD PLACE
        </Button>
      </form>
</Card>

      }
    </React.Fragment>
    
  );
};

export default NewPlace;
