import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/UIElements/Card';
import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <img src={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              2 places{/* {props.placeCount.length} {props.placeCount.length === 1 ? 'Place' : 'Places'} */}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
