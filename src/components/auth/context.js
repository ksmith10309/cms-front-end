import React from "react";
import cookie from "react-cookies";

export const LoginContext = React.createContext();

export default class LoginContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      loggedIn: false,
      login: this.login,
      logout: this.logout
    };
  }

  login = token => {
    cookie.save("auth", token);
    let loggedIn = true;
    this.setState({ token, loggedIn });
  };

  logout = () => {
    cookie.remove("auth");
    this.setState({ token: null, loggedIn: false });
  };

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}
