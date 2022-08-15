import React from 'react';
import './Avatar.css';
import default_logo from "../assets/1.jpg"

const Avatar = props => {

  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={default_logo}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
