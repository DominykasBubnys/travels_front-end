import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

const Logout = () => {
    const Auth = useContext(AuthContext);
    Auth.logout();
    const history = useHistory();

    history.push("/");
    return <React.Fragment>
        Loging out..
    </React.Fragment>;
}

export default Logout