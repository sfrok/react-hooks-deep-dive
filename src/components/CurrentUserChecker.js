// Core
import { useEffect, useContext } from "react";

// Hooks
import { useFetch, useLocalStorage } from "../hooks";

// Context
import { CurrentUserContext } from "../context";

export const CurrentUserChecker = ({ children }) => {
  const [{ response }, fetcher] = useFetch("/user");
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!token) {
      setCurrentUserState((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }
    fetcher();
    setCurrentUserState((state) => ({
      ...state,
      isLoading: true,
    }));
  }, [token, setCurrentUserState, fetcher]);

  useEffect(() => {
    if (!response) return;
    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }));
  }, [response, setCurrentUserState]);

  return children;
};
