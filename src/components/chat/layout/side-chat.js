import React, { Component } from "react";
import { withPolling } from "../../../hoc/withPolling";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import nicescroll from "nicescroll";
import * as actions from "../../../redux/actions/index";

class SideChat extends Component {
  componentDidMount() {
    window.jQuery(".list-friends").niceScroll({
      cursorcolor: "#696c75",
      cursorwidth: "4px",
      cursorborder: "none"
    });

    if (this.props.isLogged && this.props.userId) {
      this.props.onFetchUsers();
    }
  }

  onLogout = () => {
    //We don't have a service to set user offline.
    this.props.onLogoutUser();
    this.props.onDisconnectUser();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="left-menu" >
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
          {!this.props.userId ? (
            <button onClick={this.props.onConnectUser}>Connect</button>
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
    isLogged: state.user.isLogged,
    userId: state.user.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUsers: () => dispatch(actions.refreshUsersLists()),
    onLogoutUser: () => dispatch(actions.userLogout()),
    onSetCurrentUserChat: user => dispatch(actions.setCurrentUserChat(user)),
    onDisconnectUser: () => dispatch(actions.userDisconnect()),
    onConnectUser: () => dispatch(actions.onConnectUser())
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
