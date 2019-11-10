import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="navigation">
        <div className="menu">
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
            <li>
              <a href="/auth/res">RES</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

{
  /* <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/auth/login">Login</Link>
            </li> */
}

export default User;
