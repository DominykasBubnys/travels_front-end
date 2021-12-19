import React from 'react';
import "./NewPlace.css";
import Input from '../../shared/FormElements/Input';
import { VALIDATOR_REQUIRE } from "../../shared/utils/Validators";
import Button from "../../shared/FormElements/Button";


const NewPlace = () => {

  const titleInputHanler = (id, value, isValid) => {

  }
  
  return <form className="place-form">
    <Input 
      element="input" 
      type="text" 
      label="Text" 
      validators={[VALIDATOR_REQUIRE()]}
      erorText = "Please enter a valid title"
      onInput={titleInputHanler}
    />

    <Input 
      type="text" 
      label="Description" 
      validators={[VALIDATOR_REQUIRE()]}
      erorText = "Please enter a valid title"
      onInput={titleInputHanler}
    />

    <Input 
      element="input" 
      type="text" 
      label="Address" 
      validators={[VALIDATOR_REQUIRE()]}
      erorText = "Please enter a valid title"
      onInput={titleInputHanler}
    />

    <Button type="submit"> Add place </Button>
  </form>

};

export default NewPlace;