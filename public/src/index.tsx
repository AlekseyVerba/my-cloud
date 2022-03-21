import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import { BrowserRouter as Router } from "react-router-dom"
import { store } from "./store/index"
import { Provider } from "react-redux"

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  ,
  document.getElementById('root')
);