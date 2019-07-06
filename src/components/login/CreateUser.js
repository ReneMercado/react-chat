import React, { Component } from "react";
import AxiosClient from "../../axiosClient";
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
      <form>
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

        <button onClick={this.onCreateUser}>Crear Usuario</button>
        <button onClick={this.navigateLogin}>Login</button>
      </form>
    );
  }
}

export default CreateUser;
