import { createContext, useContext, useReducer } from 'react';
import { FAKE_USER } from '../constants';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'user/login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case 'user/logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'user/login', payload: FAKE_USER });
    } else {
      alert('Invalid email or password');
    }
  };

  const logout = () => dispatch({ type: 'user/logout' });

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('AuthContext was used outside of the AuthProvider');
  }
  return context;
};
