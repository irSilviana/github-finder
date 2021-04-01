import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    let apiUrl = "https://api.github.com/users?";
    let clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    let clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const res = await axios.get(
      `${apiUrl}client_id=${clientID}&client_secret=${clientSecret}`
    );

    this.setState({ users: res.data, loading: false });
  }

  //Search GitHub Users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    let apiUrl = `https://api.github.com/search/users?q=${text}`;
    let clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    let clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
    const res = await axios.get(
      `${apiUrl}&client_id=${clientID}&client_secret=${clientSecret}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
