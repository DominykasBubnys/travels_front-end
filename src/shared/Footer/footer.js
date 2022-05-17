import "./footer.css"
import Button from "../FormElements/Button";
import { useContext } from "react";
import {AuthContext} from "../context/auth-context";
import { useHistory } from "react-router-dom";

const Footer = (props) => {

    const navigation = useHistory();

    const Auth = useContext(AuthContext);

    const onCLickHandler = async() => {
        navigation.push(`/user/${Auth.userId}`)
    }

    return <div className="footer-div">
        {Auth.isLoggedIn && <Button onClick={onCLickHandler} inverse>PROFILE</Button>}
    </div>
}

export default Footer;