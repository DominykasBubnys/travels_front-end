import React, { useEffect } from 'react';

import UserItem from './UserItem';
import Card from '../../shared/UIElements/Card';
import './UsersList.css';

const UsersList = ({items}) => {

  useEffect(()=>{
    try {
      
    } catch (error) {
      
    }
  })

  console.log('props: ',items);
  const Users = items;
  if (Users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {Users.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
        />
      ))}
    </ul>
  );
};

export default UsersList;
