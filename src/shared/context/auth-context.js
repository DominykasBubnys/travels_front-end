import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  authenticatedUser: null,
  login: () => {},
  logout: () => {}
});
