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
    axios.get("/auth/user").then((res) => {
      this.setState({
        authenticated: true,
        user: res.data,
      });
    });
  }

  render() {
    const auth = this.state.authenticated;
    return (
      <div>
        <div>
          <ul>
            <li>
              <a href="/">Home</a>
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
