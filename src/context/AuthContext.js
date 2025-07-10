import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token and user on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        setUser(result.data.user);
        setToken(result.data.token);
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // Signup function
  const signup = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (result.success) {
        setUser(result.data.user);
        setToken(result.data.token);
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Signup failed. Please try again.' };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (token) {
        await fetch('http://localhost:5000/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();

      if (result.success) {
        setUser(result.data.user);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        return { success: true, data: result.data };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'Update failed. Please try again.' };
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user && user.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return user && roles.includes(user.role);
  };

  // Check if business is approved
  const isBusinessApproved = () => {
    return user && user.role === 'business' && user.businessDetails?.isApproved;
  };

  // Check if user is superadmin
  const isSuperAdmin = () => {
    return user && user.role === 'superadmin';
  };

  // Check if user is business (approved or not)
  const isBusiness = () => {
    return user && user.role === 'business';
  };

  // Check if user is regular user
  const isUser = () => {
    return user && user.role === 'user';
  };

  // Get user permissions
  const getUserPermissions = () => {
    if (!user) return {};
    
    switch (user.role) {
      case 'superadmin':
        return {
          canManageUsers: true,
          canManageBusinesses: true,
          canManageProducts: true,
          canViewAnalytics: true,
          canManageSystem: true,
        };
      case 'business':
        return {
          canManageProducts: user.businessDetails?.isApproved || false,
          canViewOrders: user.businessDetails?.isApproved || false,
          canManageMenu: user.businessDetails?.isApproved || false,
        };
      case 'user':
        return {
          canOrderFood: true,
          canViewOrders: true,
          canManageFavorites: true,
        };
      default:
        return {};
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    hasRole,
    hasAnyRole,
    isBusinessApproved,
    isSuperAdmin,
    isBusiness,
    isUser,
    getUserPermissions,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 