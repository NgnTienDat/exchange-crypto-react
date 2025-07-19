
import { useState, useEffect, useCallback } from 'react';
import { getAccessToken, removeCookieToken, setCookieToken } from '../utils/helper'; // Adjust path as needed
import { getCurrentUser, loginApi, logoutAPI } from '../services/userService';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Check if user is authenticated
    const isAuthenticated = Boolean(user && getAccessToken());

    const fetchCurrentUser = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const token = getAccessToken();
            if (!token) {
                setUser(null);
                return;
            }

            const userData = await getCurrentUser();
            setUser(userData);
        } catch (err) {
            console.error('Error fetching current user:', err);
            setError(err.message || 'Failed to fetch user data');
            setUser(null);
            removeCookieToken();
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            const authData = await loginApi(credentials);

            if (authData.token) {
                setCookieToken(authData.token);
            }

            await fetchCurrentUser();

            return authData;
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            setError(null);

            await logoutAPI();

            setUser(null);
            removeCookieToken();
        } catch (err) {
            console.error('Logout error:', err);
            setError(err.message || 'Logout failed');

            // Even if API call fails, clear local state
            setUser(null);
            removeCookieToken();
        } finally {
            setLoading(false);
            const token = getAccessToken()
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return {
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        fetchCurrentUser,
        clearError: () => setError(null)
    };
};