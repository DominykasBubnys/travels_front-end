import React, { useContext, useEffect, useState } from 'react'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import { AuthContext } from '../../shared/context/auth-context'
import Button from '../../shared/FormElements/Button'
import { useHistory } from 'react-router-dom'
import PlaceComentItem from './PlaceComentItem'
import { AddNewComment } from '../utils/AddNewComment'
import './PlaceCommentsList.css'


const CommentsList = (props) => {

  const [isloading, setIsLoading] = useState(false)
  const [commentsData, setCommentsData] = useState(null);
  const [commentsCount, setCommentsCount] = useState(0);
  const [newCommentInput, setNewCommentInput] = useState("");
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [refreshCommentsData, setRefreshCommentsData] = useState(false);
  const Auth = useContext(AuthContext);
  const history = useHistory()

  const addNewCommentHandler = async() => {
    setRefreshCommentsData(true)


    try {
      const request = await AddNewComment(props.pid, Auth.userId, newCommentInput)

      if(!request.status)throw new Error("Cannot send a comment");
    } catch (error) {

      console.log("failed to add a new comment");
    }
  }

  const newCommentInputHandler = (event) => {
    const input = event.target.value;
    setIsButtonDisable(true);
    if(input.length > 0)setIsButtonDisable(false);
    setNewCommentInput(event.target.value || "")
  }

  useEffect(()=>{
    console.log("useefect");
    
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
        setRefreshCommentsData(false);
      if(!Req.ok){
        throw new Error("failed to post new place");
      }


      } catch (error) {
        
      }

    }

    loadPlaceComments();
  }, [refreshCommentsData])


  return (
    
    <>
      {isloading && <LoadingSpinner />}
      {!isloading && commentsData && <div className='comments-container'>
        
        
        <div>
          {  Auth.isLoggedIn ? 
            <div className='add-new-comment'>
              <input placeholder='Add new comment' autoFocus onChange={newCommentInputHandler} />
              {!isButtonDisable && <button onClick={addNewCommentHandler}>+</button>}
            </div>
            :
            <Button onClick={() => history.push('/auth')}>
              Login
            </Button>
          }
          {
            commentsCount === 0 ?
            <h6 className='no-comments-header'>No comments now</h6>
            :
            <ul>
              {commentsData.map(comment=><PlaceComentItem key={comment.id} comment={comment}/>)}
            </ul>
            
          }
        </div>

      </div>}
    </>
  )
}

export default CommentsList