import React, { Component } from "react";
import SideChat from "./side-chat/side-chat";
import Conversation from "./conversation/conversation";
import { connect } from "react-redux";
import "./chatLayout.less";

class ChatLayout extends Component {
  render() {
    let sideChat = (
      <div className="chat-layout__left-menu">
        <SideChat />
      </div>
    );

    let conversation = (
      <div className="chat-layout__chat">
        <Conversation />
      </div>
    );

    return (
      <div className="chat-layout">
        {sideChat}
        {this.props.currentUserChat && conversation}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserChat: state.chat.currentUserChat
  };
};

export default connect(
  mapStateToProps,
  null
)(ChatLayout);
