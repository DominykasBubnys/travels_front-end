import React, { useEffect, useState} from 'react'
import "./PlaceCommentItem.css"
import comment_logo from "../../shared/assets/comment_logo.png"

const PlaceComentItem = (props) => {

    const {comment} = props;

    const [commentedUser, setCommentedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log("comment component");

    useEffect(() => {
        const loadActiveUser = async() => {
            try {
                setIsLoading(true);
                const request = await fetch(`http://localhost:8000/api/users/${comment.user_id}`);

                if(!request.ok)throw new Error("server side error");

                const requestData = await request.json();

                if(!requestData.status) throw new Error(requestData.message)

                setCommentedUser(requestData.user);

                setIsLoading(false);
            } catch (error) {
                console.log("error: ", error)
            }
        }

        loadActiveUser();
    }, [])

  return (

    <div className='comment-item'>

        {
        
        isLoading ? 
        
        <p>
            Loading...
        </p>

        :

        <>
            {commentedUser && <img alt='' src={commentedUser.image}/>}
            <h6>
                {comment.body}
            </h6>
        </>

        }

    </div>
  )
}

export default PlaceComentItem