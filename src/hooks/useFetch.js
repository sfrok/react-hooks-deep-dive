// Core
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

// Hooks
import { useLocalStorage } from "./useLocalStorage";

export const useFetch = (url) => {
  const baseUrl = "https://conduit.productionready.io/api";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const [token] = useLocalStorage("token");

  const fetcher = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : "",
        },
      },
    };
    if (!isLoading) return;
    axios(`${baseUrl}${url}`, requestOptions)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((err) => {
        setError(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, fetcher];
};
