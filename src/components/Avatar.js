import "./Avatar.css"

import React from 'react'

const Avatar = ({src}) => {
  return (
    <div className="avatar">
        <img  src={src} alt="user src"/>
    </div>
  )
}

export default Avatar