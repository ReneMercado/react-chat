import React from "react";
import "./conversation-chat-top.less";

const ConversationChatTop = props => {
  return (
    <div className="conversation-top">
      <div className="conversation-top__avatar">
        <img
          className="conversation-top__avatar__image"
          src="http://cs625730.vk.me/v625730358/1126a/qEjM1AnybRA.jpg"
          alt="Not Found"
        />
      </div>
      <div className="conversation-top__info">
        <div className="conversation-top__info__name">{props.name}</div>
        <div className="conversation-top__info__count">{props.id}</div>
      </div>
      <i className="conversation-top__star-icon fa fa-star" />
    </div>
  );
};

export default ConversationChatTop;
