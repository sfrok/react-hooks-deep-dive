// Core
import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue = "") => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, token);
  }, [key, token]);

  return [token, setToken];
};
