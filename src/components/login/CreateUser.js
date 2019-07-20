import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";
import * as actions from "../..//redux/actions/index";

class CreateUser extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: ""
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState(state => {
      return { [name]: value };
    });
  };

  navigateLogin = () => {
    this.props.history.push("/login");
  };

  onCreateUser = event => {
    event.preventDefault();
    this.props.onCreateUser({
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="login-page">
          <div className="form">
            <form className="register-form">
              <input
                name="name"
                type="text"
                placeholder="Nombre"
                onChange={this.onChange}
              />
              <input
                name="username"
                type="text"
                placeholder="Nombre de usuario"
                onChange={this.onChange}
              />
              <input
                name="email"
                type="text"
                placeholder="Email"
                onChange={this.onChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.onChange}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCreateUser: userObj => dispatch(actions.onCreateUser(userObj, ownProps))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CreateUser);
