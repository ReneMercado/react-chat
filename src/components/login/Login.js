import React, { Component } from "react";
import "./login.css";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

class Login extends Component {
  state = {
    login: "",
    password: ""
  };

  onChange(event, prop) {
    let newState = {
      ...this.state
    };
    newState[prop] = event.target.value;

    this.setState(newState);
  }

  login = e => {
    e.preventDefault();
    axios
      .post("https://chatbox-node.herokuapp.com/api/auth/token", this.state)
      .then(res => {
        console.log(res);

        sessionStorage.setItem("token", res.data.token.toString());
        this.props.onLogin(this.state.login);
        this.props.history.push("/chatBase");
      })
      .catch(err => {
        console.log(err);
      });
  };

  onCreateAccount = () => {
    this.props.history.push("/create-user");
  };

  render() {
    return (
      <React.Fragment>
        <div className="login-page">
          <div className="form">
            <form className="login-form">
              <input
                type="text"
                placeholder="username"
                onChange={e => {
                  this.onChange(e, "login");
                }}
              />
              <input
                type="password"
                placeholder="password"
                onChange={e => {
                  this.onChange(e, "password");
                }}
              />
              <button onClick={this.login}>login</button>
              <p className="message">
                Not registered?{" "}
                <a onClick={this.onCreateAccount}>Create an account</a>
              </p>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (userDisplayName) => dispatch(actions.userLogin(userDisplayName))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Login);
