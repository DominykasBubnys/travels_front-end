import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import NewPlace from './places/pages/NewPlace'
import User from './users/pages/Users'
import Auth from './users/pages/Auth'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import UserDetails from './users/pages/UserDetails'
import PlaceDetails from './places/pages/PlaceDetails'
import Logout from './users/pages/Logout'
import ForumPage from "./forum/ForumPage";
import Profile from './users/pages/Profile'


export const getRoutes = (isLoggedIn) => (
    isLoggedIn ? 
    (
        <Switch>

            <Route path="/" exact>
                <UserPlaces />
            </Route>

            <Route path='/forum'>
                <ForumPage />
            </Route>

            <Route path="/:userId/places" exact>
                <UserPlaces />
            </Route>

            <Route path="/places/new">
                <NewPlace />
            </Route>

            <Route path="/places/:placeId">
                <UpdatePlace />
            </Route>

            <Route path="/users">
                <User />
            </Route>

            <Route path="/users/:uid">
                <User />
            </Route>

            <Route path="/profile">
                <Profile />
            </Route>

            <Route path="/place/:placeId">
                <PlaceDetails />
            </Route>

            <Route path="/auth">
                <Auth />
            </Route>

            <Route path="/logout">
                <Logout />
            </Route>

            <Redirect to="/" />

        </Switch>
    )
    :
    (
        <Switch>
            <Route path="/" exact>
                <UserPlaces />
            </Route>

            <Route path="/:userId/places" exact>
                <UserPlaces />
            </Route>

            <Route path="/users/:uid">
                <UserDetails />
            </Route>

            <Route path="/place/:placeId">
                <PlaceDetails />
            </Route>

            <Route path="/users">
                <User />
            </Route>

            <Route path="/auth">
                <Auth />
            </Route>

            <Route path='/forum'>
                <ForumPage />
            </Route>

            <Redirect to="/" />
            
        </Switch>
    )
)

