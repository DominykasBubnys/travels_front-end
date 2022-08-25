import React, { useState, useContext } from 'react';
import Card from '../../shared/UIElements/Card';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import {getAuthenticated} from "../utils/Authenticate"
import { useHistory } from "react-router-dom";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/utils/Validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';


const Auth = () => {
  const Auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useHistory();
  

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },

          country: {
            value: '',
            isValid: false,
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const authRequset = await getAuthenticated(isLoginMode, formState.inputs);

      if(!authRequset.status)throw new Error(authRequset.message);


      setIsLoading(false);      
      Auth.login(authRequset.user)
      history.push("/");


    } catch(err){
      setError(err.message || "Something went wrong, please try again..");
      setIsLoading(false)
    }

  };

  const errorHandler = () => {
    setError(null);
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      <Card className="authentication">
        {loading && <LoadingSpinner asOverlay/>}
        <form className="auth-form place-form" onSubmit={authSubmitHandler}>

          {!isLoginMode && (
            <>
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />

              <Input
                element="input"
                id="country"
                type="text"
                label="Your country"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your coutry name."
                onInput={inputHandler}
              />


              <Input
                element="input"
                id="photo"
                type="text"
                label="Your photo"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter your photo url."
                onInput={inputHandler}
              />
            </>
            
          ) }

          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            name="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            name="password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
          <Button type="submit" >
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button switch="switch" inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card> 
    </React.Fragment>
    
  );
};

export default Auth;
