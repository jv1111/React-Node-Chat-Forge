import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as authService from "../services/auth.service";
import { setUser, logout } from "../features/auth/authSlice";

const useAuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await authService.me();
        dispatch(setUser(response.data));
      } catch {
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);
};

export default useAuthInitializer;
