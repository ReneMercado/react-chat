import React, { Component } from "react";
import SideChat from "./side-chat";
import Conversation from "./conversation";
import { connect } from "react-redux";
import "../chat.less";
import nicescroll from "nicescroll";

class ChatLayout extends Component {
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

  render() {
    return (
      <div className="ui">
        <SideChat />
        {this.props.currentUserChat !== null ? <Conversation /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserChat: state.chat.currentUserChat
  };
};

export default connect(mapStateToProps, null)(ChatLayout);
