import React from "react";
import superagent from "superagent";

import { LoginContext } from "./context";
import If from "../if/index.js";

const API = "https://javascript-401-api.herokuapp.com";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = (event, contextLoginHandler) => {
    event.preventDefault();
    const { username, password } = this.state;
    superagent
      .post(`${API}/signin`)
      .auth(username, password)
      .then(response => {
        const token = response.text;
        console.log({ token });
        contextLoginHandler(token);
      })
      .catch(console.error);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <LoginContext.Consumer>
        {context => {
          return (
            <div>
              <If condition={context.loggedIn}>
                <button onClick={context.logout}>Log Out</button>
              </If>
              <If condition={!context.loggedIn}>
                <form
                  onSubmit={event => this.handleSubmit(event, context.login)}
                >
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={this.handleChange}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <button type="submit">Login</button>
                </form>
              </If>
            </div>
          );
        }}
      </LoginContext.Consumer>
    );
  }
}

export default Login;
