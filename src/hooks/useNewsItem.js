import axios from "axios";
import { useCallback, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";

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
        data: action.data
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

const initialState = {
  status: "idle",
  data: {},
  error: null
};

export default function useNewsItem() {
  const [{ status, data, error }, dispatch] = useReducer(reducer, initialState);
  const { newsId } = useParams();
  const fetchData = useCallback(async () => {
    try {
      dispatch({ type: "started" });
      const res = await axios(`${API_URL}/items/${newsId}`);
      dispatch({ type: "success", data: res.data });
    } catch (error) {
      dispatch({ type: "error", error });
      console.log(error.message);
    }
  }, [newsId]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    isIdle: status === "idle",
    isPending: status === "pending",
    isResolved: status === "resolved",
    isRejected: status === "rejected",
    error,
    data
  };
}
