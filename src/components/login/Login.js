import React, { Component } from "react";
import "./login.css";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/index";

class Login extends Component {
  state = {
    login: "",
    password: ""
  };

  onChange = event => {
    //Cant access event inside setstate async function, the solution could be using event.persist()
    //or get values reference before doing steState
    //event.persist();
    const { name, value } = event.target;
    this.setState(state => {
      return { [name]: value };
    });
  };

  login = e => {
    e.preventDefault();
    this.props.onLogin({
      login: this.state.login,
      password: this.state.password
    });
  };

  onCreateAccount = () => {
    this.props.history.push("/create-user");
  };

  render() {
    if (this.props.isLogged) {
      this.props.history.push("/chatBase");
    }

    return (
      <React.Fragment>
        <div className="login-page">
          <div className="form">
            <form className="login-form">
              <input
                name="login"
                type="text"
                placeholder="username"
                onChange={this.onChange}
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={this.onChange}
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

const mapStateToProps = state => {
  return {
    isLogged: state.user.isLogged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: loginObj => dispatch(actions.onLogin(loginObj))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
