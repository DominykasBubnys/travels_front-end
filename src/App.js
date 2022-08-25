import MainNavigation from './shared/navigation/MainNavigation'
import { AuthContext } from './shared/context/auth-context'
import { BrowserRouter as Router } from 'react-router-dom'
import { useState, useCallback } from 'react'
import Footer from "./shared/Footer/footer";
import { getRoutes } from './Routes'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const login = useCallback((user) => {

    if(!user.id){
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true)
    setAuthenticatedUser(user)
  }, [])

  const logout = useCallback(() => {
    setAuthenticatedUser(null);
    setIsLoggedIn(false)
  }, [])

  let routes = getRoutes(isLoggedIn)


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, authenticatedUser }}>
      <Router>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  )
}

export default App
