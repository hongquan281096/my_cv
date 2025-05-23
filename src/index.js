// import React from "react";
// import ReactDom from "react-dom";
// import App from "./App";
// import "./App.css";
// import { BrowserRouter as Router } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// ReactDom.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById("app")
// );
import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import "./App.css";
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
