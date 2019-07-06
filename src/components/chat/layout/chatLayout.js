import React, { Component } from "react";
import SideChat from "./side-chat";
import Conversation from "./conversation";
import "../chat.less";
import nicescroll from "nicescroll";

class ChatLayout extends Component {
  state = {
    currentChatUser: null
  };

  componentDidMount() {
    window.jQuery(document).ready(function() {
      window.jQuery(".list-friends").niceScroll({
        cursorcolor: "#696c75",
        cursorwidth: "4px",
        cursorborder: "none"
      });
      window.jQuery(".messages").niceScroll({
        cursorcolor: "#cdd2d6",
        cursorwidth: "4px",
        cursorborder: "none"
      });
    });
  }

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
