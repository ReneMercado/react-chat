import React, { Component } from "react";
import axios from "axios";

class Auth extends Component {
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

  login = (e) => {
      e.preventDefault();
    axios
      .post("https://chatbox-node.herokuapp.com/api/auth/token", this.state)
      .then(res => {
        console.log(res);

        localStorage.setItem("token", (res.data.token).toString());
        this.props.history.push('/chatBase');
      })
      .catch(err => {
        console.log(err);
      });
  };

  navigateCreateUser = () => {
      this.props.history.push('/create-user');
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Usuario"
          onChange={e => {
            this.onChange(e, "login");
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => {
            this.onChange(e, "password");
          }}
        />
        <button onClick={this.login}>Entrar</button>
        <button onClick={this.navigateCreateUser}>Crear Usuario</button>
      </form>
    );
  }
}

export default Auth;
