import React from "react";

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
  if (props.message.from === localStorage.getItem("userId")) {
    messageElement = (
      <li className="i">
        <div className="head">
          <span className="time">{dateFormatter(props.message.date)}</span>
          <span className="name">Буль</span>
        </div>
        <div className="message">{props.message.data}</div>
      </li>
    );
  } else {
    messageElement = (
      <li className="friend-with-a-SVAGina">
        <div className="head">
          <span className="name">Юния</span>
          <span className="time">{dateFormatter(props.message.date)}</span>
        </div>
        <div className="message">{props.message.data}</div>
      </li>
    );
  }

  return <React.Fragment>{messageElement}</React.Fragment>;
};

export default messageBox;
