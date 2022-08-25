
export const getAuthenticated = async(doesUserExists, form_inputs) => {

    const response = {
        status: false,
        message: "Authentication fails!",
        user: null
    }

    const fetchBody = (
        doesUserExists ? 
        {
            email: form_inputs.email.value,
            password: form_inputs.password.value,
        }
        :
        {
            name: form_inputs.name.value,
            email: form_inputs.email.value,
            password: form_inputs.password.value,
            country: form_inputs.country.value,
            image: form_inputs.photo.value,
        }
    )

    const fetch_url = (
        doesUserExists ? 
        `http://localhost:8000/api/login`
        :
        `http://localhost:8000/api/register`
    )



    try{
        const request = await fetch(fetch_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchBody)
        })

        if(!request.ok) throw new Error("Server side error! Server is not responding");

        const RequestData = await request.json();

        if(!RequestData.status)throw new Error(RequestData.message);

        response.status=RequestData.status;
        response.message=RequestData.message;
        response.user=RequestData.user;


    }catch(err){
        response.status=false;
        response.message=err.message || response.message;
        response.user=null;
    }

    return response;
}
