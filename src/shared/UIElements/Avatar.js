import React from 'react';
import './Avatar.css';

const Avatar = props => {

  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={require(`../assets/${props.image}`).default}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
