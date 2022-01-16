import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { useState } from "react";
import { useCallback } from "react";
import NewPlace from "./places/pages/NewPlace";
import User from "./users/pages/Users";
import Auth from "./users/pages/Auth";
import MainNavigation from "./shared/navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import { AuthContext } from './shared/context/auth-context';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if(isLoggedIn){
    routes = (
      <Switch>
        <Route path="/" exact><UserPlaces /></Route>
        <Route path="/:userId/places" exact><UserPlaces /></Route>
        <Route path="/places/new"> <NewPlace /></Route>
        <Route path="/places/:placeId"><UpdatePlace /></Route>
        <Route path="/users" > <User /></Route>
        <Route path="/auth"> <Auth /></Route>
        <Redirect to="/" />
      </Switch>
    )
  }else{
    routes = <Switch>
      <Route path="/" exact><UserPlaces /></Route>
      <Route path="/:userId/places" exact><UserPlaces /></Route>
      <Route path="/users" > <User /></Route>
      <Route path="/auth"> <Auth /></Route>
      <Redirect to="/" />
    </Switch>
  }


  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>

  );
}

export default App;
