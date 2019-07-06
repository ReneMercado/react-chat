import React, { Component } from "react";
import AxiosClient from "../../axiosClient";
import "./login.css";
import axios from "axios";

class CreateUser extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: ""
  };

  onChange(event, prop) {
    let newState = {
      ...this.state
    };
    newState[prop] = event.target.value;

    this.setState(newState);
  }

  navigateLogin = () => {
    this.props.history.push("/login");
  };

  onCreateUser = event => {
    event.preventDefault();
    axios
      .post("https://chatbox-node.herokuapp.com/api/users", this.state)
      .then(res => {
        this.props.history.push("/login");
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="login-page">
          <div className="form">
            <form className="register-form">
              <input
                type="text"
                placeholder="Nombre"
                onChange={e => {
                  this.onChange(e, "name");
                }}
              />
              <input
                type="text"
                placeholder="Nombre de usuario"
                onChange={e => {
                  this.onChange(e, "username");
                }}
              />
              <input
                type="text"
                placeholder="Email"
                onChange={e => {
                  this.onChange(e, "email");
                }}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={e => {
                  this.onChange(e, "password");
                }}
              />
              <button onClick={this.onCreateUser}>create</button>
              <p className="message">
                Already registered? <a onClick={this.navigateLogin}>Sign In</a>
              </p>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateUser;
