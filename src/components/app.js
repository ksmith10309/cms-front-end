import React from "react";

import RecordList from "./record/list.js";
import LoginContextProvider from "./auth/context.js";
import Login from "./auth/login.js";
import Auth from "./auth/auth.js";

import * as api from "../lib/api.js";

const API = "https://javascript-401-api.herokuapp.com";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      model: ''
    };
  }

  selectModel = event => {
    this.setState({ model: event.target.name })
  }

  componentDidMount() {
    let url = `${API}/api/v1/models`;
    api.get(url)
      .then(models => {
        this.setState( {models} );
      })
  }

  render() {
    let buttons = this.state.models.map(model => <input type="button" value={model.toUpperCase()} name={model} onClick={this.selectModel} />);
    if (this.state.model === '') {
      return (
        <LoginContextProvider>
          <Login />
          <hr />
          <Auth capability="read">
            {buttons}
          </Auth>
        </LoginContextProvider>
      );
    }
    else {
      return (
        <LoginContextProvider>
          <Login />
          <hr />
          <Auth capability="read">
            {buttons}
            <RecordList model={this.state.model} />
          </Auth>
        </LoginContextProvider>
      );
    }
  }
}

export default App;
