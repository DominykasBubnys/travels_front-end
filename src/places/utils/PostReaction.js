

export const postReaction = async(method, pid, uid) => {

    const response = {
        status: false,
        message: "bad request"
    }

    if(!(method === "add" || method ==="remove"))return response;

    let url = method === "add" ? "http://localhost:8000/api/places/new-like" : "http://localhost:8000/api/places/remove-like"

    console.log("method: ", method, " | pid: ", pid, " | uid: ", uid, " | url: ", url)

    try {
        
        const fetchRequest = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type" : "application/json",
              "accept" : "application/json"
            },
            body: JSON.stringify({
                place_id: pid,
                author_id: uid,
            })
          });

        if(!fetchRequest.ok)throw new Error("Server side error. Cannot access the server");

        const reqBody = await fetchRequest.json();

        if(!reqBody.status)throw new Error(reqBody.message);

        console.log("reqbody: ", reqBody);

        response.message = reqBody.message;
        response.status = reqBody.status;

        return response;

    } catch (error) {
        response.message = error.message || "unexpected error";
        response.status = false;

        return response;
    }
};