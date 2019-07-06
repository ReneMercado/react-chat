import React, { Component } from "react";
import AxiosClient from "../../../axiosClient";
import { withPolling } from "../../../hoc/withPolling";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import nicescroll from "nicescroll";
import * as actions from "../../../redux/actions/index";

class SideChat extends Component {
  instance = AxiosClient();

  componentDidMount() {
    window.jQuery(".list-friends").niceScroll({
      cursorcolor: "#696c75",
      cursorwidth: "4px",
      cursorborder: "none"
    });

    if (this.props.isLogged && sessionStorage.getItem("userId")) {
      this.props.onFetchUsers();
    }
  }

  onConnectUser = () => {
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
        sessionStorage.setItem("userId", res.data.user);
        this.props.onFetchUsers();
      })
      .catch(err => console.log(err));
  };

  onLogout = () => {
    //We don't have a service to set user offline.
    this.props.onLogoutUser();
    this.props.onDisconnectUser();
    this.props.history.push("/");
  };

  onFilterUserList(event) {
    event.preventDefault();
    //HERE IS BETTER TO CALL ANOTHER SERVICE TO GET USERS BY SOME QUERY
    // const filteredList = this.props.users.filter(user => {
    //   user.name.include(event.target.value);
    // });
  }

  render() {
    return (
      <div className="left-menu" onSubmit={this.onFilterUserList}>
        <form action="#" className="search">
          <input placeholder="search..." type="search" name="" id="" />
          <input type="submit" value="&#xf002;" />
        </form>
        <menu className="list-friends">
          <div className="list-friends" style={{ height: "auto" }}>
            <span style={{ margin: "auto", color: "#a8adb3", display: "table" }}>
              Online Users
            </span>
            {this.props.onlineUsers.map((obj, idx) => {
              return (
                <li
                  key={obj.user._id}
                  onClick={() => this.props.onSetCurrentUserChat(obj.user)}
                >
                  <img
                    width="50"
                    height="50"
                    src={`https://loremflickr.com/320/240?random=${idx}`}
                  />
                  <div className="info">
                    <div className="user">{obj.user.name}</div>
                    <div
                      className={
                        // WE DON'T GET ALL USERS STATUSES, WE JUST HAVE "active" BUT PROBABLY IS FOR OTHER PURPOSES
                        obj.status === "ONLINE" ? "status on" : "status off"
                      }
                    >
                      {obj.status? obj.status.toLowerCase() : "no status"}
                    </div>
                  </div>
                </li>
              );
            })}
          </div>

          <div style={{ display: "flex", flexFlow: "column" }}>
            <span style={{ margin: "auto", color: "#a8adb3" }}> All Users</span>
            <menu className="list-friends">
              {this.props.users.map((user, idx) => {
                return (
                  <li
                    key={user._id}
                    onClick={() => this.props.onSetCurrentUserChat(user)}
                  >
                    <img
                      width="50"
                      height="50"
                      src={`https://loremflickr.com/320/240?random=${idx}`}
                    />
                    <div className="info">
                      <div className="user">{user.name}</div>
                      <div
                        className={
                          // WE DON'T GET ALL USERS STATUSES, WE JUST HAVE "active" BUT PROBABLY IS FOR OTHER PURPOSES
                          user.status === "ONLINE" ? "status on" : "status off"
                        }
                      >
                      {user.status? user.status.toLowerCase() : "no status"}
                      </div>
                    </div>
                  </li>
                );
              })}
            </menu>
          </div>
        </menu>
        <div className="button-container">
          <button onClick={this.onLogout}>Logout</button>
          {!sessionStorage.getItem("userId") ? (
            <button onClick={this.onConnectUser}>Connect</button>
          ) : (
            <button onClick={this.props.onDisconnectUser}>Disconnect</button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.chat.usersList,
    onlineUsers: state.chat.onlineUsers,
    isLogged: state.user.isLogged
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onAddUser: user => dispatch({ type: actionTypes.ADD_USER, user: user }),
    onFetchUserList: () => dispatch(actions.getUsersList()),
    onFetchOnlineUsers: () => dispatch(actions.getOnlineUsersList()),
    onFetchUsers: () => dispatch(actions.refreshUsersLists()),
    onLogoutUser: () => dispatch(actions.userLogout()),
    onSetCurrentUserChat: user => dispatch(actions.setCurrentUserChat(user)),
    onDisconnectUser: () => dispatch(actions.userDisconnect())
  };
};

export default withRouter(
  withPolling(actions.refreshUsersLists)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SideChat)
  )
);
