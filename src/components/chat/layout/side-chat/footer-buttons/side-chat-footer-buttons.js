import React from "react";
import "./side-chat-footer-buttons.less";

const SideChatFooterButtons = props => {
  return (
    <div className="side-chat-button-container">
      <button onClick={props.onLogout}>Logout</button>
      {!props.userId ? (
        <button onClick={props.onConnectUser}>Connect</button>
      ) : (
        <button onClick={props.onDisconnectUser}>Disconnect</button>
      )}
    </div>
  );
};

export default SideChatFooterButtons;
