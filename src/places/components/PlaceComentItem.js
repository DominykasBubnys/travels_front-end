import "./PlaceCommentItem.css"
import delete_logo from "../../shared/assets/delete_logo.png";
import { DeleteComment } from "../utils/DeleteComment";
import { AuthContext } from '../../shared/context/auth-context'
import { useContext, useState } from "react";


const PlaceComentItem = (props) => {

  const {comment} = props;
  const Auth = useContext(AuthContext).authenticatedUser;
  const [showDeleteOption, setShowDeleteOption] = useState(false);

  const showDeteleOptionHandler = () => {
    
    if(Auth.id === comment.user_id)setShowDeleteOption(true);
  }

  const deleteCommentHandler = async() => {
    try {
      await DeleteComment(comment.id);
      props.onRefreshList();
    } catch (error) {
      console.log("failed to delete comment");
    }
  }

  return (

    <div className='comment-item' onMouseLeave={()=>setShowDeleteOption(false)} onMouseEnter={showDeteleOptionHandler}>

      <img alt='Auth' className="auth_logo" src={comment.auth_image}/>
      <p className="comment-text">
          {comment.body}
      </p>
      {showDeleteOption && 
        <img alt='Delete' className="delete_logo" onClick={deleteCommentHandler} src={delete_logo}/>
      }
    </div>
  )
}

export default PlaceComentItem