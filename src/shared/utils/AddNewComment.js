export const AddNewComment = async(pid, uid, input) => {
    console.log("uid: ", uid, " | pid: ", pid)

    try {
        const Req = await fetch(`http://127.0.0.1:8000/api/places/new-comment`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "accept" : "application/json"
        },
        body: JSON.stringify({
          body: input,
          place_id: pid,
          user_id: uid
        })
      })

      if(!Req.ok)throw new Error("Server side error");

      const reqData = await Req.json();

      console.log("reqData: ", reqData);

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