import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, settingsService } from '@/services';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      setAuthError(null);
      setIsLoadingPublicSettings(true);
      setIsLoadingAuth(true);

      const publicSettings = await settingsService.getPublicSettings();
      setAppPublicSettings(publicSettings);
      setIsLoadingPublicSettings(false);

      if (authService.hasToken()) {
        await checkUserAuth();
        return;
      }

      setIsAuthenticated(false);
      setUser(null);
      setIsLoadingAuth(false);

      if (publicSettings.authRequired) {
        setAuthError({
          type: 'auth_required',
          message: 'Authentication is required to view this app.'
        });
      }
    } catch (error) {
      setAuthError({
        type: 'unknown',
        message: error.message || 'Failed to load app settings.'
      });
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const data = await authService.me();
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoadingAuth(false);
      setAuthError({
        type: 'auth_required',
        message: error.message || 'Authentication required'
      });
    }
  };

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    setIsAuthenticated(true);
    setAuthError(null);
    return data;
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    setUser(data.user);
    setIsAuthenticated(true);
    setAuthError(null);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      login,
      register,
      logout,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
