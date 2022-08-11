import React, { useState, useContext } from 'react';
import Card from '../../shared/UIElements/Card';
import Input from '../../shared/FormElements/Input';
import Button from '../../shared/FormElements/Button';
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
// import ImageUpload from "../../shared/FormElements/ImageUpload"
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
  const auth = useContext(AuthContext);
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
          // image: undefined
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

          // image: {
          //   value: null,
          //   isValid: false,
          // }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if(isLoginMode){ // for loging in

      try{
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        })

        if(!response.ok) throw new Error('unexpected error. Please try again');

        const responseData = await response.json();

        if(!responseData.status)throw new Error(responseData.message);

        auth.login(responseData.user.id);

        setIsLoading(false);
        history.push("/");


      }catch(err){
        setError(err.message || "Something went wrong, please try again..");
        setIsLoading(false)
      }

    }
    //else{ // if it's sign-up mode...
    //   try{

    //     setIsLoading(true);
    //     const response = await fetch(`http://localhost:8000/api/auth/sign_up`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         name: formState.inputs.name.value,
    //         email: formState.inputs.email.value,
    //         password: formState.inputs.password.value,
    //       })
    //     })

        
    //     if(!response.ok){
    //       throw new Error("responseData.message");
    //     }
    //     const responseData = await response.json();

        

    //     console.log("res: ", responseData)


    //     auth.login(responseData.user._id);
    //     setIsLoading(false);
    //     history.push("/");


    //   }catch(err){
    //     setError(err.message || "Something went wrong, please try again..");
    //     setIsLoading(false)
    //   }
    // }
  };

  const errorHandler = () => {
    setError(null);

  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      <Card className="authentication">
        {loading && <LoadingSpinner asOverlay/>}
        <form className="auth-form place-form" onSubmit={authSubmitHandler}>

        {/* {!isLoginMode && (<ImageUpload center id="image" onInput={inputHandler} />)} */}

          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
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
          <Button type="submit" disabled={!formState.isValid}>
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
