import { useState } from "react";
import "./Input.css";
import {validate} from "../utils/Validators";

const Input = (props) => {

    const [enteredValue, setEnteredValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [isBlur, setIsBlur] = useState(false);

    const onChangeHandler = event => {
        setEnteredValue(event.target.value);    
        setIsValid(validate(event.target.value, props.validators))

    }

    const onTouchHandler = () => {
        setIsBlur(true);
    }

    const element = props.element === "input" ? 
    (
        <input 
            id={props.id} 
            type={props.type} 
            placeholder={props.placeholder}
            onChange={onChangeHandler}
            value={enteredValue}
            onBlur={onTouchHandler}
        />
    ) 
    : 
    ( 
        <textarea 
            id={props.id} 
            rows={props.rows || 3} 
            onChange={onChangeHandler} 
        />
    )

    return(
        <div className={`form-control ${ !isValid && isBlur && "form-control--invalid"}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>
    )
}

export default Input;