import React from "react";
import "./side-chat-user-list.less"

const SideChatUserList = props => {
  return (
    <div className="side-chat-list">
      <span className="side-chat-list__title"> {props.title}</span>
      <menu className="side-chat-list__list-friends">{props.children}</menu>
    </div>
  );
};

export default SideChatUserList;
