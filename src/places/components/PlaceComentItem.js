import React from 'react'
import "./PlaceCommentItem.css"

const PlaceComentItem = ({comment}) => {

    console.log("comment: ", comment)
  return (

    <div className='comment-item'>
        <img src='11.jpg'/>
        <p>
        {comment.body}

        </p>
    </div>
  )
}

export default PlaceComentItem