import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const userJson = localStorage.getItem('user');
        
        if (userJson) {
          const user = JSON.parse(userJson);
          setAuthState({
            isAuthenticated: true,
            user,
            isLoading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // This is a mock login - in a real app, you would call an API
      if (email && password) {
        // Mock user data
        const user = {
          id: '12345',
          email,
          name: email.split('@')[0],
        };
        
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false,
        });
        
        navigate('/');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      // This is a mock signup - in a real app, you would call an API
      if (email && password && name) {
        // Mock user data
        const user = {
          id: '12345',
          email,
          name,
        };
        
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false,
        });
        
        navigate('/');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    // Clear user from localStorage
    localStorage.removeItem('user');
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
    
    navigate('/auth/login');
  };

  return {
    ...authState,
    login,
    signup,
    logout,
  };
};