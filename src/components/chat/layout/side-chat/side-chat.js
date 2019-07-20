import React, { Component } from "react";
import { withPolling } from "../../../../hoc/withPolling";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../../redux/actions/index";
import SideChatUser from "./user/side-chat-user";
import SideChatUserList from "./user-list/side-chat-user-list";
import SideChatSearchBar from "./search-bar/side-chat-search-bar";
import SideChatFooterButtons from "./footer-buttons/side-chat-footer-buttons";

class SideChat extends Component {
  componentDidMount() {
    if (this.props.isLogged && this.props.userId) {
      this.props.onFetchUsers();
    }
  }

  onLogout = () => {
    this.props.onLogoutUser();
    this.props.onDisconnectUser();
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <SideChatSearchBar />
        <SideChatUserList title="Online Users">
          <SideChatUser
            users={this.props.onlineUsers}
            onSetCurrentUserChat={this.props.onSetCurrentUserChat}
          />
        </SideChatUserList>
        <SideChatUserList title="All Users">
          <SideChatUser
            users={this.props.users}
            onSetCurrentUserChat={this.props.onSetCurrentUserChat}
          />
        </SideChatUserList>
        <SideChatFooterButtons
          userId={this.props.userId}
          onLogout={this.onLogout}
          onConnectUser={this.props.onConnectUser}
          onDisconnectUser={this.props.onDisconnectUser}
        />
      </React.Fragment>
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
