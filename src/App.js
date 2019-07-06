import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import CreateUser from "./components/login/CreateUser";
import ChatLayout from "./components/chat/layout/chatLayout";
import Login from "./components/login/Login";

function App(props) {
  return (
    <div className="App">
      <span> logged as: {props.loggedAs}</span>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-user" component={CreateUser} />
          <Route path="/chatBase" component={ChatLayout} />
          <Route path="/" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loggedAs: state.user.userDisplayName
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
