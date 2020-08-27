import React from "react";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: {},
    };
  }

  componentDidMount() {
    fetch("/auth/login", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          authenticated: true,
          user: res,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const auth = this.state.authenticated;
    return (
      <div>
        <div>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/auth/google">Sign in (Google)</a>
            </li>
            <li>
              <a href="/auth/logout">Sign out</a>
            </li>
          </ul>
        </div>
        {!auth ? (
          <div>Hi, Anon</div>
        ) : (
          <div>Hi, {this.state.user.displayName}</div>
        )}
      </div>
    );
  }
}

export default Home;
