import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configure axios to include credentials (cookies) with all requests
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/swiggy/loggedInUser', {
          withCredentials: true
        });
        if (response.data.success) {
          setUser(response.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Auth check error:', error.message);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // const logout = async () => {
  //   try {
  //     await axios.post('/swiggy/logout');
  //   } catch (error) {
  //     console.error('Logout error', error);
  //   } finally {
  //     setUser(null);
  //     setIsLoggedIn(false);
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);