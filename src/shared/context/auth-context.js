import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  user: null,
  login: () => {},
  logout: () => {}
});
