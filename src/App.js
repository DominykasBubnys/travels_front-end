import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { useState } from 'react'
import { useCallback } from 'react'
import NewPlace from './places/pages/NewPlace'
import User from './users/pages/Users'
import Auth from './users/pages/Auth'
import MainNavigation from './shared/navigation/MainNavigation'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import { AuthContext } from './shared/context/auth-context'
import UserDetails from './users/pages/UserDetails'
import PlaceDetails from './places/pages/PlaceDetails'
import Logout from './users/pages/Logout'
import Footer from './shared/Footer/footer'
import ForumPage from "./forum/ForumPage";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)

  // console.log("islogged in? ", isLoggedIn)

  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserId(null)
  }, [])

  let routes

  if (isLoggedIn) {
    routes = (
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
          {' '}
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Route path="/users">
          {' '}
          <User />
        </Route>
        <Route path="/profile">
          <UserDetails />
        </Route>
        <Route path="/place/:placeId">
          <PlaceDetails />
        </Route>
        <Route path="/auth">
          {' '}
          <Auth />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <UserPlaces />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/user/:uid">
          <UserDetails />
        </Route>
        <Route path="/place/:placeId">
        <PlaceDetails />
        </Route>
        <Route path="/users">
          {' '}
          <User />
        </Route>
        <Route path="/auth">
          {' '}
          <Auth />
        </Route>
        <Route path='/forum'>
          <ForumPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
