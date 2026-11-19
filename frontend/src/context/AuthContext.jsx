import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('pixelgen_access_token') || null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast ? useToast() : { showToast: () => {} };

  const loadUserProfile = useCallback(async () => {
    const storedToken = localStorage.getItem('pixelgen_access_token');
    if (!storedToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const profile = await authService.getProfile();
      setUser(profile);
      setToken(storedToken);
    } catch (err) {
      console.warn('Failed to load user profile with current token:', err);
      // Try refresh token if available
      const refreshToken = localStorage.getItem('pixelgen_refresh_token');
      if (refreshToken) {
        try {
          const res = await authService.refreshToken(refreshToken);
          if (res.access) {
            localStorage.setItem('pixelgen_access_token', res.access);
            setToken(res.access);
            const refProfile = await authService.getProfile();
            setUser(refProfile);
            setLoading(false);
            return;
          }
        } catch (refreshErr) {
          console.error('Refresh token expired or invalid:', refreshErr);
        }
      }
      // If token expired and cannot refresh, clear
      localStorage.removeItem('pixelgen_access_token');
      localStorage.removeItem('pixelgen_refresh_token');
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      if (data.tokens && data.tokens.access) {
        localStorage.setItem('pixelgen_access_token', data.tokens.access);
        if (data.tokens.refresh) {
          localStorage.setItem('pixelgen_refresh_token', data.tokens.refresh);
        }
        setToken(data.tokens.access);
        setUser(data.user);
        if (showToast) {
          showToast(`Welcome back, ${data.user.first_name || data.user.username}!`, 'success');
        }
        return { success: true, user: data.user };
      }
      return { success: false, error: 'No authentication tokens received.' };
    } catch (err) {
      const errorMsg =
        err?.details?.non_field_errors?.[0] ||
        err?.details?.detail ||
        err?.message ||
        'Login failed. Please check your credentials.';
      if (showToast) {
        showToast(errorMsg, 'error');
      }
      return { success: false, error: errorMsg };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      if (data.tokens && data.tokens.access) {
        localStorage.setItem('pixelgen_access_token', data.tokens.access);
        if (data.tokens.refresh) {
          localStorage.setItem('pixelgen_refresh_token', data.tokens.refresh);
        }
        setToken(data.tokens.access);
        setUser(data.user);
        if (showToast) {
          showToast('Account created successfully! Welcome to PixelGenCreativity.', 'success');
        }
        return { success: true, user: data.user };
      }
      return { success: false, error: 'Registration succeeded but no tokens received.' };
    } catch (err) {
      const errorMsg =
        err?.details?.username?.[0] ||
        err?.details?.email?.[0] ||
        err?.details?.password?.[0] ||
        err?.message ||
        'Registration failed. Please check the form fields.';
      if (showToast) {
        showToast(errorMsg, 'error');
      }
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem('pixelgen_access_token');
    localStorage.removeItem('pixelgen_refresh_token');
    setUser(null);
    setToken(null);
    if (showToast) {
      showToast('You have been logged out successfully.', 'info');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await authService.updateProfile(profileData);
      setUser(res.user);
      if (showToast) {
        showToast('Profile updated successfully!', 'success');
      }
      return { success: true, user: res.user };
    } catch (err) {
      const errorMsg = err?.details?.email?.[0] || err?.message || 'Failed to update profile.';
      if (showToast) {
        showToast(errorMsg, 'error');
      }
      return { success: false, error: errorMsg };
    }
  };

  const isAuthenticated = Boolean(user && token);
  const isAdmin = Boolean(user && (user.is_staff || user.is_superuser || user.profile?.role === 'admin'));

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
    refreshUserProfile: loadUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
