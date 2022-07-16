import axios from "axios";
import { useCallback, useReducer } from "react";
import { API_URL } from "../constants";
import useLruCache from "./useLruCache";

const initialState = {
  status: "idle",
  list: [],
  error: null
};

function reducer(state, action) {
  switch (action.type) {
    case "error": {
      return {
        ...state,
        status: "rejected",
        error: action.error
      };
    }
    case "success": {
      return {
        ...state,
        status: "resolved",
        list: action.list
      };
    }
    case "started": {
      return {
        ...state,
        status: "pending"
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export default function useList(input) {
  const [{ status, list, error }, dispatch] = useReducer(reducer, initialState);
  const { get, push, has } = useLruCache(10);

  const fetchList = useCallback(
    async (e) => {
      try {
        if (e && typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        if (input && window.location.pathname === "/") {
          dispatch({ type: "started" });
          if (has(input)) {
            const cachedValue = get(input);
            dispatch({ type: "success", list: cachedValue });
          } else {
            const res = await axios(`${API_URL}/search?query=${input}`);
            dispatch({ type: "success", list: res.data.hits });
            push(input, res.data.hits);
          }
        }
      } catch (error) {
        console.log(error.message);
        dispatch({ type: "error", error });
      }
    },
    [input, get, has, push]
  );
  return {
    isIdle: status === "idle",
    isPending: status === "pending",
    isResolved: status === "resolved",
    isRejected: status === "rejected",
    error,
    fetchList,
    list
  };
}
