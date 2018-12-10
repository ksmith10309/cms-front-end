import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//import './index.css';
import App from './components/app.js';
import * as serviceWorker from './serviceWorker';

import createStore from './store/';
const store = createStore();

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
