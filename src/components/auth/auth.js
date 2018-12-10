import React from "react";
import jsonWebToken from "jsonwebtoken";

import { LoginContext } from "./context";
import If from "../if/index.js";

class Auth extends React.Component {
  render() {
    return (
      <LoginContext.Consumer>
        {context => {
          const user = context.token
            ? jsonWebToken.verify(context.token, "changeit")
            : {};
          const okToRender =
            context.loggedIn &&
            (this.props.capability
              ? user.capabilities.includes(this.props.capability)
              : true);
          return <If condition={okToRender}>{this.props.children}</If>;
        }}
      </LoginContext.Consumer>
    );
  }
}

export default Auth;
