import React from "react";
import { connect } from 'react-redux';
import "./messageBox.less";

const messageBox = props => {
  const dateFormatter = date => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(date).getTime());
  };

  let messageElement = null;
  if (props.message.from === props.userId) {
    messageElement = (
      <li className="message-box-me">
        <div className="message-box-me__head">
          <span className="message-box-me__time">{dateFormatter(props.message.date)}</span>
          <span className="message-box-me__name">You</span>
        </div>
        <div className="message-box-me__message">{props.message.data}</div>
      </li>
    );
  } else {
    messageElement = (
      <li className="message-box-friend">
        <div className="message-box-friend__head">
          <span className="message-box-friend__name">{props.currentUserChat.name}</span>
          <span className="message-box-friend__time">{dateFormatter(props.message.date)}</span>
        </div>
        <div className="message-box-friend__message">{props.message.data}</div>
      </li>
    );
  }

  return <React.Fragment>{messageElement}</React.Fragment>;
};

const mapStateToProps = state => {
  return {
    currentUserChat: state.chat.currentUserChat,
    userId: state.user.userId
  }
}

export default connect(mapStateToProps, null)(messageBox);
