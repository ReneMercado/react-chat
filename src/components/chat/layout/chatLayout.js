import React, { Component } from "react";
import SideChat from "./side-chat";
import Conversation from "./conversation";

class ChatLayout extends Component {
  state = {
    currentChatUser: null
  };

  onSideChatClick = user => {
    this.setState({ currentChatUser: user });
  };

  render() {
    return (
      <div className="ui">
        <SideChat onChatClicked={this.onSideChatClick} />
        {this.state.currentChatUser !== null ? (
          <Conversation user={this.state.currentChatUser} />
        ) : null}
      </div>
    );
  }
}

export default ChatLayout;
