import React, { useContext, useEffect, useState } from 'react'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import { AddNewComment } from '../../shared/utils/AddNewComment'
import './PlaceCommentsList.css'
const CommentsList = (props) => {

  const [isloading, setIsLoading] = useState(false)
  const [commentsData, setCommentsData] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0);


  const addNewCommentHandler = () => {
    console.log("adding new comment...")
  }

  useEffect(()=>{
    const loadPlaceComments = async() => {
      try {
        setIsLoading(true);

        const Req = await fetch(`http://127.0.0.1:8000/api/places/get-comments/${props.pid}`)

        if (!Req.ok) throw new Error('Cannot get comments of this place')

        const reqData = await Req.json();

        if(!reqData.status)throw new Error(reqData.message);

        setCommentsData(reqData.comments)
        setCommentsCount(reqData.count)
        setIsLoading(false);
      if(!Req.ok){
        throw new Error("failed to post new place");
      }


      } catch (error) {
        
      }

    }

    loadPlaceComments();
  }, [])


  return (
    
    <>
      {isloading && <LoadingSpinner />}
      {!isloading && commentsData && <div className='comments-container'>
        
        
        <div>
          <button className='new-comment-btn' onClick={addNewCommentHandler}>
            Add new comment...
          </button>
          {
            commentsCount === 0 ?
            <p>No comments now</p>
            :
            <ul>
              {[1,2,3].map(num=><p>{num}</p>)}
            </ul>
            
          }
        </div>

      </div>}
    </>
  )
}

export default CommentsList