export const DeleteComment = async(Comment_id) => {

    try {
        const Req = await fetch(`http://127.0.0.1:8000/api/places/remove-comment`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "accept" : "application/json"
        },
        body: JSON.stringify({
          id: Comment_id,
        })
      })

      if(!Req.ok)throw new Error("Server side error");

      const reqData = await Req.json();

      if(!reqData.status)throw new Error(reqData.message);

      return {
        status: true,
        message: `comment[${Comment_id}] was successful deleted`
      }

    } catch (error) {
        return {
            status: false,
            message: error.message || "Unexpected error from a server!"
        }
    }
}