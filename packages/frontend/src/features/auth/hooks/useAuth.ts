import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { login, logout, selectUser } from "../store/auth.slice";
import { APP_CONSTANTS } from "../../../core/config/constants";
import { ServiceProvider } from "../../../core/services/service-provider";
import { LoginCredentials } from "../types";


export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector(selectUser);

  const authService = ServiceProvider.getInstance().getAuthService();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      const result = await dispatch(login(credentials)).unwrap();

      if (result.access_token) {
        navigate(APP_CONSTANTS.ROUTES.DASHBOARD);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(APP_CONSTANTS.ROUTES.LOGIN);
  };

  const clearAuthError = () => {
    setError(null);
  };

  return {
    user,
    loading,
    error,
    handleLogin,
    handleLogout,
    clearAuthError,
  };
};