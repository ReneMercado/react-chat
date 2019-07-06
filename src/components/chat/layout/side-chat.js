import React, { Component } from "react";
import AxiosClient from "../../../axiosClient";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import nicescroll from "nicescroll";
import * as actions from '../../../redux/actions/index';

class SideChat extends Component {
  // state = {
  //   users: []
  // };

  instance = AxiosClient();

  componentDidMount() {
    window.jQuery(".list-friends").niceScroll({
      cursorcolor: "#696c75",
      cursorwidth: "4px",
      cursorborder: "none"
    });

    // this.instance
    //   .get("/api/users")
    //   .then(res => {
    //     console.log(res.data);
    //     this.setState({ users: res.data });
    //   })
    //   .catch(err => console.log(err));
  }

  onSetUserOnline = () => {
    this.instance
      .get("api/chats/connect")
      .then(res => {
        console.log(res);

        ////////////////////////////////////////// RESPONSE EXAMPLE //////////////////////////////////////////
        // created_at: "2019-07-05T23:12:51.490Z"
        // last_connect: "2019-07-06T08:06:40.841Z"
        // status: "ONLINE"
        // updated_at: "2019-07-06T08:06:40.841Z"
        // user: "5d1fd3dd470c5c001728d400"
        // __v: 0
        // _id: "5d1fd9739fd8049a0199bce5"

        localStorage.setItem("userId", res.data.user);
        this.props.onFetchUsers();
      })
      .catch(err => console.log(err));
  };

  onLogout = () => {
    //We don't have a service to set user offline.
    this.props.onLogoutUser();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="left-menu">
        <form action="#" className="search">
          <input placeholder="search..." type="search" name="" id="" />
          <input type="submit" value="&#xf002;" />
        </form>
        <menu className="list-friends">
          {this.props.users.map(user => {
            return (
              <li key={user._id} onClick={() => this.props.onChatClicked(user)}>
                <img
                  width="50"
                  height="50"
                  src="http://cs625730.vk.me/v625730358/1126a/qEjM1AnybRA.jpg"
                />
                <div className="info">
                  <div className="user">{user.name}</div>
                  <div
                    className={
                      user.status === "ONLINE" ? "status on" : "status off"
                    }
                  >
                    {user.status}
                  </div>
                </div>
              </li>
            );
          })}
        </menu>
        <div className="button-container">
          <button onClick={this.onLogout}>Logout</button>
          <button onClick={this.onSetUserOnline}>Connect</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.chat.usersList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onAddUser: user => dispatch({ type: actionTypes.ADD_USER, user: user }),
    onFetchUsers: () => dispatch(actions.getUsersList()),
    onLogoutUser: () => dispatch(actions.userLogout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideChat));
