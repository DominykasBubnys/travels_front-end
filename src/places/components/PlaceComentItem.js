import "./PlaceCommentItem.css"

const PlaceComentItem = (props) => {

   const {comment} = props;

  return (

    <div className='comment-item'>

        <img alt='' src={comment.auth_image}/>
        <p className="comment-text">
            {comment.body}
        </p>

    </div>
  )
}

export default PlaceComentItem