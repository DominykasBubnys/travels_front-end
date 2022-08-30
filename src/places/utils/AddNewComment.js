export const AddNewComment = async(pid, author, input) => {
    console.log("creating new comment | author: ", author, " | pid: ", pid)

    try {
        const Req = await fetch(`http://127.0.0.1:8000/api/places/new-comment`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "accept" : "application/json"
        },
        body: JSON.stringify({
          body: input,
          auth_image: author.image, 
          place_id: pid,
          user_id: author.id
        })
      })

      if(!Req.ok)throw new Error("Server sideas error");

      const reqData = await Req.json();

      if(!reqData.status)throw new Error(reqData.message);

      return {
        status: true,
        message: "New comment was added successfuly"
      }

    } catch (error) {
        return {
            status: false,
            message: error.message || "Unexpected error from a server!"
        }
    }
}