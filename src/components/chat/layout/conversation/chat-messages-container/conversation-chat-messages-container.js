import React from "react";
import "./conversation-chat-messages-container.less";

const ConversationChatMessagesContainer = props => {
  return (
    <ul id="messages-container" className="conversation-chat-messages-container">
      {props.children}
      <div ref={(el) => props.refBottomElem(el)}/>
    </ul>
  );
};

export default ConversationChatMessagesContainer;
