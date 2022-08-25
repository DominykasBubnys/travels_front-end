
export const getAuthenticated = async(doesUserExists, inputs) => {

    const AuthenticateRequest = doesUserExists ? await login(inputs.email, inputs.password) : await register();

    console.log("AuthenticateRequest :", AuthenticateRequest);

    return AuthenticateRequest;

}

const login = async(input_email, input_password) => {

    const response = {
        status: false,
        message: "failed to logged you in!",
        user: null
    }

    try{
        const request = await fetch(`http://localhost:8000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: input_email.value,
                password: input_password.value,
            })
        })

        if(!request.ok) throw new Error('unexpected error. Please try again');

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

const register = async() => {
    const response = {
        status: false,
        message: "Registration fails",
        user: null
    }
}