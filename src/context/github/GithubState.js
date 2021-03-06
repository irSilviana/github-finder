import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

let clientID;
let clientSecret;

if (process.env.NODE_ENV !== "production") {
  clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  clientID = process.env.GITHUB_CLIENT_ID;
  clientSecret = process.env.GITHUB_CLIENT_SECRET;
}

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
    const res = await axios.get(
      `${apiUrl}&client_id=${clientID}&client_secret=${clientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  // Get User
  const getUser = async (username) => {
    setLoading();

    let apiUrl = `https://api.github.com/users/${username}`;
    const res = await axios.get(
      `${apiUrl}?&client_id=${clientID}&client_secret=${clientSecret}`
    );

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading();

    let apiUrl = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`;
    const res = await axios.get(
      `${apiUrl}&client_id=${clientID}&client_secret=${clientSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

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
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
}

export default GithubState;
