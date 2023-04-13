import "./Users.css"
import { useCollection } from '../hooks/useCollection'
import Avatar from "./Avatar"

import React from 'react'

const Users = () => {
    const { isPending, error, documents } = useCollection('users')
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {isPending && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      
      {documents && documents.map(user => (
        <div key={user.id} className="user-list-item">
           { user.online && <div 
                className="online"
           />
           }
          <span>{user.displayName.toLowerCase()}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
    </div>
  )
}

export default Users