// Core
import { useEffect, useContext } from "react";

// Hooks
import { useFetch, useLocalStorage } from "../hooks";

// Context
import { CurrentUserContext } from "../context";

export const CurrentUserChecker = ({ children }) => {
  const [{ response }, fetcher] = useFetch("/user");
  const [, dispatch] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!token) {
      dispatch({
        type: "SET_UNAUTHORIZED",
      });
      return;
    }
    fetcher();
    dispatch({
      type: "LOADING",
    });
  }, [token, dispatch, fetcher]);

  useEffect(() => {
    if (!response) return;
    dispatch({
      type: "SET_AUTHORIZED",
      payload: response.user,
    });
  }, [response, dispatch]);

  return children;
};
