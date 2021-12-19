import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import NewPlace from "./places/pages/NewPlace";
import User from "./users/pages/Users";
import MainNavigation from "./shared/navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

function App() {


  return (

    
    <Router>

      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact><UserPlaces /></Route>
          <Route path="/:userId/places" exact><UserPlaces /></Route>
          <Route path="/places/new"> <NewPlace /></Route>
          <Route path="/places/:placeId"><UpdatePlace /></Route>
          <Route path="/users"> <User /></Route>
          <Redirect to="/" />
        </Switch>
      </main>
      
    </Router>

  );
}

export default App;
