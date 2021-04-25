import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USER,
  GET_USER,
  GET_REPOS,
} from "../types";

function GithubState(props) {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();

    let apiUrl = `https://api.github.com/search/users?q=${text}`;
    let clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    let clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const res = await axios.get(
      `${apiUrl}&client_id=${clientID}&client_secret=${clientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User

  // Get Repos

  // Clear Users

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
}

export default GithubState;
